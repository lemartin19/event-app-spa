defmodule EventAppSpa.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      EventAppSpa.Repo,
      # Start the Telemetry supervisor
      EventAppSpaWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: EventAppSpa.PubSub},
      # Start the Endpoint (http/https)
      EventAppSpaWeb.Endpoint
      # Start a worker by calling: EventAppSpa.Worker.start_link(arg)
      # {EventAppSpa.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: EventAppSpa.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    EventAppSpaWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
