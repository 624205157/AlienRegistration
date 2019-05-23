function Check() {
	
	var strFileName=document.getElementById("file").value;
    if (strFileName != "") {
        var strtype = strFileName.substring(strFileName.length - 4, strFileName.length);
        strtype = strtype.toLowerCase();
        if ((strtype == ".jpg") || (strtype == ".gif") || (strtype == "jpeg") || (strtype == ".bmp")) {
        	alert('认证中！');
            return true;
            
        }
        else {
            alert("请上传jpg、gif或者bmp格式的图片，谢谢！");
            return false;
        }
    }
    

}