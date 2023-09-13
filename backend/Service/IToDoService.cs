using backend.Model;
using backend.Model.DTOs;
using backend.Model.Entities;

namespace backend.Service;

public interface IToDoService
{
    Task<bool> AddToDoToUser(ToDoDTO task);
    Task<List<ToDo>> GetAllToDosOfFamily(long familyId);
    Task<List<ToDo>> GetAllToDosOfUser(long userId);
    Task<ToDo> GetToDo(long id);
    Task<bool> UpdateToDo(ToDoDTO task);
    Task<bool> DeleteToDo(long id);
    Task<bool> SetToDoReady(long id);
}