defmodule EventAppSpaWeb.EventView do
  use EventAppSpaWeb, :view
  alias EventAppSpaWeb.EventView
  alias EventAppSpaWeb.ChangesetView

  def render("index.json", %{events: events}) do
    %{data: render_many(events, EventView, "event.json")}
  end

  def render("show.json", %{event: event}) do
    %{data: render_one(event, EventView, "event.json")}
  end

  def render("event.json", %{event: event}) do
    %{
      id: event.id,
      name: event.name,
      description: event.description,
      date: event.date,
      user_id: event.user_id
    }
  end

  def render("error.json", %{changeset: changeset}) do
    render_one(changeset, ChangesetView, "error.json")
  end
end
