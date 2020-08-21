Rails.application.routes.draw do
  scope :api do
    resources :users
    post 'users/validate'
  end
end
