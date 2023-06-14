using backend.Model.Entities;

namespace backend.Service;

public interface IFamilyService
{
    Task<bool> AddFamily(Family family);
    Task<List<Family>> GetAllFamilies();
    
    Task<bool> DeleteFamily(int id);

}