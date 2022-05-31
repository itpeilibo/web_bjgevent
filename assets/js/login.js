$(function () {
  // 点击登录隐藏自己 显示注册
  $('#link_reg').click( () => {
    $('.login-box').hide();
    $('.reg-box').show();
  })
  // 点击注册隐藏自己 显示登录
  $('#link_login').click( () => {
    $('.login-box').show();
    $('.reg-box').hide();
  })
  // 引入 form 模块
const form = layui.form
  // 获取 layui 弹窗
const layer = layui.layer

// 自定义检验规则
form.verify({
  // 自定义一个叫 pwd 的校验规则
  pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
  // 校验两次密码是否一致的规则
  repwd: (value) => {
    // 1、获取当前输入的值
    // 2、获取密码框的值
    // 3、两者进行判断
    // 4、如果不一致，提示消息
    const pwd = $('#form_reg [name=password]').val();
    if (pwd !== value) return "两次输入密码不一致"
  }
  
});
// 设置baseUrl根路径
  // const baseUrl = 'http://www.liulongbin.top:3007'
  
  // 监听注册表单，发送注册请求
  $('#form_reg').on('submit', (e) => {
    // 阻止表单提交的默认事件
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url:'/api/reguser',
      data: {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val(),
      },
      success: (res) => {
        if (res.status !== 0) return layer.msg('注册失败')
        layer.msg('注册成功')
        // 注册成功后跳转到登录界面
        $('#link_login').click()
      }
    })

  })

  // 登录功能
  $('#form_login').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url:'/api/login',
      // serialize()将表单内容序列化成一个字符串
      data: $(this).serialize(),
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) return layer.msg('登录失败')
        layer.msg('登录成功')
        // 登陆成功后需要把 token 令牌存放到本地
        localStorage.setItem('token', res.token)
        // 跳转到主页
        location.href = '/index.html'
      }
    })
  })
})
