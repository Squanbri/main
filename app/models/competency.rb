class Competency < ApplicationRecord
  has_many :skills
  belongs_to :category
end
