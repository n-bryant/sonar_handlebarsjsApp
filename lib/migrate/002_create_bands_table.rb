require_relative '../models/band'

class CreateBandsTable < ActiveRecord::Migration[5.0]

  def up
    create_table :bands do |t|
      t.boolean :active
      t.belongs_to :label, :foreign_key => 'labels.id'
      t.string :name
      t.float :rating_avg
    end
  end

  def down
    drop_table :bands
  end
end

def main
  action = (ARGV[0] || :up).to_sym

  CreateBandsTable.migrate(action)
end

main if __FILE__ == $PROGRAM_NAME
