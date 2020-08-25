module Types
  class QueryType < Types::BaseObject
    description "The query root of this schema"

    field :user, UserType, null: false do
      description "Find user by ID"
      argument :id, ID, required: true
    end

    def user(id:)
      User.find id
    end
  end
end
