require 'resources/labels'

describe 'labels' do
  describe "#get '/label'" do
    it 'returns a list of all labels' do
      get '/label'

      expect(last_response.status).to eq 200
      expect(JSON.parse(last_response.body).empty?).to eq false
    end
  end

  describe "#get '/label/:id'" do
    context 'when a valid label id is entered' do
      it 'returns the info of a label' do
        get '/label/1'

        expect(last_response.status).to eq 200
        expect(JSON.parse(last_response.body)['name']).to eq 'Prosthetic Records'
      end
    end

    context 'when an invalid id is entered' do
      it 'returns a 404' do
        get '/label/horse-dagger'

        expect(last_response.status).to eq 404
        expect(JSON.parse(last_response.body)).to eq 'No label found.'
      end
    end
  end

  describe "#get '/label/:id/bands'" do
    context 'when a valid label id is entered' do
      it 'returns the bands for that label' do
        get '/label/1/bands'

        expect(last_response.status).to eq 200
        expect(JSON.parse(last_response.body).first['name']).to eq 'Scale the Summit'
      end
    end

    context 'when an invalid id is entered' do
      it 'returns a 404' do
        get '/label/horse-dagger/bands'

        expect(last_response.status).to eq 404
        expect(JSON.parse(last_response.body)).to eq 'No label found.'
      end
    end

    context 'when there are no bands for a label' do
      it 'returns a no bands found error' do
        get '/label/3/bands'

        expect(last_response.status).to eq 400
        expect(JSON.parse(last_response.body)).to eq 'No bands found for that label.'
      end
    end
  end
end
