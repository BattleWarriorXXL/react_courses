FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["CheckList/Identity.Api/Identity.Api.csproj", "Identity.Api/"]
COPY ["CheckList/CheckList.Infrastructure/CheckList.Infrastructure.csproj", "CheckList.Infrastructure/"]
COPY ["CheckList/CheckList.Application/CheckList.Application.csproj", "CheckList.Application/"]
COPY ["CheckList/CheckList.Domain/CheckList.Domain.csproj", "CheckList.Domain/"]
COPY ["CheckList/CheckList.Shared/CheckList.Shared.csproj", "CheckList.Shared/"]
RUN dotnet restore "Identity.Api/Identity.Api.csproj"
COPY CheckList/. .
WORKDIR "/src/Identity.Api"
RUN dotnet build "Identity.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Identity.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Identity.Api.dll"]