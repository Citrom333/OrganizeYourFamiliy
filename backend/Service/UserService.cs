using backend.Model;
using backend.Model.DTOs;
using backend.Model.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Service;

public class UserService : IUserService
{
    private readonly OrganizerContext _context;

    public UserService(OrganizerContext context)
    {
        _context = context;
    }

    public async Task<bool> AddUserToFamily(UserDTO user)
    {
        try
        {
            User newUser = new User()
            {
                Id = user.Id,
                Name = user.Name,
                Password = user.Password,
                FamilyRole = user.FamilyRole,
                Birthday = user.Birthday,
                family = await _context.Families.FirstAsync(f => f.Id == user.FamilyId),
            };
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }

    public async Task<List<UserDTO>> GetAllUsersOfFamily(int familyId)
    {
        List<UserDTO> users = await _context.Users.Where(u => u.family.Id == familyId)
            .Select(u => ConvertUserToUserDTO(u)).ToListAsync();
        return users;
    }

    public async Task<UserDTO> GetUser(long id)
    {
        User user = await _context.Users.FirstAsync(u => u.Id == id);
        return ConvertUserToUserDTO(user);
    }

    public async Task<bool> UpdateUser(User user)
    {
        try
            {
                var userToUpdate = await _context.Users.FirstOrDefaultAsync(u => u.Id == user.Id);
                if (userToUpdate != null)
                {
                    userToUpdate.Name = (user.Name != null) ? user.Name : userToUpdate.Name;
                    userToUpdate.family = (user.family != null) ? user.family : userToUpdate.family;
                    userToUpdate.FamilyRole = (user.FamilyRole != null) ? user.FamilyRole : userToUpdate.FamilyRole;
                    userToUpdate.Birthday = (user.Birthday != null) ? user.Birthday : userToUpdate.Birthday;
                    userToUpdate.Password = (user.Password != null) ? user.Password : userToUpdate.Password;
                    userToUpdate.AvatarPic = (user.AvatarPic != null) ? user.AvatarPic : userToUpdate.AvatarPic;
                    if (user.Programs.Count != 0) 
                        userToUpdate.Programs.AddRange(user.Programs);
                    if (user.Tasks.Count != 0) 
                        userToUpdate.Tasks.AddRange(user.Tasks);
                    if (user.Rewards.Count != 0) 
                        userToUpdate.Rewards.AddRange(user.Rewards);
                    userToUpdate.RewardPointHousework += user.RewardPointHousework;
                    userToUpdate.RewardPointSchool += user.RewardPointSchool;
                    userToUpdate.RewardPointJob += user.RewardPointJob;
                    userToUpdate.RewardPointOther += user.RewardPointOther;
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

    public async Task<bool> DeleteUser(long id)
    {
        try
        {
            User user =await _context.Users.FirstAsync(u => u.Id == id);
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }

    private UserDTO ConvertUserToUserDTO(User user)
    {
        return new UserDTO()
        {
            Id = user.Id,
            Name = user.Name,
            FamilyRole = user.FamilyRole,
            Birthday = user.Birthday,
            FamilyId = user.family.Id
        };
    }
}