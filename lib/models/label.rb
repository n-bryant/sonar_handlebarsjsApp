require 'active_record'

class Label < ActiveRecord::Base
  validates :headquarters, :homepage, :logo_path, :name,
            presence: true
  has_many :bands, dependent: :destroy
  has_many :albums, through: :band
  has_many :songs, through: :band
end
