get '/label' do
  labels = Label.all
  halt [404, 'No labels found'.to_json] if labels.empty?

  labels.to_json
end

get '/label/:id' do |id|
  label = Label.find_by_id(id)

  halt [404, 'No label found.'.to_json] if label.nil?

  label.to_json
end

get '/label/:id/bands' do |id|
  label = Label.find_by_id(id)
  halt [404, 'No label found.'.to_json] if label.nil?

  bands = label.bands.map { |band| band.get_band_info }
  halt [400, 'No bands found for that label.'.to_json] if bands.empty?

  bands.to_json
end

post '/label' do
  label = Label.new(
    headquarters: params['headquarters'],
    homepage: params['homepage'],
    logo_path: params['logo_path'],
    name: params['name']
  )
  
  halt [400, 'All fields are required.'.to_json] unless label.valid?

  label.save
  [201, label.to_json]
end
