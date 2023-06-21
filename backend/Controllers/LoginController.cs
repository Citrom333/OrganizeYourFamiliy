using System.Security.Claims;
using backend.Model;
using backend.Model.Entities;
using backend.Service;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
public class LoginController : ControllerBase
{
    private readonly IFamilyService _familyService;
    private readonly IUserService _userService;

    public LoginController(IFamilyService familyService, IUserService userService)
    {
        _familyService = familyService;
        _userService = userService;
    }

    [HttpPost("{FamilyOrUser}/login")]
    public async Task<IActionResult> Login([FromBody] LoginModel nameAndPassword, string FamilyOrUser)
    {
        var _authenticationScheme = FamilyOrUser == "Family" ? "FamilyAuthenticationScheme" :
            FamilyOrUser == "User" ? "FamilyMemberAuthenticationScheme" : "";
        bool isPasswordValid = await CheckPassword(nameAndPassword.Name, nameAndPassword.Password, FamilyOrUser);
        if (!isPasswordValid)
        {
            return BadRequest("Wrong name or password");
        }

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, nameAndPassword.Name)
        };

        var claimsIdentity = new ClaimsIdentity(claims, _authenticationScheme);
        var authProperties = new AuthenticationProperties
        {
        };

        await HttpContext.SignInAsync(
            _authenticationScheme,
            new ClaimsPrincipal(claimsIdentity),
            authProperties);
        var response = new LoginModel()
        {
            Name = nameAndPassword.Name,
            Password = nameAndPassword.Password
        };
        return Ok(response);
    }

    protected async Task<bool> CheckPassword(string name, string password, string FamilyOrUser)
    {
        if (FamilyOrUser == "Family")
        {
            var family = await _familyService.GetFamilyByName(name);
            return family.Password == password;
        }
        else
        {
            if (User.Identity.IsAuthenticated)
            {
                var family = await _familyService.GetFamilyByName(User.Identity.Name);
                var users = await _userService.GetAllUsers();
                var user = users.Where(u => u.FamilyId == family.Id).FirstOrDefault(u => u.Name == name);
                return user.FamilyId == family.Id && user.Password == password;
            }

            return false;
        }
    }

    [HttpPost("{FamilyOrUser}/logout")]
    public async Task<IActionResult> Logout(string FamilyOrUser)
    {
        if (FamilyOrUser == "Family")
            await HttpContext.SignOutAsync("FamilyAuthenticationScheme");
        else
        {
            await HttpContext.SignOutAsync("FamilyMemberAuthenticationScheme");
        }

        return Ok();
    }
}