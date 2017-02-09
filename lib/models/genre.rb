require 'active_record'

class Genre < ActiveRecord::Base
  validates :name, presence: true
  has_many :albums, through: :album_genres
  has_many :bands, through: :band_genres
  has_many :songs, through: :band_genres
end
