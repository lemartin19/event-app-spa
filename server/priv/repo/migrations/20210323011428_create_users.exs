defmodule EventAppSpa.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string
      add :email, :string
      add :avatar_hash, :string

      timestamps()
    end

  end
end
