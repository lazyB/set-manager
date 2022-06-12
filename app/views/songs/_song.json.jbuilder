json.extract! song, :id, :bpm, :title, :last_played, :status, :created_at, :updated_at
json.url song_url(song, format: :json)
