namespace backend.Controllers;

using backend.Model.DTOs;

using backend.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
[ApiController, Route("[controller]")]
public class ScheduledProgramController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IFamilyService _familyService;
    private readonly IScheduledProgramService _scheduledProgramService;
    private const string ErrorMessage = "Not found or bad request.";

    public ScheduledProgramController(IUserService userService, IFamilyService familyService, IScheduledProgramService scheduledProgramService)
    {
        _userService = userService;
        _familyService = familyService;
        _scheduledProgramService = scheduledProgramService;
    }

    [HttpPost]
    public async Task<IActionResult> AddProgramToUser([FromBody] ScheduledProgramDTO program)
    {
        try
        {
            var success = await _scheduledProgramService.AddProgramToUser(program);
            return success ? Ok("Program saved") : StatusCode(400, ErrorMessage);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetProgramsOfFamily()
    {
        if (User.Identity.IsAuthenticated)
        {
            var family = await _familyService.GetFamilyByName(User.Identity.Name);
            var programs = await _scheduledProgramService.GetAllProgramsOfFamily(family.Id);
            var users = await _userService.GetAllUsers();
            return Ok(programs);
        }

        return BadRequest();
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProgramsOfUser(long id)
    {
        if (User.Identity.IsAuthenticated)
        {
            var family = await _familyService.GetFamilyByName(User.Identity.Name);
            if (family.FamilyMembers.Count(u => u.Id == id) != 0)
            {
                var programs = await _scheduledProgramService.GetAllProgramsOfUser(id);
                return Ok(programs);
            }
            return BadRequest();
        }
        return BadRequest();
    }

    [HttpGet("/program/{id}")]
    public async Task<IActionResult> GetProgram(long id)
    {
        if (User.Identity.IsAuthenticated)
        {
            var family = await _familyService.GetFamilyByName(User.Identity.Name);

            var program = await _scheduledProgramService.GetProgram(id);
            return program.Participants[0].Family == family ? Ok(program) : NotFound();
        }
        return BadRequest();
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProgram(long id)
    {
        var success = await _scheduledProgramService.DeleteProgram(id);
        return success ? Ok("Program deleted") : StatusCode(400, ErrorMessage);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateProgram([FromBody] ScheduledProgramDTO program)
    {
        bool success = await _scheduledProgramService.UpdateProgram(program);
        return success ? Ok("Program updated") : StatusCode(400, ErrorMessage);
    }
}