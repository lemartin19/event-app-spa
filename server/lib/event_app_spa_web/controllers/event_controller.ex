defmodule EventAppSpaWeb.EventController do
  use EventAppSpaWeb, :controller

  alias EventAppSpa.Events
  alias EventAppSpa.Events.Event
  alias EventAppSpaWeb.Helpers

  action_fallback EventAppSpaWeb.FallbackController

  alias EventAppSpaWeb.Plugs
  plug Plugs.RequireAuth

  def index(conn, _params) do
    current_user = conn.assigns[:current_user]

    events =
      Events.list_events()
      |> Enum.filter(fn event -> Helpers.is_event_owner_or_invitee?(current_user.id, event.id) end)

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
    current_user = conn.assigns[:current_user]

    if Helpers.is_event_owner_or_invitee?(current_user.id, id) do
      event = Events.get_event!(id)
      render(conn, "show.json", event: event)
    else
      conn
      |> put_resp_header(
        "content-type",
        "application/json; charset=UTF-8"
      )
      |> send_resp(
        :unauthorized,
        Jason.encode!(%{errors: ["You do not have an invitation to this event."]})
      )
    end
  end

  def update(conn, event_params) do
    event = Events.get_event!(event_params["id"])
    current_user = conn.assigns[:current_user]

    IO.inspect(event_params)

    if Helpers.is_event_owner?(current_user.id, event_params["id"]) do
      case Events.update_event(event, event_params) do
        {:ok, %Event{} = event} ->
          render(conn, "show.json", event: event)

        {:error, %Ecto.Changeset{} = changeset} ->
          conn
          |> put_status(:bad_request)
          |> render("error.json", changeset: changeset)
      end
    else
      conn
      |> put_resp_header(
        "content-type",
        "application/json; charset=UTF-8"
      )
      |> send_resp(
        :unauthorized,
        Jason.encode!(%{errors: ["You must be the owner of this event to update it."]})
      )
    end
  end

  def delete(conn, %{"id" => id}) do
    event = Events.get_event!(id)
    current_user = conn.assigns[:current_user]

    if Helpers.is_event_owner?(current_user.id, id) do
      case Events.delete_event(event) do
        {:ok, _} ->
          send_resp(conn, :no_content, "")

        {:error, _} ->
          send_resp(conn, :bad_request, Jason.encode!(%{errors: ["Failed to delete event."]}))
      end
    else
      conn
      |> put_resp_header(
        "content-type",
        "application/json; charset=UTF-8"
      )
      |> send_resp(
        :unauthorized,
        Jason.encode!(%{errors: ["You must be the owner of this event to update it."]})
      )
    end
  end
end
