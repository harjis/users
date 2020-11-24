require 'test_helper'

class UsersGraphqlQueryTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end

  test "should get all users" do
    query = UserQueries.get_users

    post api_graphql_url, params: { query: query }
    json = JSON.parse(@response.body)

    assert_response :success
    assert_not_empty json["data"]["users"]
  end

  test "should validate valid user" do
    query = UserQueries.validate
    variables = UserQueries.validate_attributes_as_string(attributes: {
      name: "wat",
      age: 10,
      email: "aaa"
    })

    post api_graphql_url, params: { query: query, variables: variables }
    json = JSON.parse(@response.body)

    assert_response :success
    assert_equal true, json["data"]["validateUser"]["isValid"]
    assert_nil json["data"]["validateUser"]["errors"]["name"]
    assert_nil json["data"]["validateUser"]["errors"]["age"]
    assert_nil json["data"]["validateUser"]["errors"]["email"]
  end

  test "should validate invalid user" do
    query = UserQueries.validate
    variables = UserQueries.validate_attributes_as_string(attributes: {
      name: "wat",
      age: 10,
      email: ""
    })

    post api_graphql_url, params: { query: query, variables: variables }
    json = JSON.parse(@response.body)

    assert_response :success
    assert_equal false, json["data"]["validateUser"]["isValid"]
    assert_not_empty json["data"]["validateUser"]["errors"]
  end
end
