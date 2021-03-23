defmodule EventAppSpa.Events.Event do
  use Ecto.Schema
  import Ecto.Changeset

  schema "events" do
    field(:date, :naive_datetime, null: false)
    field(:description, :string, null: false)
    field(:name, :string, null: false)
    belongs_to(:user, EventAppSpa.Users.User)
    has_many(:invites, EventAppSpa.Invites.Invite)
    has_many(:comments, EventAppSpa.Comments.Comment)

    timestamps()
  end

  @doc false
  def changeset(event, attrs) do
    event
    |> cast(attrs, [:name, :description, :date, :user_id])
    |> validate_required([:name, :description, :date, :user_id])
  end
end
