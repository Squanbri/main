class Competency < ApplicationRecord
  has_many :skills # competenciya soderjit v sebe ssilku na skilli
  belongs_to :category
end
