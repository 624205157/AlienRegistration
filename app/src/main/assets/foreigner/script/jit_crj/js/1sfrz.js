function nextstep(){
	// 校验验证码
	var vali = duanxinValidate();
	var surname=document.getElementById("surname").value;
	var givenName=document.getElementById("givenName").value;
	var passportNo=document.getElementById("passportNo").value;
	var validUntil=document.getElementById("validUntil").value;
	var phone=document.getElementById("phone").value;
	var xcyqzUntil=document.getElementById("xcyqzUntil").value;
	var xcyzjlx=document.getElementById("sls").value;
	var codePhone=document.getElementById("code").value;
	var njld=document.getElementById("njld").value;
	// 校验手机号码正则表达式
	var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-3]{1})|(18[5-9]{1}))+\d{8})$/;
	if (xcyzjlx=="qt") {
		alert("您不符合此类证件申请条件，详情请咨询当地公安机关。/You are not eligible to apply for this category of visa, please consult local Public Security Bureau for detailed information. ");
		return;
	} 
	if (codePhone == "" || codePhone == undefined) {
		alert("请填写手机验证码！/Please enter your phone verification code！"+codePhone);
		return;
	} 
	if (surname=="") {
		alert("请填写英文姓!/Please enter your surname name in English!!");
		return;
	} 
	if (njld=="") {
		alert("请填写拟居留地!/Please enter your first name in English!");
		return;
	} 
	if (givenName=="") {
		alert("请填写英文名!/Please enter your first name in English!");
		return;
	}
	if (passportNo == "") {
		alert("请填写护照号码!/Please enter your passport number!");
		return;
	}
	if (validUntil == "") {
		alert("请填写护照有效日期!/Please enter the expiry date of your passport!");
		return;
	}
	if (phone == "") {
		alert("请填写手机号码!/Please enter your mobile phone number!");
		return;
	}
	
	if(xcyzjlx==""){
		alert("请填写现持有签证种类!/Please describe the category of your exisitng visa!");
		return;
	}
	if(xcyqzUntil==""){
		alert("请填写签证有效期!/Please enter the expiry date of your existing  visa!");
		return;
	}
	if(phone!=""){
		if (phone.length !=11) {
			alert("请输入有效的手机号码！/Please enter your valid mobile phone number!");
			return;
		} else if(!myreg.test(phone)) {
			alert("请输入有效数字手机号码！/Please enter the valid number of your mobile phone!");
			return;
		}
	}
	 var b =new Date(validUntil.replace(/-|\/|\,/g,"\/")).getTime();

     //dateB护照有效期
     var e =new Date(xcyqzUntil.replace(/-|\/|\,/g,"\/")).getTime();
     
     if(e>b){
     	alert("护照有效期不能小于签证有效期！/The expiry date of  passport shall not be earlier than the expiry date of  visa!");
     	return;
     }
     
	if (vali != "1") {
		  alert(vali);
		  return;
	} else {
		$.cookie('surname', surname);
		$.cookie('givenName', givenName);
		$.cookie('passportNo', passportNo);
		$.cookie('phone', phone);
		$.cookie('validUntil', validUntil);
		$.cookie('xcyqzUntil', xcyqzUntil);
		$.cookie('xcyzjlx', xcyzjlx);
		$.ajax({
			url : "http://192.168.1.123/jit_crj/sfrz/next.do",
			data : {"surname":surname,
					"givenName":givenName,
					"passportNo":passportNo,
					"validUntil":validUntil,
					"xcyqzUntil":xcyqzUntil,
					"xcyzjlx":xcyzjlx,
					"njld":njld,
					"phone":phone
				},
			type : "post",
			dataType : 'json',
			 success: function(data) {
				if (data == "1") {
					 location="ss_sfysh_win.html";
				 }else if (data == "4") {
					 alert("您已有申请正在办理中，办结后，方可再次申请！/You are applying for visa now and you are not able to reapply before completition!");
				 }else if (data == "5") {
					 alert("未查到该人的备案信息，请核实后填写！");
				 }else{
					 location="index_f_win.html";
				 }
			 }
		
		});
		
    }
}
function  completeRegist(){
	
	 	//var surname = $("#surname").val();
		//var givenName = $("#givenName").val();
		var nationality = $("#nationality").val();
		var type = $("#type").val();
		var passportNo = $("#passportNo").val();
		var cname = $("#cname").val();
		//var phone = $("#phone").val();
		var stay = $("#stay").val();
		var hotelName = $("#hotelName").val();
		var roomNo = $("#roomNo").val();
		var cworkPlace = $("#cworkPlace").val();
		var houseType = $("#houseType").val();
		
		var houseIdcard = $("#houseIdcard").val();
		var urgencyName = $("#urgencyName").val();
		var urgencyTel = $("#urgencyTel").val();
		var receiver = $("#receiver").val();
		
		var linkTel = $("#linkTel").val();
		var policeStation = $("#policeStation").val();
		var sex = $("#sex").val();
		var address = $("#address").val();
		var movedate = $("#movedate").val();
		var birthday = $("#birthday").val();
		
		
		// 汉字正则
		var myreg = /^[\u4e00-\u9fa5]+$/i;
		//手机号码正则
		var phonereg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-3]{1})|(18[5-9]{1}))+\d{8})$/;
		
		
		if(birthday==''){
			alert("请选择出生日期！/Please select date of birth!");
			return;
		}
		
		//判断中文名是否为汉字
		/*if(cname == ''){
			alert("请输入汉字！");
			return;
		} else {
			if (!myreg.test(cname)) {
				alert("请输入正确的汉字！");
				return;
			}
		}*/
		//判断紧急联系人电话
		if(urgencyTel != ''){
			if (!phonereg.test(urgencyTel)) {
				alert("无效的手机号码！/Invalid mobile phone number!");
				return;
			}
		}
		
		
		var code=$('#sld').val();
		if(code == ''){
			alert("该地区暂无行政单位！/There is no governmental administrative organization here!");
			return;
		}

		$.ajax({
	        url: basePath+"sfrz/complete.do",
	        data:{
	       	      "nationality" : nationality,
	              "type":type,
	              //"cname":cname,
	              //"stay":stay,
	              //"hotelName" : hotelName,
	              //"roomNo" : roomNo,
	              //"cworkPlace" : cworkPlace,
	              //"houseType" : houseType,
	              //"houseIdcard" : houseIdcard,
	              //"urgencyName" : urgencyName,
	              "passportNo" : passportNo,
	              "urgencyTel" : urgencyTel,
	             // "guojiaType" : guojiaType,
	             // "receiver" : receiver,
	             // "linkTel" : linkTel,
	              //"policeStation" : policeStation,
	              "sex":sex,
	              "address":address,
	              "movedate":movedate,
	              "birthday":birthday,
	              "code":code
	          },
	             // 要提交的表单
	         type: "post",
	      	 dateType:"json",
	      success: function(data) {
	   	     	if(data==1){
	   	     		//跳转到主页面
	       	        location="index_win.html"; 	
	   	     	}
	        },
	        error:function(){
	       	 alert("对不起,信息补录失败！/Sorry, information reenter fails!");
	        } 
	    }); 
}
