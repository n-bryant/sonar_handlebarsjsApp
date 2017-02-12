require 'resources/genres'

describe 'genres' do

  describe "#get '/genre'" do
    it 'returns a list of all genres' do
      get '/genre'

      expect(last_response.status).to eq 200
      expect(JSON.parse(last_response.body).empty?).to eq false
    end
  end

  describe "#get '/genre/:id/bands'" do
    context 'when a valid id is entered' do
      it 'returns all bands for that genre' do
        get '/genre/1/bands'

        expect(last_response.status).to eq 200
        expect(JSON.parse(last_response.body).first['name']).to eq 'Scale the Summit'
      end
    end

    context 'when an invalid id is entered' do
      it 'returns a 404' do
        get '/genre/horse-dagger/bands'

        expect(last_response.status).to eq 404
        expect(JSON.parse(last_response.body)).to eq 'Genre not found.'
      end
    end

    context 'when there are no bands for a genre' do
      it 'returns a no bands found error' do
        get '/genre/4/bands'

        expect(last_response.status).to eq 400
        expect(JSON.parse(last_response.body)).to eq 'No bands found for that genre.'
      end
    end
  end
end
