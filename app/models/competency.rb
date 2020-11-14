class Competency < ApplicationRecord
  has_many :skills, dependent: :delete_all
  belongs_to :category
end
