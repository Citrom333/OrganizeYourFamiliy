using backend.Model.DTOs;
using backend.Model.Entities;

namespace backend.Service;
public interface IUserService
{
    Task<bool> AddUserToFamily(UserDTO user);
    Task<List<UserDTO>> GetAllUsersOfFamily(int familyId);
    Task<UserDTO> GetUser(long id);
    Task<bool> UpdateUser(User user);
    Task<bool> DeleteUser(long id);
}
