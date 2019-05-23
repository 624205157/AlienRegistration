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
    return window.AndroidInterface.userInfo()
}

/**
 * 获取用户数据
 */
function userInfoNew() {
    return window.AndroidWebView.showInfoFromJs('userInfoNew','','','','','','','','','','','','','','','','','','','');
}

/**
 * 重新扫描
 */
 function rescan() {
    window.AndroidInterface.scan()
 }

/**
 * 重新扫描
 */
 function scan() {
    window.AndroidWebView.showInfoFromJs('scan','','','','','','','','','','','','','','','','','','','');
 }

 /**
  * 重新扫描
  */
  function uploadImg() {
     window.AndroidInterface.uploadImg()
  }

 /**
  * 人像扫描
  */
  function startView() {
     //window.AndroidInterface.startView()
     window.AndroidWebView.showInfoFromJs('record','','','','','','','','','','','','','','','','','','','');
  }

    /**
      * 回放人像扫描
      */
    function preview() {
        //window.AndroidInterface.preview();
        window.AndroidWebView.showInfoFromJs('preview','','','','','','','','','','','','','','','','','','','');
    }

    /**
      * 回放人像扫描
      */
    function save(xxzd, ywm, ywx, zwxm, xb, lxdh, gjdq, zjhm, zjlx, zjdq, tlsy, sspcs, gnlxr, gnlxdh, nlksj, type, fzdh, fwdz, csrq) {
        //window.AndroidInterface.preview();
        window.AndroidWebView.showInfoFromJs('save', xxzd, ywm, ywx, zwxm, xb, lxdh, gjdq, zjhm, zjlx, zjdq, tlsy, sspcs, gnlxr, gnlxdh, nlksj, type, fzdh, fwdz, csrq);
    }

    /**
       * 我是外国人跳转页面
       */
    function wgr() {
        window.AndroidWebView.showInfoFromJs('wgr', '', '', '');
    }

    /**
       * 英文我是外国人跳转页面
       */
    function ywwgr() {
        window.AndroidWebView.showInfoFromJs('ywwgr', '', '', '');
    }

    /**
       * 我是外国人跳转页面
       */
    function getFwxx() {
        return window.AndroidWebView.showInfoFromJs('fwxx','','','','','','','','','','','','','','','','','','','');
    }

    /**
       * 确认提交页面js
       */
    function fhscan(type) {
        return window.AndroidWebView.showInfoFromJs(type);
    }