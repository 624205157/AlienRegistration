/**
 * Created by HEL on 2017/4/23.
 * html 根据参数获取链接值
 * name :链接传递KEY
 * return :name 对应参数
 */

/*function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}*/

var LocString=String(window.document.location.href);
 function GetQueryString(str){
 var rs=new RegExp("(^|)"+str+"=([^&]*)(&|$)","gi").exec(LocString),tmp;
 if(tmp=rs)return tmp[2];
 return "没有这个参数";
 }