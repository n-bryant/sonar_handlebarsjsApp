class CreateBandGenresTable < ActiveRecord::Migration[5.0]

  def up
    create_table :band_genres do |t|
      t.belongs_to :band, :foreign_key => 'bands.id'
      t.belongs_to :genre, :foreign_key => 'genres.id'
    end
  end

  def down
    drop_table :band_genres
  end
end

def main
  action = (ARGV[0] || :up).to_sym

  CreateBandGenresTable.migrate(action)
end

main if __FILE__ == $PROGRAM_NAME
