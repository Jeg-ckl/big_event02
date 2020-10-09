$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(value) {
            if (value === $(".layui-form [name=oldPwd]").val()) {
                return '新密码不能和旧密码相同！'
            }
        },
        rePwd: function(value) {
            if (value !== $(".layui-form [name=newPwd]").val()) {
                return '两次输入的密码不一致！'
            }
        }
    })

    // 监听表单提交事件
    $("#formUp").submit(function(e) {
        e.preventDefault();
        let data = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: data,
            success: function(response) {
                if (response.status !== 0) {
                    return layer.msg(response.message)
                }
                layer.msg('修改密码成功，3s后重新登陆！')
                $("#formUp")[0].reset(); // 重置表单数据
                localStorage.removeItem('token') // 清空token
                setTimeout(function() {
                    window.parent.location.href = '../login.html'
                })
            }
        });
    })
})