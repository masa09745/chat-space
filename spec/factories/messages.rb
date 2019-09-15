FactoryBot.define do
  factory :message do
    body {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/test_image.jpg")}
    user
    group
  end
end