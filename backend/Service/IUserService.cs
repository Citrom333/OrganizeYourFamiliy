using backend.Model;
using backend.Model.DTOs;
using backend.Model.Entities;

namespace backend.Service;
public interface IUserService
{
    Task<bool> AddUserToFamily(UserDTO user);
    Task<List<UserDTO>> GetAllUsers();
    Task<User> GetUser(long id);
    Task<bool> UpdateUser(UserDTO user);
    Task<bool> DeleteUser(long id);
    Task<bool> AddRewardPointToUser(ToDoType task, long id, int point);
    Task<bool> ResetRewardPointsOfUsers();
}
