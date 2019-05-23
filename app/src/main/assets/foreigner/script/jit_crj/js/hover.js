/**
 * 鼠标滑过事件
 * 
 * */
/** 定义全局变量，变量tab为记录tab标签的位置、变量page为记录当前分页的位置 */
var tab = "first";
var page = "first";
var list = "first";

$(function(){
	$(".main_right_cyyw_tab_show_cut").width($("#main_right_cyyw_tab_show").width());
	$("#main_right_cyyw_tab_show_").width($(".item").size() * $("#main_right_cyyw_tab_show").width());
	//tab的鼠标划过事件
	$("#main_left_tab ul li").hover(function(){
		if(tab == "first"){
			tab = $(".tab_color").parent().parent().index("#main_left_tab ul li");
		}
		$(".main_left_tab_").removeClass("tab_color");
		var n = $(this).index("#main_left_tab ul li");
		$(".main_left_tab_").eq(n).addClass("tab_color");
	}, function(){
		$(".main_left_tab_").removeClass("tab_color");
		$(".main_left_tab_").eq(tab).addClass("tab_color");
	});
	
	//tab的鼠标划过事件
	$("#list_left_tab ul li").hover(function(){
		if(list == "first"){
			list = $(".tab_list_color").parent().parent().index("#list_left_tab ul li");
		}
		$(".main_left_tab_").removeClass("tab_list_color");
		var n = $(this).index("#list_left_tab ul li");
		$(".main_left_tab_").eq(n).addClass("tab_list_color");
	}, function(){
		$(".main_left_tab_").removeClass("tab_list_color");
		$(".main_left_tab_").eq(list).addClass("tab_list_color");
	});
	
	//list的鼠标划过事件
	$("#main_right_list ul li").hover(function(){
		$("#main_right_list ul li").removeClass("list_color");
		$("#main_right_list ul li a span").removeClass("text_color");
		$(this).addClass("list_color");
		$(this).find("a").find("span").addClass("text_color");
	}, function(){
		$("#main_right_list ul li").removeClass("list_color");
		$("#main_right_list ul li a span").removeClass("text_color");
	});
	
	//分页的鼠标滑过事件
	$(".page").hover(function(){
		if(page == "first"){
			page = $(".page_hover").index(".page");
		}
		$(".page").removeClass("page_hover");
		$(this).addClass("page_hover");
	}, function(){
		$(".page").removeClass("page_hover");
		$(".page").eq(page).addClass("page_hover");
	});
	
	//上一页的鼠标滑过事件
	$(".prev").hover(function(){
		$(this).addClass("prev_hover");
		$(this).find("span").addClass("arrow_prev_hover");
	}, function(){
		$(this).removeClass("prev_hover");
		$(this).find("span").removeClass("arrow_prev_hover");
	});
	
	//下一页的鼠标滑过事件
	$(".next").hover(function(){
		$(this).addClass("prev_hover");
		$(this).find("span").addClass("arrow_next_hover");
	}, function(){
		$(this).removeClass("prev_hover");
		$(this).find("span").removeClass("arrow_next_hover");
	});
	
	$(".item").hover(function(){
		var width = $("#main_right_cyyw_tab_show").width();
		$(".item").removeClass("item_hover");
		$(this).addClass("item_hover");
		var n = $(this).index(".item");
		$("#main_right_cyyw_tab_show_").stop().animate({marginLeft : -n * width}, 1000);
	});
	
})

/** 返回首页 */
function goIndex(){
	location.href = "index.html";
}

/** 收藏 */
function AddFavorite(sURL, sTitle) {
	sURL = encodeURI(sURL); 
	try{   
		window.external.addFavorite(sURL, sTitle);   
	}catch(e) {   
		try{   
			window.sidebar.addPanel(sTitle, sURL, "");   
		}catch (e) {   
			alert("加入收藏失败，请使用Ctrl+D进行添加,或手动在浏览器里进行设置.");
		}   
	}
}