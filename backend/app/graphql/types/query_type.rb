module Types
  class QueryType < Types::BaseObject
    description "The query root of this schema"

    field :users, resolver: Queries::Users

    field :validate, ValidationType, null: false do
      description "Validates a user"
      argument :attributes, Types::UserAttributes, required: true
      argument :modelType, String, required: true
    end

    def validate(attributes:, modelType:)
      clazz = modelType.capitalize.constantize
      @model = clazz.new(attributes.to_h)

      if @model.valid?
        { isValid: true, errors: {} }
      else
        { isValid: false, errors: @model.errors }
      end
    end
  end
end
