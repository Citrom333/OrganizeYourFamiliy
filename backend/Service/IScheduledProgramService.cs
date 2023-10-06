using backend.Model.DTOs;
using backend.Model.Entities;

namespace backend.Service;

public interface IScheduledProgramService
{
    Task<bool> AddProgramToUser(ScheduledProgramDTO program);
    Task<List<ScheduledProgram>> GetAllProgramsOfFamily(long familyId);
    Task<List<ScheduledProgram>> GetAllProgramsOfUser(long userId);
    Task<ScheduledProgram> GetProgram(long id);
    Task<bool> UpdateProgram(ScheduledProgramDTO task);
    Task<bool> DeleteProgram(long id);
   
}