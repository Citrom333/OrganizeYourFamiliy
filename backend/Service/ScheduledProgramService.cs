using System.Collections.Concurrent;
using backend.Model;
using backend.Model.DTOs;
using backend.Model.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Service;

public class ScheduledProgramService : IScheduledProgramService
{
    private readonly OrganizerContext _context;

    public ScheduledProgramService(OrganizerContext context)
    {
        _context = context;
    }

    private async Task<List<User>> GetAllUsers()
    {
        var users = await _context.Users.ToListAsync();
        return users;
    }
    public async Task<bool> AddProgramToUser(ScheduledProgramDTO program)
    {
        var users = await GetAllUsers();
        var participants = users.Where(u => program.ParticipantIds.Contains(u.Id)).ToList();

        try
        {
            ScheduledProgram newProgram = new ScheduledProgram()
            {
                Name = program.Name,
                Start = program.Start,
                End = program.End,
                Cost = program.Cost,
                Participants = participants,
            };

            _context.Add(newProgram);
            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
         return false;
        }
    }

 public async Task<List<ScheduledProgram>> GetAllProgramsOfFamily(long familyId)
{
    List<ScheduledProgram> programs = await _context.ScheduledPrograms
        .Include(p => p.Participants)
        .Where(p => p.Participants.All(u => u.Family.Id == familyId))
        .ToListAsync();

    return programs;
}

    public async Task<List<ScheduledProgram>> GetAllProgramsOfUser(long userId)
    {
        var allPrograms = await _context.ScheduledPrograms.Include(p => p.Participants).ToListAsync();
        var programs = allPrograms.Where(prog => prog.Participants.Any(u => u.Id == userId)).ToList();
        return programs;
    }

    public async Task<ScheduledProgram> GetProgram(long id)
    {
        var program = await _context.ScheduledPrograms.Include(p => p.Participants).FirstAsync(p => p.Id == id);
        return program;
    }

    public async Task<bool> UpdateProgram(ScheduledProgramDTO prog)
    {
        var users = await _context.Users.ToListAsync();
        try
        {
            var programToUpdate = await _context.ScheduledPrograms.FirstOrDefaultAsync(p => p.Id == prog.Id);
            if (programToUpdate != null)
            {
                if (!string.IsNullOrEmpty(prog.Name))
                    programToUpdate.Name = prog.Name;
                if (prog.Start != null)
                    programToUpdate.Start = prog.Start;
                if (prog.End != null)
                    programToUpdate.End = prog.End;
                if (!string.IsNullOrEmpty(prog.Place))
                    programToUpdate.Place = prog.Place;
                if (prog.Cost != null)
                    programToUpdate.Cost = prog.Cost;
                if (prog.ParticipantIds != null)
                {
                    programToUpdate.Participants = prog.ParticipantIds
                        .Select(partId => users.FirstOrDefault(u => u?.Id == partId))
                        .Where(user => user != null)
                        .ToList();
                }

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

    public async Task<bool> DeleteProgram(long id)
    {
        try
        {
            ScheduledProgram program = await _context.ScheduledPrograms.FirstAsync(p => p.Id == id);
            _context.ScheduledPrograms.Remove(program);
            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }
}