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
    console.log(this)
    var formData = new FormData(this);
    var url = $(this).attr('action')
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
      $('.contents-messages').append(html)
      $('.input-area').val('')
    })
  })
});