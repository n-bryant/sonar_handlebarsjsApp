class CreateSongGenresTable < ActiveRecord::Migration[5.0]

  def up
    create_table :song_genres do |t|
      t.belongs_to :song, :foreign_key => 'songs.id'
      t.belongs_to :genre, :foreign_key => 'genres.id'
    end
  end

  def down
    drop_table :song_genres
  end
end

def main
  action = (ARGV[0] || :up).to_sym

  CreateSongGenresTable.migrate(action)
end

main if __FILE__ == $PROGRAM_NAME
