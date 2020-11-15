$(function () {
  //  1. 启用富文本编辑器
  initEditor()

  // 2. 创建裁切区
  // 2.1 获取裁剪区域的 DOM 元素
  var $img = $('#image')

  // 2.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 400 / 280,
    // 指定预览区域
    preview: '.img-preview',
  }

  // 2.3 创建裁剪区域
  $img.cropper(options)

  // 3. 发送ajax请求获取分类数据
  $.ajax({
    url: '/my/article/cates',
    success: function (info) {
      if (info.status === 0) {
        var htmlStr = template('categoryList', info)
        $('#cate_id').html(htmlStr)
        // 全部更新渲染
        layui.form.render()
      }
    },
  })

  // 4.单击选择封面的按钮弹出选择图片对话框
  $('.btn-upload').on('click', function () {
    $('#avatar').click()
  })
  // 5. 实现图片的本地预览功能
  $('#avatar').on('change', function () {
    var file = this.files[0]
    var imgUrl = URL.createObjectURL(file)
    // 实现本地预览功能 需要先销毁之前的 然后再显示新的
    $('#image')
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', imgUrl) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })

  // 6. 发布新文章
  // 6.1  给两个按钮同时注册click事件
  // 注意:不能给表单注册提交事件
  $('.btn').on('click',function (e) {
    e.preventDefault()
    // 准备数据
    var fd = new FormData($('.myForm')[0])
    if ($(this).hasClass('btn-public')) {
      fd.append('state', '已发布')
    } else {
      fd.append('state', '草稿')
    }
    // 将裁剪之后的图片，转化为 blob 对象
    $img
      .cropper('getCroppedCanvas', {
        width: 400,
        height: 280,
      })
      .toBlob(function (blob) {
        fd.append('cover_img', blob)

        fd.append('content', tinyMCE.activeEditor.getContent())
        $.ajax({
          type: 'POST',
          url: '/my/article/add',
          data: fd,
          // 注意: FormData的数据发送给服务器的时候，一定一定一定要添加下面这两行代码
          contentType: false,// 不要添加那种请求头格式
          processData: false,// 内部不要转换成查询字符串
          success: function (info) {
            layer.msg(info.message)
            if (info.status === 0) {
               // 发表文章成功之后，立即跳转到文章列表页面
              location.href = '../../../article/article-list.html'
            }
          },
        })
      })
  })
  
})


