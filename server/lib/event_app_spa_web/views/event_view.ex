defmodule EventAppSpaWeb.EventView do
  use EventAppSpaWeb, :view
  alias EventAppSpaWeb.EventView
  alias EventAppSpaWeb.UserView

  def render("index.json", %{events: events}) do
    %{data: render_many(events, EventView, "event.json")}
  end

  def render("show.json", %{event: event}) do
    %{data: render_one(event, EventView, "event.json")}
  end

  def render("event.json", %{event: event}) do
    owner = render_one(event.user, UserView, "user.json")

    %{
      id: event.id,
      name: event.name,
      description: event.description,
      date: event.date,
      owner: owner
    }
  end
end
