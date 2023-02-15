using CheckList.Application;
using CheckList.Domain;
using CheckList.Infrastructure;
using Identity.Api;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
var configuration = builder.Configuration;

services.AddControllers();

services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(configuration.GetConnectionString("CheckListDbConntection"));
});

services.AddIdentity<UserEntity, IdentityRole>()
        .AddEntityFrameworkStores<ApplicationDbContext>()
        .AddDefaultTokenProviders();

services.AddIdentityServer()
        .AddInMemoryClients(configuration.GetSection("IdentityServer:Clients"))
        .AddInMemoryApiResources(configuration.GetSection("IdentityServer:ApiResources"))
        .AddInMemoryApiScopes(configuration.GetSection("IdentityServer:ApiScopes"))
        .AddAspNetIdentity<UserEntity>()
        .AddDeveloperSigningCredential();

services.AddEndpointsApiExplorer();
services.AddSwaggerGen();

services.AddHttpClient("Identity Server", httpClient =>
{
    httpClient.BaseAddress = new Uri(configuration["ApplicationSettings:BaseAddress"]!);
});

services.AddTransient<IIdentityService, IdentityService>();
services.AddScoped<IClaimsService, ClaimsService>();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthorization();

app.UseIdentityServer();

app.UseMiddleware<ErrorHandlerMiddleware>();

app.MapControllers();

app.Run();
