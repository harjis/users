module Types
  class QueryType < Types::BaseObject
    description "The query root of this schema"

    field :users, [UserType], null: false do
      description "Find all users"
    end

    field :validate_user, ValidationType, null: false do
      description "Validates a user"
      argument :attributes, Types::UserAttributes, required: true
    end

    def users
      User.all
    end

    def validate_user(attributes:)
      @user = User.new(attributes.to_h)

      if @user.valid?
        { isValid: true, errors: {} }
      else
        { isValid: false, errors: @user.errors }
      end
    end
  end
end
