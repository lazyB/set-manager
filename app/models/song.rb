class Song < ApplicationRecord
  belongs_to :user
  has_one_attached :data_file
end
