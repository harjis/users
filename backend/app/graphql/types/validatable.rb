module Types
  module Validatable
    include Types::BaseInterface

    field :isValid, Boolean, null: false
  end
end
