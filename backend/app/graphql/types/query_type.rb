module Types
  class QueryType < Types::BaseObject
    description "The query root of this schema"

    field :users, resolver: Queries::Users
    field :validate_user, resolver: Queries::ValidateUser
  end
end
