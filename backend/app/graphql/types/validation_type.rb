module Types
  class ValidationType < Types::BaseObject
    field :isValid, Boolean, null: false
    field :errors, GraphQL::Types::JSON, null: false
  end

  class ValidatableModels < Types::BaseUnion
    description "Objects which may be validated"
    possible_types Types::UserType
  end
end
