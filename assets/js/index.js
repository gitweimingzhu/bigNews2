$(function  ( ) {
  // 在登陆的时候获取头像和用户名
  $.ajax({
    url: '/my/userinfo',
    success: function  (info) {
      console.log(info);
    }
  })
})