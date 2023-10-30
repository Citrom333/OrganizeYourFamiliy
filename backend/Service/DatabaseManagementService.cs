using backend.Model;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;

namespace backend.Service
{
    public class DatabaseManagementService
    {
        public static void MigrationInitialisation(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<OrganizerContext>();
                // context.Database.EnsureDeleted();
                // context.Database.Migrate();
                if (context != null)
                {
                    // Ellenőrizd, hogy az adatbázis már létezik-e, mielőtt a migrációkat elvégeznéd.
                    if (!context.Database.CanConnect())
                    {
                        context.Database.Migrate();
                    }
                }
            }
        }
    }
}