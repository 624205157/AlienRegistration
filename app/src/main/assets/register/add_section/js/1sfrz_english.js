function nextstep(){
	// 校验验证码
	var vali = duanxinValidate();
	var surname=document.getElementById("surname").value;
	var givenName=document.getElementById("givenName").value;
	var passportNo=document.getElementById("passportNo").value;
	var validUntil=document.getElementById("validUntil").value;
	var gjdq=document.getElementById("gjdq").value;
    var xb=document.getElementById("xb").value;
    var csrq=document.getElementById("csrq").value;
    var gnlxr=document.getElementById("gnlxr").value;
	var phone=document.getElementById("phone").value;
	var xcyqzUntil=document.getElementById("xcyqzUntil").value;
	var xcyzjlx=document.getElementById("sls").value;
	var codePhone=document.getElementById("code").value;
	var njld=document.getElementById("njld").value;
	// 校验手机号码正则表达式
	var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-3]{1})|(18[5-9]{1}))+\d{8})$/;
	if (xcyzjlx=="qt") {
		//您不符合此类证件申请条件，详情请咨询当地公安机关。
		alert("You are not eligible to apply for this category of visa, please consult local Public Security Bureau for detailed information.");
		return;
	} 
	if (codePhone == "" || codePhone == undefined) {
		//请填写手机验证码
		alert("Please enter your phone verification code！");
		return;
	} 
	if (surname=="") {
		//请填写英文姓
		alert("Please enter your surname name in English!!");
		return;
	} 
	if (njld=="") {
		//请填写拟居留地
		alert("Please fill out the place of residence!");
		return;
	} 
	if (givenName=="") {
		//请填写英文名
		alert("Please enter your first name in English!");
		return;
	}
	if (passportNo == "") {
		//请填写护照号码
		alert("Please enter your passport number!");
		return;
	}
		if (gjdq == "") {
		//请填写国家地区
        		alert("Please fill in the National Area!");
        		return;
        	}
        if (xb == "") {
        //请填写性别
            	alert("Please fill in the sex!");
            	return;
           }
        if (csrq == "") {
        //请填写出生日期
            		alert("Please fill in the date of birth!");
            		return;
            	}
        if (gnlxr == "") {
        //请填写国内联系人
        		alert("Please fill in the domestic contact!");
        		return;
        	}
	if (validUntil == "") {
		//请填写护照有效日期
		alert("Please enter the expiry date of your passport!");
		return;
	}
	if (phone == "") {
		//请填写手机号码
		alert("Please enter your mobile phone number!");
		return;
	}
	
	if(xcyzjlx==""){
		//请填写现持有签证种类
		alert("Please describe the category of your exisitng visa!");
		return;
	}
	if(xcyqzUntil==""){
		//请填写签证有效期
		alert("Please enter the expiry date of your existing  visa!");
		return;
	}
	if(phone!=""){
		if (phone.length !=11) {
			//请输入有效的手机号码
			alert("Please enter your valid mobile phone number!");
			return;
		} else if(!myreg.test(phone)) {
			//请输入有效数字手机号码
			alert("Please enter the valid number of your mobile phone!");
			return;
		}
	}
	 var b =new Date(validUntil.replace(/-|\/|\,/g,"\/")).getTime();

     //dateB护照有效期
     var e =new Date(xcyqzUntil.replace(/-|\/|\,/g,"\/")).getTime();
     
     if(e>b){
     	//护照有效期不能小于签证有效期！
     	alert("The expiry date of  passport shall not be earlier than the expiry date of  visa!");
     	return;
     }
     
	if (vali != "1") {
		  alert(vali);
		  return;
	} else {
		//var url = 'datas/nextstep.json'
		$.ajax({
		    url : crjbasePath+"sfrz/nextWkb.do",
			//url: url,
			data : {"surname":surname,
					"givenName":givenName,
					"passportNo":passportNo,
					"gjdq":gjdq,
                    "xb":xb,
                    "csrq":csrq,
                    "gnlxr":gnlxr,
					"validUntil":validUntil,
					"xcyqzUntil":xcyqzUntil,
					"xcyzjlx":xcyzjlx,
					"njld":njld,
					"phone":phone
				},
			type : "post",
			dataType : 'json',
			 success: function(data) {
			/*	if (data == "1") {
					//系统检测到您还没有住宿登记记录，请到就近的公安局办理报住宿登记后，方可办理。
					alert('The system detects that you do not have accommodation registration record. Please handle your accommodation registration in local Public Security Bureau before application!');
					return false;
				 }*//*else if (data == "4") {
				 	//您已有申请正在办理中，办结后，方可再次申请！
					alert("You are applying for visa now and you are not able to reapply before completition！");
				 }*//*else*/
				 if (data == "5") {
					alert("Without checking the record information of the person, please check and fill out the information.");
				 }else{
				 	//存储签证类型
                 		location="stop_lx_english.html?xcyzjlx="+xcyzjlx+"&xcyqzUntil="+xcyqzUntil+"&qzyyx="+xcyqzUntil+"&surname="+surname
                        		+"&givenName="+givenName+"&passportNo="+passportNo+"&gjdq="+gjdq+"&xb="+xb+"&csrq="+csrq+"&gnlxr="+gnlxr+"&njld="+njld+"&ywbh="+data.ywbh+"&gj="+data.gj
                        		+"&birthday="+data.birthday+"&djdwxzqh="+data.djdwxzqh;
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
				alert("无效的手机号码！");
				return;
			}
		}
		
		
		var code=$('#sld').val();
		if(code == ''){
			alert("该地区暂无行政单位！");
			return;
		}

		$.ajax({
	        url: crjbasePath+"sfrz/complete.do",
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
	       	        location="index.jsp"; 	
	   	     	}
	        },
	        error:function(){
	       	 alert("对不起,信息补录失败！");
	        } 
	    }); 
}
