defmodule EventAppSpaWeb.InviteView do
  use EventAppSpaWeb, :view
  alias EventAppSpaWeb.InviteView

  def render("index.json", %{invites: invites}) do
    %{data: render_many(invites, InviteView, "invite.json")}
  end

  def render("show.json", %{invite: invite}) do
    %{data: render_one(invite, InviteView, "invite.json")}
  end

  def render("invite.json", %{invite: invite}) do
    %{id: invite.id,
      user_email: invite.user_email,
      response: invite.response}
  end
end
