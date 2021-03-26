defmodule EventAppSpaWeb.CommentView do
  use EventAppSpaWeb, :view
  alias EventAppSpaWeb.CommentView
  alias EventAppSpaWeb.ChangesetView

  def render("index.json", %{comments: comments}) do
    %{data: render_many(comments, CommentView, "comment.json")}
  end

  def render("show.json", %{comment: comment}) do
    %{data: render_one(comment, CommentView, "comment.json")}
  end

  def render("comment.json", %{comment: comment}) do
    %{
      id: comment.id,
      body: comment.body,
      event_id: comment.event_id,
      user_id: comment.user_id,
      inserted_at: comment.inserted_at
    }
  end

  def render("error.json", %{changeset: changeset}) do
    render_one(changeset, ChangesetView, "error.json")
  end
end
