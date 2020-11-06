class Competency < ApplicationRecord
  has_many :skill
  belongs_to :category
end
