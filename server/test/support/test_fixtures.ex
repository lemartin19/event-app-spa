defmodule EventAppSpa.TestFixtures do
  alias EventAppSpa.Users
  alias EventAppSpa.Events

  def user() do
    {:ok, user} =
      Users.create_user(%{avatar_hash: "some avatar_hash", email: "some email", name: "some name"})

    user.id
  end

  def event(user_id) do
    {:ok, event} =
      Events.create_event(%{
        date: ~N[2010-04-17 14:00:00],
        description: "some description",
        name: "some name",
        user_id: user_id
      })

    event.id
  end
end
