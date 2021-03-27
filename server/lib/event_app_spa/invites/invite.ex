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
    |> validate_response(attrs["response"])
    |> validate_required([:user_email, :event_id])
    |> unique_constraint(:invitee_email, name: :invitee_email)
  end

  def validate_response(changeset, response) do
    if response not in ["Yes", "No", "Maybe", nil] do
      Ecto.Changeset.add_error(
        changeset,
        :response,
        "Response must be one of \"Yes\", \"No\", \"Maybe\", or nil."
      )
    else
      changeset
    end
  end
end
