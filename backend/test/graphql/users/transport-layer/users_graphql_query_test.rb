require 'test_helper'

class UsersGraphqlQueryTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end

  test "should get all users" do
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

    post api_graphql_url, params: { query: query }
    json = JSON.parse(@response.body)

    assert_response :success
    assert_not_empty json["data"]["users"]
  end

  test "should validate valid user" do
    query = <<-GRAPHQL
      query ValidateUser($attributes: UserAttributes!) {
        validateUser(attributes: $attributes) {
          errors
          isValid
        }
      }
    GRAPHQL
    variables = <<-GRAPHQL
      {
        "attributes": {
          "name": "wat",
          "age": 10,
          "email": "aaa"
        }
      }
    GRAPHQL

    post api_graphql_url, params: { query: query, variables: variables }
    json = JSON.parse(@response.body)

    assert_response :success
    assert_equal true, json["data"]["validateUser"]["isValid"]
    assert_empty json["data"]["validateUser"]["errors"]
  end

  test "should validate invalid user" do
    query = <<-GRAPHQL
      query ValidateUser($attributes: UserAttributes!) {
        validateUser(attributes: $attributes) {
          errors
          isValid
        }
      }
    GRAPHQL
    variables = <<-GRAPHQL
      {
        "attributes": {
          "name": "wat",
          "age": 10,
          "email": ""
        }
      }
    GRAPHQL

    post api_graphql_url, params: { query: query, variables: variables }
    json = JSON.parse(@response.body)

    assert_response :success
    assert_equal false, json["data"]["validateUser"]["isValid"]
    assert_not_empty json["data"]["validateUser"]["errors"]
  end
end
