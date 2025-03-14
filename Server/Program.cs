using Microsoft.EntityFrameworkCore;
using Server.Config;
using Server.Data;
using Server.Repositories;
using Server.Repositories.Mock;
using Server.Repositories.RDS;
using Server.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var repositoryType = builder.Configuration["RepositoryType"];
var connectionString = Environment.GetEnvironmentVariable("RDSConnection") 
    ?? builder.Configuration.GetConnectionString("Connection");

if (connectionString != null && repositoryType != "Mock")
{
    builder.Services.AddDbContext<AppDbContext>(opts =>
    {
        opts.UseSqlServer(connectionString);
    });

    builder.Services.AddScoped<IUserRepository, RDSUserRepository>();
    builder.Services.AddScoped<ISlimeRepository, RDSSlimeRepository>();
}
else
{
    builder.Services.AddSingleton<IUserRepository, MockUserRepository>();
    builder.Services.AddSingleton<ISlimeRepository, MockSlimeRepository>();
}

builder.Services.AddTransient<SlimeService>();
builder.Services.AddTransient<UserService>();

builder.Services.Configure<TimeBasedSettings>(builder.Configuration.GetSection("TimeBasedSettings"));


builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
