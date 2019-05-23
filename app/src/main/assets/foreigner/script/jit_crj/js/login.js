//登录
	function loginto(){
		 var zczh=document.getElementById("loginname").value;
		 var password=document.getElementById("password").value;
		
		if(zczh==""||password==""){
			alert("账号或密码不能为空");
			
		}else{
		$.ajax({
			url : basePath+"/crj/login/login.do",
			data : {"zczh":zczh,
				"password":password
				},
			type : "post",
			dataType : 'json',
			success : function(data, textStatus) {
				if(data!=null && data.success=="false"){
				
					msgShow("提示！",data.message);
				}else{
					
					var sign=data.sign;
					var flag=data.flag;
					if(sign==1){
						location="index.jsp";
					}
					else{
							alert('账号或密码错误');
						}

		
	}
	}
	});
		}
	}
//注册
function regist(){
	
	var flag=document.getElementById("flag").value;
	
	//机构注册
	if(flag=="1"){
		//去前台传值
		if($("#password\\.info").html()!='密码格式正确'||$("#repassword\\.info").html()!='重复密码正确'||$("#dwzh\\.info").html()!="账号格式正确"||$("#dwmc\\.info").html()!="单位名称格式正确"||$("#jgdm\\.info").html()!="机构代码格式正确"||$("#lxrname\\.info").html()!="联系人姓名正确"||$("#sjhm\\.info").html()!="手机格式正确"|| $("#lxdh\\.info").html()!="座机格式正确")
		{
		alert("检查必填项格式！");
		return false;
		}
		var zczh=document.getElementById("dwzh").value;
		var password=document.getElementById("password").value;
		var dwmc=document.getElementById("dwmc").value;
		var dwxz=document.getElementById("dwxz").value;
		var dwjb=document.getElementById("dwjb").value;
		var jgdm=document.getElementById("jgdm").value;
		var xzhq=document.getElementById("xzhq").value;
		var lxrname=document.getElementById("lxrname").value;
		var lxdh=document.getElementById("lxdh").value;
		var sjhm=document.getElementById("sjhm").value;
		var email=document.getElementById("email").value;
		
	//ajax 后台传值
	$.ajax({
		url : basePath+"/crj/login/register.do",
		data : {"zczh":zczh,
			"password":password,
			"flag":1,
			"dwmc":dwmc,
			"dwxz":dwxz,
			"dwjb":dwjb,
			"jgdm":jgdm,
			"xzhq":xzhq,
			"lxrname":lxrname,
			"lxdh":lxdh,
			"sjhm":sjhm,
			"email":email
			},
		type : "post",
		dataType : 'json',
		success : function(data, textStatus) {
			if(data!=null && data.success=="false"){
				
				
			}else{
			
				{  
					alert("注册成功");
					
					location.href="index.jsp";
				}
		
	}
	}
	});
}   //个人注册
	if(flag=="0"){
		if($("#nickname\\.info").html()!="账号格式正确"||$("#password\\.info").html()!="密码格式正确"||$("#password1\\.info").html()!="重复密码正确"||$("#name\\.info").html()!="姓名格式正确"||$("#phonenum\\.info").html()!="手机号码格式正确"||$("#idcard\\.info").html()!="身份证格式合法")
		{
		alert("检查必填项格式！");
		return false;
		}
		var zczh=document.getElementById("grzh").value;
		var password=document.getElementById("password").value;
		var name=document.getElementById("name").value;
		var idcard=document.getElementById("idcard").value;
		var phonenum=document.getElementById("phonenum").value;
		var email=document.getElementById("email").value;
		
	$.ajax({
		url : basePath+"/crj/login/register.do",
		data : {"zczh":zczh,
			"password":password,
			"flag":0,
			"name":name,
			"idcard":idcard,
			"phonenum":phonenum,
			"email":email
			},
		type : "post",
		dataType : 'json',
		success : function(data, textStatus) {
		
			if(data!=null && data.success=="false"){
				
				alert('注册失败');
			}else{
				alert('注册成功');
				location="index.jsp";
	             }
	}

	});
	
		}
	}
//防止注册账号重复
function chickname() {
	var flag=document.getElementById("flag").value;
	if(flag==1){
	var zczh=document.getElementById("dwzh").value;
	}else{
		var zczh=document.getElementById("grzh").value;
	}
	if(zczh!='' || zczh!=undefined || zczh!=null){
$.ajax({
	url : basePath+"/crj/login/chick.do",
	data : {"zczh":zczh,
		"flag":flag},
	type : "post",
	dataType : 'json',
	success : function(data, textStatus) {
		if(data!=null && data.success=="false"){
		
			msgShow("提示！",data.message);
		}else{
			var sign=data.sign;
			if(sign==1)
				{
				if(flag==0){
				$("#nickname\\.info").css({color:"red"});
                $("#nickname\\.info").html("账号被占用请使用其他账号");
                alert("账号被占用请使用其他账号");
				}
				else{
					$("#dwzh\\.info").css({color:"red"});
	                $("#dwzh\\.info").html("账号被占用请使用其他账号");
	                alert("账号被占用请使用其他账号");
				}
				}
}
}
});

}
}

