using backend.Model;
using backend.Model.DTOs;
using backend.Model.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Service;

public class RewardService:IRewardService
{
    private readonly OrganizerContext _context;

    public RewardService(OrganizerContext context)
    {
        _context = context;
    }
    public async Task<bool> AddReward(RewardDTO reward)
    {
        try
        {
            var family = await _context.Families.Include(family => family.Rewards).FirstOrDefaultAsync(f => f.Id == reward.FamilyId);
            if (family == null)
            {
                Console.WriteLine("HIBA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                return false;
            }
            var newReward = new Reward()
            {
                Id = 0,
                Name = reward.Name,
                Cost = reward.Cost,
                FamilyId = reward.FamilyId,
                Family = family,
            };
            _context.Rewards.Add(newReward);
            family.Rewards.Add(newReward);
            Console.WriteLine("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXx");
            Console.WriteLine(family.Rewards.Count());
            Console.WriteLine(family.Rewards[0].Name);
         
            Console.WriteLine(family.Id);
            Console.WriteLine(family.Name);


            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }

    public async Task<List<Reward>> GetAllRewards()
    {
        List<Reward> rewards = await _context.Rewards.Include(fam=>fam.Family).ToListAsync();
        return rewards;
    }

    public async Task<List<Reward>> GetRewardsOfFamily(long familyId)
    {
        var rewards = await GetAllRewards();
        return rewards.Where(rew => rew.FamilyId == familyId).ToList();
    }

    public async Task<bool> UpdateReward(RewardDTO reward)
    {
        try
        {
            var rewardToUpdate = await _context.Rewards.FirstOrDefaultAsync(r => r.Id == reward.Id);
            if (rewardToUpdate != null)
            {
                if (!string.IsNullOrEmpty(reward.Name))
                    rewardToUpdate.Name = reward.Name;
                if (reward.Cost != null)
                    rewardToUpdate.Cost = reward.Cost;
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }
        catch (Exception e)
        {
            return false;
        }
    }

    public async Task<bool> DeleteReward(long id)
    {
        try
        {
            Reward reward =await _context.Rewards.FirstAsync(r => r.Id == id);
            _context.Rewards.Remove(reward);
            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }
}