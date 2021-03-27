defmodule EventAppSpaWeb.InviteView do
  use EventAppSpaWeb, :view
  alias EventAppSpaWeb.InviteView
  alias EventAppSpaWeb.ChangesetView

  def render("index.json", %{invites: invites}) do
    %{data: render_many(invites, InviteView, "invite.json")}
  end

  def render("show.json", %{invite: invite}) do
    %{data: render_one(invite, InviteView, "invite.json")}
  end

  def render("invite.json", %{invite: invite}) do
    %{
      id: invite.id,
      user_email: invite.user_email,
      response: invite.response,
      event_id: invite.event_id
    }
  end

  def render("error.json", %{changeset: changeset}) do
    render_one(changeset, ChangesetView, "error.json")
  end
end
