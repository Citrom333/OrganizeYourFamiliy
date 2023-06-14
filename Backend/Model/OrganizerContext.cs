using Microsoft.EntityFrameworkCore;
using WebApplication1.Model.Entities;

namespace WebApplication1.Model;

public class OrganizerContext: DbContext
{
    public OrganizerContext(DbContextOptions<OrganizerContext> options) : base(options)
        {
        }
    
        public DbSet<User> Users { get; set; }
        public DbSet<ScheduledProgram> ScheduledPrograms { get; set; }
        public DbSet<ToDo> Tasks { get; set; }
        public DbSet<Reward> Rewards { get; set; }

}