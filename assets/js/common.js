// 设置统一的根路径
$.ajaxPrefilter(function  (options) {
  // 用形参接收发送Ajax之前的所有信息
  options.url = 'http://ajax.frontend.itheima.net' + options.url
  // 
})