//登录手机验证
	function login(){
		
		//var isChecked = $("#checkbox1").attr("checked");
		//判断是否勾中
		//if(isChecked){
			
			var vali = duanxinValidate();
			var idCard=document.getElementById("loginname").value;
			var phoneNum =document.getElementById("phone").value;
			
			if(idCard == ''){
				alert("请输入身份证号！");
			}else if(phoneNum == ''){
				alert("请输入手机号！");
			}else{
				
				if (vali == "1") {
					$.ajax({
						url : basePath+"/crj/qzLogin/personLogin.do?random=" + Math.random(),
						data : {
							"idCard":idCard,
							"phoneNum":phoneNum
						},
						type : "post",
						dataType : 'json',
						success : function(data) {
							if(data==1){
							location="../portUnit/pindex.jsp"
							}else{
								alert("登录失败!请检查身份证号和手机号是否正确");
							}
						}
					});
				} else {
					alert(vali);
				}
			
			}
		/*}else{
			
			alert("确认已阅读并同意《吉林省公安厅出入境管理局协议》！");
			
		}		
		*/
	}