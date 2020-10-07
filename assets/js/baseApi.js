$.ajaxPrefilter(function(options) {
    // 统一拼接根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    // 统一为有权限的接口设置请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    };

    // 统一挂载complete 属性（无论请求成功还是失败都会调用这个回调函数）
    options.complete = function(res) {
        // 判断返回的参数
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1.清空token
            localStorage.removeItem('token');
            // 2.跳转到login页面
            location.href = 'login.html'
        }
    }
})