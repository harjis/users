module UserQueries
  def self.get_users
    query = <<-GRAPHQL
      query GetUsers {
        users {
          id
          age
          name
          email
        }
      }
    GRAPHQL

    query
  end

  def self.validate
    query = <<-GRAPHQL
      query ValidateUser($attributes: UserAttributes!) {
        validateUser(attributes: $attributes) {
          errors
          isValid
        }
      }
    GRAPHQL

    query
  end

  def self.validate_attributes(attributes:)
    JSON.generate({ attributes: attributes, modelType: "user" })
  end
end
