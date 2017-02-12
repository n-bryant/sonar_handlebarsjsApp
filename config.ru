require 'json'
require 'sinatra'
require 'yaml'
Dir["./lib/resources/*.rb"].each { |file| require file }

set :public_folder, 'public'
run Sinatra::Application
