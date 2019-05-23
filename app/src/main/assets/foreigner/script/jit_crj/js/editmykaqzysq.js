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
			
			$.ajax({
		        url: basePath+"crt/kaqzysq/findKaqzysqbyId.do",
		        type: "POST",
		        data:
		         {
		        	id : id
		          },
		      	 dateType:"json",
		         success: function(data) {  
		        	 $("#sexual").val(data.sexual);
		        	 $("#nationality").val(data.nationality);
		        	 $("#surName").val(data.surName);
		        	 $("#name").val(data.name);
		        	 $("#birthday").val(timeStamp2String(data.birthday.time));
		        	 $("#validityDate").val(timeStamp2String(data.validityDate.time));
		        	 $("#inviter").val(data.inviter);
		        	 $("#phone").val(data.phone);
		        	 $("#inviterIdCard").val(data.inviterIdCard);
		        	 $("#passport").val(data.passport);
		      }
		    });
      }
    });
	
});

/**
 * 时间戳转换成时间
 * @param time
 * @returns {String}
 */
function timeStamp2String (time){
    var datetime = new Date();
     datetime.setTime(time);
     var year = datetime.getFullYear();
     var month = datetime.getMonth() + 1;
     var date = datetime.getDate();
     var hour = datetime.getHours();
     var minute = datetime.getMinutes();
     var second = datetime.getSeconds();
     var mseconds = datetime.getMilliseconds();
     return year + "-" + month + "-" + date;
};

function submitbtn(){

	$.ajax({
        url: basePath+"crt/kaqzysq/updateKaqzysq.do",
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
       	   visaType:"M",
       	   id:id
          },
      	 dateType:"json",
         success: function(data) {
	        	 if(data=="success"){
	        	   alert("编辑成功！");
	        	   var url = basePath+"qiantai/jsp/mykaqzysq.jsp";
	 			   url = encodeURI(url);
	 			   window.location.href = url;
	        	 }
			}
	});	      
}