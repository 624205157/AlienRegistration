	var code = "";
	
	// 短信验证
	function duanxinValidate(){
		//return "1";
		if($("#code").val() == ""){
			return "验证码不能为空！";
		} else {
		//	if($('#toup').val() != $("#code").val()) {           // $('#toup').val(data.msg);
		if($.trim($('#toup').val()) != $.trim($("#code").val())) {
		console.log($.trim($('#toup').val()))
		console.log($.trim($("#code").val()))
				return "验证码不正确！";
			} else {
				return "1";
			}
		}
	}
	
	var countdown = 130; 
	//测试用的url
	//var url = 'datas/shortMessage.json'
	function settime(obj) {
		if(countdown == 130){
			$.ajax({
				url:crjbasePath+'crj/test/testSendSms.do?random=' + Math.random(),
				//url: url,
				dataType:'json',
				data:{
				},
				success:function(data){
				console.log(data);
					// $('#toup').val(data)
					$('#toup').val(data);
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
	        obj.innerHTML="重新获取验证码"; 
	        countdown = 130;
	        //code = "";
	        return;
	    } else { 
	        obj.setAttribute("disabled", true); 
	        obj.innerHTML = countdown + "s";
	        countdown--; 
	    } 
		setTimeout(function() {
		    settime(obj);
		} ,1000);
	}
	
	function settimeWG(obj) {
		var phone = $("#phone").val();
		if(countdown == 130){
			$.ajax({
				url:crjbasePath+'crj/test/testSendSmsWG.do?phoneNum='+phone,
				//url: url,
				dataType:'json',
				data:{
				},
				success:function(data){
					// $('#toup').val(data)
					console.log(data);
					$('#toup').val(data);//----------------------------------------------------------------
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
	        obj.innerHTML="重新获取验证码"; 
	        countdown = 130;
	        //code = "";
	        return;
	    } else { 
	        obj.setAttribute("disabled", true); 
	        obj.innerHTML = countdown + "s";
	        countdown--; 
	    } 
		setTimeout(function() {
		    settime(obj);
		} ,1000);
	}
	
	 
	    function createCode()  
	    {   
	      code = "";  
	      var codeLength = 4;//验证码的长度
	      var checkCode = document.getElementById("checkCode");  
	      var selectChar = new Array(1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z');//所有候选组成验证码的字符，当然也可以用中文的  
//	      var selectChar = new Array(0,1,2,3,4,5,6,7,8,9);//所有候选组成验证码的字符，当然也可以用中文的  

	      for(var i=0;i<codeLength;i++)  
	      {  
	       
	         
	      var charIndex = Math.floor(Math.random()*34);  
	      code +=selectChar[charIndex];  
	        
	        
	      }  
//	      alert(code);  
	      if(checkCode)  
	      {  
	        checkCode.value = code;  
	        $("#checkCode").text(code);
	      }  
	        
	    }  
	      
	     function validate ()  
	    {  
	      var inputCode = document.getElementById("code").value.toUpperCase();
	      
	      if(inputCode.length <=0)  
	      {  
	          alert("请输入验证码！");  
	          return false;
	      }  
	      else if(inputCode != code )  
	      {  
	         alert("验证码输入错误！");  
//	         createCode();//刷新验证码  
	         return false;
	      }  else{
	    	  
	    	  return true;
	    	  
	    	  
	      }
	      }  
		
		
