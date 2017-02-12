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

  def images
    # TODO: Make images table so I don't have to fake unique ids
    id = 0
    images = [{ file_path: self.biography.image_path, id: id += 1 }]

    self.albums.map do |album|
      images << { file_path: album.image, id: id += 1 }
    end

    # TODO: Is there a better way to test/convert NULL?
    images = JSON.parse(images.to_json)
    images = '' if band_has_no_images?(images)

    images
  end

  def band_has_no_images?(images)
    images.each { |image| return false unless image['file_path'].nil? }

    true
  end
end
