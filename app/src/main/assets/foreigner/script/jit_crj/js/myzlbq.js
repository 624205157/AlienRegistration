
function submitbtn(){

	$.ajax({
        url: basePath+"crt/kaqzysq/zlbq.do",
        type: "POST",
        data:
         {
           inviterIdCard:$("#inviterIdCard").val(),
           passport:$("#passport").val(),
           enterDate:$("#enterDate").val(),
           statyNum:$("#statyNum").val(),
           enterFlight:$("#enterFlight").val(),
           passId:$("#passId").val(),
           photoId:$("#photoId").val(),
           visaType:"M",
          },
      	 dateType:"json",
         success: function(data) {
	        	 
	        	   alert(data);
	        	   if(data=="已完成资料补全!"){
	         	    	var url = basePath+"qiantai/jsp/buquansuccess.jsp?flag=0";
	     			   url = encodeURI(url);
	     			   window.location.href = url;
	         	     }else{
	         	    	 location.reload();
	         	     }
	        	 
			}
	});	      
}