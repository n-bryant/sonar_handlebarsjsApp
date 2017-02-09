require 'active_record'

class Album < ActiveRecord::Base
  validates :name, :release_date, presence: true
  belongs_to :artist
  has_many :genres, through: album_genres
  has_one :image
  belongs_to :label
  has_many :songs
end
