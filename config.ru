require 'sinatra'
Dir["./lib/resources/*.rb"].each { |file| require file }

set :public_folder, 'public'
run Sinatra::Application
