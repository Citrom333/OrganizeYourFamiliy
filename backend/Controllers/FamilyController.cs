using backend.Model.Entities;
using backend.Service;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController, Route("[controller]")]
public class FamilyController: ControllerBase
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

}