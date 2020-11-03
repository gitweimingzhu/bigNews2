$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview',
  }
  // 1.3 创建裁剪区域
  $image.cropper(options)

  //  2.1 给上传按钮注册事件
  $('.btn-upload').on('click', function () {
    // 2.2 触发文件域的点击事件
    $('#avatar').click()
  })
  // 3.1 给文件域注册change事件
  $('#avatar').on('change', function (e) {
    // 获取图片路径，显示图片
    var file = $(this)[0].files[0]
    // var file = e.target.files[0]
    var imgUrl = URL.createObjectURL(file)
    $image
      .cropper('destroy') //先销毁旧的裁剪区域
      .attr('src', imgUrl) //重新设置图片路径
      .cropper(options) //重新初始化裁剪区域
  })

  // 4.1 给确定按钮注册事件
  $('.btn-sure').on('click', function () {
    // 4.2 获取图片的base64格式路径
    var dataURL = $image
      .cropper('getCroppedCanvas', {
        width: 100,
        height: 100,
      })
      .toDataURL('image/png')
    $.ajax({
      type: 'POST',
      url: '/my/update/avatar',
      data: {
        avatar: dataURL,
      },
      success: function (info) {
        layer.msg(info.message)
        if (info.status === 0) {
          parent.window.getUserInfo()
        }
      },
    })
  })
})
