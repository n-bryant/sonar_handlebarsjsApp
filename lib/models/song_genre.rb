require 'active_record'

class SongGenre < ActiveRecord::Base
  belongs_to :song
  belongs_to :genre
end
