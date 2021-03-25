defmodule EventAppSpaWeb.UserView do
  use EventAppSpaWeb, :view
  alias EventAppSpaWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id, name: user.name, email: user.email}
  end

  def render("error.json", %{changeset: changeset}) do
    %{errors: Enum.map(changeset.errors, fn {_, {message, _}} -> message end)}
  end
end
