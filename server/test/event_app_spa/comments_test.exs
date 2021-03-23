defmodule EventAppSpa.CommentsTest do
  use EventAppSpa.DataCase

  alias EventAppSpa.TestFixtures
  alias EventAppSpa.Comments
  alias EventAppSpa.Users

  describe "comments" do
    alias EventAppSpa.Comments.Comment
    @valid_attrs %{body: "some body"}
    @update_attrs %{body: "some updated body"}
    @invalid_attrs %{body: nil, user_id: nil, event_id: nil}

    def comment_fixture(attrs \\ %{}) do
      user_id = TestFixtures.user()
      event_id = TestFixtures.event(user_id)

      {:ok, comment} =
        attrs
        |> Map.merge(%{user_id: user_id, event_id: event_id})
        |> Enum.into(@valid_attrs)
        |> Comments.create_comment()

      comment
    end

    test "list_comments/0 returns all comments" do
      comment = comment_fixture()
      assert Comments.list_comments() == [comment]
    end

    test "get_comment!/1 returns the comment with given id" do
      comment = comment_fixture()
      assert Comments.get_comment!(comment.id) == comment
    end

    test "create_comment/1 with valid data creates a comment" do
      user_id = TestFixtures.user()
      event_id = TestFixtures.event(user_id)

      assert {:ok, %Comment{} = comment} =
               @valid_attrs
               |> Map.merge(%{user_id: user_id, event_id: event_id})
               |> Comments.create_comment()

      assert comment.body == "some body"
    end

    test "create_comment/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Comments.create_comment(@invalid_attrs)
    end

    test "update_comment/2 with valid data updates the comment" do
      comment = comment_fixture()
      user_id = TestFixtures.user()
      event_id = TestFixtures.event(user_id)
      new_attrs = Map.merge(@update_attrs, %{user_id: user_id, event_id: event_id})

      assert {:ok, %Comment{} = comment} = Comments.update_comment(comment, new_attrs)
      assert comment.body == "some updated body"
    end

    test "update_comment/2 with invalid data returns error changeset" do
      comment = comment_fixture()
      assert {:error, %Ecto.Changeset{}} = Comments.update_comment(comment, @invalid_attrs)
      assert comment == Comments.get_comment!(comment.id)
    end

    test "delete_comment/1 deletes the comment" do
      comment = comment_fixture()
      assert {:ok, %Comment{}} = Comments.delete_comment(comment)
      assert_raise Ecto.NoResultsError, fn -> Comments.get_comment!(comment.id) end
    end

    test "change_comment/1 returns a comment changeset" do
      comment = comment_fixture()
      assert %Ecto.Changeset{} = Comments.change_comment(comment)
    end
  end
end
