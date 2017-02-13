require_relative '../models/genre'

get '/genre' do
  search = params.fetch('name', '')
  genres = Genre.where("lower(name) LIKE (?)", "%#{search.downcase}%")

  halt [404, 'No genres found'.to_json] if genres.empty?

  genres.to_json
end

get '/genre/:id/bands' do |id|
  genre = Genre.find_by_id(id)
  halt [404, 'Genre not found.'.to_json] if genre.nil?

  bands = genre.bands.map { |band| band.get_band_info }
  halt [400, 'No bands found for that genre.'.to_json] if bands.empty?

  bands.to_json
end

post '/genre' do
  request.body.rewind
  request_payload = JSON.parse request.body.read

  genre = Genre.new(name: request_payload['name'])

  halt [400, 'Name cannot be blank.'.to_json] unless genre.valid?

  genre.save
  [201, genre.to_json]
end

put '/genre/:id' do |id|
  request.body.rewind
  request_payload = JSON.parse request.body.read

  genre = Genre.find_by_id(id)
  halt [400, 'Genre not found.'.to_json] if genre.nil?

  updated = genre.update(request_payload['name'])
  halt [400, 'Name cannot be blank.'.to_json] unless updated

  [200, genre.to_json]
end

delete '/genre/:id' do |id|
  genre = Genre.find_by_id(id)
  halt [400, 'No genre with that id, unable to delete.'.to_json] if genre.nil?

  genre.destroy
  genre.to_json
end
