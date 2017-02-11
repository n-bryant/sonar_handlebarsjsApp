require 'active_record'
Dir["./lib/models/*.rb"].each { |file| require file }

class Band < ActiveRecord::Base
  validates :active, :name, presence: true
  has_many :albums
  has_one :biography
  has_many :band_genres
  has_many :genres, through: :band_genres
  has_many :images
  belongs_to :label
  has_many :songs, through: :albums

  def get_band_info
    {
      biography:  self.biography,
      albums:     self.albums,
      genres:     self.genres,
      id:         self.id,
      label:      { id: self.label.id, name: self.label.name },
      name:       self.name,
      rating_avg: self.rating_avg,
      songs:      self.songs
    }
  end

  def discography
    self.albums.map do |album|
      {
        band:         self.name,
        genres:       album.genres,
        id:           album.id,
        image:        album.image,
        name:         album.name,
        release_date: album.release_date
      }
    end
  end
end
