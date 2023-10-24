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
            return user.Family == family ? Ok(user) : NotFound();
            // return user.Id == 0 && user.Family==family ? NotFound() : Ok(user);
        }
        return BadRequest();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUserAndAllToDosAndPrograms(long id)
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

    [HttpPut("RewardPoint/{id}/{point}")]
    public async Task<IActionResult> AddRewardPointToUser([FromBody] ToDoType task, long id, int point)
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
  
}