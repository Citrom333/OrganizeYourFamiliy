using backend.Model;
using backend.Model.DTOs;
using backend.Model.Entities;
using backend.Service;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;
[ApiController, Route("[controller]")]
public class UserController: ControllerBase
{
    private readonly IUserService _userService;
    private const string ErrorMessage = "Not found or bad request.";
    public UserController(IUserService userService)
    {
        _userService = userService;
    }
    [HttpPost]
    public async Task<IActionResult> AddUser([FromBody] UserDTO user)
    {
        try
        {
           var success= await _userService.AddUserToFamily(user);
           Console.WriteLine(user.Name);
            return success ? Ok("User saved") : StatusCode(400, ErrorMessage);;
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    [HttpGet]
    public async Task<IActionResult> GetUsers(int familyId)
    {
        var users = await _userService.GetAllUsers();
        return Ok(users);
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(long id)
    {
        var user = await _userService.GetUser(id);
        return user.Id == 0 ? NotFound() : Ok(user);
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
    public async Task<IActionResult> AddRewardPointToUser(TaskType task, long id, int point )
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