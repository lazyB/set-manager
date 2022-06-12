class CreateSongs < ActiveRecord::Migration[7.0]
  def change
    create_table :songs do |t|
      t.integer :bpm
      t.string :title
      t.date :last_played
      t.string :status

      t.timestamps
    end
  end
end
