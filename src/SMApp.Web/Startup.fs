namespace SMApp.Web

open Microsoft.AspNetCore
open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Hosting
open Microsoft.AspNetCore.Http
open Microsoft.Extensions.DependencyInjection
open Microsoft.Extensions.Hosting
open WebSharper.AspNetCore

open Serilog

open SMApp

type Startup() =

    member this.ConfigureServices(services: IServiceCollection) =
        services
            .AddSitelet(Site.Main)
            .AddAuthentication("WebSharper")
            .AddCookie("WebSharper", fun _ -> ())   
        |> ignore

    member this.Configure(app: IApplicationBuilder, env: IHostingEnvironment) =
        if env.IsDevelopment() then app.UseDeveloperExceptionPage() |> ignore
        app.UseAuthentication()
            .UseStaticFiles()
            .UseWebSharper()
            .Run(fun context ->
                context.Response.StatusCode <- 404
                context.Response.WriteAsync("Page not found"))

module Program =
    let BuildWebHost args =
        WebHost
            .CreateDefaultBuilder(args)
            .UseSerilog()
            .UseStartup<Startup>()
            .Build()

    [<EntryPoint>]
    let main args =
        let config = new LoggerConfiguration()
        Log.Logger <- config.MinimumLevel.Information().Enrich.FromLogContext().WriteTo.Console().CreateLogger()
        do Api.SetLogger(new SerilogLogger());
        do BuildWebHost(args).Run()
        do Log.CloseAndFlush()
        0