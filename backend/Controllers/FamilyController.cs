using System.Security.Claims;
using backend.Model;
using backend.Model.Entities;
using backend.Service;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController, Route("[controller]")]
public class FamilyController : ControllerBase
{
    private readonly IFamilyService _familyService;
    private readonly string _authenticationScheme;
    public FamilyController(IFamilyService familyService)
    {
        _familyService = familyService;
        _authenticationScheme = "FamilyAuthenticationScheme";
    }

    [HttpPost]
    public async Task<IActionResult> AddFamily([FromBody] Family family)
    {
        try
        {
            await _familyService.AddFamily(family);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetFamilies()
    {
        var families = await _familyService.GetAllFamilies();
        return Ok(families);
    }
    [HttpGet("{name}")]
    public async Task<IActionResult> GetFamilyByName(string name)
    {
        var family = await _familyService.GetFamilyByName(name);
        return Ok(family);
    }


    [HttpDelete]
    public async Task<IActionResult> DeleteFamily(int id)
    {
        try
        {
            await _familyService.DeleteFamily(id);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel nameAndPassword)
    {
        bool isPasswordValid = await CheckPassword(nameAndPassword.Name, nameAndPassword.Password);
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
            Name = HttpContext.User.Identity.Name,
            Password = nameAndPassword.Password
        };
        return Ok(response);
    }

    protected async Task<bool> CheckPassword(string name, string password)
    {
        var family = await _familyService.GetFamilyByName(name);
        return family.Password == password;
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync("FamilyAuthenticationScheme");
        
        return Ok();
    }
}