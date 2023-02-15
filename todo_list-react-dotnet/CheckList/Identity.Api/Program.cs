using CheckList.Domain;
using CheckList.Infrastructure;
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
    httpClient.BaseAddress = new Uri("http://localhost:3002");
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.UseIdentityServer();

app.Run();
