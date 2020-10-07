$(function() {
    // 去注册按钮
    $("#reg-link").on('click', function() {
        $(".login-box").hide()
        $(".reg-box").show()
        $('.layui-input').val('')
    });

    // 去登录按钮
    $("#login-link").on('click', function() {
        $(".reg-box").hide()
        $(".login-box").show()
        $('.layui-input').val('')
    })

    // 密码框验证
    var form = layui.form; // 获取 layui form对象
    var layer = layui.layer; // 获取 layer 对象
    form.verify({
        // 密码框验证规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 确认密码验证
        rePwd: function(value) {
            if (value !== $(".reg-box [name='password']").val()) {
                return '两次输入的密码不一致!';
            }
        }
    })

    // 登录请求
    $("#form_login").on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('用户名不存在或密码错误!')
                }
                layer.msg('登录成功!');
                localStorage.setItem('token', res.token)
                location.href = './index.html'
            }
        });
    })

    // 注册请求
    $("#form_reg").on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录!')
                setTimeout(function() {
                    $('.layui-input').val('')
                    $("#login-link").click(); // 手动调用点击事件
                }, 500)
            }
        });
    })
})