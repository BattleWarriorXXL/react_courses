FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

COPY ["CheckList/CheckList.Api/CheckList.Api.csproj", "CheckList.Api/"]

RUN dotnet restore "CheckList.Api/CheckList.Api.csproj"

COPY CheckList/. .
WORKDIR /src/CheckList.Api
RUN dotnet build "CheckList.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CheckList.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CheckList.Api.dll"]
