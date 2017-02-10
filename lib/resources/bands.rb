require 'json'
require 'sinatra'
require 'yaml'
require_relative '../models/band'

database_config = ENV['DATABASE_URL']

if database_config.blank?
  database_config = YAML::load(File.open('config/database.yml'))
end

ActiveRecord::Base.establish_connection(database_config)

after do
  ActiveRecord::Base.connection.close
end

get '/api/band' do
  Band.all.map { |band| band.get_band_info }.to_json
end

get '/api/band/:id' do |id|
  Band.find(id).get_band_info.to_json
end

# get '/api/trainers/:id' do |id|
#   trainer = Trainer.find_by(id: id)
#   halt [404, 'No trainer found'.to_json] if trainer.nil?
#
#   trainer.team.to_json
# end
#
# patch '/api/trainers/:id' do |id|
#   trainer = Trainer.find_by(id: id)
#   halt [400, 'No trainer found'.to_json] if trainer.nil?
#
#   params.delete('splat')
#   params.delete('captures')
#
#   trainer.update(params)
#   trainer.to_json
# end
#
# post '/api/trainers/:name' do |name|
#   params.delete('splat')
#   params.delete('captures')
#
#   trainer = Trainer.create(params)
#   trainer.to_json
# end
#
# post '/api/trainers/' do
#   halt [400, 'No name entered'.to_json]
# end
#
# delete '/api/trainers/:id' do |id|
#   trainer = Trainer.find_by(id: id)
#   halt [400, 'No trainer found'.to_json] if trainer.nil?
#
#   trainer.destroy
#   trainer.to_json
# end
