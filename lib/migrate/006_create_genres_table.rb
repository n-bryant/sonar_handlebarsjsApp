require_relative '../models/song'

class CreateGenresTable < ActiveRecord::Migration[5.0]

  def up
    create_table :genres do |t|
      t.string :name
    end
  end

  def down
    drop_table :genres
  end
end

def main
  action = (ARGV[0] || :up).to_sym

  CreateGenresTable.migrate(action)
end

main if __FILE__ == $PROGRAM_NAME
