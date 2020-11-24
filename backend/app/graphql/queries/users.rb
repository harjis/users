module Queries
  class Users < Queries::BaseQuery
    description "Gets all users"

    type [Types::User], null: false

    def resolve
      User.all
    end
  end
end
