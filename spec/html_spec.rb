require 'pry'
require 'rspec'
require 'rack/test'
require 'resources/html'

include Rack::Test::Methods

def app
  Sinatra::Application
end

describe 'html' do
  describe "#get '/'" do
    it 'returns the homepage' do
      get '/'

      # TODO: figure out capybara
      expect(last_response.status).to eq 200
    end
  end
end
