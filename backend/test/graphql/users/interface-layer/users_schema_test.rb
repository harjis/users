require 'test_helper'

class UsersSchemaTest < ActiveSupport::TestCase
  test "should get all users" do
    query = UserQueries.get_users
    result = BackendSchema.execute query

    assert_equal 2, result['data']['users'].count
  end

  test "should validate valid user" do
    query = UserQueries.validate
    variables = UserQueries.validate_attributes(attributes: {
      name: "wat",
      age: 10,
      email: "aaa"
    })
    result = BackendSchema.execute(query, variables: variables)

    assert result['data']['validateUser']['isValid']
    assert_nil result['data']['validateUser']['errors']['age']
    assert_nil result['data']['validateUser']['errors']['name']
    assert_nil result['data']['validateUser']['errors']['email']
  end

  test "should validate invalid user" do
    query = UserQueries.validate
    variables = UserQueries.validate_attributes(attributes: {
      name: "",
      age: 1,
      email: ""
    })
    result = BackendSchema.execute(query, variables: variables)

    refute result['data']['validateUser']['isValid']
    assert_not_nil result['data']['validateUser']['errors']['age']
    assert_not_nil result['data']['validateUser']['errors']['name']
    assert_not_nil result['data']['validateUser']['errors']['email']
  end
end
