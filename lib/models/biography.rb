require 'active_record'

class Biography < ActiveRecord::Base
  validates :background, :members, :origin_date,
            presence: true
  belongs_to :band
end
