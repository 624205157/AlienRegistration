$(function (){	
	$.ajax({
        url: basePath+"webProtal/findDictionaryByType1.do",
        data:
         {
        	type : "GJLB"
          },
      	 dateType:"json",
         success: function(data) {
    	    var sls = document.getElementById("nationality");
			 sls.options.add(new Option("请选择"," ")); 
              var data1=eval("("+data+")");
              
			$.each(data1.data, function(i,result) {
				var slscode = result.dicCode;
				var slsname = result.dicName;
				sls.options.add(new Option(slsname,slscode));
			});	
      }
    });
	
});

function submitbtn(){

	$.ajax({
        url: basePath+"crt/kaqzysq/saveKaqzysq.do",
        type: "POST",
        data:
         {
           surName:$("#surName").val(),
       	   name:$("#name").val(),
       	   sexual:$("#sexual").val(),
       	   birthday:$("#birthday").val(),
       	   nationality:$("#nationality").val(),
       	   validityDate:$("#validityDate").val(),
       	   inviter:$("#inviter").val(),
       	   phone:$("#phone").val(),
       	   inviterIdCard:$("#inviterIdCard").val(),
       	   passport:$("#passport").val(),
       	   visaType:$("#visaType").val()
          },
      	 dateType:"json",
         success: function(data) {
	        	 if(data=="success"){
	        	   alert("新增成功！");
	        	   var url = basePath+"qiantai/jsp/shenqingsuccess.jsp?flag=5";
	 			   url = encodeURI(url);
	 			   window.location.href = url;
	        	 }
			}
	});	      
}