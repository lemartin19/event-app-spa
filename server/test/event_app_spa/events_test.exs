defmodule EventAppSpa.EventsTest do
  use EventAppSpa.DataCase

  alias EventAppSpa.TestFixtures
  alias EventAppSpa.Users
  alias EventAppSpa.Events

  describe "events" do
    alias EventAppSpa.Events.Event

    @valid_attrs %{
      date: ~N[2010-04-17 14:00:00],
      description: "some description",
      name: "some name"
    }
    @update_attrs %{
      date: ~N[2011-05-18 15:01:01],
      description: "some updated description",
      name: "some updated name"
    }
    @invalid_attrs %{date: nil, description: nil, name: nil, user_id: nil}

    def event_fixture(attrs \\ %{}) do
      user_id = TestFixtures.user()

      {:ok, event} =
        attrs
        |> Map.merge(%{user_id: user_id})
        |> Enum.into(@valid_attrs)
        |> Events.create_event()

      event
    end

    test "list_events/0 returns all events" do
      event = event_fixture()
      assert Events.list_events() == [event]
    end

    test "get_event!/1 returns the event with given id" do
      event = event_fixture()
      assert Events.get_event!(event.id) == event
    end

    test "create_event/1 with valid data creates a event" do
      user_id = TestFixtures.user()

      assert {:ok, %Event{} = event} =
               @valid_attrs
               |> Map.merge(%{user_id: user_id})
               |> Events.create_event()

      assert event.date == ~N[2010-04-17 14:00:00]
      assert event.description == "some description"
      assert event.name == "some name"
    end

    test "create_event/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Events.create_event(@invalid_attrs)
    end

    test "update_event/2 with valid data updates the event" do
      event = event_fixture()
      user_id = TestFixtures.user()
      new_attrs = Map.merge(@update_attrs, %{user_id: user_id})
      assert {:ok, %Event{} = event} = Events.update_event(event, new_attrs)
      assert event.date == ~N[2011-05-18 15:01:01]
      assert event.description == "some updated description"
      assert event.name == "some updated name"
      assert event.user_id == user_id
    end

    test "update_event/2 with invalid data returns error changeset" do
      event = event_fixture()
      assert {:error, %Ecto.Changeset{}} = Events.update_event(event, @invalid_attrs)
      assert event == Events.get_event!(event.id)
    end

    test "delete_event/1 deletes the event" do
      event = event_fixture()
      assert {:ok, %Event{}} = Events.delete_event(event)
      assert_raise Ecto.NoResultsError, fn -> Events.get_event!(event.id) end
    end

    test "change_event/1 returns a event changeset" do
      event = event_fixture()
      assert %Ecto.Changeset{} = Events.change_event(event)
    end
  end
end
