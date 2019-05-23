var base = 'http://crj.gafw.jl.gov.cn/jeecg/';
//var base = 'http://10.14.1.3:8088/';

function dialet(str) {
    var dialog = new auiDialog({});
    dialog.alert({
        title: "提示",
        msg: str,
        buttons: ['确定']
    }, function(ret) {})
}
