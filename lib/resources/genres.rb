get '/genre' do
  genres = Genre.all
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
