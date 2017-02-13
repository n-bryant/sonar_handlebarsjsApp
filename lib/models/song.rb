require 'active_record'

class Song < ActiveRecord::Base
  validates :name, :release_date, presence: true
  belongs_to :album
  belongs_to :band
  has_many :album_songs, dependent: :destroy
  has_many :albums, through: :album_songs
  has_many :song_genres, dependent: :destroy
  has_many :genres, through: :song_genres

  def details
    {
      band: self.band.name,
      genres: self.genres,
      id: self.id,
      name: self.name,
      release_date: self.release_date
    }
  end
end
