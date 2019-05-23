

function submitbtn(){

	$.ajax({
        url: basePath+"crt/kaqzysq/zlbq.do",
        type: "POST",
        data:
         {
        	teamName:$("#teamName").val(),
        	teamNum:$("#teamNum").val(),
        	enterPort:$("#enterPort").val(),
            enterDate:$("#enterDate").val(),
            statyNum:$("#statyNum").val(),
            enterFlight:$("#enterFlight").val(),
            travelId:$("#travelId").val(),
            progressId:$("#progressId").val(),
            inviteId:$("#inviteId").val(),
            visaType:"L",
          },
      	 dateType:"json",
         success: function(data) {
        	 alert(data);
      	     if(data=="已完成资料补全!"){
      	    	var url = basePath+"qiantai/jsp/buquansuccess.jsp?flag=1";
  			   url = encodeURI(url);
  			   window.location.href = url;
      	     }else{
     	    	 location.reload();
     	     }
		  }
	});	      
}