//页面初始化
var imgUrl = [];
$(function() {
    var time0 = nowTime();
    var html1 = '<div class="text" style="margin-bottom:15px;">\
				<div class="auto">\
					<div class="text_box" data-kinds="0" style="width: 85%;">\
						小主，早上好，一天之计在于晨，要好好珍惜哟，遇到什么问题随时可以找小智。\
					</div>\
                    <div class="now_time">'+time0+'</div>\
				</div>\
			</div>';
    var html2 = '<div class="text" style="margin-bottom:15px;">\
				<div class="auto total">\
					<div class="text_box" data-kinds="1" style="width: 85%;">\
						<div class="text_con">\
							<ul>\
								<li>我想办签证，到哪里可以办理？</li>\
								<li>我想办理签证，大概需要多长时间？</li>\
								<li>申请口岸签证有哪些途径？</li>\
								<li>我附近的出入境？ </li>\
							</ul>\
						</div>\
					</div>\
                    <div class="now_time">'+time0+'</div>\
				</div>\
			</div>';
    $('.customer_container').append(html1);
    $('.customer_container').append(html2);
    //返回上一页
    $('.back').click(function() {
            window.history.back(-1);
        })
        //热门搜索
    $('.customer_container').on('click', '.text_box[data-kinds="1"] li', function() {
        var text = $(this).text().substring(0, $(this).text().indexOf('？'));
        console.log(text)
        hotSearch(text);
    });

    //模糊查询点击给出问题，搜索
    $('.customer_container').on('click', '.text_box[data-kinds="3"] li', function() {
        var text = $(this).text().substring($(this).text().indexOf(' ') + 1, $(this).text().indexOf('？'));
        //console.log(text)
        hotSearch(text);
    });

    //滑动附加按钮框
//        var btnBox = document.getElementById('btns_box');
//        var winWidth = document.body.offsetWidth;
//        var boxWidth = btnBox.offsetWidth;
//        var ow;
//        btnBox.addEventListener('touchstart', function(event) {
//            var touches = event.touches[0];
//            ow = touches.clientX - btnBox.offsetLeft;
//        });
//        btnBox.addEventListener('touchmove', function(event) {
//            var touches = event.touches[0];
//            var btnLeft = touches.clientX - ow;
//            if (btnLeft >= 0) {
//                btnLeft = 0;
//            } else if (btnLeft < -(boxWidth - winWidth)) {
//                btnLeft = -(boxWidth - winWidth)
//            }
//            btnBox.style.left = btnLeft + 'px';
//        });
//        btnBox.addEventListener('touchend', function() {
//            btnBox.removeEventListener('touchstart', null);
//            btnBox.removeEventListener('touchmove', null);
//        });

    //切换输入方式
    $('.choose_ways .ways_pic').click(function() {
        var ways = $(this).attr('data-ways');
        if (ways == 1) {
           // $('.choose_pic').hide();
            alert('敬请期待！');
            return false;
        } else if (ways == 0) {
            $('.choose_pic').show();
        }
        $(this).hide();
        $(this).siblings().show();
        $('.input_ways .input').hide();
        $('.input_ways .input[data-ways=' + ways + ']').show();

    });

    //点击我要办签证按钮
    $(document).on('click','#visa-btn',function(){
        alert('敬请期待！');
        //window.location.href = '';
    })
    //点击确定按钮
    $('.choose_pic button').click(function() {
            var text = $('.input_ways .input[data-ways="0"] input').val();
            console.log(text);

            if (text == '') {
                alert('查询内容不能为空！');
                return false;
            }
            hotSearch(text);

        })
        //跳转地图接口
    $(document).on('click', '.each_location .goto', function() {
            alert('还没有完成')
        })
        //我要评价
        //评价打星
    // var oStar1 = document.getElementById("star1");
    // var oStar2 = document.getElementById("star2");
    // var aLi1 = oStar1.getElementsByTagName("li");
    // var aLi2 = oStar2.getElementsByTagName("li");
    // var iScore1 = iStar1 = 0;
    // var iScore2 = iStar2 = 0;

    // for (i = 1; i <= aLi1.length; i++) {
    //     aLi1[i - 1].index = i;
    //     //点击后进行评分处理
    //     aLi1[i - 1].onclick = function() {
    //         iStar1 = this.index;
    //         fnPoint1();
    //     }
    // }
    // for (i = 1; i <= aLi2.length; i++) {
    //     aLi2[i - 1].index = i;

    //     //点击后进行评分处理
    //     aLi2[i - 1].onclick = function() {
    //         iStar2 = this.index;
    //         fnPoint2();
    //     }
    // }
    // //评分处理
    // function fnPoint1(iArg) {
    //     //分数赋值
    //     iScore1 = iArg || iStar1;
    //     for (i = 0; i < aLi1.length; i++) {
    //         if (i < iScore1) {
    //             aLi1[i].classList.add('active');
    //         } else {
    //             aLi1[i].classList.remove('active');
    //         }
    //     }
    // }

    // //评分处理
    // function fnPoint2(iArg) {
    //     //分数赋值
    //     iScore2 = iArg || iStar2;
    //     for (i = 0; i < aLi2.length; i++) {
    //         if (i < iScore2) {
    //             aLi2[i].classList.add('active');
    //         } else {
    //             aLi2[i].classList.remove('active');
    //         }
    //     }

    // }
    //选择多选按钮
    var assBtns = document.querySelectorAll('.star .choice_btns button');
    var suggBtns = document.querySelectorAll('.proposal .choice_btns button');
    changeBtn(assBtns);
    changeBtn(suggBtns);

    //=====================================================================================================================================
    //点击评价页面提交按钮
    // $('#submit_ass').click(function() {
    //     var obj = $(this);
    //     var intelligence = $('.star button[data-name="intelligence"]').attr('data-choose');
    //     var confidence = $('.star button[data-name="confidence"]').attr('data-choose');
    //     var writeText = $('.star textarea').val();
    //     $.ajax({
    //         type: 'POST',
    //        url: 'http://10.14.8.10:8087/pingjiaController.do?doAdd',
    //     //     url: 'http://crj.gafw.jl.gov.cn/jeecg/pingjiaController.do?doAdd',


    //         data: {
    //             "totalScore": iScore1, //  总体评价  12345
    //             "theScore": iScore2, //   本次服务  12345
    //             "intelligence": intelligence, //   超级智能  0 没有点击  1 点击
    //             "confidence": confidence, //   方便快捷  0 没有点击  1 点击
    //             "writeText": writeText // 文本输入的内容

    //         },
    //         success: function(json) {
    //             console.log(json);
    //             alert('评价成功，谢谢参与！');
    //             obj.parents('.star').find('.close').trigger('click');
    //         }
    //     })
    // })
    // //意见建议
    // $('#submit_sug').click(function() {
    //     var obj = $(this);
    //     var simplify = $('.sugg button[data-name="simplify"]').attr('data-choose');
    //     var slower = $('.sugg button[data-name="slower"]').attr('data-choose');
    //     var beautify = $('.sugg button[data-name="beautify"]').attr('data-choose');
    //     var writeText = $('.sugg textarea').val();
    //     $.ajax({
    //         type: 'POST',
    //         url: 'http://10.14.8.10:8087/jianyiController.do?doAdd',
    //      //    url: 'http://crj.gafw.jl.gov.cn/jeecg/jianyiController.do?doAdd',

    //         data: {
    //             "simplify": simplify, // 简化流程    0   没有点击   1  点击了
    //             "slower": slower, //  反应慢    0   没有点击   1  点击了
    //             "beautify": beautify, //  界面美化   0   没有点击   1  点击了
    //             "writeText": writeText //   所填写的文本信息
    //         },
    //         success: function() {
    //             alert('建议提交成功，谢谢参与！');
    //             obj.parents('.sugg').find('.close').trigger('click');
    //         }

    //     })
    // })
    //点击附加按钮
    // $('.btns_box button').click(function() {
    //     var kind = $(this).attr('data-kinds');
    //     var obj = $('.appendix[data-kinds=' + kind + ']');
    //     var boxHeight = obj.height();
    //     if(kind == 3){
    //         alert('敬请期待！');
    //         return false;
    //     }
    //     $('.mask').show();
    //     obj.css({
    //         'bottom': -boxHeight + 'px'
    //     });
    //     obj.show();
    //     obj.animate({
    //         'bottom': 0
    //     }, 250);
    // });
    
    //点击附加按钮
    $('.btns_box button').click(function() {
        var kind = $(this).attr('data-kinds');
        if(kind == 1){
            window.location.href = 'page2.html'
        }else if(kind == 3){
            alert('敬请期待')
        }
    });


    //点击关闭按钮
    // $('.close').click(function() {
    //     var parBoxHeight = $('.close').parents('.appendix').height();
    //     //console.log(parBoxHeight)
    //     $(this).parents('.appendix').animate({
    //         'bottom': -parBoxHeight + 'px'
    //     }, 250);
    //     $(this).parents('.appendix').hide();
    //     $('.mask').hide();
    // });

    //图片上传
    $('#upfile,#upVedio,#upAudio').click(function(){
        alert('敬请期待！');
        return false;
//        show ($(this)[0]);
    });
    $(document).on('click','.audio-btn',function(){
        alert('敬请期待！');
        return false;
    })
    //删除上传的图片
    $('#upload-box').on('click','.delete-btn',function(){
        var obj = $(this).parent();
        var index = obj.index();
        imgUrl.splice(index,1);
        obj.remove();
    });
    //建议页面的提交建议按钮
    $('#submit-btn').click(function(){
        var text = $('#advise').val();
        $.ajax({
            type: 'POST',
      //      url: 'http://10.14.8.10:8087/jianyiController.do?doAdd',
          url: 'http://crj.gafw.jl.gov.cn/jeecg/jianyiController.do?doAdd',
            data: {
                'imgUrl': imgUrl,
                'advise': text
            },
            timeout: 10000,
            dataType: 'json',
            success:function(){
                alert('意见提交成功！');
                 window.location.href = 'page1.html';
            }
        })
    });

})

//base64实现图片上传
function show (obj) {
    if(typeof FileReader == 'undefined') {
        alert("抱歉，你的浏览器不支持FileReader");
    };
    var simpleFile = obj.files[0];
    if(!/image\/\w+/.test(simpleFile.type)) {
        alert("请确保文件类型为图像类型");
        return false;
    }
    var reader = new FileReader();
    // 将文件以Data URL形式进行读入页面
    reader.readAsDataURL(simpleFile);
    reader.onload = function(e){
        var ele = '<div class="uploaded upload-box-item">\
                        <label for=""><img src="'+this.result+'" width="100%" alt=""></label>\
                        <div class="delete-btn"></div>\
                    </div>';
        imgUrl.push(this.result);
        console.log(imgUrl);
        $('#add-pic').before(ele);
    }
}
//搜索提交数据
function hotSearch(text) {
    var timeNow = nowTime();
    var html3 = '<div class="text">\
					<div class="customer">\
						<div class="text_box" data-kinds="0">' + text + '</div>\
						<div class="now_time">' + timeNow + '</div>\
					</div>\
				</div>';
    $('.customer_container').append(html3);
    $('.input_ways .input[data-ways="0"] input').val('');
    var url2 = 'datas/data02.json'; //流程类
    var url3 = 'datas/data03.json'; //模糊查询类
    var url4 = 'datas/data04.json'; //进度查询类
    var url5 = 'datas/data05.json'; //办理地址类
    var url6 = 'datas/data06.json'; //跳转窗口
    $.ajax({
        type: 'POST',
       //  url: 'http://10.14.8.10:8087/duihuaController.do?fenXi',
         url: 'http://crj.gafw.jl.gov.cn/jeecg/duihuaController.do?fenXi',
         data: {
            "text": text
        },
        timeout: 10000,
        dataType: 'json',
        beforeSend: function() {
            $('.customer_container').append(tips(timeNow));
            $('.customer_content').scrollTop($('.customer_container')[0].scrollHeight);
        },
        success: function(data) {
        //    console.log(data);
            date=eval(data);
            var index = $('.customer_container .text').size();
            $('.customer_container .text').eq(index - 1).remove();
            if(date.length == 0){
                var timeNow = nowTime();
                $('.customer_container').append(tipsKeyError(timeNow));
                return false;
            }
            var html = '';
            var timeNow = nowTime();
            
            for (var i = 0; i < date.length; i++) {
                var zsry = date[i];
                var neirong = zsry.daan  //答案
                var wen  = zsry.wenti
                var Bid = zsry.id


            }
            //---------------------------------------------------------------------------------------点击是否有帮助按钮
               //点击是否有帮助按钮
                  $(document).on('click','.h-btn',function(){
                      var index =  $(this).index();
                      if(index == 0){
                           $.ajax({
                               type: 'POST',
                            //    url: 'http://10.14.8.10:8087/duihuaController.do?bangZhu',
                              url: 'http://crj.gafw.jl.gov.cn/jeecg/duihuaController.do?bangZhu',
                               data: {
                                  ping : Bid,
                                  biaoshi : 1
                               },
                               timeout: 10000,
                               dataType: 'json',
                               success:function(){
                                   //alert('提交成功！');
                               }
                           })
                      }else if(index == 1){
                           $.ajax({
                               type: 'POST',
                           //    url: 'http://10.14.8.10:8087/duihuaController.do?bangZhu',
                             url: 'http://crj.gafw.jl.gov.cn/jeecg/duihuaController.do?bangZhu',
                               data: {
                                  ping : Bid,
                               biaoshi : 2
                               },
                               timeout: 10000,
                               dataType: 'json',
                               success:function(){
                                  // alert('提交成功！');
                               }
                           })
                      }
                  })
            //---------------------------------------------------------------------------------------
            if(neirong == '正在为您进入附近地图'){      //  对办理地点进行跳转
                setTimeout(function() {
                    window.location.href = 'http://crj.gafw.jl.gov.cn/jit_crj_wx/jsp/orgnav/dutuyy_for_wkb.jsp'
                }, 2000);
            }

            if (date.length == 1 && text.length +1 == wen.length) {
            //===================================================================================================================== 现在显示的答案

                html = '<div class="text">\
							<div class="auto">\
								<div class="text_box" data-kinds="2">\
									<div class="text_con">\
										<h1></h1>\
										<ul>';
                html += '<li>' + neirong + ' </li>';
                html += '</ul>';
                if(zsry.by9 != ' '){
                    html += '<button type="button" id="visa-btn">'+zsry.by9+'</button>';
                }
                html += '</div>\
                            <div class="audio-btn"></div>\
                    </div>\
                    <div class="whether-btns">\
                        <div class="help-btn h-btn">\
                                <span>帮到我了</span>\
                        </div>\
                            <div class="helpless-btn h-btn">\
                                <span>没帮到我</span>\
									</div>\
								</div>\
								<div class="now_time">' + timeNow + '</div>\
						</div>'


		//============================================================================================================================
            } else if (date.length >= 1) {
                html = '<div class="text">\
							<div class="auto">\
								<div class="text_box" data-kinds="3">\
									<div class="text_con">\
										<h2>你是想问:</h2>\
										<ul>';

                 for (var i=0; i<date.length; i++){
                 	html += '<li>'+(i*1+1)+'. '+date[i].wenti+' </li>'
                 }


                html += '</ul>\
									</div>\
								</div>\
								<div class="now_time">' + timeNow + '</div>\
							</div>\
						</div>';

            } else if (data.kind == '07') { //  对输入非指定内容的 跳转小吉网站进行查询
                //  标题是  title   内容是    content

                $.ajax({
                    type: 'POST',
                    url: 'http://crj.gafw.jl.gov.cn/f/weixin/wxjq/searchTitle',
                    data: {
                        "searchWord": text
                    },
                    dataType: 'json',
                    success: function(data) { //03
                        console.log(data);
                        alert(data);
                        alert(data.length);
                        html = '<div class="text">\
								<div class="auto">\
									<div class="text_box" data-kinds="3">\
										<div class="text_con">\
											<h2></h2>\
											<ul>';
                        for (var i = 0; i < data.length; i++) {
                            html += '<li>' + data[i].title + ' </li>'
                        }
                        html += '</ul>\
										</div>\
									</div>\
									<div class="now_time">' + timeNow + '</div>\
								</div>\
							</div>';

                    }
                })


                //   window.location.href = 'http://crj.gafw.jl.gov.cn/znzx/robot.jsp';
            } else if (data.kind == '04') {
                html = '<div class="text">\
							<div class="auto">\
								<div class="text_box" data-kinds="4">\
									<div class="text_con">\
										<h2>已查询到您当前办理业务编号' + data.number + '</h2>\
										<ul>';

                // 				for(var i=data.con.length-1; i>=0; i--){
                // 	html += '<li class="each_item">'+data.con[i].name+'</li>'
                // }

                html += '<li class="each_item">' + data.name1 + ' </li>'
                html += '<li class="each_item">' + data.name2 + ' </li>'
                html += '<li class="each_item">' + data.name3 + ' </li>'

                html += '<li class="line"></li>\
										</ul>\
									</div>\
								</div>\
								<div class="now_time">' + timeNow + '</div>\
							</div>\
						</div>';
            } else if (data.kind == '05') { // 和地图有关的


                html = '<div class="text">\
                            <div class="auto">\
                                <div class="text_box" data-kinds="0">\
                                正在为您跳转办理地点的页面！\
                                </div>\
                                <div class="now_time">' + timeNow + '</div>\
                            </div>\
                        </div>';
                setTimeout(function() {
                    window.location.href = 'http://crj.gafw.jl.gov.cn/jit_crj_wx/jsp/orgnav/dutuyy_for_wkb.jsp'
                }, 3000);

                //$('.local').slideDown('fast');

                //   $('.local').show();
                //   for (var i = 0; i < data.con.length; i++) {
                //       html += '<div class="each_location">\
                // 	<div class="loca_name">' + data.con[i].localName + '</div>\
                // 	<div class="loca_con">' + data.con[i].localCon + '</div>\
                // 	<div class="goto" data-local="">\
                // 		<img src="img/arrow.jpg" alt="">\
                // 		<h1>到这去</h1>\
                // 	</div>\
                // </div>'
                //   }

            } else if (data.kind == '06') {
                html = '<div class="text">\
							<div class="auto">\
								<div class="text_box" data-kinds="0">\
									正在为您跳转办理签证窗口！\
								</div>\
								<div class="now_time">' + timeNow + '</div>\
							</div>\
						</div>';
                setTimeout(function() {
                    window.location.href = 'page2.html'
                }, 3000);

            }
            if (data.kind == '08') {

                $('.mask').show();
                $('.local .each_location').remove();
                $('.local').append(html);
                var localBoxHeight = $('.local').height();
                $('.local').css({
                    'bottom': -localBoxHeight + 'px'
                });
                $('.local').stop(true, true).animate({
                    'bottom': 0
                }, 300)
            } else {
                $('.customer_container').append(html);
                console.log($('.customer_container')[0].scrollHeight);
                $('.customer_content').scrollTop($('.customer_container')[0].scrollHeight);

            }

        },
        error: function(a, data, b) {
            var timeNow = nowTime();
            var index = $('.customer_container .text').size();
            $('.customer_container .text').eq(index - 1).remove();
            $('.customer_container').append(tipsError(timeNow));
            $('.customer_content').scrollTop($('.customer_container')[0].scrollHeight);

        }
    })
}
//提示正在输入
function tips(timeNow) {
    var htmlStandard = '<div class="text">\
							<div class="auto">\
								<div class="text_box" data-kinds="0">\
									正在输入...\
								</div>\
								<div class="now_time" style="float:left;">' + timeNow + '</div>\
							</div>\
						</div>';
    return htmlStandard;
}

function tipsKeyError(timeNow) {
    var htmlStandard = '<div class="text">\
                            <div class="auto">\
                                <div class="text_box" data-kinds="0">\
                                    请您输入与护照或签证有关的问题\
                                </div>\
                                <div class="now_time" style="float:left;">' + timeNow + '</div>\
                            </div>\
                        </div>';
    return htmlStandard;
}
//提示网络错误
function tipsError(timeNow) {
    var htmlStandard = '<div class="text">\
							<div class="auto">\
								<div class="text_box" data-kinds="0">\
									请求时间过长，请检查网络！\
								</div>\
								<div class="now_time" style="float:left;">' + timeNow + '</div>\
							</div>\
						</div>';
    return htmlStandard;
}
//获取当前时间
function nowTime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    minutes < 10 ? minutes = '0' + minutes : minutes;
    var nowT = hours + ':' + minutes;
    return nowT;
}



//改变多选按钮状态
function changeBtn(obj) {
    for (var i = 0; i < obj.length; i++) {
        obj[i].onclick = function() {
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                this.setAttribute('data-choose', 0);
            } else {
                this.classList.add('active');
                this.setAttribute('data-choose', 1)
            }
        }
    }
}

function shenqing(){
  setTimeout(function() {
      window.location.href = 'page2.html'
  }, 500);
}

//function rengong(){
//alert("敬请期待");
//
////  setTimeout(function() {
////      window.location.href = 'page3.html'
////  }, 500);
//}
