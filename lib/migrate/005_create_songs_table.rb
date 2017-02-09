require_relative '../models/song'

class CreateSongsTable < ActiveRecord::Migration[5.0]

  def up
    create_table :songs do |t|
      t.belongs_to :album, :foreign_key => 'albums.id'
      t.belongs_to :band, :foreign_key => 'bands.id'
      t.string :name
      t.string :release_date
    end
  end

  def down
    drop_table :songs
  end
end

def main
  action = (ARGV[0] || :up).to_sym

  CreateSongsTable.migrate(action)
end

main if __FILE__ == $PROGRAM_NAME
