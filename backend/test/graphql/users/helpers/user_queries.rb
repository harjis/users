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
          isValid
          errors {
            age
            name
            email
          }
        }
      }
    GRAPHQL

    query
  end

  def self.validate_attributes(attributes:)
    { attributes: attributes, modelType: "user" }
  end

  def self.validate_attributes_as_string(attributes:)
    JSON.generate(validate_attributes(attributes: attributes))
  end
end
