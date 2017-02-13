require 'active_record'

class Validator
  def self.genres_are_valid?(genres)
    return false unless genres_is_an_array?(genres)

    all_genres_are_strings?(genres)
  end

  def self.all_genres_are_strings?(genres)
    genres.each do |genre|
      return false unless genre_is_a_string?(genre)
    end

    true
  end

  def self.genres_is_an_array?(genres)
    genres.class == Array
  end

  def self.genre_is_a_string?(genre)
    genre.class == String
  end

  def self.is_numeric?(text)
    text.to_f.to_s == text.to_s || text.to_i.to_s == text.to_s
  end

  def self.delete_empty_params(raw_params)
    raw_params.each do |param|
      delete_empty_params(param) if param_has_inner_elements?(param)
      raw_params.delete(param[0]) if param[1].blank?
    end
  end

  def self.param_has_inner_elements?(param)
    param.class == Hash or param.class == Array
  end
end
