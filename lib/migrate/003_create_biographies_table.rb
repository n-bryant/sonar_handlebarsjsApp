require_relative '../models/biography'

class CreateBiographiesTable < ActiveRecord::Migration[5.0]

  def up
    create_table :biographies do |t|
      t.string :background
      t.string :image_path
      t.string :members
      t.string :origin_date
      t.belongs_to :band, :foreign_key => 'bands.id'
    end
  end

  def down
    drop_table :biographies
  end
end

def main
  action = (ARGV[0] || :up).to_sym

  CreateBiographiesTable.migrate(action)
end

main if __FILE__ == $PROGRAM_NAME
