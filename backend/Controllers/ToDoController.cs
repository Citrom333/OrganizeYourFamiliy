using backend.Model.DTOs;
using backend.Model.Entities;
using backend.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Authorize]
[ApiController, Route("[controller]")]
public class ToDoController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IFamilyService _familyService;
    private readonly IToDoService _toDoService;
    private const string ErrorMessage = "Not found or bad request.";

    public ToDoController(IUserService userService, IFamilyService familyService, IToDoService toDoService)
    {
        _userService = userService;
        _familyService = familyService;
        _toDoService = toDoService;
    }

    // Task<bool> AddToDoToUser(long UserId, ToDo task);
    // Task<List<ToDo>> GetAllToDosOfFamily(long familyId);
    // Task<List<ToDo>> GetAllToDosOfUser(long userId);
    // Task<ToDo> GetToDo(long id);
    // Task<bool> UpdateToDo(ToDoDTO task);
    // Task<bool> DeleteToDo(long id);
    // Task<bool> SetToDoReady(long id);

    [HttpPost]
    public async Task<IActionResult> AddToDoToUser([FromBody] ToDoDTO task)
    {
        try
        {
            var success = await _toDoService.AddToDoToUser(task);
            Console.WriteLine(task.OwnerID);
            return success ? Ok("ToDo saved") : StatusCode(400, ErrorMessage);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetToDosOfFamily()
    {
        if (User.Identity.IsAuthenticated)
        {
            var family = await _familyService.GetFamilyByName(User.Identity.Name);
            var toDos = await _toDoService.GetAllToDosOfFamily(family.Id);
            var users = await _userService.GetAllUsers();
            return Ok(toDos);
        }

        return BadRequest();
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetToDosOfUser(long id)
    {
        if (User.Identity.IsAuthenticated)
        {
            var family = await _familyService.GetFamilyByName(User.Identity.Name);
            if (family.FamilyMembers.Count(u => u.Id == id) != 0)
            {
                var toDos = await _toDoService.GetAllToDosOfUser(id);
                return Ok(toDos);
            }
            return BadRequest();
        }
        return BadRequest();
    }
    
    [HttpGet("task/{id}")]
    public async Task<IActionResult> GetToDo(long id)
    {
        if (User.Identity.IsAuthenticated)
        {
            var family = await _familyService.GetFamilyByName(User.Identity.Name);
         
                var toDo = await _toDoService.GetToDo(id);
                return toDo.Owner.Family==family ? Ok(toDo) :NotFound() ;
        }
        return BadRequest();
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteToDo(long id)
    {
        var success = await _toDoService.DeleteToDo(id);
        return success ? Ok("ToDo deleted") : StatusCode(400, ErrorMessage);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateToDo([FromBody] ToDoDTO toDo)
    {
        bool success = await _toDoService.UpdateToDo(toDo);
        return success ? Ok("ToDo updated") : StatusCode(400, ErrorMessage);
    }

}