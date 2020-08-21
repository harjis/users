class User < ApplicationRecord
  validates :name, presence: true, length: { minimum: 2, maximum: 100 }
  validates :age, presence: true, numericality: { only_integer: true }
  validates :email, presence: true, uniqueness: true
end
