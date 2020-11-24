module Queries
  class ValidateUser < Queries::BaseQuery
    description "Validates a user"

    type Types::UserValidation, null: false

    argument :attributes, Types::UserAttributes, required: true

    def resolve(attributes:)
      @model = User.new(attributes.to_h)

      if @model.valid?
        { isValid: true, errors: {} }
      else
        { isValid: false, errors: @model.errors.messages }
      end
    end
  end
end