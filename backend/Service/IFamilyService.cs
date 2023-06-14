using backend.Model.Entities;

namespace backend.Service;

public interface IFamilyService
{
    Task<bool> AddFamily(Family family);
}