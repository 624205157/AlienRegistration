//JQGrid对象
var systemJQGridList$;
// JQGrid分页操作区块对象
var systemJQGridPager$;

// 初始化jqgrid
$(function() {
	// 创建列表区块对象
	systemJQGridList$ = $("#systemJQGridList");
	// 创建分页操作区块对象
	systemJQGridPager$ = $("#systemJQGridPager");

	// 列表高度，如果设置为负数，则列表根据实际列表高度显示，不出现滚动条，如果设置为正值则为固定高度
	var height = -1;
	var linkUrl = basePath + "crt/kaqzysq/searchTq.do";
	// 设置列表参数
	systemJQGridList$.jqGrid({
		// 如果为 ture 则数据只从服务器端抓取一次，之后所有操作都是在客户端执行，翻页功能会被禁 用
		loadonce : false,
		// 获取数据的地址
		caption : '',
		url : linkUrl,
		// 从服务器端返回的数据类型，默认xml。可选类型：xml，local，json，jsonnp，script，xmlstring，jsonstring，clientside
		datatype : "json",
		// ajax提交方式。POST或者GET，默认GET
		mtype : 'post',
		/*postData : {
			'keyword' : $("#keyword").val()
		},*/
		// 一个下拉选择框，用来改变显示记录数，当选择时会覆盖rowNum参数传递到后台
		rowList : [ 10, 20, 30, 50, 100 ],
		// 是否显示行号,是：true，否：false
		rownumbers : true,
		// singleselect:true,
		scrollOffset : 0,
		// 定义是否要显示总条数，是：true，否:false
		viewrecords : true,
		// 是否显示复选框，是：true，否：false
		multiselect : false,
		/*// 默认的排序列。可以是列名称或者是一个数字，这个参数会被提交到后台
		sortname : "xtcsPx",
		// 排序方向
		sortorder : "asc",*/
		// 描述json数据格式
		jsonReader : {
			// root这里的值是rows，意味着它会读取json中的rows键的值，这个值就是真实的数据
			root : "resultList",
			// 总的页数
			total : "totalPage",
			// 当前页号
			page : "nowPage",
			// 总记条数
			records : "totalNum",
			// cell、id在repeatitems为true时可以用到，即每一个记录是由一对id和cell组合而成，即可以适用另一种json结构
			cell : "resultList",
			// 如果设为false，则jqGrid在解析json时，会根据name来搜索对应的数据元素（即可以json中元素可以不按顺序）；而所使用的name是来自于colModel中的name设定。
			repeatitems : false
		},
		// 定义翻页用的导航栏，必须是有效的html元素。翻页工具栏可以放置在html页面任意位置
		pager : systemJQGridPager,
		// 默认显示的条数
		rowNum : 10,
		// 如果为ture时，则当表格在首次被创建时会根据父元素比例重新调整表格宽度。如果父元素宽度改变，为了使表格宽度能够自动调整则需要实现函数：setGridWidth
		autowidth : true,
		// 表格高度，可以是数字，像素值或者百分比，如果为负数则列表高度为实际高度，如果为0或正数则为固定高度
		height : height,
		// 列显示名称，是一个数组对象
		colNames : ['id','旅行团名','团人数','入境口岸','入境日期','入境航班','停留天数'],
		// 列显示模板
		// 常用到的属性：name对应的数据的关键字；
		// index传到服务器端用来排序用的列名称；
		// width列宽度；
		// align对齐方式；
		// sortable是否可以排序
		// hidden在初始化表格时是否要隐藏此列 ，是：true，否：false

		colModel : [
					{ name : 'id',index : 'id',width : 10,align : "center", hidden:true},
					{ name : 'teamName',index : 'teamName',width : 10,align : "center",
						formatter:function(cellvalue, options, rowObject){//formatter事件 根据当前数据进行格式化 cellvalue即为当前要被格式化的数据
						   var html='';
						   html+='<a name=\'editBtn\' href=\'javascript:void(0);\'  value=\'查看\' onclick=\'tuanbtn("'+rowObject.id+'")\'>'+rowObject.teamName+'</a>&nbsp;&nbsp;'
						    return html;
						}	
					},
					{ name : 'teamNum',index : 'teamNum',width : 10,align : "center"},
					{ name : 'enterPort',index : 'enterPort',width : 10,align : "center"},
					{ name : 'enterDate',index : 'enterDate',width : 8,align : "center",
						formatter:function(cellvalue, options, rowObject){//formatter事件 根据当前数据进行格式化 cellvalue即为当前要被格式化的数据
						    var d=rowObject.enterDate;
						    if(d){
						    var strdate2 = timeStamp2String(d.time);
						    return strdate2;
						    }else{
						    	return "";
						    }
						}
						},
					{ name : 'enterFlight',index : 'enterFlight',width : 10,align : "center"},
					{ name : 'statyNum',index : 'statyNum',width : 10,align : "center"}
				]

	}).navGrid('#systemJQGridPager', {
		add : false,
		edit : false,
		del : false,
		search : false,
		refresh : false
	}).navButtonAdd('#systemJQGridPager', {
		caption : "团签人员信息",
		onClickButton : function() {
			var url = basePath+"qiantai/jsp/tqdaoru.jsp";
			url = encodeURI(url);
			window.location.href = url;
		},
		position : "first"

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

/**
 * 重载jqgrid
 * 
 */
function reloadGrid(){
	
	$("#systemJQGridList").jqGrid('setGridParam',{  
	     datatype:'json',  
		postData : {
			"teamName":$("#teamName").val(),
			"enterFlight":$("#enterFlight").val(),
			"enterPort":$("#enterPort").val(),
			"enterDate":$("#enterDate").val()
	 	}, //发送数据
    		page:1  
	}).trigger("reloadGrid");
}

/**
 * 清空查询条件重载jqgrid
 * 
 */
function qkGrid(){
	$("#systemJQGridList").jqGrid('setGridParam',{  
	    datatype:'json',  
		postData : {
			"keyword": ""
	 	}
		}).trigger("reloadGrid");
}
/**
 * 根据旅行团id查找团中人员信息
 * @param id
 */
function tuanbtn(id){
	var url = basePath+"qiantai/jsp/tqryxx.jsp?id="+id;
	url = encodeURI(url);
	window.location.href = url;
}