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

  function appendErrMsgToHTML(user){
    var html = `<div class='chat-group-user clearfix'>${ user }</div>`
    search_list.append(html);
  }

  function addUser(userName,userId)) {
    var html = `
      <div class='chat-group-user clearfix js-chat-member' id='${userId}'>
        <input name='group[user_ids][]' type='hidden' value='${userId}'>
        <p class='chat-group-user__name'>${ userName }</p>
        <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id="${userId}" data-user-name="${userName}">削除</a>
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
      data:  { keyword: input, users_id: users_id },
      dataType: 'json'
    })

    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0) {
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
    return false;
  });

    $("#user-search-result").on("click",".chat-group-user__btn--add" ,function(){
      event.stopPropagation();
      var userId = $(".js-add-btn").attr('data-user-id');
      console.log(userId)
      var userName = $("js-add-btn").attr('data-user-name');
      console.log(userName)
      var count = $(".js-remove-btn").attr('data-user-id');
      if (add_user.userId !== count.userId){
        addUser(userName,userId);
        $(this).parent().remove();
      }else{
        alert(userName + " は登録済みのユーザーです");
      }
    });

    $("#chat-group-users").on("click", ".js-remove-btn", function(){
      event.stopPropagation();
      $(this).parent().remove();
    });
    return false;
  });