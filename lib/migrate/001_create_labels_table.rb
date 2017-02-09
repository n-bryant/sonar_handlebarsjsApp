require_relative '../models/label'

class CreateLabelsTable < ActiveRecord::Migration[5.0]

  def up
    create_table :labels do |t|
      t.string :headquarters
      t.string :homepage
      t.string :logo_path
      t.string :name
    end
  end

  def down
    drop_table :labels
  end
end

def main
  action = (ARGV[0] || :up).to_sym

  CreateLabelsTable.migrate(action)
end

main if __FILE__ == $PROGRAM_NAME
