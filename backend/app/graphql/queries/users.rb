module Queries
  class Users < Queries::BaseQuery
    type [Types::UserType], null: false

    def resolve
      User.all
    end
  end
end
