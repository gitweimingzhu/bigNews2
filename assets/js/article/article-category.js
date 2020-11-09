$(function () {
  //1. 获取分类列表
  getList()
  function getList() {
    $.ajax({
      type: 'GET',
      url: '/my/article/cates',
      success: function (info) {
        var htmlStr = template('categoryList', info)
        $('tbody').html(htmlStr)
      },
    })
  }

  // 2.新增文章分类
  // 2.1 给添加按钮注册点击事件
  $('.btn-add').on('click', function () {
    // 2.2 弹出添加文章分类模态框
    window.index = layer.open({
      type: 1,
      title: '添加文章分类',
      content: $('#addCategory').html(),
      area: '500px',
    })
  })
  // 2.3 给确认按钮注册表单提交事件
  // 注意:表单是动态创建出来的，需要事件委托
  $('body').on('submit', '.myForm', function (e) {
    e.preventDefault()
    // 2.4 发送请求
    $.ajax({
      type: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (info) {
        layer.msg(info.message)
        if (info.status === 0) {
          // 2.5 关闭模态框
          layer.close(window.index)
          // 2.6 重新渲染列表
          getList()
        }
      },
    })
  })

  // 3.根据 Id 删除文章分类
  $('tbody').on('click', '.btn-del', function () {
    // 3.1 先获取删除分类的id，再弹出模态框
    var categoryListId = $(this).attr('data-id')
    layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
      //do something
      $.ajax({
        url: '/my/article/deletecate/' + categoryListId,
        success: function (info) {
          layer.msg(info.message)
          if (info.status === 0) {
            // 3.2 重新渲染列表
            getList()
          }
        },
      })
      layer.close(index)
    })
  })

  // 4.给编辑按钮注册事件
})
