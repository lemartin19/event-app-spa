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

defmodule Inject do

  def user(name, email, password) do
    hash = Argon2.hash_pwd_salt(password)
    Repo.insert!(%User{name: name, email: email, password_hash: hash})
  end
end

lynnsey = Inject.user("lynnsey", "lynnsey@gmail.com", "exciting!BDAY")
Inject.user("ally", "ally@yahoo.com", "4llyIsTheB3st")

Repo.insert!(%Event{
  user_id: lynnsey.id,
  name: "the twins' bday bash",
  description: "come celebrate lynnsey and ally's 23rd birthdays",
  date: ~N[2021-07-15 18:00:00]
})
