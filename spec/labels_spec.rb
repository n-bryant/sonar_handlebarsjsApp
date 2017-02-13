require 'resources/labels'

# TODO: Write tests that mirror the way params are passed in on live site

describe 'labels' do

  before :each do
    @prosthetic_params = {
      headquarters: 'Los Angeles, California',
      homepage: 'http://prostheticrecords.com/',
      logo_path: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/59/Prostheticrecords.png/180px-Prostheticrecords.png',
      name: 'Prosthetic Records'
    }

    @new_params = {
      headquarters: 'Bologna, Italy',
      homepage: 'https://en.wikipedia.org/wiki/More_Cowbell',
      logo_path: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fc/Walken-Cowbell.jpg/220px-Walken-Cowbell.jpg',
      name: 'Bruce Dickinson Records'
    }
  end

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
        expect(JSON.parse(last_response.body)).to eq 'Label not found.'
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
        expect(JSON.parse(last_response.body)).to eq 'Label not found.'
      end
    end

    context 'when there are no bands for a label' do
      it 'returns a no bands found error' do
        get '/label/2/bands'

        expect(last_response.status).to eq 400
        expect(JSON.parse(last_response.body)).to eq 'No bands found for that label.'
      end
    end
  end

  # describe "post '/label'" do
  #   context 'when complete parameters are given' do
  #     it 'creates a new label' do
  #       post '/label', @prosthetic_params
  #
  #       expect(last_response.status).to eq 201
  #       expect(Label.last['name']).to eq 'Prosthetic Records'
  #     end
  #   end
  #
  #   context 'when incomplete parameters are given' do
  #     it 'returns an invalid input error' do
  #       @prosthetic_params['name'] = ''
  #       post '/label', @prosthetic_params
  #
  #       expect(last_response.status).to eq 400
  #       expect(JSON.parse(last_response.body)).to eq 'Fields cannot be blank.'
  #     end
  #   end
  # end
  #
  # describe "put '/label'" do
  #   context 'when complete parameters are given' do
  #     it 'updates a label' do
  #       put '/label/3', @new_params
  #
  #       expect(last_response.status).to eq 200
  #       expect(Label.find_by_id(3)['name']).to eq 'Bruce Dickinson Records'
  #     end
  #   end
  #
  #   context 'when incomplete parameters are given' do
  #     it 'returns an invalid input error' do
  #       @new_params['name'] = ''
  #       put '/label/3', @new_params
  #
  #       expect(last_response.status).to eq 400
  #       expect(JSON.parse(last_response.body)).to eq 'Fields cannot be blank.'
  #     end
  #   end
  #
  #   context 'when an invalid id is entered' do
  #     it 'returns a 404' do
  #       put '/label/horse-dagger', @new_params
  #
  #       expect(last_response.status).to eq 400
  #       expect(JSON.parse(last_response.body)).to eq 'Label not found.'
  #     end
  #   end
  # end
  #
  # describe "#delete '/label/:id'" do
  #   context 'when a valid label id is entered' do
  #     it 'deletes the label' do
  #       last_label_id = Label.last.id
  #       delete "/label/#{last_label_id}"
  #
  #       expect(last_response.status).to eq 200
  #       expect(Label.find_by_id(last_label_id)).to eq nil
  #     end
  #   end
  #
  #   context 'when an invalid label id is entered' do
  #     it 'returns an unable to delete error' do
  #       delete "/label/horse-dagger"
  #
  #       expect(last_response.status).to eq 400
  #       expect(JSON.parse(last_response.body)).to eq 'No label with that id, unable to delete.'
  #     end
  #   end
  # end
end
