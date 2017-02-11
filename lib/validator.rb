class Validator
  def self.genres_are_valid?(genres)
    return false unless genres_is_an_array?(genres)

    all_genres_are_hashes?(genres)
  end

  def self.all_genres_are_hashes?(genres)
    genres.each do |genre|
      return false unless genre_is_a_hash?(genre)
    end

    true
  end

  def self.genres_is_an_array?(genres)
    genres.class == Array
  end

  def self.genre_is_a_hash?(genre)
    genre.class == Hash
  end
end
