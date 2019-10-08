$(function(){
  function buildHTML(message){
    var text = message.body ? `${message.body}` :'';
    var img = message.image ? `<img src= ${message.image}>` : "";
    var html = `<div class="message" data-message-id= '${message.id}'>
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
                      ${text}
                      </p>
                      ${img}
                  </div>
                </div>`
    return html;
  }



  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var href = 'api/messages#index {:format=>"json"}'
      last_message_id = $('.message:last').data('message-id');
      $('.contents-messages').animate({scrollTop: $('.contents-messages')[0].scrollHeight}, 'fast');
      $.ajax({
        url: href,
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML += buildHTML(message);
          $('.contents-messages').append(insertHTML);
        });
      })
      .fail(function() {
        alert('自動更新できませんでした');
      });
    };
  };


  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
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
      $('.input-area__image__file').val('')
    })
    .fail(function(){
      alert('error')
      $('.send-btn').prop('disabled', false);
      $('.input-area__text').val('')
      $('.input-area__image__file').val('')
    })
  })
  setInterval(reloadMessages, 5000);
});
