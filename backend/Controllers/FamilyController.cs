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
    public FamilyController(IFamilyService familyService)
    {
        _familyService = familyService;
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
    public async Task<IActionResult> DeleteFamily(long id)
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

    [HttpPut("/Leader/{familyId}/{userId}")]
    public async Task<IActionResult> SetLeader(int familyId, int userId)
    {
        try
        {
            bool success = await _familyService.SetLeader(familyId, userId);
            return success ? Ok() : StatusCode(404,"Error, wrong details");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
        
       
    }
   
}