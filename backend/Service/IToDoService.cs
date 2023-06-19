using backend.Model;
using backend.Model.DTOs;
using backend.Model.Entities;

namespace backend.Service;

public interface IToDoService
{
    Task<bool> AddToDoToUser(long UserId, ToDo task);
    Task<List<ToDo>> GetAllToDosOfFamily(long familyId);
    Task<ToDo> GetToDo(long id);
    Task<bool> UpdateToDo(ToDo task);
    Task<bool> DeleteToDo(long id);
    Task<bool> SetToDoReady(long id);
}