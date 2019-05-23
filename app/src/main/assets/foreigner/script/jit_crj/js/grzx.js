$(function(){
	
	var zczh=document.getElementById("zczh").value;
	var flag=document.getElementById("flag").value;
	$.ajax({
		
		url : basePath+"/crj/grzx/findmsg.do",
		data : {"zczh":zczh,
			"flag":flag
			},
		type : "post",
		dataType : 'json',
		success : function(data, textStatus) {
			if(data!=null && data.success=="false"){
				msgShow("提示！",data.message);
			}else{
				
				var flag=data.flag;
				if(flag==1) 
				{
					var company=data.company;
					var num=data.num;
					
					//页面反显
					$("#dwmc").html(company.dwmc);
					//$("#dwxz").html(company.dwxz);
					var msgnum=document.getElementById('msgnum');
					msgnum.innerHTML=num;
					var rzflag=company.rzflag;
					if(rzflag==1){
						$("#rzflag").html("已认证");
						}
						else{
							$("#rzflag").html("未认证");
						}
						
				
					//$("#dwjb").html(company.dwjb);
					//$("#jgdm").html(company.jgdm);
					//$("#xzqh").html(company.xzqh);
					$("#lxrname").html(company.lxrname);
					$("#lxdh").html(company.lxdh);
					//$("#sjhm").html(company.sjhm);
					//$("#email").html(company.email);
				}else if(flag==0){
					
					var personal=data.personal;
					var num=data.num;
					$("#name").html(personal.name);
					
					$("#phonenum").html(personal.phonenum);
					$("#email").html(personal.email);
					var msgnum=document.getElementById("msgnum");
					msgnum.innerHTML=num;
					var rzflag=personal.rzflag;
					if(rzflag==1){
						
						$("#rzflag").html("已认证");
					}
						else{
							$("#rzflag").html("未认证");
						}
						
				
			
				}
}
}
});
});
