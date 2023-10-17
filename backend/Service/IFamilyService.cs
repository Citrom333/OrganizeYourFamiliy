using backend.Model.Entities;

namespace backend.Service;

public interface IFamilyService
{
    Task<bool> AddFamily(Family family);
    Task<List<Family>> GetAllFamilies();
    Task<Family?> GetFamilyByName(string name);
    Task<bool> DeleteFamily(long id);
    Task<bool> SetLeader(long familyId, long userId);
}