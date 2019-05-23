//登录手机验证
	function login(){
		
		var isChecked = $("#checkbox1").attr("checked");
		//判断是否勾中
		if(isChecked){
			
			var vali = duanxinValidate();
			var idCard=document.getElementById("loginname").value;
			var phoneNum =document.getElementById("phone").value;
			
			if(idCard == ''){
				alert("请输入用户名");
			}else if(phoneNum == ''){
				alert("请输入手机号");
			}else{
				
				if (vali == "1") {
					$.ajax({
						url : basePath+"/crj/login/checkLogin.do?random=" + Math.random(),
						data : {
							"idCard":idCard,
							"phoneNum":phoneNum
						},
						type : "post",
						dataType : 'json',
						success : function(data) {
							if(data == false) {
								location="../shenqing/sqfirst1.jsp";
							} else {
								location="complete_regist.jsp";
							}
						}
					});
				} else {
					alert(vali);
				}
			
			}
		}else{
			
			alert("确认已阅读并同意《吉林省公安厅出入境管理局协议》！");
			
		}
		
		
	}



//     //用户注册
//          function  userRegister(){
//	    var idCard = $("#idCard").val();
////	    var password = $("#password").val();
//		var phoneNum = $("#phoneNum").val();
//		
//		if (idCard == '') {
//   			alert("请输入用户名");
//   		}else if(phoneNum == ''){
//   			alert("请输入手机号");
//   		}  else {
//   			$.ajax({
//   	         url: basePath+"/crt/login/newRegist.do",
//    	         data:{
//    	        	  "idCard" : idCard,
//   	                   "phoneNum":phoneNum
//    	           },
//   	              // 要提交的表单
//   	          type: "post",
//   	       	 dateType:"json",
//   	       success: function(data) {
//   	        	 alert("注册成功。");
//   	        	 
//         //跳转到登录页面
//   	        	 location="login_.jsp";
//   	        
//   	         },
//   	         error:function(){
//   	        	 alert("对不起,注册失败！");
//   	         } 
//   	     });
//   		}
//   		
//};

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
	var gender = $("#gender").val();
	var nation = $("#nation").val();
	var csrq  = $("#csrq").val();
	var hkszd = $("#hkszd").val();
	var csd = $("#csd").val();
	var urgentLink = $("#urgentLink").val();
	var linkPhone = $("#linkPhone").val();
	var address = $("#address").val();
	var qq = $("#qq").val();
	var weChat = $("#weChat").val();
	var email = $("#email").val();
	var x = $("#x").val();
	var m = $("#m").val();
	var name = x+m;
	// 汉字正则
	var myreg = /^[\u4e00-\u9fa5]+$/i;
	//手机号码正则
	var phonereg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-3]{1})|(18[5-9]{1}))+\d{8})$/;
	
	//判断汉字姓
	if(x == ''){
		alert("请输入汉字姓！");
		return;
	} else {
		if (!myreg.test(x)) {
			alert("请输入正确的汉字姓！");
			return;
		}
	}
	//判断汉字名
	if(m == ''){
		alert("请输入汉字名！");
		return;
	} else {
		if (!myreg.test(m)) {
			alert("请输入正确的汉字名！");
			return;
		}
	}
	//判断紧急联系人姓名urgentLink
	if (urgentLink == ''||urgentLink==undefined||urgentLink==null) {
		alert("请输入紧急联系人姓名");
		return;
	} else {
		if (!myreg.test(urgentLink)) {
			alert("输入格式不正确！");
			return;
		}
		
	}
	if(x+m==urgentLink){
		alert('紧急联系人与本人姓名不能相同');
		return;
		
	}
	//判断紧急联系人电话
	if(linkPhone == ''||linkPhone==undefined||linkPhone==null){
		alert("请输入紧急联系人电话");
		return;
	}else {
		if (!phonereg.test(linkPhone)) {
			alert("无效的手机号码！");
			return;
		}
	}
	$("#completeRegist").removeAttr("onclick");
			$.ajax({
	         url: basePath+"/crt/info/addComplete.do",
	         data:{
	        	  "pyX" : pyX,
	               "pyM":pyM,
	                   "name":name,
	                   "gender":gender,
	                   "nation":nation,
	                   "csrq":csrq,
	                   "hkszd":hkszd,
	                   "csd":csd,
	               "urgentLink":urgentLink,
	                   "linkPhone":linkPhone,
	                   "address":address,
	                   "qq" : qq,
	                   "weChat" : weChat,
	                   "email" : email,
	                   "x" : x,
	                   "m" : m
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
		
			//$("#completeRegist").removeAttr("disabled");
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




