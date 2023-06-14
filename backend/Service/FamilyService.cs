using backend.Model;
using backend.Model.Entities;

namespace backend.Service;

public class FamilyService : IFamilyService
{
    private readonly OrganizerContext _context;

    public FamilyService(OrganizerContext context)
    {
        _context = context;
    }

    public async Task<bool> AddFamily(Family family)
    {
        try
        {
            Family fam = new Family()
            {
                Id = family.Id,
                Name = family.Name,
                Password = family.Password
            };
            _context.Families.Add(fam);
            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }
}