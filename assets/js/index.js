$(function  ( ) {
  // 在登陆的时候获取头像和用户名
  $.ajax({
    url: '/my/userinfo',
    success: function  (info) {
      if (info.status === 0) {
        // 获取昵称或用户名显示在页面中
        $('.welcome').html(`欢迎&nbsp;&nbsp;${info.data.nickname || info.data.username}`)
        // 获取头像或昵称或用户名
        if (info.data.user_pic) {
          $('.userInfo img').show().attr('src',info.data.user_pic).prev().hide()
        } else if (info.data.nickname) {
          $('.avatar').show().text(info.data.nickname.slice(0,1).toUpperCase()).next().hide()
        } else {
          $('.avatar').show().text(info.data.username.slice(0,1).toUpperCase()).next().hide()
        }
      }
    },
  })

  // 点击按钮实现退出功能
  $('.exit').on('click',function  () {
    //  删除token
    localStorage.removeItem('token')
    // 跳转到login页面
    location.href = '../../login.html'
  })
})