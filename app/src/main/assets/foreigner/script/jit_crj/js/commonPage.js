			function topage(page) {
				 document.getElementById("showpage").innerHTML=page;
				searchList(page);
			}
			function showpage_num(){
				var showpage_num = document.getElementById("showpage_num").value;
				topage(showpage_num);
			}
				function getGoogleSplitPage(pageinfo, pageUrl, pageNum, forEnglish) {
					if (forEnglish != 0 && forEnglish != 1) {
						forEnglish = 0;
					}
					if(pageNum > pageinfo.totalPage) {
						pageNum = pageinfo.totalPage;
					}
					var front = pageNum - 4; // 前面一截
					var back = pageNum + 5;  // 后面一截
					var middle = 4;
					if(back - pageinfo.totalPage > 0) {
						front = front - (back - pageinfo.totalPage);
						middle = middle + back - pageinfo.totalPage;
					}
					var stringBuffer = "";
					stringBuffer+="<ul>";
					stringBuffer+="<li class='prev'><a href=\"javascript:topage(" +pageinfo.backPage + ");\" ><span>上一页</span></a></li> ";
					if (pageNum < 5) { // 如果索引在前5页
						var totalPage = pageinfo.totalPage <= 10 ? pageinfo.totalPage : 10;
						for (var num = 0; num < totalPage; num++) {
							if(pageNum == num + 1) {
								stringBuffer+="<li class='page page_hover'><a>" + (num + 1) + "</a> </li>";
							} else {
								stringBuffer+="<li><a href=\"javascript:topage(" + (num + 1) + ");\">" + (num + 1) + "</a></li>";
							}
						}
					} else {
						if (front <= 1) {
							for (var num=0; num<4; num++) {
								stringBuffer+="<li><a href=\"javascript:topage(" +(num + 1) + ");\">" + (num + 1) + "</a></li>";  
							}
						} else {
							for (var num=0; num<middle; num++) {
								stringBuffer+="<li><a href=\"javascript:topage(" + (front + num) + ");\">" + (front + num) + "</a></li>";
							}
						}
						stringBuffer+="<li class='page page_hover'><a>" + (pageNum) + "</a> </li>"; // 分界线 eg: 5
						// 前面一截就是1234,后面一截就是6789
						if (back <= pageinfo.totalPage) {
							for (var num=0; num<5; num++) {
								stringBuffer+="<li><a href=\"javascript:topage(" +(pageNum + num + 1) + ");\">" + (pageNum + num + 1) + "</a></li>";
							}
						} else {
							for (var num=0; num<pageinfo.totalPage - pageNum; num++) {
								stringBuffer+="<li><a href=\"javascript:topage(" +(pageNum + num + 1) + ");\">" + (pageNum + num + 1) + "</a></li>";
							}
						}
					}
					stringBuffer+= "<li class='next'><a href=\"javascript:topage(" +pageinfo.forwardPage + ");\" ><span>下一页</span></a></li>";
					stringBuffer+= "</ul>";
					
					//stringBuffer+="<span>" + "共" + " " + "<font style='font-size:14px; font-weight:bold;'>" + pageinfo.totalPage  + "</font> " + "页" + "</span>\n";
					return stringBuffer;
					
					
					/*stringBuffer+="<div class=\"clear\" style=\"margin:10px 0 0 0px; \"><ul class=\"pag\"> \n";
					stringBuffer+="<li><a href=\"javascript:topage(" +pageinfo.backPage + ");\" style=\"padding:0px;\"><span class=\"pagbg01\">上一页</span></a></li>\n ";
					alert(pageNum);
					if (pageNum < 5) { // 如果索引在前5页
						var totalPage = pageinfo.totalPage <= 10 ? pageinfo.totalPage : 10;
						for (var num = 0; num < totalPage; num++) {
							if(pageNum == num + 1) {
								stringBuffer+="<li><a class=\"paga\">" + (num + 1) + "</a> </li>";
							} else {
								stringBuffer+="<li><a href=\"javascript:topage(" + (num + 1) + ");\">" + (num + 1) + "</a></li>\n ";
							}
						}
					} else {
						if (front <= 1) {
							for (var num=0; num<4; num++) {
								stringBuffer+="<li><a href=\"javascript:topage(" +(num + 1) + ");\">" + (num + 1) + "</a></li>\n ";  
							}
						} else {
							for (var num=0; num<middle; num++) {
								stringBuffer+="<li><a href=\"javascript:topage(" + (front + num) + ");\">" + (front + num) + "</a></li>\n ";
							}
						}
						stringBuffer+="<li><a class=\"paga\">" + (pageNum) + "</a> </li>"; // 分界线 eg: 5
						// 前面一截就是1234,后面一截就是6789
						if (back <= pageinfo.totalPage) {
							for (var num=0; num<5; num++) {
								stringBuffer+="<li><a href=\"javascript:topage(" +(pageNum + num + 1) + ");\">" + (pageNum + num + 1) + "</a></li>\n ";
							}
						} else {
							for (var num=0; num<pageinfo.totalPage - pageNum; num++) {
								stringBuffer+="<li><a href=\"javascript:topage(" +(pageNum + num + 1) + ");\">" + (pageNum + num + 1) + "</a></li>\n ";
							}
						}
					}
					stringBuffer+= "<li><a href=\"javascript:topage(" +pageinfo.forwardPage + ");\" ><span class=\"pagbg02\">下一页</span></a></li>";
					stringBuffer+= "</ul>";
					stringBuffer+="<p class=\"jump\"><span>我要跳到：</span><span>第</span><span style=\"background:url(../image/paginput.gif) no-repeat;width:30px;\">" + "\n";
					stringBuffer+="<input id=\"showpage_num\" name=\"showpage_num\" onkeyup=\"if(isNaN(value))execCommand('undo')\" onblur=\"if(isNaN(value))execCommand('undo')\" type=\"text\" /></span><span>页</span></p>";
					stringBuffer+="<p class=\"GO_bt\"><a href=\"javascript:showpage_num();\"><img src=\"../image/GO.gif\" /></a></p>";
					
					//stringBuffer+="<span>" + "共" + " " + "<font style='font-size:14px; font-weight:bold;'>" + pageinfo.totalPage  + "</font> " + "页" + "</span>\n";
					stringBuffer+="</div>\n";
					return stringBuffer;*/
				}