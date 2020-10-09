getUserInfo();
$(function() {
    var layer = layui.layer;
    // 实现推出功能
    $("#btn_tuichu").click(function() {
        // 提示用户是否退出
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 1. 清空本地存储的token
            localStorage.removeItem('token');
            // 2.跳转到登录页面
            location.href = './login.html';
            layer.close(index);
        });

    })
})

/**
 * 获取用户信息
 */
function getUserInfo() {
    var layer = layui.layer
    $.ajax({
        type: "GET",
        async: false, // 设置为非异步请求
        url: "/my/userinfo",
        success: function(response) {
            if (response.status !== 0) {
                return layer.msg('获取用户信息失败！')
            }
            randerAvatar(response.data);
        }
    });
}

/**
 * 渲染用户昵称和头像
 */
function randerAvatar(user) {
    // 渲染名称
    var name = user.nickname || user.username
    $('.uname').text(name);
    // 渲染头像
    if (user.user_pic !== null) {
        $(".layui-nav-img").attr('src', user.user_pic).show();
        $(".text-avatar").hide()
    } else {
        $(".text-avatar").show()
        $(".layui-nav-img").hide()
        var fname = name[0].toUpperCase();
        $(".text-avatar").text(fname);
    }
}