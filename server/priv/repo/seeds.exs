# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     EventApp.Repo.insert!(%EventApp.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias EventAppSpa.Repo
alias EventAppSpa.Users.User
alias EventAppSpa.Events.Event
alias EventAppSpa.Comments.Comment

defmodule Inject do
  def user(name, email, password) do
    hash = Argon2.hash_pwd_salt(password)
    Repo.insert!(%User{name: name, email: email, password_hash: hash})
  end
end

lynnsey = Inject.user("lynnsey", "lynnsey@gmail.com", "exciting!BDAY")
ally = Inject.user("ally", "ally@yahoo.com", "4llyIsTheB3st")

bday = Repo.insert!(%Event{
  user_id: lynnsey.id,
  name: "the twins' bday bash",
  description: "come celebrate lynnsey and ally's 23rd birthdays",
  date: ~N[2021-07-15 18:00:00]
})

Repo.insert!(%Comment{
  user_id: lynnsey.id,
  event_id: bday.id,
  body: "this is going to be so awesome!"
})

Repo.insert!(%Comment{
  user_id: ally.id,
  event_id: bday.id,
  body: "I'm so excited"
})

Repo.insert!(%Comment{
  user_id: lynnsey.id,
  event_id: bday.id,
  body: "me too!"
})
