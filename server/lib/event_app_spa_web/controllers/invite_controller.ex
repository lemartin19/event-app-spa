defmodule EventAppSpaWeb.InviteController do
  use EventAppSpaWeb, :controller

  alias EventAppSpa.Invites
  alias EventAppSpa.Invites.Invite
  alias EventAppSpaWeb.Helpers

  action_fallback EventAppSpaWeb.FallbackController

  alias EventAppSpaWeb.Plugs
  plug Plugs.RequireAuth

  def create(conn, invite_params) do
    current_user = conn.assigns[:current_user]

    if Helpers.is_event_owner?(current_user.id, invite_params["event_id"]) do
      case Invites.create_invite(invite_params) do
        {:ok, %Invite{} = invite} ->
          conn
          |> put_status(:created)
          |> put_resp_header("location", Routes.invite_path(conn, :show, invite))
          |> render("show.json", invite: invite)

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
        Jason.encode!(%{errors: ["You need to own the event to invite someone."]})
      )
    end
  end

  def show(conn, %{"id" => id}) do
    current_user = conn.assigns[:current_user]

    if Helpers.is_event_owner_or_invitee?(current_user.id, id) do
      invites = Invites.list_invites(id)
      render(conn, "index.json", invites: invites)
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

  def update(conn, %{"id" => id, "invite" => invite_params}) do
    invite = Invites.get_invite!(id)

    with {:ok, %Invite{} = invite} <- Invites.update_invite(invite, invite_params) do
      render(conn, "show.json", invite: invite)
    end
  end

  def delete(conn, %{"id" => id}) do
    invite = Invites.get_invite!(id)

    with {:ok, %Invite{}} <- Invites.delete_invite(invite) do
      send_resp(conn, :no_content, "")
    end
  end
end
