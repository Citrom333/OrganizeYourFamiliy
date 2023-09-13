using backend.Model.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Model
{
    public class OrganizerContext : DbContext
    {
        public OrganizerContext(DbContextOptions<OrganizerContext> options) : base(options)
        {
        }
        public DbSet<Family> Families { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<ScheduledProgram> ScheduledPrograms { get; set; }
        public DbSet<ToDo> ToDos { get; set; }
        public DbSet<Reward> Rewards { get; set; }
    }
}