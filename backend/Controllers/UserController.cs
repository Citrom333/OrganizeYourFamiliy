using System.Security.Claims;
using backend.Model;
using backend.Model.DTOs;
using backend.Model.Entities;
using backend.Service;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Authorize]
[ApiController, Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IFamilyService _familyService;
    private const string ErrorMessage = "Not found or bad request.";

    public UserController(IUserService userService, IFamilyService familyService)
    {
        _userService = userService;
        _familyService = familyService;
    }

    [HttpPost]
    public async Task<IActionResult> AddUser([FromBody] UserDTO user)
    {
        try
        {
            var success = await _userService.AddUserToFamily(user);
            Console.WriteLine(user.Name);
            return success ? Ok("User saved") : StatusCode(400, ErrorMessage);
            ;
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetUsersOfFamily()
    {
        if (User.Identity.IsAuthenticated)
        {
            var family = await _familyService.GetFamilyByName(User.Identity.Name);
            var users = await _userService.GetAllUsers();
            return Ok(users.Where(u=>u.FamilyId==family.Id).ToList());
        }
        return BadRequest();
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(long id)
    {
        if (User.Identity.IsAuthenticated)
        {
            var family = await _familyService.GetFamilyByName(User.Identity.Name);
            var user = await _userService.GetUser(id);
            return user.Id == 0 && user.family==family ? NotFound() : Ok(user);
        }
        return BadRequest();
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteUser(int id)
    {
        try
        {
            await _userService.DeleteUser(id);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut]
    public async Task<IActionResult> UpdateUser([FromBody] UserDTO user)
    {
        bool success = await _userService.UpdateUser(user);
        return success ? Ok("User updated") : StatusCode(400, ErrorMessage);
    }

    [HttpPut("RewardPoint")]
    public async Task<IActionResult> AddRewardPointToUser(TaskType task, long id, int point)
    {
        bool success = await _userService.AddRewardPointToUser(task, id, point);
        return success ? Ok("User updated") : StatusCode(400, ErrorMessage);
    }

    [HttpPut("reset")]
    public async Task<IActionResult> ResetPoints()
    {
        bool success = await _userService.ResetRewardPointsOfUsers();
        return success ? Ok("Users updated") : StatusCode(400, ErrorMessage);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(string name, string password)
    {
        bool isPasswordValid = await CheckPassword(name, password);
        if (!isPasswordValid)
        {
            return BadRequest("Wrong name or password");
        }

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, name)
        };

        var claimsIdentity = new ClaimsIdentity(claims, "FamilyMemberAuthenticationScheme");
        var authProperties = new AuthenticationProperties
        {
        };

        await HttpContext.SignInAsync(
            "FamilyMemberAuthenticationScheme",
            new ClaimsPrincipal(claimsIdentity),
            authProperties);

        return Ok();
    }

    private async Task<bool> CheckPassword(string name, string password)
    {
        if (User.Identity.IsAuthenticated)
        {
            var family = await _familyService.GetFamilyByName(User.Identity.Name);
            var users = await _userService.GetAllUsers();
            var user = users.Where(u => u.FamilyId == family.Id).FirstOrDefault(u => u.Name == name);
            return user.FamilyId==family.Id && user.Password == password;
        }

        return false;
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync("FamilyMemberAuthenticationScheme");

        return Ok();
    }
}