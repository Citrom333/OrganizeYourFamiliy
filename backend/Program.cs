using System.Text.Json.Serialization;
using backend.Model;
using backend.Service;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddControllers().AddJsonOptions(options =>
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
builder.Services.AddDbContext<OrganizerContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConfiguration"));
});
builder.Services.AddTransient<IFamilyService, FamilyService>();
builder.Services.AddTransient<IUserService, UserService>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
DatabaseManagementService.MigrationInitialisation(app);
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();