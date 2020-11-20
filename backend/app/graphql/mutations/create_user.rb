module Mutations
  class CreateUser < BaseMutation
    argument :name, String, required: true
    argument :age, Int, required: true
    argument :email, String, required: true

    field :user, Types::User, null: true
    field :errors, GraphQL::Types::JSON, null: false

    def resolve(attributes)
      user = User.new(attributes)

      if user.save
        {
          user: user,
          errors: {}
        }
      else
        {
          user: nil,
          errors: user.errors
        }
      end
    end
  end
end
