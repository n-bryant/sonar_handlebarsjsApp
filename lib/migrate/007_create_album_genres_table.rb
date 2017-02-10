class CreateAlbumGenresTable < ActiveRecord::Migration[5.0]

  def up
    create_table :album_genres do |t|
      t.belongs_to :album, :foreign_key => 'albums.id'
      t.belongs_to :genre, :foreign_key => 'genres.id'
    end
  end

  def down
    drop_table :album_genres
  end
end

def main
  action = (ARGV[0] || :up).to_sym

  CreateAlbumGenresTable.migrate(action)
end

main if __FILE__ == $PROGRAM_NAME
