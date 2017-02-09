require 'active_record'

class Label < ActiveRecord::Base
  validates :headquarters, :homepage, :logo_path, :name,
            presence: true
  has_many :albums, through: :band
  has_many :bands
  has_many :songs, through: :band
end
