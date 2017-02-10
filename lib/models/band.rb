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

  def get_band_info()
    band = Band.find(attributes['id'])

    {
      biography: band.biography,
      albums: band.albums,
      genres: band.genres,
      id: band.id,
      label: { id: band.label.id, name: band.label.name },
      name: band.name,
      rating_avg: band.rating_avg,
      songs: band.songs
    }
  end
end
