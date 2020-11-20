module Types
  class ValidationResultType < Types::BaseObject
    field :isValid, Boolean, null: false
    field :errors, GraphQL::Types::JSON, null: false
  end
end
