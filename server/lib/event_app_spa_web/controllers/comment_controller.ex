defmodule EventAppSpaWeb.CommentController do
  use EventAppSpaWeb, :controller

  alias EventAppSpa.Comments
  alias EventAppSpa.Comments.Comment
  alias EventAppSpaWeb.Helpers

  action_fallback EventAppSpaWeb.FallbackController

  alias EventAppSpaWeb.Plugs
  plug Plugs.RequireAuth

  def create(conn, comment_params) do
    current_user = conn.assigns[:current_user]

    if Helpers.is_event_owner_or_invitee?(current_user.id, comment_params["event_id"]) do
      comment_params = Map.put(comment_params, "user_id", current_user.id)

      case Comments.create_comment(comment_params) do
        {:ok, %Comment{} = comment} ->
          conn
          |> put_status(:created)
          |> put_resp_header("location", Routes.comment_path(conn, :show, comment))
          |> render("show.json", comment: comment)

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
        Jason.encode!(%{errors: ["You do not have an invitation to this event."]})
      )
    end
  end

  def show(conn, %{"id" => id}) do
    current_user = conn.assigns[:current_user]

    if Helpers.is_event_owner_or_invitee?(current_user.id, id) do
      comments = Comments.list_comments(id)
      render(conn, "index.json", comments: comments)
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

  def delete(conn, %{"id" => id}) do
    comment = Comments.get_comment!(id)

    with {:ok, %Comment{}} <- Comments.delete_comment(comment) do
      send_resp(conn, :no_content, "")
    end
  end
end
