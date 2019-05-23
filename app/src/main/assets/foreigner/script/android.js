/**
 * js调用安卓接口
 */

/**
 * 页面跳转
 */
function go() {
    window.AndroidInterface.go()
}

/**
 * 获取用户数据
 */
function userInfo() {
    window.AndroidInterface.userInfo()
}

/**
 * 获取用户数据
 */
function tiaozhuan(url) {
    window.AndroidWebView.showInfoFromJs('tiaozhuan', '', url, '');
}
