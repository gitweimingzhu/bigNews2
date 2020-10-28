$(function () {
  // 实现登录与注册界面的切换
  $('.login a').on('click', function () {
    $('.login').hide().next().show()
  })
  $('.register a').on('click', function () {
    $('.register').hide().prev().show()
  })

  // 表单校验
  var form = layui.form
  form.verify({
    username: function (value, item) {
      //value：表单的值、item：表单的DOM对象
      if (!new RegExp('^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$').test(value)) {
        return '用户名不能有特殊字符'
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        return "用户名首尾不能出现下划线'_'"
      }
      if (/^\d+\d+\d$/.test(value)) {
        return '用户名不能全为数字'
      }
    },
    repass: function (value, item) {
      var passVal = $('.register .pass').val()
      if (passVal !== value) {
        $('.register .pass').val('')
        $('.register .repass').val('')
        return '两次密码不一致'
      }
    },
    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [/^[\d]{6,12}$/, '密码必须6到12位数字，且不能出现空格'],
  })

  // 实现注册功能
  $('.register .myForm').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/api/reguser',
      // 用jQ提供的serialize()方法获取form的信息
      data: $(this).serialize(),
      success: function (info) {
        var layer = layui.layer
        layer.msg(info.message)
        if (info.status === 0) {
          $('.register a').click()
        }
      },
    })
  })

  // 实现登录功能
  $('.login .myForm').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: function (info) {
        var layer = layui.layer
        layer.msg(info.message)
        if (info.status === 0) {
          location.href = '../../index.html'
        }
      }
    })
  })
})
