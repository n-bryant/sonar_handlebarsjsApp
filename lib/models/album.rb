require 'active_record'
Dir["./lib/models/*.rb"].each { |file| require file }

class Album < ActiveRecord::Base
  validates :name, :release_date, presence: true
  belongs_to :band
  has_many :album_genres
  has_many :genres, through: :album_genres
  has_one :image
  belongs_to :label
  has_many :songs
end
