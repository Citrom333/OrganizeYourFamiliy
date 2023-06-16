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
                AvatarPic = "./images/avatar01.png",
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

    public async Task<List<UserDTO>> GetAllUsers()
    {
        List<UserDTO> users = await _context.Users.Include(user=>user.family)
            .Select(u => ConvertUserToUserDTO(u)).ToListAsync();
        return users;
    }

    public async Task<User> GetUser(long id)
    {
        User user = await _context.Users.Include(user=>user.family).FirstAsync(u => u.Id == id);
        return user;
    }

    public async Task<bool> UpdateUser(UserDTO user)
    {
        try
        {
            var userToUpdate = await _context.Users.FirstOrDefaultAsync(u => u.Id == user.Id);
            if (userToUpdate != null)
            {
                if (!string.IsNullOrEmpty(user.Name))
                    userToUpdate.Name = user.Name;
            
                if (user.FamilyId != null)
                    userToUpdate.family = await _context.Families.FirstAsync(f => f.Id == user.FamilyId);
            
                if (!string.IsNullOrEmpty(user.FamilyRole))
                    userToUpdate.FamilyRole = user.FamilyRole;
                if (!string.IsNullOrEmpty(user.AvatarPic))
                    userToUpdate.AvatarPic = user.AvatarPic;
            
                if (user.Birthday != null)
                    userToUpdate.Birthday = user.Birthday;
            
                if (!string.IsNullOrEmpty(user.Password))
                    userToUpdate.Password = user.Password;
                
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

    public async Task<bool> AddRewardPointToUser(TaskType task, long id, int point)
    {
        try
        {
            User user =await _context.Users.FirstAsync(u => u.Id == id);
            Console.WriteLine(user.Name);
            if (task == TaskType.Housework)
                user.RewardPointHousework += point;
            if (task == TaskType.School)
                user.RewardPointSchool += point;
            if (task == TaskType.Job)
                user.RewardPointJob += point;
            if (task == TaskType.Other)
                user.RewardPointOther += point;
            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }
    public async Task<bool> ResetRewardPointsOfUsers()
    {
        try
        {
            foreach (var user in _context.Users)
            {
                user.RewardPointHousework = 0;
                user.RewardPointSchool = 0;
                user.RewardPointJob = 0;
                user.RewardPointOther = 0;
            }
            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }
    private static UserDTO ConvertUserToUserDTO(User user)
    {
        return new UserDTO()
        {
            Id = user.Id,
            Name = user.Name,
            Password = user.Password, 
            FamilyRole = user.FamilyRole,
            Birthday = user.Birthday,
            FamilyId = user.family.Id
        };
    }
}