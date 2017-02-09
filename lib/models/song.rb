require 'active_record'

class Band < ActiveRecord::Base
  validates :name, :release_date, presence: true
  belongs_to :album
  belongs_to :band
end
