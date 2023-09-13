using backend.Model;
using backend.Model.DTOs;
using backend.Model.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Service;

public class ToDoService : IToDoService
{
    private readonly OrganizerContext _context;

    public ToDoService(OrganizerContext context)
    {
        _context = context;
    }

    public async Task<bool> AddToDoToUser(ToDoDTO task)
    {
        try
        {
            ToDo newToDo = new ToDo()
            {
                TaskName = task.TaskName,
                Description = task.Description != null ? task.Description : null,
                Deadline = task.Deadline,
                Type = task.Type,
                RewardPoint = task.RewardPoint,
                Ready = task.Ready,
                Owner = await _context.Users.FirstAsync(u => u.Id == task.OwnerID)

            };
            _context.Add(newToDo);
            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }

    public async Task<List<ToDo>> GetAllToDosOfFamily(long familyId)
    {
        List<ToDo> ToDos = await _context.ToDos.Include(t => t.Owner).Where(t => t.Owner.Family.Id == familyId)
            .ToListAsync();
        return ToDos;
    }
    public async Task<List<ToDo>> GetAllToDosOfUser(long userId)
    {
        List<ToDo> ToDos = await _context.ToDos.Include(t => t.Owner).Where(t => t.Owner.Id == userId)
            .ToListAsync();
        return ToDos;
    }

    public async Task<ToDo> GetToDo(long id)
    {
        ToDo toDo = await _context.ToDos.Include(t => t.Owner).FirstAsync(t => t.Id == id);
        return toDo;
    }

    public async Task<bool> UpdateToDo(ToDoDTO task)
    {
        try
        {
            var toDoToUpdate = await _context.ToDos.FirstOrDefaultAsync(t => t.Id == task.Id);
            if (toDoToUpdate != null)
            {
                if (!string.IsNullOrEmpty(task.TaskName))
                    toDoToUpdate.TaskName = task.TaskName;
                if (!string.IsNullOrEmpty(task.Description))
                    toDoToUpdate.Description = task.Description;
                if (task.Deadline != null)
                    toDoToUpdate.Deadline = task.Deadline;
                if (task.Type != null)
                    toDoToUpdate.Type = task.Type;
                if (task.RewardPoint != null)
                    toDoToUpdate.RewardPoint = task.RewardPoint;
                if (task.Ready != null)
                    toDoToUpdate.Ready = task.Ready;
                if (task.OwnerID != null)
                    toDoToUpdate.Owner = await _context.Users.FirstAsync(u => u.Id == task.OwnerID);
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

    public async Task<bool> DeleteToDo(long id)
    {
        try
        {
            ToDo toDo = await _context.ToDos.FirstAsync(t => t.Id == id);
            _context.ToDos.Remove(toDo);
            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }

    public async Task<bool> SetToDoReady(long id)
    {
        try
        {
            ToDo toDo = await _context.ToDos.FirstAsync(t => t.Id == id);
            toDo.Ready = true;
            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }
}