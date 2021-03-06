require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end

  test "should get index" do
    get users_url, as: :json
    assert_response :success
  end

  test "should create user" do
    assert_difference('User.count') do
      post users_url, params: { age: @user.age, email: 'new_unique@email.com', name: @user.name }, as: :json
    end

    assert_response 201
  end

  test "should NOT create user with duplicate email" do
    post users_url, params: { age: @user.age, email: @user.email, name: @user.name }, as: :json
    assert_response :unprocessable_entity
    pp @response.body
  end

  test "should show user" do
    get user_url(@user), as: :json
    assert_response :success
  end

  test "should update user" do
    patch user_url(@user), params: { age: @user.age, email: @user.email, name: @user.name }, as: :json
    assert_response 200
  end

  test "should destroy user" do
    assert_difference('User.count', -1) do
      delete user_url(@user), as: :json
    end

    assert_response 204
  end

  test "should validate valid user" do
    post users_validate_path, params: { age: @user.age, email: 'new_unique@email.com', name: @user.name }, as: :json
    json = JSON.parse(@response.body)
    assert_equal true, json['isValid']
    assert_equal({}, json['errors'])
  end

  test "should validate invalid user" do
    post users_validate_path, params: { age: @user.age, email: @user.email, name: @user.name }, as: :json
    json = JSON.parse(@response.body)
    assert_equal false, json['isValid']
    assert_not_empty json['errors']
  end
end
