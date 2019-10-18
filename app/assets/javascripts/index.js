$(document).on('turbolinks:load', function(){

  var search_list = $("#user-search-result");
  const member_list = $("#chat-group-users");

  function appendbuildHTML(user){
    var html = `
                <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add js-add-btn" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
                </div>`;
      search_list.append(html);
  }

  function appendErrMsgToHTML(msg){
    var html = `<div class='chat-group-user clearfix'>${ msg }</div>`
    search_list.append(html);
  }

  function addUser(adduser) {
    var html = `
      <div class='chat-group-user clearfix js-chat-member' id='${adduser.userId}'>
        <input name='group[user_ids][]' type='hidden' value='${adduser.userId}'>
        <p class='chat-group-user__name'>${ adduser.userName }</p>
        <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id="${adduser.userId}" data-user-name="${adduser.userName}">削除</a>
      </div>`;
    $("#chat-group-users").append(html);
   }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    var users_id = [];
    member_list.find('.chat-group-user').each( function( index, element ) {
    users_id.push(element.id);
    });

    $.ajax({
      type: 'GET',
      url: '/users',
      data:  { keyword: input,users_id: users_id },
      dataType: 'json'
    })

    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0 && input.length !== 0) {
        users.forEach(function(user){
          appendbuildHTML(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザはいません");
      }
    })
    .fail(function(){
      alert('検索に失敗しました');
    })
  });

    $("#user-search-result").on("click",".chat-group-user__btn--add" ,function(){
      event.stopPropagation();
      var adduser = $(this).data();
      addUser(adduser);
      $(this).parent().remove();
    });

    $("#chat-group-users").on("click", ".js-remove-btn", function(){
      event.stopPropagation();
      $(this).parent().remove();
    });
    return false;
  });