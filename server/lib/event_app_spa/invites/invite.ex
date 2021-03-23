defmodule EventAppSpa.Invites.Invite do
  use Ecto.Schema
  import Ecto.Changeset

  schema "invites" do
    field(:response, :string)
    field(:user_email, :string, null: false)
    belongs_to(:event, EventAppSpa.Events.Event)

    timestamps()
  end

  @doc false
  def changeset(invite, attrs) do
    invite
    |> cast(attrs, [:user_email, :response, :event_id])
    |> validate_required([:user_email, :response])
    |> unique_constraint(:invitee_email, name: :invitee_email)
  end
end
