//var basePath = 'http://crj.gafw.jl.gov.cn/jeecg/';
var crjbasePath = 'http://221.8.52.247:8445/jit_crj/';

//var basePath = 'http://localhost:8080';

function dialet(str) {
    var dialog = new auiDialog({});
    dialog.alert({
        title: "提示",
        msg: str,
        buttons: ['确定']
    }, function(ret) {})
}
