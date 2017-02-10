require 'active_record'

class Genre < ActiveRecord::Base
  validates :name, presence: true
  has_many :album_genres
  has_many :albums, through: :album_genres
  has_many :band_genres
  has_many :bands, through: :band_genres
  has_many :song_genres
  has_many :songs, through: :song_genres
end
