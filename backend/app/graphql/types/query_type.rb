module Types
  class QueryType < Types::BaseObject
    description "The query root of this schema"

    field :users, [UserType], null: false do
      description "Find all users"
    end

    field :validate_user, ValidationType, null: false do
      description "Validates a user"
      # Hmm... why can't I use -> argument :user, UserMutationType, required: true
      argument :name, String, required: true
      argument :age, Int, required: true
      argument :email, String, required: true
    end

    def users
      User.all
    end

    def validate_user(arguments)
      @user = User.new(arguments)

      if @user.valid?
        { isValid: true, errors: {} }
      else
        { isValid: false, errors: @user.errors }
      end
    end
  end
end
