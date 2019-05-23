//登录手机验证
	function login(){
		//获取选择框元素并追加checked
		var isChecked = $("#checkbox1").attr("checked");
		//判断是否勾中
		if(isChecked){
			
			var vali = duanxinValidate();
			var sfzjhm=document.getElementById("loginname").value;
			var lxdh =document.getElementById("phone").value;
			
			//判断是否填写选项
			if(sfzjhm == ''){
				alert("请输入用户名");
			}else if(lxdh == ''){
				alert("请输入手机号");
			}else{
				
				if (vali == "1") {
					$.ajax({
						url : basePath+"/crj/login/ryLogin.do?random=" + Math.random(),
						data : {
							"sfzjhm":sfzjhm,
							"lxdh":lxdh
						},
						type : "post",
						dataType : 'json',
						success : function(data) {
//							if(data == false) {
//								location="../shenqing/sqfirst1.jsp";
//							} else {
//								location="ryComplete.jsp";
//							}
							//判断得1跳转到个人中心页面
							if(data == 1) {
								location="../shenqing/sqfirst1.jsp";
							//判断得2跳转到补全信息页面
							} else if(data == 2){
								location="ryComplete.jsp";
							//判断得0提示用户不存在，无法登录	
							} else if(data == 0){
								alert("用户名不存在,登录失败!");
							//判断得3提示用户名与输入的手机号不一致	
							}else{
								alert("输入的手机号与对应用户名不一致！");
							}
							
						}
					});
				} else {
					alert(vali);
				}
			
			}
			//未勾选则提示
		}else{
			
			alert("确认已阅读并同意《吉林省公安厅出入境管理局协议》！");
		}
		
		
		
		
	}





//获取拼音姓
function getPinyinX(obj){
	
	if(obj.value!=null&&obj.value!=""){
		if(ckChinese(obj.value)){
			$.ajax({
		        url: basePath+"/crt/pinyinCommon/getPinyin.do",
		        data:{
		       	  "name" : obj.value
		          },
		        type: "post",
		      	dateType:"json",
		        success: function(data) {
		        	if(data.rstr.split(",").length>1){
		        		var str = "<div style=\"padding:20px;\">该汉字为多音字，请选择<p>";
		        		for (var int = 0; int < data.rstr.split(",").length; int++) {
							str+="<input type=button value="+data.rstr.split(",")[int]+" onclick=\"checkname(this,'pyX')\">"
						}
		        		str+="</div>";
		        		layer.open({
		        	        type: 1,
		        	        area: ['300px', '360px'],
		        	        //offset: ['100px', '800px'],
		        	        closeBtn:0,
		        	       // move: true,
		        	        content: str
		        	    });
		        	}else{
		        		$("#pyX").val(data.rstr);	
		        	}
		           
		        },
		        error:function(){
		       	 alert("对不起,信息补录失败！");
		        } 
		    });
		}
	}else{
		$("#pyX").val("");
	}
}
	
//获取拼音名
function getPinyinM(obj){
	if(obj.value!=null&&obj.value!=""){
		if(ckChinese(obj.value)){
			$.ajax({
		        url: basePath+"/crt/pinyinCommon/getPinyin.do",
		        data:{
		       	  "name" : obj.value
		          },
		        type: "post",
		      	dateType:"json",
		        success: function(data) {
		        	
		        	if(data.rstr.split(",").length>1){
		        		var str = "<div style=\"padding:20px;\">该汉字为多音字，请选择<p>";
		        		for (var int = 0; int < data.rstr.split(",").length; int++) {
							str+="<input type=button value="+data.rstr.split(",")[int]+" onclick=\"checkname(this,'pyM')\">"
						}
		        		str+="</div>";
		        		layer.open({
		        	        type: 1,
		        	        area: ['300px', '360px'],
		        	        //offset: ['100px', '800px'],
		        	        closeBtn:0,//是否有关闭按钮
		        	        //move: true,
		        	        content: str
		        	    });
		        	}else{
		        		$("#pyM").val(data.rstr);	
		        	}
		        },
		        error:function(){
		       	 alert("对不起,信息补录失败！");
		        } 
		    });
		}
	}else{
		$("#pyM").val("");
	}
}

          
//补全信息       
function  completeRegist(){
	
    var pyX = $("#pyX").val();
	var pyM = $("#pyM").val();
	var jjlxrXm = $("#jjlxrXm").val();
	var jjlxrDh = $("#jjlxrDh").val();
	var zwx = $("#x").val();
	var zwm = $("#m").val();
	// 汉字正则
	var myreg = /^[\u4e00-\u9fa5]+$/i;
	//手机号码正则
	var phonereg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-3]{1})|(18[5-9]{1}))+\d{8})$/;
	
	//判断汉字姓
	if(zwx == ''){
		alert("请输入汉字姓！");
		return;
	} else {
		if (!myreg.test(zwx)) {
			alert("请输入正确的汉字姓！");
			return;
		}
	}
	//判断汉字名
	if(zwm == ''){
		alert("请输入汉字名！");
		return;
	} else {
		if (!myreg.test(zwm)) {
			alert("请输入正确的汉字名！");
			return;
		}
	}
	//判断紧急联系人姓名
	if (jjlxrXm == '') {
		alert("请输入紧急联系人姓名");
		return;
	} else {
		if (!myreg.test(jjlxrXm)) {
			alert("输入格式不正确！");
			return;
		}
		
	}
	//判断紧急联系人电话
	if(jjlxrDh == ''){
		alert("请输入紧急联系人电话");
		return;
	}else {
		if (!phonereg.test(jjlxrDh)) {
			alert("无效的手机号码！");
			return;
		}
	}
	
	$.ajax({
        url: basePath+"/crt/info/addRComplete.do",
        data:{
       	  "pyX" : pyX,
              "pyM":pyM,
              "jjlxrXm":jjlxrXm,
              "jjlxrDh":jjlxrDh,
              "x" : zwx,
              "m" : zwm
          },
             // 要提交的表单
         type: "post",
      	 dateType:"json",
      success: function(data) {
   	     
         	 alert("补全信息成功。");
       	 
            //跳转到主页面
       	        	 location="../shenqing/sqfirst1.jsp"; 
   	   
        },
        error:function(){
       	 alert("对不起,信息补录失败！");
        } 
    });
		
}         
        


//验证是否是汉字
function ckChinese(str){
	var reg=/^[\u4E00-\u9FA5]+$/; 
    if (reg.test(str)==true){
       return true;
    }else{
       return false;
    }
}

//选择多音的拼音
function checkname(obj,id){
	$("#"+id).val(obj.value);
	layer.closeAll();
	
}




