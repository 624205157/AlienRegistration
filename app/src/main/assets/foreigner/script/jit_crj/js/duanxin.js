	var code = "";
	
	// 短信验证
	function duanxinValidate(){
		//return "1";
		if($("#code").val() == ""){
			return "验证码不能为空！";
		} else {
			if($('#toup').val() != $("#code").val()) {
				return "验证码不正确！";
			} else {
				return "1";
			}
		}
	}
	
	var countdown = 60; 
	function settime(obj) {
		
		if(countdown == 60){
			$.ajax({
				url:'http://221.8.52.247:8445/jit_crj/crj/test/testSendSms.do?random=' + Math.random(),
				dataType:'json',
				data:{
				},
				success:function(data){
					$('#toup').val(data)
				},
				error:function(a,b,c){
				}
			})
		}
		
		var phone = $("#phone").val();
		if (phone == "") {
			alert('请输入手机号码！'); 
	        return false; 
		}
		    if (countdown == 0) { 
		        obj.removeAttribute("disabled");    
		        obj.value="重新获取验证码"; 
		        countdown = 60;
		        //code = "";
		        return;
		    } else { 
		        obj.setAttribute("disabled", true); 
		        obj.value = countdown + "s";
		        countdown--; 
		    } 
			setTimeout(function() {
			    settime(obj);
			} ,1000);
	}
	
	function settimeWG(obj) {
		var phone = $("#phone").val();
		if(countdown == 60){
			$.ajax({
				url:'http://221.8.52.247:8445/jit_crj/crj/test/testSendSmsWG.do?phoneNum='+phone,
				dataType:'json',
				data:{
				},
				success:function(data){
					$('#toup').val(data)
				},
				error:function(a,b,c){
				}
			})
		} 
		
		if (phone == "") {
			alert('请输入手机号码！'); 
	        return false; 
		}
	    if (countdown == 0) { 
	        obj.removeAttribute("disabled");    
	        obj.value="重新获取验证码"; 
	        countdown = 60;
	        //code = "";
	        return;
	    } else { 
	        obj.setAttribute("disabled", true); 
	        obj.value = countdown + "s";
	        countdown--; 
	    } 
		setTimeout(function() {
		    settime(obj);
		} ,1000);
	}
	
	
