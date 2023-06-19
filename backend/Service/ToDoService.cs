using backend.Model;
using backend.Model.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Service;

public class ToDoService: IToDoService
{
    private readonly OrganizerContext _context;

    public ToDoService(OrganizerContext context)
    {
        _context = context;
    }
    public async Task<bool> AddToDoToUser(long UserId, ToDo task)
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
                Ready = task.Ready
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
        List<ToDo> ToDos = await _context.Tasks.Include(t => t.Owner).Where(t => t.Owner.family.Id == familyId)
            .ToListAsync();
        return ToDos;
    }

    public async Task<ToDo> GetToDo(long id)
    {
        ToDo toDo= await _context.Tasks.Include(t=>t.Owner).FirstAsync(t => t.Id == id);
        return toDo;
    }
//NOT READY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    public async Task<bool> UpdateToDo(ToDo task)
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
                Ready = task.Ready
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

    public async Task<bool> DeleteToDo(long id)
    {
        try
        {
            ToDo toDo= await _context.Tasks.FirstAsync(t => t.Id == id);
            _context.Tasks.Remove(toDo);
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
        ToDo toDo= await _context.Tasks.FirstAsync(t => t.Id == id);
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