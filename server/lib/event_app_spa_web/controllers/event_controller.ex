defmodule EventAppSpaWeb.EventController do
  use EventAppSpaWeb, :controller

  alias EventAppSpa.Events
  alias EventAppSpa.Events.Event

  action_fallback EventAppSpaWeb.FallbackController

  alias EventAppSpaWeb.Plugs
  plug Plugs.RequireAuth when action in [:create]

  def index(conn, _params) do
    events = Events.list_events()
    render(conn, "index.json", events: events)
  end

  def create(conn, event_params) do
    user = conn.assigns[:current_user]
    result = event_params |> Map.put("user_id", user.id) |> Events.create_event()
    case result do
      {:ok, %Event{} = event} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", Routes.event_path(conn, :show, event))
        |> render("show.json", event: event)

      {:error, %Ecto.Changeset{} = changeset} ->
        conn
        |> put_status(:bad_request)
        |> render("error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    event = Events.get_event!(id)
    render(conn, "show.json", event: event)
  end

  def update(conn, %{"id" => id, "event" => event_params}) do
    event = Events.get_event!(id)

    with {:ok, %Event{} = event} <- Events.update_event(event, event_params) do
      render(conn, "show.json", event: event)
    end
  end

  def delete(conn, %{"id" => id}) do
    event = Events.get_event!(id)

    with {:ok, %Event{}} <- Events.delete_event(event) do
      send_resp(conn, :no_content, "")
    end
  end
end
