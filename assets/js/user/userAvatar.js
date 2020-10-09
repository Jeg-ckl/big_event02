$(function() {
    // 图片裁剪的初始化及设置
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image');
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options);

    // 监听上传按钮点击事件
    $("#chooseBtn").on('click', function() {
        $("#fileUp").click();
    })
    var layer = layui.layer;
    // 完成选择图片功能
    $("#fileUp").on('change', function(e) {
        // 判断用户是否选择文件
        var filelist = e.target.files // e.target.files === this.files
        if (filelist.length === 0) {
            return layer.msg('请选择文件！')
        };

        // 1.获取用户选择的文件
        var file = e.target.files[0];
        // 2.将文件转换为url路径
        var imgUrl = URL.createObjectURL(file);
        // 3.先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgUrl) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    // 上传图片
    $("#upDataBtn").on('click', function() {
        // 1.拿到用户裁剪过后的图片
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png'); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // 发起请求
        $.ajax({
            type: "POST",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL
            },
            success: function(response) {
                if (response.status !== 0) {
                    return layer.msg('更新头像失败！')
                }
                layer.msg('更新头像成功！');
                // 调用父页面index.html 的js方法 getUserInfo() ,重新渲染欢迎区域
                window.parent.getUserInfo();
            }
        });
    })
});