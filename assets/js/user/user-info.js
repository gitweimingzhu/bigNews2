$(function () {
  //获取用户的基本信息渲染表单
  var form = layui.form
  getUser()
  function getUser ( ) {
    $.ajax({
      url: '/my/userinfo',
      success: function (info) {
        if (info.status === 0) {
          form.val('formTest', info.data)
        }
      },
    })
  }

  // 表单校验
  form.verify({
    username: function (value, item) {
      //value：表单的值、item：表单的DOM对象
      if (!new RegExp('^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$').test(value)) {
        return '用户昵称不能有特殊字符'
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        return "用户昵称首尾不能出现下划线'_'"
      }
      if (/^\d+\d+\d$/.test(value)) {
        return '用户昵称不能全为数字'
      }
    },
  })

  // 给按钮注册事件进行用户信息修改
  // 注册submit事件或者click事件都可
  $('.myForm').on('click', '.submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/my/userinfo',
      data: form.val('formTest'),
      success: function (info) {
        layer.msg(info.message)
        if (info.status === 0) {
          // 重新渲染用户信息
          getUser()
          // 重新渲染头像和用户名
          parent.window.getUserInfo()
        }
      },
    })
  })

  // 给重置按钮注册事件
  $('.myForm').on('click', '.reset', function (e) { 
    e.preventDefault()
    //获取用户的基本信息渲染表单
    getUser()
  })

})
