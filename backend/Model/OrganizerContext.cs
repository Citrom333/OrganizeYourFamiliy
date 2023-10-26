using backend.Model.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Model
{
    public class OrganizerContext : DbContext
    {
        public OrganizerContext(DbContextOptions<OrganizerContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Family>()
                .HasMany(family => family.FamilyMembers)
                .WithOne(user => user.Family)
                .HasForeignKey(user => user.FamilyId);
            modelBuilder.Entity<Family>()
                .HasMany(family => family.Rewards)
                .WithOne(reward=>reward.Family)
                .HasForeignKey(reward => reward.FamilyId);
            modelBuilder.Entity<Family>()
                .HasOne(family => family.LeaderOfFamily)
                .WithOne()
                .HasForeignKey<Family>(family => family.LeaderOfFamilyId)
                .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<Family>()
                .HasIndex(f => f.Name) 
                .IsUnique(); 

        }
        public DbSet<Family> Families { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<ScheduledProgram> ScheduledPrograms { get; set; }
        public DbSet<ToDo> ToDos { get; set; }
        public DbSet<Reward> Rewards { get; set; }
        
    }
}