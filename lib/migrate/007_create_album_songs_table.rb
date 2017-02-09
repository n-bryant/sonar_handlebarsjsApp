class CreateAlbumSongsTable < ActiveRecord::Migration[5.0]

  def up
    create_table :album_songs do |t|
      t.belongs_to :album, :foreign_key => 'albums.id'
      t.belongs_to :song, :foreign_key => 'songs.id'
    end
  end

  def down
    drop_table :album_songs
  end
end

def main
  action = (ARGV[0] || :up).to_sym

  CreateAlbumSongsTable.migrate(action)
end

main if __FILE__ == $PROGRAM_NAME
