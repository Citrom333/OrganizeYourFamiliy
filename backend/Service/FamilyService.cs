using backend.Model;
using backend.Model.Entities;
using Microsoft.EntityFrameworkCore;

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
    public async Task<List<Family>> GetAllFamilies()
    {
        
        List<Family> families =
            await _context.Families.Include(family=>family.FamilyMembers).ToListAsync();
        return families;
    }

    public async Task<Family?> GetFamilyByName(string name)
    {
        try
        {
            Family fam = await _context.Families.Include(family => family.FamilyMembers).FirstAsync(f => f.Name == name);
            return fam;
        }
        catch (Exception e)
        {
            return null;
        }
    }

    public async Task<bool> DeleteFamily(int id)
    {
        try
        {
            Family family = await _context.Families.FirstAsync(fam => fam.Id == id);
            _context.Families.Remove(family);
            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }
}