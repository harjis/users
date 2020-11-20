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
      query Validate($attributes: UserAttributes!, $modelType: String!) {
        validate(attributes: $attributes, modelType: $modelType) {
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
