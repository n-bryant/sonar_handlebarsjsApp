require 'json'
require 'sinatra'
require 'yaml'
require_relative '../models/band'
require_relative '../models/band_genre'
require_relative '../validator'

database_config = ENV['DATABASE_URL']

if database_config.blank?
  database_config = YAML::load(File.open('config/database.yml'))
end

ActiveRecord::Base.establish_connection(database_config)

after do
  ActiveRecord::Base.connection.close
end

get '/band' do
  bands = Band.all.map { |band| band.get_band_info }

  halt [404, 'No bands found'.to_json] if bands.empty?

  bands.to_json
end

get '/band/:id' do |id|
  band = Band.find_by_id(id)

  halt [404, 'No band found.'.to_json] if band.nil?

  band.get_band_info.to_json
end

get '/band/:id/biography' do |id|
  band = Band.find_by_id(id)

  halt [404, 'No band found.'.to_json] if band.nil?

  band.biography.to_json
end

get '/band/:id/discography' do |id|
  band = Band.find_by_id(id)

  halt [404, 'No band found.'.to_json] if band.nil?
  halt [400, 'No albums found for that band.'.to_json] if band.albums.empty?

  band.discography.to_json
end

get '/band/:id/images' do |id|
  band = Band.find_by_id(id)
  halt [404, 'No band found.'.to_json] if band.nil?

  images = band.images
  halt [400, 'No images found for that band.'.to_json] if images.empty?

  images.to_json
end

get '/band/:id/songs' do |id|
  band = Band.find_by_id(id)
  halt [404, 'No band found.'.to_json] if band.nil?

  songs = band.songs
  halt [400, 'No songs found for that band.'.to_json] if songs.empty?

  song_list = []
  songs.each { |song| song_list << song.details}

  song_list.to_json
end

post '/band' do
  label = Label.find_by(name: params['label']['name'])
  halt [400, 'Invalid label.'.to_json] if label.nil?

  band = Band.new(
    active: params['active'],
    label: label,
    name: params['name']
  )

  halt [400, 'Name and active status are required.'.to_json] unless band.valid?
  halt [400, 'Biography is empty.'.to_json] if params['biography'].nil?

  unless params['biography'].class == Hash
    halt [400, 'Biography should be an object.'.to_json]
  end

  biography = Biography.new(params['biography'])
  halt [400, 'Incomplete biography.'.to_json] unless biography.valid?

  band.save
  biography.band = band
  biography.save

  halt [400, 'No genres entered.'.to_json] if params['genres'].nil? or params['genres'].empty?

  unless Validator.genres_are_valid?(params['genres'])
    halt [400, 'Genres should be an array of objects.'.to_json]
  end

  params['genres'].each do |genre|
    current_genre = Genre.find_by(name: genre['name'])
    halt [400, 'Invalid genre.'.to_json] if current_genre.nil?
    BandGenre.create(band: band, genre: current_genre)
  end

  [201, band.to_json]
end
