module Types
  class BaseInputObject < GraphQL::Schema::InputObject
    argument_class Types::BaseArgument
  end

  class UserAttributes < BaseInputObject
    description "Attributes for creating user"
    argument :name, String, required: true
    argument :age, Int, required: true
    argument :email, String, required: true
  end
end
