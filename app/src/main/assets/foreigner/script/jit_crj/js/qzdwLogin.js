function login(){

//        	  alert("22222");
      		var dlzh=document.getElementById("dlzh").value;
  			var dlmm =document.getElementById("password").value;
  			
  			if(dlzh == ''){
  				alert("请输入账号");
  			}else if(dlmm == ''){
  				alert("请输入密码");
  			}else{
  				
  				
  					$.ajax({
  						url : basePath+"/crj/qzLogin/qzdwLogin.do?random=" + Math.random(),
  						data : {
  							"dlzh":dlzh,
  							"dlmm":dlmm
  						},
  						type : "post",
  						dataType : 'json',
  						success : function(data) {
  							if(data == 0) {
  								location="../portUnit/index.jsp";
  							} else if(data == 1) {
  								alert("输入的密码不正确");
  							}else{
  								alert("账号不存在,登录失败");
  							}
  						}
  					});
  				
          }
        	  
    		   
          
          }