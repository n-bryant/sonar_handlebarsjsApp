Dir["lib/resources/*.rb"].each { |file| require_relative file }

run Sinatra::Application
