require 'active_record'

class AlbumGenre < ActiveRecord::Base
  belongs_to :album
  belongs_to :genre
end
