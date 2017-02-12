require_relative '../models/album'

class CreateAlbumsTable < ActiveRecord::Migration[5.0]

  def up
    create_table :albums do |t|
      t.belongs_to :band, :foreign_key => 'bands.id'
      t.string     :image
      t.belongs_to :label, :foreign_key => 'labels.id'
      t.string     :name
      t.string     :release_date
    end
  end

  def down
    drop_table :albums
  end
end

def main
  action = (ARGV[0] || :up).to_sym

  CreateAlbumsTable.migrate(action)
end

main if __FILE__ == $PROGRAM_NAME
