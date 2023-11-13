using System.Text.Json.Serialization;
using backend.Model;
using backend.Service;
using Microsoft.AspNetCore.Authentication.Cookies;
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

builder.Services.AddAuthentication(options =>
    {
        options.DefaultScheme = "FamilyAuthenticationScheme";
        options.DefaultChallengeScheme = "FamilyMemberAuthenticationScheme";
    })
    .AddCookie("FamilyAuthenticationScheme", options =>
    {
        options.Cookie.Name = "FamilyLogin";
        options.LoginPath = "/family/login";
    })
    .AddCookie("FamilyMemberAuthenticationScheme", options =>
    {
        options.Cookie.Name = "FamilyMemberLogin";
        options.LoginPath = "/user/login";
    });
builder.Services.AddAuthorization();
builder.Services.AddTransient<IFamilyService, FamilyService>();
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<IToDoService, ToDoService>();
builder.Services.AddTransient<IScheduledProgramService, ScheduledProgramService>();
builder.Services.AddTransient<IRewardService, RewardService>();
builder.Services.AddCors(options =>
{  
    options.AddPolicy("AllowAnyOrigin",
        builder =>
        {
            builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});

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
app.UseCors("AllowAnyOrigin");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();