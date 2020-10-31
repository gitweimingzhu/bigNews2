$(function  ( ) {
  //获取用户的基本信息
  $.ajax({
    url: '/my/userinfo',
    success: function  (info) {
      if (info.status === 0) {
        var form = layui.form
        form.val("formTest",info.data)
      }
    }
  })

  // 表单校验
  
})