defmodule EventAppSpa.Repo do
  use Ecto.Repo,
    otp_app: :event_app_spa,
    adapter: Ecto.Adapters.Postgres
end
