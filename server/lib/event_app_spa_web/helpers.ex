defmodule EventAppSpaWeb.Helpers do
  alias EventAppSpa.Users
  alias EventAppSpa.Events
  alias EventAppSpa.Invites

  def is_event_owner?(user_id, event_id) do
    event = Events.get_event!(event_id)
    user_id == event.user_id
  end

  def is_event_owner_or_invitee?(user_id, event_id) do
    user = Users.get_user!(user_id)

    is_invitee =
      Invites.list_invites(event_id)
      |> Enum.any?(fn invite -> invite.user_email == user.email end)

    is_invitee || is_event_owner?(user_id, event_id)
  end
end
