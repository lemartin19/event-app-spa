defmodule EventAppSpa.Comments.Comment do
  use Ecto.Schema
  import Ecto.Changeset

  schema "comments" do
    field(:body, :string, null: false)
    belongs_to(:user, EventAppSpa.Users.User)
    belongs_to(:event, EventAppSpa.Events.Event)

    timestamps()
  end

  @doc false
  def changeset(comment, attrs) do
    comment
    |> cast(attrs, [:body, :user_id, :event_id])
    |> validate_required([:body, :user_id, :event_id])
  end
end
