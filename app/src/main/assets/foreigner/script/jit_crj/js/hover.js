/**
 * ��껬���¼�
 * 
 * */
/** ����ȫ�ֱ���������tabΪ��¼tab��ǩ��λ�á�����pageΪ��¼��ǰ��ҳ��λ�� */
var tab = "first";
var page = "first";
var list = "first";

$(function(){
	$(".main_right_cyyw_tab_show_cut").width($("#main_right_cyyw_tab_show").width());
	$("#main_right_cyyw_tab_show_").width($(".item").size() * $("#main_right_cyyw_tab_show").width());
	//tab����껮���¼�
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
	
	//tab����껮���¼�
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
	
	//list����껮���¼�
	$("#main_right_list ul li").hover(function(){
		$("#main_right_list ul li").removeClass("list_color");
		$("#main_right_list ul li a span").removeClass("text_color");
		$(this).addClass("list_color");
		$(this).find("a").find("span").addClass("text_color");
	}, function(){
		$("#main_right_list ul li").removeClass("list_color");
		$("#main_right_list ul li a span").removeClass("text_color");
	});
	
	//��ҳ����껬���¼�
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
	
	//��һҳ����껬���¼�
	$(".prev").hover(function(){
		$(this).addClass("prev_hover");
		$(this).find("span").addClass("arrow_prev_hover");
	}, function(){
		$(this).removeClass("prev_hover");
		$(this).find("span").removeClass("arrow_prev_hover");
	});
	
	//��һҳ����껬���¼�
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

/** ������ҳ */
function goIndex(){
	location.href = "index.html";
}

/** �ղ� */
function AddFavorite(sURL, sTitle) {
	sURL = encodeURI(sURL); 
	try{   
		window.external.addFavorite(sURL, sTitle);   
	}catch(e) {   
		try{   
			window.sidebar.addPanel(sTitle, sURL, "");   
		}catch (e) {   
			alert("�����ղ�ʧ�ܣ���ʹ��Ctrl+D�������,���ֶ�����������������.");
		}   
	}
}