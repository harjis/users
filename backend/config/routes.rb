Rails.application.routes.draw do
  post "/api/graphql", to: "graphql#execute"
  scope :api do
    resources :users
    post 'users/validate'
  end
end
