json.body  @message.body
json.user_id  @message.user.id
json.user_name  @message.user.name
json.date @message.created_at.strftime("%Y%m%d")