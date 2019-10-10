$(document).on('turbolinks:load', function(){

  var search_list = $("#user-search-result");

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

  var member_list = $("#chat-group-users");

  function addUser(userId,userName) {
    var html = `
                <div class='chat-group-user clearfix js-chat-member' id='${userId}'>
                  <input name='group[user_ids][]' type='hidden' value='${userId}'>
                    <p class='chat-group-user__name'>${userName}</p>
                    <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`;
    member_list.append(html);
    }

  function removeUser(user) {
    var html = `
                 <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.userName }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.userId}" data-user-name="${user.userName}">追加</a>
                </div>`;
      search_list.append(html);
     }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users){
      $("#user-search-result").empty();
      if (input.length !== 0) {
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

  $('#user-search-result').on('click','.user-search-add', function(){
    $('#chat-group-users').val();
    var userId = $(this).data('user-id');
    var userName = $(this).data('user-name');
    addUser(userId,userName);
    $(this).parent().remove();
    });

  $('#chat-group-users').on('click','.user-search-remove',function(){
    event.stopPropagation();
    var remove_user = $(this).data();
    removeUser(remove_user);
  });
  return false;
});