class Message < ApplicationRecord
  belong_to :user
  belong_to :group
  
  validates :body, presence: true, unless: image?
  mount_uploader :image, ImageUploader
end
