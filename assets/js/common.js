// 设置统一的根路径
$.ajaxPrefilter(function  (options) {
  // 用形参接收发送Ajax之前的所有信息
  options.url = 'http://ajax.frontend.itheima.net' + options.url
  // 根据请求路径，判断是否需要token
  if (options.url.includes('/my')) {
    // 获取token的本地存储
    options.headers = {Authorization:localStorage.getItem('token')}
  }
  // 根据是否有token，能否在登陆的时候获取头像和用户名，设置防翻墙
  options.complete = function  (res) {
    // console.log(res);
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      location.href = '../../login.html'
    }
  }

})