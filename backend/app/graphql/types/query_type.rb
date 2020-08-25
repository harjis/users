module Types
  class QueryType < Types::BaseObject
    description "The query root of this schema"

    field :users, [UserType], null: false do
      description "Find all users"
    end

    def users
      User.all
    end
  end
end
