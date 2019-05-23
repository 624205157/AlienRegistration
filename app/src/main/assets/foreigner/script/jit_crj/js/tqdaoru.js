

function doImport(){
	ajaxLoading();
	$.ajaxFileUpload({
		url:basePath+"crt/kaqzysq/uploadFile.do",
		secureuri:false,
		fileElementId:"inFile",
		dataType: 'text',
		async: false, 
		success:function(data,status){
			if(data!=null){
				var jsonObj = eval("("+data+")");
				var res=jsonObj[0].res;
				
				var data1=[];
				var jsonstr="";
				
				for(var i=0;i<res.length;i++){
					var val = res[i];	
					var enterdate=timeStamp2String(val.enterDate.time);
					var validitydata=timeStamp2String(val.validityDate.time);
					var birthday=timeStamp2String(val.birthday.time);
					
					var tmp ="{\"surName\":\""+val.surName+"\",\"name\":\""+val.name+"\",\"sexual\":\""+val.sexual+"\",\"birthday\":\""+birthday+"\"," +
					 "\"nationality\":\""+val.nationality+"\",\"passport\":\""+val.passport+"\",\"validityDate\":\""+validitydata+"\",\"enterPort\":\""+val.enterPort+"\"," +
					 "\"enterDate\":\""+enterdate+"\",\"statyNum\":\""+val.statyNum+"\"}";
					
					jsonstr+=tmp+",";
					data1.push(tmp);
				}
				rylist(jsonstr,data1);
			}
			ajaxLoadEnd();
		  }		
	});
}

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

function rylist(jsonstr,data1){
	
	 //JQGrid对象
	 var systemJQGridList$;
	 //JQGrid分页操作区块对象
	 var systemJQGridPager$;
 
		// 初始化jqgrid
	
		//创建列表区块对象
		systemJQGridList$ = $("#systemJQGridList");
		//创建分页操作区块对象
		systemJQGridPager$=$("#systemJQGridPager");
		
		//列表高度，如果设置为负数，则列表根据实际列表高度显示，不出现滚动条，如果设置为正值则为固定高度
		var height = -1;
		//设置列表参数
		systemJQGridList$.jqGrid({
			// 从服务器端返回的数据类型，默认xml。可选类型：xml，local，json，jsonnp，script，xmlstring，jsonstring，clientside
			datatype : "local",
			// 一个下拉选择框，用来改变显示记录数，当选择时会覆盖rowNum参数传递到后台
			rowList : [10, 20, 30, 50, 100],
			// 是否显示行号,是：true，否：false
			rownumbers : true,
			//singleselect:true,
			scrollOffset:0,
			// 定义是否要显示总条数，是：true，否:false
			viewrecords : true,
			// 是否显示复选框，是：true，否：false
			multiselect : false,
			// 定义翻页用的导航栏，必须是有效的html元素。翻页工具栏可以放置在html页面任意位置
			pager : systemJQGridPager$,
			// 默认显示的条数
			rowNum : 10,
			// 如果为ture时，则当表格在首次被创建时会根据父元素比例重新调整表格宽度。如果父元素宽度改变，为了使表格宽度能够自动调整则需要实现函数：setGridWidth
			autowidth : true,
			// 表格高度，可以是数字，像素值或者百分比，如果为负数则列表高度为实际高度，如果为0或正数则为固定高度
			height : height,
			// 列显示名称，是一个数组对象
			colNames : ['英文姓','英文名','性别','出生日期','国籍','护照号码','护照有效期至','入境口岸','入境日期','停留天数'],
				
			colModel : [
				{ name : 'surName',index : 'surName',width : 10,align : "center"},
				{ name : 'name',index : 'name',width : 10,align : "center"},
				{ name : 'sexual',index : 'sexual',width : 10,align : "center"},
				{ name : 'birthday',index : 'birthday',width : 10,align : "center"},
				{ name : 'nationality',index : 'nationality',width : 8,align : "center"},
				{ name : 'passport',index : 'passport',width : 10,align : "center"},
				{ name : 'validityDate',index : 'validityDate',width : 15,align : "center"},
				{ name : 'enterPort',index : 'enterPort',width : 10,align : "center"},
				{ name : 'enterDate',index : 'enterDate',width : 13,align : "center"},
				{ name : 'statyNum',index : 'statyNum',width : 10,align : "center"}
			],
      		multiselect : false
		})
			.navGrid('#systemJQGridPager', { add: false, edit: false, del: false,search:false,refresh:false })
			.navButtonAdd('#systemJQGridPager',{
			   caption:"导入",
			   id:"tfirst",
			   onClickButton: function(){
				   var tn=$("#teamName").val();
				   if(tn==""){
					   alert("请填写旅行团名");
					   return;
				   }else{
				   
					$.ajax({
						url:basePath+'crt/kaqzysq/importTq.do',
						type:"post",
				        dateType:"json",
				        data:{
				        	'myjson':jsonstr,
				        	'teamName':$("#teamName").val()				        	
				        	},
				        success: function(data) {
				        	
				        	if(data=="fail"){
				        		alert("旅行团名已存在！不能导入团员信息");
				        	}else{
				        	   alert("导入成功！");
				        	   var url = basePath+"qiantai/jsp/shenqingsuccess.jsp?flag=0";
				 			   url = encodeURI(url);
				 			   window.location.href = url;
				        	}
				        }
					});
				   }
			   }, 
			   position:"first"
			});
		
		
		for ( var i = 0; i <data1.length; i++){
			var d=data1[i]
			var ds=JSON.parse(d);
			jQuery("#systemJQGridList").jqGrid('addRowData', i + 1,ds);
		}
}