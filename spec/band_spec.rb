require 'resources/bands'

describe 'bands' do
  describe "#get '/band'" do
    it 'returns a list of all bands' do
      get '/band'

      expect(last_response.status).to eq 200
      expect(JSON.parse(last_response.body).empty?).to eq false
    end
  end

  describe "#get '/band/:id'" do
    context 'when a valid band id is entered' do
      it 'returns the info of a band' do
        get '/band/1'

        expect(last_response.status).to eq 200
        expect(JSON.parse(last_response.body)['name']).to eq 'STS'
      end
    end

    context 'when an invalid id is entered' do
      it 'returns a 404' do
        get '/band/horse-dagger'

        expect(last_response.status).to eq 404
        expect(JSON.parse(last_response.body)).to eq 'No band found.'
      end
    end
  end

  describe "#get /band/:id/biography" do
    context 'when a valid band id is entered' do
      it 'returns the info of a band' do
        get '/band/1/biography'

        expect(last_response.status).to eq 200
        expect(JSON.parse(last_response.body)['origin_date']).to eq '2004'
      end
    end

    context 'when an invalid id is entered' do
      it 'returns a 404' do
        get '/band/horse-dagger/biography'

        expect(last_response.status).to eq 404
        expect(JSON.parse(last_response.body)).to eq 'No band found.'
      end
    end
  end
end
