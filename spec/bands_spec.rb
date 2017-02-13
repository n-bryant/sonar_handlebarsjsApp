require 'resources/bands'

describe 'bands' do

  before :each do
    @sts_params = {
      active: true,
      biography: {
        background: 'Scale the Summit is an American instrumental progressive metal band based out of Houston, Texas. It formed in 2004 and signed to Prosthetic Records. The band is influenced by other progressive acts such as Cynic and Dream Theater. The band gained notice as part of the Progressive Nation 2009 tour with Dream Theater, Zappa Plays Zappa and Bigelf.',
        image_path: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/ScaleTheSummit121509.jpg/250px-ScaleTheSummit121509.jpg',
        members: 'Chris Letchford, Charlie Engen',
        origin_date: 2004
      },
      genres: [
        'Progressive Metal',
        'Instrumental Rock'
      ],
      label: 'Prosthetic Records',
      name: 'Scale the Summit'
    }

    @new_params = {
      active: false,
      biography: {
        background: 'Scale the Cowbell was an Italian cowbell band based out of Bologna, Italy. It formed in 1976 and signed to Bruce Dickinson Records. The band was influenced by other cowbell acts such as Blue Oyster Cult and War. The band gained notice as part of the Cowbell United tour with War, Led Zepplin, and the Rolling Stones.',
        image_path: 'http://media.gettyimages.com/photos/episode-19-aired-05142005-pictured-will-ferrell-as-gene-frenkle-with-picture-id138426499',
        members: 'Will Ferrell, Charlie Engen',
        origin_date: 1976
      },
      genres: [ 'Cowbell' ],
      label: 'Bruce Dickinson Records',
      name: 'Scale the Cowbell'
    }
  end

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
        expect(JSON.parse(last_response.body)['name']).to eq 'Scale the Summit'
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

  describe "#get '/band/:id/biography'" do
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

  describe "#get '/band/:id/discography'" do
    context 'when a band with albums is entered' do
      it 'returns all albums by that band' do
        get '/band/1/discography'

        expect(last_response.status).to eq 200
        expect(JSON.parse(last_response.body).first['name']).to eq 'Monument'
      end
    end

    context 'when a band with no albums is entered' do
      it 'returns a no albums error' do
        get '/band/2/discography'

        expect(last_response.status).to eq 400
        expect(JSON.parse(last_response.body)).to eq 'No albums found for that band.'
      end
    end

    context 'when an invalid id is entered' do
      it 'returns a 404' do
        get '/band/horse-dagger/discography'

        expect(last_response.status).to eq 404
        expect(JSON.parse(last_response.body)).to eq 'No band found.'
      end
    end
  end

  describe "#get '/band/:id/images'" do
    context 'when a band with images is entered' do
      it 'returns all images for that band' do
        get '/band/1/images'

        expect(last_response.status).to eq 200
        expect(JSON.parse(last_response.body).first['id']).to eq 1
      end
    end

    context 'when a band with no images is entered' do
      it 'returns a no images error' do
        get '/band/10/images'

        expect(last_response.status).to eq 400
        expect(JSON.parse(last_response.body)).to eq 'No images found for that band.'
      end
    end

    context 'when an invalid id is entered' do
      it 'returns a 404' do
        get '/band/horse-dagger/images'

        expect(last_response.status).to eq 404
        expect(JSON.parse(last_response.body)).to eq 'No band found.'
      end
    end
  end

  describe "#get '/band/:id/songs'" do
    context 'when a band with songs is entered' do
      it 'returns a list of songs for that band' do
        get '/band/1/songs'

        expect(last_response.status).to eq 200
        expect(JSON.parse(last_response.body).first['name']).to eq 'Omni'
      end
    end

    context 'when a band with no songs is entered' do
      it 'returns a no songs error' do
        get '/band/2/songs'

        expect(last_response.status).to eq 400
        expect(JSON.parse(last_response.body)).to eq 'No songs found for that band.'
      end
    end

    context 'when an invalid id is entered' do
      it 'returns a 404' do
        get '/band/horse-dagger/discography'

        expect(last_response.status).to eq 404
        expect(JSON.parse(last_response.body)).to eq 'No band found.'
      end
    end
  end

  describe "#post '/band'" do
    context 'when valid band information is entered' do
      it 'creates a new band' do
        post '/band', @sts_params

        expect(last_response.status).to eq 201
        expect(JSON.parse(last_response.body)['name']).to eq 'Scale the Summit'
      end
    end

    context 'when a label is not entered' do
      it 'returns a no label error' do
        @sts_params['label'] = ''
        post '/band', @sts_params

        expect(last_response.status).to eq 400
        expect(JSON.parse(last_response.body)).to eq 'Invalid label.'
      end
    end

    context 'when the band name is not entered' do
      it 'returns a no name error' do
        @sts_params['name'] = ''
        post '/band', @sts_params

        expect(last_response.status).to eq 400
        expect(JSON.parse(last_response.body)).to eq 'Name and active status are required.'
      end
    end

    context 'when the biography is not an object' do
      it 'returns an incorrect format error' do
        @sts_params['biography'] = ''
        post '/band', @sts_params

        expect(last_response.status).to eq 400
        expect(JSON.parse(last_response.body)).to eq 'Biography should be an object.'
      end
    end

  context 'when an empty biography is entered' do
    it 'returns a empty biography error' do
      @sts_params[:biography] = {}
      post '/band', @sts_params

      expect(last_response.status).to eq 400
      expect(JSON.parse(last_response.body)).to eq 'Biography is empty.'
    end
  end

  context 'when an incomplete biography is entered' do
    it 'returns a bad biography error' do
      @sts_params[:biography] = { background: 'Former pokemon trainer'}
      post '/band', @sts_params

      expect(last_response.status).to eq 400
      expect(JSON.parse(last_response.body)).to eq 'Incomplete biography.'
    end
  end

    context 'when an entered genre does not exist' do
      it 'returns an invalid genre error' do
        @sts_params['genres'] = ['Pikachu']
        post '/band', @sts_params

        expect(last_response.status).to eq 400
        expect(JSON.parse(last_response.body)).to eq 'Invalid genre.'
      end
    end

    context 'when genres is not an array of strings' do
      it 'returns an incorrect format error' do
        @sts_params['genres'] = [{ genre: 'Rock' }, { genre: 'More Rock' }]
        post '/band', @sts_params

        expect(last_response.status).to eq 400
        expect(JSON.parse(last_response.body)).to eq 'Genres should be an array of strings.'
      end
    end
  end

  describe "#put '/band/:id'" do
    context 'when valid band information is entered' do
      it 'updates the selected band' do
        put '/band/2', @new_params
        band = Band.find_by_id(2)

        expect(last_response.status).to eq 200
        expect(JSON.parse(last_response.body)['name']).to eq 'Scale the Cowbell'
      end
    end

    context 'when a label is not entered' do
      it 'returns a no label error' do
        @new_params[:label] = ''
        put '/band/2', @new_params

        expect(last_response.status).to eq 200
      end
    end

    context 'when the band name is not entered' do
      it "doesn't change the name" do
        @new_params['name'] = ''
        put '/band/3', @new_params

        expect(last_response.status).to eq 200
        expect(JSON.parse(last_response.body)['name']).to eq 'Scale the Summit'
      end
    end

    context 'when the biography is not an object' do
      it 'gives not a single care' do
        @new_params['biography'] = ''
        put '/band/4', @new_params

        expect(last_response.status).to eq 200
        expect(JSON.parse(last_response.body)['name']).to eq 'Scale the Cowbell'
      end
    end

    context 'when an empty biography is entered' do
      it 'still does not care' do
        @new_params[:biography] = {}
        put '/band/5', @new_params

        expect(last_response.status).to eq 200
        expect(JSON.parse(last_response.body)['name']).to eq 'Scale the Cowbell'
      end
    end

    context 'when an incomplete biography is entered' do
      it 'changes only what was entered' do
        @new_params[:biography] = { background: 'Anchorman' }
        put '/band/5', @new_params

        expect(last_response.status).to eq 200
        expect(Band.find_by_id(5).biography.background).to eq 'Anchorman'
        expect(Band.find_by_id(5).biography.origin_date).to eq '2004'
      end
    end
  end

  describe "#delete '/band/:id'" do
    context 'when a valid band id is entered' do
      it 'deletes the band' do
        last_band_id = Band.last.id
        delete "/band/#{last_band_id}"

        expect(last_response.status).to eq 200
        expect(Band.find_by_id(last_band_id)).to eq nil
      end
    end

    context 'when an invalid band id is entered' do
      it 'returns an unable to delete error' do
        delete "/band/horse-dagger"

        expect(last_response.status).to eq 400
        expect(JSON.parse(last_response.body)).to eq 'No band with that id, unable to delete.'
      end
    end
  end

  describe "#post '/band/:id/rating'" do
    context 'when a valid id is entered' do
      it 'gives the band a rating' do
        post '/band/1/rating', rating: 5

        expect(last_response.status).to eq 201
        expect(JSON.parse(last_response.body)['rating_avg']). to eq 5
      end
    end

    context 'when an invalid id is entered' do
      it 'returns an unable to rate error' do
        post '/band/horse-dagger/rating', rating: 5

        expect(last_response.status).to eq 400
        expect(JSON.parse(last_response.body)).to eq 'No band with that id, unable to rate.'
      end
    end

    context 'when a non-numeric raitng is entered' do
      it 'returns an invalid rating error' do
        post '/band/1/rating', rating: 'Face-Melting'

        expect(last_response.status).to eq 400
        expect(JSON.parse(last_response.body)).to eq 'Rating should be a number.'
      end
    end
  end

  describe "#delete '/band/:id/rating'" do
    context 'when a valid band id is entered' do
      it 'deletes the rating for band' do
        delete '/band/1/rating'

        expect(last_response.status).to eq 200
        expect(Band.find_by_id(1).rating_avg).to eq nil
      end
    end

    context 'when an invalid band id is entered' do
      it 'returns an unable to delete error' do
        delete "/band/horse-dagger/rating"

        expect(last_response.status).to eq 400
        expect(JSON.parse(last_response.body)).to eq 'No band with that id, unable to delete the rating.'
      end
    end
  end
end
