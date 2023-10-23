using backend.Model.DTOs;
using backend.Model.Entities;
using backend.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;
// [Authorize]
[ApiController, Route("[controller]")]
public class RewardController:ControllerBase
{
    private readonly IRewardService _rewardService;
    private const string ErrorMessage = "Not found or bad request.";

    public RewardController(IRewardService rewardService)
    {
        _rewardService = rewardService;
    }
    [HttpPost]
    public async Task<IActionResult> AddReward([FromBody] RewardDTO reward)
    {
        try
        {
            var success = await _rewardService.AddReward(reward);
            return success ? Ok("Reward saved") : StatusCode(400, ErrorMessage);
            ;
        }
        catch (Exception ex)
        {
            return StatusCode(1, "HIBA");
            // BadRequest(ex.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetRewardsOfFamily(long familyId)
    {
        if (User.Identity.IsAuthenticated)
        {
            var rewards = await _rewardService.GetRewardsOfFamily(familyId);
            return Ok(rewards);
        }
        return BadRequest();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteReward(long id)
    {
        try
        {
            await _rewardService.DeleteReward(id);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut]
    public async Task<IActionResult> UpdateReward([FromBody] RewardDTO reward)
    {
        bool success = await _rewardService.UpdateReward(reward);
        return success ? Ok("Reward updated") : StatusCode(400, ErrorMessage);
    }
    [HttpGet]
    public async Task<IActionResult> GetAllRewards()
    {
        try
        {
            var rewards = await _rewardService.GetAllRewards();
            return Ok(rewards);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

}