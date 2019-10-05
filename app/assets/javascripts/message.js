$(function(){
  function buildHTML(message){
    var html = `<div class="message">
                  <div class="message-index">
                    <div class="message-index__user">
                      ${message.user_name}
                    </div>
                    <div class="message-index__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="message-text">
                    <p class="message-text__body">
                      ${message.body}
                    </p>
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    console.log(this)
    var url = $(this).attr('action')
    $('.contents-messages').animate({ scrollTop: $('.contents-messages')[0].scrollHeight});
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.send-btn').prop('disabled', false);
      $('.contents-messages').append(html)
      $('.input-area__text').val('')
    })
    .fail(function(){
      alert('error')
      $('.send-btn').prop('disabled', false);
      $('.input-area__text').val('')
    })
  })
});