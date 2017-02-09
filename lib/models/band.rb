require 'active_record'

class Band < ActiveRecord::Base
  validates :active, :name, presence: true
  has_many :albums
  has_one :biography
  has_many :genres, through: :band_genres
  has_many :images
  belongs_to :label
  has_many :songs, through: :albums
end
