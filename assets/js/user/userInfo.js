$(function() {
    var form = layui.form;
    var layer = layui.layer;
    // 初始化用户基本信息
    initUserInfo(form);
    // 验证规则
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称必须在 1~6 位之间！'
            }
        }
    })

    // 重置表单数据
    $("#resetBtn").on('click', function(e) {
        e.preventDefault();
        // 再次调用获取用户信息的函数
        initUserInfo(form);
    })

    // 监听表单的提交事件
    $("#formUp").on('submit', function(e) {
        e.preventDefault();
        let data = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: data,
            success: function(response) {
                if (response.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！');
                // 调用父页面的中的方法，window.
                window.parent.getUserInfo();
            }
        });
    })
})

function initUserInfo(form) {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        success: function(response) {
            // console.log(response);
            if (response.status !== 0) {
                return layer.msg('获取用户信息失败！')
            }
            form.val('form-userinfo', response.data)
        }
    });
}