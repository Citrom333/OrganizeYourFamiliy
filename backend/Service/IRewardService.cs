using backend.Model.DTOs;
using backend.Model.Entities;

namespace backend.Service;

public interface IRewardService
{
    Task<bool> AddReward(RewardDTO reward);
    Task<List<Reward>> GetAllRewards();
    Task<List<Reward>> GetRewardsOfFamily(long familyId);
    Task<bool> UpdateReward(RewardDTO reward);
    Task<bool> DeleteReward(long id);
    
}