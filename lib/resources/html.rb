require 'capybara'
require 'json'
require 'sinatra'
require 'yaml'

database_config = ENV['DATABASE_URL']

if database_config.blank?
  database_config = YAML::load(File.open('config/database.yml'))
end

ActiveRecord::Base.establish_connection(database_config)

after do
  ActiveRecord::Base.connection.close
end

get '/' do
  File.read(File.join('public', 'index.html'))
end
