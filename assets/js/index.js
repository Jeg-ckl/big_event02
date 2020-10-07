getUserInfo();
$(function() {
    // 退出功能
    $("#btn_tuichu").on('click', function() {
        layer.confirm('确定要退出？', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem('token')
            location.href = './login.html'
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
            randerAvatar(response.data, name);
        }
    });
}

/**
 * 渲染用户昵称和头像
 */
function randerAvatar(user, name) {
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