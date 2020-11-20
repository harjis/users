module Types
  # class UserInterface < Types::BaseInterface
  #   field :id, ID, null: false
  #   field :name, String, null: false
  #   field :age, Integer, null: false
  #   field :email, String, null: false
  #   field :created_at, GraphQL::Types::ISO8601DateTime, null: false
  #   field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  # end

  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :age, Integer, null: false
    field :email, String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end

  class UserAttributes < BaseInputObject
    description "Attributes for creating user"
    argument :name, String, required: true
    argument :age, Int, required: true
    argument :email, String, required: true
  end
end
