$(document).ready(function() {

    //var cityName = ""  //(qxname,区分局);

    $.areaSelect = function(init) {

        var Province, State, City;
        var CityJson;

        var stateDom = '';
        var cityDom = '';
        createDom();
        writeData();
        //暂时去掉方法 hwl
        replyOperation();
		$('.tab-list-1 li a[data-click="1"]').click();
		$('.tab-list-2 li a[data-click="1"]').click();

        //增加 hwl satrt*****************
//      for (var j = 0; j < CityJson.length; j++) {
//          //	if(CityJson[j].region.code == regionCode){
//          if (CityJson[j].region.name == regionName) {
//              for (var k = 0; k < CityJson[j].region.state.length; k++) {
//                  stateDom += '<li><a>' + CityJson[j].region.state[k].name + '<input value="' + CityJson[j].region.state[k].code + '" style="display:none"></a></li>';
//              }
//
//
//
//              $('.tab-list-2 ul').html(stateDom);
//          }
//      }
//      for (var j = 0; j < CityJson.length; j++) {
//          //	if(CityJson[j].region.code == regionCode){
//          if (CityJson[j].region.name == regionName) {
//              for (var k = 0; k < CityJson[j].region.state.length; k++) {
//                  //		if(CityJson[j].region.state[k].code == cityCode){
//                  if (CityJson[j].region.state[k].name == cityName) {
//                      for (var l = 0; l < CityJson[j].region.state[k].city.length; l++) {
//                          cityDom += '<li><a>' + CityJson[j].region.state[k].city[l].name + '<input value="' + CityJson[j].region.state[k].city[l].code + '" style="display:none"></a></li>';
//                      }
//
//                      //alert(cityDom);
//                      $('.tab-list-3 ul').html(cityDom);
//                  }
//
//              }
//          }
//      }
        //增加 hwl end*****************

        var myscrol0 = new iScroll("wrapper0", {
            hScroll: false,
            vScrollbar: false,
            onScrollEnd: function() {

            }
        });

        /*var myscroll1 = new iScroll("wrapper1");
        var myscroll2 = new iScroll("wrapper2");*/
        /*生成地区选择界面结构*/
        function createDom() {
            var html = '';
            html += '<div class="sg-mask">';
            html += '<div class="popups-box">';
            html += '<div class="title-min"><span class="query">取消</span>请选择派出所<span class="submit">确定</span></div>';
            html += '<div class="title-max">请选择派出所<span class="close">X</span></div>';
            html += '<div class="result-box">';
            html += '<label>已选择</label>';
            html += '<input id="hasCheck" type="text" name="area">';
            html += '</div>';
            html += '<div class="tab-box">';
            html += '<div class="tab-menu">';
            html += '<ul>';
            html += '<li class="tab-1 ">市局</li>';
            html += '<li class="tab-2">分局</li>';
            html += '<li class="tab-3 isCheck">派出所</li>';
            html += '</ul>';
            html += '</div>';
            html += '<div class="content-box">';
            html += '<div id="wrapper0" class="tab-content tab-list-1 ">';
            html += '<ul></ul>';
            html += '</div>';
            html += '<div id="wrapper1"  class="tab-content tab-list-2">';
            html += '<ul></ul>';
            html += '</div>';
            html += '<div id="wrapper2"  class="tab-content tab-list-3 isBlock">';
            html += '<ul></ul>';
            html += '</div>';
            html += '</div>';
            html += '</div> ';
            html += '<div class="footer">';
            html += '<button id="submitBtn">确定</button>';
            html += '</div> ';
            html += '</div>';
            html += '</div>';
            $('body').append(html);

            //$('.popups-box').addClass('fadeUp');
            $(".popups-box").show().animate({
                bottom: '0px'
            })
        }
        /*样式设置*/
        function setDomStyle() {}

        /*选择操作响应*/
        function replyOperation() {

            var provinceDom = '';
            // var regionCode = '220100000000';
            // var cityCode = '220122000000';

            //PC端页签切换
            var listOne = $('.tab-list-1');
            var listtwo = $('.tab-list-2');
            var listthree = $('.tab-list-3');
            $('.tab-1').click(function() {
                listOne.addClass('isBlock').siblings().removeClass('isBlock');
                $(this).addClass('isCheck').siblings().removeClass('isCheck');
            })
            $('.tab-2').click(function() {
                listtwo.addClass('isBlock').siblings().removeClass('isBlock');
                $(this).addClass('isCheck').siblings().removeClass('isCheck');
            })
            $('.tab-3').click(function() {
                listthree.addClass('isBlock').siblings().removeClass('isBlock');
                $(this).addClass('isCheck').siblings().removeClass('isCheck');
            })

            for (var i = 0; i < CityJson.length; i++) {

            	if(CityJson[i].region.name == regionName){
            		provinceDom += '<li><a data-click="1">' + CityJson[i].region.name + '<input value=' + CityJson[i].region.code + ' style="display:none"></a></li>';
            	}else{
            		provinceDom += '<li><a>' + CityJson[i].region.name + '<input value=' + CityJson[i].region.code + ' style="display:none"></a></li>';
            	}

            }
            $('.tab-list-1 ul').html(provinceDom);

            //PC端选择省份
            $('.tab-list-1 li a').click(function() {
                $(this).parent().addClass('minISClick').siblings().removeClass('minISClick');
                regionCode = $(this).children('input').val();
                Province = $(this).text();

                $('#hasCheck').val(Province);
                $('.tab-list-2 ul').empty();
                $('.tab-list-3 ul').empty();
                createState();

                //PC端选择城市
                $('.tab-list-2 li a').click(function() {
                    $(this).parent().addClass('minISClick').siblings().removeClass('minISClick');
                    cityCode = $(this).children('input').val();
                    State = $(this).text();
                    $('#hasCheck').val(Province + '-' + State);
                    $('.tab-list-3 ul').empty();
                    createCity();
                    //PC端选择县区
                    $('.tab-list-3 li a').click(function() {
                        $(this).parent().addClass('minISClick').siblings().removeClass('minISClick');
                        City = $(this).text();

                        $('#hasCheck').val(City);
                        $('#sspcsName').val(City);

                        $('#sspcs').val(cityCode);
                    })

                })

            })

            //创建二级菜单
            function createState() {
                var stateDom = '';
                for (var j = 0; j < CityJson.length; j++) {
                    if (CityJson[j].region.code == regionCode) {
                        for (var k = 0; k < CityJson[j].region.state.length; k++) {
                        	if(CityJson[j].region.state[k].name == cityName){
	                            stateDom += '<li><a data-click="1">' + CityJson[j].region.state[k].name + '<input value="' + CityJson[j].region.state[k].code + '" style="display:none"></a></li>';
	                        }else{
	                            stateDom += '<li><a>' + CityJson[j].region.state[k].name + '<input value="' + CityJson[j].region.state[k].code + '" style="display:none"></a></li>';
	                        }
                        }
                        $('.tab-list-2 ul').html(stateDom);
                    }
                }

                //页签切换
                $('.tab-2').click();
                var myscrol1 = new iScroll("wrapper1", {
                    hScroll: false,
                    vScrollbar: false,
                });
            }

            //创建三级菜单
            function createCity() {
                var cityDom = '';
                for (var j = 0; j < CityJson.length; j++) {
                    if (CityJson[j].region.code == regionCode) {
                        for (var k = 0; k < CityJson[j].region.state.length; k++) {
                            if (CityJson[j].region.state[k].code == cityCode) {
                                for (var l = 0; l < CityJson[j].region.state[k].city.length; l++) {
                                    cityDom += '<li><a>' + CityJson[j].region.state[k].city[l].name + '<input value="' + CityJson[j].region.state[k].city[l].code + '" style="display:none"></a></li>';
                                }
                                $('.tab-list-3 ul').html(cityDom);
                            }

                        }
                    }
                }
                //页签切换
                $('.tab-3').click();
                var myscrol2 = new iScroll("wrapper2", {
                    hScroll: false,
                    vScrollbar: false,
                });
            }
        }

        /*PC关闭操作响应*/
        $('.popups-box .close').click(function() {
            $('.sg-area-result').val($('#hasCheck').val());
            $('.sg-mask').css('display', 'none');
            $('.sg-mask').remove();

        });
        /*PC确定操作响应*/
        $('#submitBtn').click(function() {
			//		alert($('#hasCheck').val())
            $('.sg-area-result').val($('#hasCheck').val());
            $('.sg-mask').css('display', 'none');
            $('.sg-mask').remove();
        });


        /*移动端取消操作响应*/
        $('.title-min .query').on('click', function() {
            $('.sg-area-result').val();
            $(".popups-box").show().animate({
                bottom: '-251px'
            }, function() {
                $('.sg-mask').css('display', 'none');
                $('.sg-mask').remove();
            })

        })

        /*移动端确定操作响应*/
        $('.title-min .submit').on('click', function() {
            $('.sg-area-result').val($('#hasCheck').val());
            $(".popups-box").show().animate({
                bottom: '-251px'
            }, function() {
                $('.sg-mask').css('display', 'none');
                $('.sg-mask').remove();
            })
        })


        /*地区信息*/
        function writeData() {
            CityJson = [{
                region: {
                    name: '长春市公安局',
                    code: '220100000000',
                    state: [{
                        name: '机动治安支队',
                        code: '220100530000',
                        city: [{
                            name: '果品治安派出所',
                            code: '220100531500'
                        },{
                            name: '中东天宝治安派出所',
                            code: '220100531300'
                        }]
                    },{
                        name: '农安县公安局',
                        code: '220122000000',
                        city: [{
                            name: '南关派出所',
                            code: '220122390000'
                        },{
                            name: '青山派出所',
                            code: '220122470000'
                        },{
                            name: '烧锅派出所',
                            code: '220122360000'
                        },{
                            name: '黄鱼圈派出所',
                            code: '220122350000'
                        },{
                            name: '开安派出所',
                            code: '220122490000'
                        },{
                            name: '万顺派出所',
                            code: '220122280000'
                        },{
                            name: '黄龙派出所',
                            code: '220122240000'
                        },{
                            name: '合隆派出所',
                            code: '220122260000'
                        },{
                            name: '前岗派出所',
                            code: '220122410000'
                        },{
                            name: '小城子派出所',
                            code: '220122370000'
                        },{
                            name: '伏龙泉派出所',
                            code: '220122440000'
                        },{
                            name: '靠山派出所',
                            code: '220122310000'
                        },{
                            name: '万金塔派出所',
                            code: '220122380000'
                        },{
                            name: '宝塔派出所',
                            code: '220122250000'
                        },{
                            name: '榛柴派出所',
                            code: '220122550000'
                        },{
                            name: '杨树林派出所',
                            code: '220122460000'
                        },{
                            name: '三盛玉派出所',
                            code: '220122540000'
                        },{
                            name: '新农派出所',
                            code: '220122480000'
                        },{
                            name: '古城派出所',
                            code: '220122230000'
                        },{
                            name: '哈拉海派出所',
                            code: '220122270000'
                        },{
                            name: '三岗派出所',
                            code: '220122520000'
                        },{
                            name: '华家派出所',
                            code: '220122450000'
                        },{
                            name: '龙王派出所',
                            code: '220122510000'
                        },{
                            name: '巴吉垒派出所',
                            code: '220122340000'
                        },{
                            name: '永安派出所',
                            code: '220122430000'
                        },{
                            name: '三宝派出所',
                            code: '220122330000'
                        },{
                            name: '德彪派出所',
                            code: '220122220000'
                        },{
                            name: '高家店派出所',
                            code: '220122420000'
                        }]
                    },{
                        name: '汽车经济技术开发区分局',
                        code: '220199000000',
                        city: [{
                            name: '迎春路派出所',
                            code: '220199310000'
                        },{
                            name: '安庆路派出所',
                            code: '220199330000'
                        },{
                            name: '锦程大街派出所',
                            code: '220199250000'
                        },{
                            name: '汽车厂派出所',
                            code: '220199210000'
                        },{
                            name: '四联大街派出所',
                            code: '220199290000'
                        },{
                            name: '创业大街派出所',
                            code: '220199230000'
                        },{
                            name: '汽贸城治安派出所',
                            code: '220199390000'
                        },{
                            name: '东风大街派出所',
                            code: '220199270000'
                        }]
                    },{
                        name: '宽城区分局',
                        code: '220103000000',
                        city: [{
                            name: '兰家派出所',
                            code: '220103450000'
                        },{
                            name: '北郊派出所',
                            code: '220103370000'
                        },{
                            name: '长平治安派出所',
                            code: '220103490000'
                        },{
                            name: '兴业街派出所',
                            code: '220103350000'
                        },{
                            name: '长新街派出所',
                            code: '220103330000'
                        },{
                            name: '东广场派出所',
                            code: '220103290000'
                        },{
                            name: '西广场派出所',
                            code: '220103210000'
                        },{
                            name: '北京大街派出所',
                            code: '220103250000'
                        },{
                            name: '柳影路派出所',
                            code: '220103430000'
                        },{
                            name: '站前广场治安派出所',
                            code: '220103570000'
                        },{
                            name: '南广场派出所',
                            code: '220103270000'
                        },{
                            name: '果品市场治安派出所',
                            code: '220103550000'
                        },{
                            name: '光复路治安派出所',
                            code: '220103510000'
                        },{
                            name: '孟家桥派出所',
                            code: '220103310000'
                        },{
                            name: '红明治安派出所',
                            code: '220103470000'
                        },{
                            name: '西三条派出所',
                            code: '220103230000'
                        },{
                            name: '奋进派出所',
                            code: '220103410000'
                        },{
                            name: '长江路开发区治安派出所',
                            code: '220103530000'
                        },{
                            name: '凯旋路派出所',
                            code: '220103390000'
                        }]
                    },{
                        name: '南关区分局',
                        code: '220102000000',
                        city: [{
                            name: '幸福派出所',
                            code: '220102470000'
                        },{
                            name: '曙光路派出所',
                            code: '220102310000'
                        },{
                            name: '明珠派出所',
                            code: '220102510000'
                        },{
                            name: '长通路派出所',
                            code: '220102490000'
                        },{
                            name: '全安广场派出所',
                            code: '220102250000'
                        },{
                            name: '桃源路派出所',
                            code: '220102230000'
                        },{
                            name: '永吉街派出所',
                            code: '220102290000'
                        }, {
                            name: '南岭大街派出所',
                            code: '220102330000'
                        },{
                            name: '西五马路派出所',
                            code: '220102270000'
                        },{
                            name: '雕塑公园治安派出所',
                            code: '220102530000'
                        },{
                            name: '新春派出所',
                            code: '220102430000'
                        }, {
                            name: '南街派出所',
                            code: '220102210000'
                        },{
                            name: '自强街派出所',
                            code: '220102350000'
                        }, {
                            name: '东安屯派出所',
                            code: '220102450000'
                        },{
                            name: '鸿城派出所',
                            code: '220102550000'
                        }, {
                            name: '清明街派出所',
                            code: '220102390000'
                        },{
                            name: '民康路派出所',
                            code: '220102370000'
                        }]
                    },{
                        name: '莲花山生态旅游度假区分局',
                        code: '220193000000',
                        city: [{
                            name: '劝农派出所',
                            code: '220193150000'
                        }, {
                            name: '四家子派出所',
                            code: '220193170000'
                        },{
                            name: '泉眼派出所',
                            code: '220193130000'
                        }]
                    },{
                        name: '绿园区分局',
                        code: '220106000000',
                        city: [{
                            name: '青荫路治安派出所',
                            code: '220106510000'
                        },{
                            name: '四间派出所',
                            code: '220106350000'
                        },{
                            name: '青年路派出所',
                            code: '220106270000'
                        },{
                            name: '西安广场派出所',
                            code: '220106210000'
                        },{
                            name: '春城大街派出所',
                            code: '220106310000'
                        },{
                            name: '正阳街派出所',
                            code: '220106250000'
                        },{
                            name: '西环城治安派出所',
                            code: '220106430000'
                        },{
                            name: '林园派出所',
                            code: '220106550000'
                        },{
                            name: '西新派出所',
                            code: '220106370000'
                        },{
                            name: '和平大街派出所',
                            code: '220106230000'
                        },{
                            name: '合心派出所',
                            code: '220106390000'
                        },{
                            name: '普阳街派出所',
                            code: '220106290000'
                        },{
                            name: '城西派出所',
                            code: '220106330000'
                        },{
                            name: '同心派出所',
                            code: '220106570000'
                        },{
                            name: '蔬菜治安派出所',
                            code: '220106530000'
                        },{
                            name: '青林路治安派出所',
                            code: '220106490000'
                        },{
                            name: '浩月大路派出所',
                            code: '220106450000'
                        }]
                    },{
                        name: '治安管理支队',
                        code: '220100470000',
                        city: [{
                            name: '北安路治安派出所',
                            code: '220100471900'
                        },{
                            name: '新发广场治安派出所',
                            code: '220100472300'
                        },{
                            name: '人民广场治安派出所',
                            code: '220100472100'
                        }]
                    },{
                        name: '德惠市公安局',
                        code: '220183000000',
                        city: [{
                            name: '朝阳派出所',
                            code: '220183350000'
                        },{
                            name: '工商派出所',
                            code: '220183450000'
                        },{
                            name: '同太派出所',
                            code: '220183300000'
                        },{
                            name: '米沙子镇沃皮派出所',
                            code: '220183260000'
                        },{
                            name: '大青咀派出所',
                            code: '220183410000'
                        },{
                            name: '和平乡派出所',
                            code: '220183290000'
                        },{
                            name: '达家沟派出所',
                            code: '220183430000'
                        },{
                            name: '交通派出所',
                            code: '220183460000'
                        },{
                            name: '松花江派出所',
                            code: '220183420000'
                        },{
                            name: '朱城子派出所',
                            code: '220183270000'
                        },{
                            name: '和平街派出所',
                            code: '220183200000'
                        },{
                            name: '万宝派出所',
                            code: '220183250000'
                        },{
                            name: '惠发派出所',
                            code: '220183220000'
                        },{
                            name: '岔路口派出所',
                            code: '220183360000'
                        },{
                            name: '大房身派出所',
                            code: '220183380000'
                        },{
                            name: '杨树镇派出所',
                            code: '220183370000'
                        },{
                            name: '边岗派出所',
                            code: '220183330000'
                        },{
                            name: '胜利派出所',
                            code: '220183170000'
                        },{
                            name: '建设派出所',
                            code: '220183210000'
                        },{
                            name: '升阳派出所',
                            code: '220183340000'
                        },{
                            name: '五台派出所',
                            code: '220183390000'
                        },{
                            name: '郭家派出所',
                            code: '220183310000'
                        },{
                            name: '米沙子派出所',
                            code: '220183230000'
                        },{
                            name: '米沙子镇三胜派出所',
                            code: '220183240000'
                        },{
                            name: '夏家店派出所',
                            code: '220183400000'
                        },{
                            name: '振兴派出所',
                            code: '220183190000'
                        },{
                            name: '红旗派出所',
                            code: '220183180000'
                        },{
                            name: '布海镇派出所',
                            code: '220183280000'
                        },{
                            name: '菜园子派出所',
                            code: '220183440000'
                        },{
                            name: '天台派出所',
                            code: '220183320000'
                        }]
                    },{
                        name: '九台区分局',
                        code: '220181000000',
                        city: [{
                            name: '工农派出所',
                            code: '220181230000'
                        },{
                            name: '营城派出所',
                            code: '220181270000'
                        },{
                            name: '土们岭派出所',
                            code: '220181410000'
                        },{
                            name: '莽卡派出所',
                            code: '220181390000'
                        },{
                            name: '沐石河派出所',
                            code: '220181330000'
                        },{
                            name: '九郊派出所',
                            code: '220181310000'
                        },{
                            name: '龙家堡派出所',
                            code: '220181470000'
                        },{
                            name: '南山派出所',
                            code: '220181250000'
                        },{
                            name: '东湖派出所',
                            code: '220181510000'
                        },{
                            name: '兴隆派出所',
                            code: '220181530000'
                        },{
                            name: '上河湾派出所',
                            code: '220181610000'
                        },{
                            name: '胡家派出所',
                            code: '220181370000'
                        },{
                            name: '纪家派出所',
                            code: '220181550000'
                        },{
                            name: '团结派出所',
                            code: '220181210000'
                        },{
                            name: '其塔木派出所',
                            code: '220181350000'
                        },{
                            name: '波泥河派出所',
                            code: '220181430000'
                        },{
                            name: '卡伦派出所',
                            code: '220181490000'
                        },{
                            name: '苇子沟派出所',
                            code: '220181570000'
                        },{
                            name: '城子街派出所',
                            code: '220181590000'
                        }]
                    },{
                        name: '双阳区分局',
                        code: '220112000000',
                        city: [{
                            name: '石溪乡派出所',
                            code: '220112300000'
                        },{
                            name: '奢岭派出所',
                            code: '220112230000'
                        },{
                            name: '北山路派出所',
                            code: '220112210000'
                        },{
                            name: '佟家乡派出所',
                            code: '220112290000'
                        },{
                            name: '新安镇派出所',
                            code: '220112250000'
                        },{
                            name: '通阳路派出所',
                            code: '220112200000'
                        },{
                            name: '齐家镇派出所',
                            code: '220112310000'
                        },{
                            name: '太平镇派出所',
                            code: '220112240000'
                        },{
                            name: '土顶镇派出所',
                            code: '220112270000'
                        },{
                            name: '长岭镇派出所',
                            code: '220112280000'
                        },{
                            name: '双营子乡派出所',
                            code: '220112320000'
                        },{
                            name: '山河派出所',
                            code: '220112220000'
                        },{
                            name: '鹿乡镇派出所',
                            code: '220112260000'
                        },{
                            name: '峰南治安派出所',
                            code: '220112330000'
                        }]
                    },{
                        name: '水源治安分局',
                        code: '220198000000',
                        city: [{
                            name: '净水治安派出所',
                            code: '220198050000'
                        },{
                            name: '伊通河治安派出所',
                            code: '220198110000'
                        },{
                            name: '新立城水库治安派出所',
                            code: '220198070000'
                        },{
                            name: '石头口门水库治安派出所',
                            code: '220198090000'
                        }]
                    },{
                        name: '二道区分局',
                        code: '220105000000',
                        city: [{
                            name: '远达大街派出所',
                            code: '220105310000'
                        },{
                            name: '八里堡派出所',
                            code: '220105330000'
                        },{
                            name: '杨家店派出所',
                            code: '220105410000'
                        },{
                            name: '东新路治安派出所',
                            code: '220105470000'
                        },{
                            name: '三道镇派出所',
                            code: '220105350000'
                        },{
                            name: '东盛路派出所',
                            code: '220105290000'
                        },{
                            name: '和顺街派出所',
                            code: '220105270000'
                        },,{
                            name: '吉林街派出所',
                            code: '220105250000'
                        },{
                            name: '东站派出所',
                            code: '220105230000'
                        },{
                            name: '荣光路派出所',
                            code: '220105210000'
                        },{
                            name: '金钱堡派出所',
                            code: '220105430000'
                        }]
                    },{
                        name: '公共交通治安管理支队',
                        code: '220100560000',
                        city: [{
                            name: '公路客运治安派出所',
                            code: '220100561900'
                        },{
                            name: '出租车治安派出所',
                            code: '220100562100'
                        },{
                            name: '公交治安派出所',
                            code: '220100561700'
                        },{
                            name: '轻铁治安派出所',
                            code: '220100562300'
                        }]
                    },{
                        name: '净月高新技术产业开发区分局',
                        code: '220196000000',
                        city: [{
                            name: '玉潭派出所',
                            code: '220196130000'
                        },{
                            name: '净月治安派出所',
                            code: '220196190000'
                        },{
                            name: '新立城派出所',
                            code: '220196230000'
                        },{
                            name: '彩宇大街派出所',
                            code: '220196290000'
                        },{
                            name: '电影城治安派出所',
                            code: '220196170000'
                        },{
                            name: '新湖派出所',
                            code: '220196250000'
                        },{
                            name: '陕北治安派出所',
                            code: '220196210000'
                        },{
                            name: '净月大街派出所',
                            code: '220196110000'
                        },{
                            name: '福祉大路派出所',
                            code: '220196150000'
                        }]
                    },{
                        name: '经济技术开发区分局',
                        code: '220197000000',
                        city: [{
                            name: '浦东路派出所',
                            code: '220197110000'
                        },{
                            name: '金安派出所',
                            code: '220197290000'
                        },{
                            name: '中东治安派出所',
                            code: '220197210000'
                        },{
                            name: '珠海路派出所',
                            code: '220197190000'
                        },{
                            name: '顺风治安派出所',
                            code: '220197230000'
                        },{
                            name: '会展治安派出所',
                            code: '220197250000'
                        },{
                            name: '兴隆山镇派出所',
                            code: '220197270000'
                        },{
                            name: '北方治安派出所',
                            code: '220197150000'
                        },{
                            name: '花园路派出所',
                            code: '220197170000'
                        },{
                            name: '深圳街派出所',
                            code: '220197130000'
                        }]
                    },{
                        name: '朝阳区分局',
                        code: '220104000000',
                        city: [{
                            name: '自由大路派出所',
                            code: '220104450000'
                        },{
                            name: '建设广场派出所',
                            code: '220104270000'
                        },{
                            name: '东朝阳路派出所',
                            code: '220104390000'
                        },{
                            name: '繁荣路治安派出所',
                            code: '220104570000'
                        },{
                            name: '富锋派出所',
                            code: '220104470000'
                        },{
                            name: '人防治安派出所',
                            code: '220104530000'
                        },{
                            name: '宽平大路派出所',
                            code: '220104350000'
                        },{
                            name: '永春派出所',
                            code: '220104510000'
                        },{
                            name: '卫星路派出所',
                            code: '220104550000'
                        },{
                            name: '红旗街派出所',
                            code: '220104330000'
                        },{
                            name: '南湖大路派出所',
                            code: '220104370000'
                        },{
                            name: '桂林路派出所',
                            code: '220104430000'
                        },{
                            name: '湖西路治安派出所',
                            code: '220104590000'
                        },{
                            name: '孟家屯派出所',
                            code: '220104310000'
                        },{
                            name: '乐山镇派出所',
                            code: '220104490000'
                        },{
                            name: '清和街派出所',
                            code: '220104210000'
                        },{
                            name: '重庆路派出所',
                            code: '220104250000'
                        },{
                            name: '长久路派出所',
                            code: '220104290000'
                        },{
                            name: '义和路派出所',
                            code: '220104410000'
                        },{
                            name: '白菊路派出所',
                            code: '220104230000'
                        }]
                    },{
                        name: '榆树市公安局',
                        code: '220182000000',
                        city: [{
                            name: '新立派出所',
                            code: '220182260000'
                        },{
                            name: '土桥派出所',
                            code: '220182250000'
                        },{
                            name: '太安派出所',
                            code: '220182360000'
                        },{
                            name: '育民派出所',
                            code: '220182350000'
                        },{
                            name: '大岭派出所',
                            code: '220182420000'
                        },{
                            name: '刘家派出所',
                            code: '220182310000'
                        },{
                            name: '城发派出所',
                            code: '220182230000'
                        },{
                            name: '城郊派出所',
                            code: '220182200000'
                        },{
                            name: '环城派出所',
                            code: '220182220000'
                        },{
                            name: '弓棚派出所',
                            code: '220182380000'
                        },{
                            name: '五棵树派出所',
                            code: '220182210000'
                        },{
                            name: '泗河派出所',
                            code: '220182400000'
                        },{
                            name: '正阳派出所',
                            code: '220182170000'
                        },{
                            name: '红星派出所',
                            code: '220182340000'
                        },{
                            name: '于家派出所',
                            code: '220182430000'
                        },{
                            name: '保寿派出所',
                            code: '220182280000'
                        },{
                            name: '黑林派出所',
                            code: '220182270000'
                        },{
                            name: '八号派出所',
                            code: '220182370000'
                        },{
                            name: '新庄派出所',
                            code: '220182390000'
                        },{
                            name: '华昌派出所',
                            code: '220182180000'
                        },{
                            name: '青山派出所',
                            code: '220182410000'
                        },{
                            name: '大坡派出所',
                            code: '220182320000'
                        },{
                            name: '先锋派出所',
                            code: '220182290000'
                        },{
                            name: '秀水派出所',
                            code: '220182300000'
                        },{
                            name: '恩育派出所',
                            code: '220182240000'
                        },{
                            name: '闵家派出所',
                            code: '220182330000'
                        },{
                            name: '延和派出所',
                            code: '220182440000'
                        },{
                            name: '培英派出所',
                            code: '220182190000'
                        }]
                    },{
                        name: '长春新区分局',
                        code: '220195000000',
                        city: [{
                            name: '北湖派出所',
                            code: '220195230000'
                        },{
                            name: '长德派出所',
                            code: '220195250000'
                        },{
                            name: '前进大街派出所',
                            code: '220195110000'
                        },{
                            name: '兴华大街派出所',
                            code: '220195190000'
                        },{
                            name: '高新路治安派出所',
                            code: '220195130000'
                        },{
                            name: '西营城派出所',
                            code: '220181450000'
                        },{
                            name: '万顺大街派出所',
                            code: '220195170000'
                        },{
                            name: '硅谷大街派出所',
                            code: '220195150000'
                        },{
                            name: '空港派出所',
                            code: '220195340000'
                        }]
                    }]
                }
            },  {
                region: {
                    name: '白城市公安局',
                    code: '220800000000',
                    state: [{
                        name: '洮南市公安局',
                        code: '220881000000',
                        city: [{
                            name: '永茂派出所',
                            code: '220881390000'
                        }, {
                            name: '安定派出所',
                            code: '220881300000'
                        }, {
                            name: '光明派出所',
                            code: '220881250000'
                        }, {
                            name: '车力派出所',
                            code: '220881370000'
                        }, {
                            name: '聚宝派出所',
                            code: '220881360000'
                        }, {
                            name: '洮府派出所',
                            code: '220881410000'
                        }, {
                            name: '兴隆派出所',
                            code: '220881210000'
                        }, {
                            name: '蛟流河派出所',
                            code: '220881380000'
                        }, {
                            name: '那金派出所',
                            code: '220881270000'
                        }, {
                            name: '通达派出所',
                            code: '220881220000'
                        }, {
                            name: '经济开发区派出所',
                            code: '220881440000'
                        }, {
                            name: '瓦房派出所',
                            code: '220881280000'
                        }, {
                            name: '野马派出所',
                            code: '220881350000'
                        }, {
                            name: '胡力吐派出所',
                            code: '220881320000'
                        }, {
                            name: '黑水派出所',
                            code: '220881310000'
                        }, {
                            name: '福顺派出所',
                            code: '220881290000'
                        }, {
                            name: '二龙派出所',
                            code: '220881430000'
                        }, {
                            name: '东升派出所',
                            code: '220881340000'
                        }, {
                            name: '向阳派出所',
                            code: '220881420000'
                        }, {
                            name: '团结派出所',
                            code: '220881240000'
                        }, {
                            name: '万宝乡派出所',
                            code: '220881330000'
                        }, {
                            name: '万宝镇派出所',
                            code: '220881260000'
                        }, {
                            name: '永康派出所',
                            code: '220881230000'
                        }, {
                            name: '富文派出所',
                            code: '220881200000'
                        }, {
                            name: '大通派出所',
                            code: '220881400000'
                        }]
                    }, {
                        name: '经济开发区分局',
                        code: '220897000000',
                        city: [{
                            name: '西郊派出所',
                            code: '220897080000'
                        }, {
                            name: '保平派出所',
                            code: '220897100000'
                        }, {
                            name: '保胜派出所',
                            code: '220897070000'
                        }, {
                            name: '顺开派出所',
                            code: '220897140000'
                        }, {
                            name: '幸福派出所',
                            code: '220897090000'
                        }]
                    }, {
                        name: '洮北分局',
                        code: '220802000000',
                        city: [{
                            name: '东胜乡派出所',
                            code: '220802340000'
                        }, {
                            name: '长庆派出所',
                            code: '220802160000'
                        }, {
                            name: '金祥乡派出所',
                            code: '220802330000'
                        }, {
                            name: '站前派出所',
                            code: '220802370000'
                        }, {
                            name: '平台镇派出所',
                            code: '220802250000'
                        }, {
                            name: '青山镇派出所',
                            code: '220802260000'
                        }, {
                            name: '洮河镇派出所',
                            code: '220802280000'
                        }, {
                            name: '东风乡派出所',
                            code: '220802320000'
                        }, {
                            name: '镇南派出所',
                            code: '220802380000'
                        }, {
                            name: '到保派出所',
                            code: '220802410000'
                        }, {
                            name: '林海镇派出所',
                            code: '220802290000'
                        }, {
                            name: '平安镇派出所',
                            code: '220802270000'
                        }, {
                            name: '海明派出所',
                            code: '220802190000'
                        }, {
                            name: '市场派出所',
                            code: '220802360000'
                        }, {
                            name: '明仁派出所',
                            code: '220802170000'
                        }, {
                            name: '光明派出所',
                            code: '220802200000'
                        }, {
                            name: '新立派出所',
                            code: '220802180000'
                        }, {
                            name: '铁东派出所',
                            code: '220802210000'
                        }, {
                            name: '新华派出所',
                            code: '220802220000'
                        }, {
                            name: '三合乡派出所',
                            code: '220802350000'
                        }, {
                            name: '岭下镇派出所',
                            code: '220802300000'
                        }, {
                            name: '德顺乡派出所',
                            code: '220802310000'
                        }, {
                            name: '城南派出所',
                            code: '220802230000'
                        }]
                    }, {
                        name: '通榆县公安局',
                        code: '220822000000',
                        city: [{
                            name: '边昭派出所',
                            code: '220822330000'
                        }, {
                            name: '瞻榆派出所',
                            code: '220822230000'
                        }, {
                            name: '新发派出所',
                            code: '220822310000'
                        }, {
                            name: '铁西派出所',
                            code: '220822220000'
                        }, {
                            name: '向海派出所',
                            code: '220822360000'
                        }, {
                            name: '团结派出所',
                            code: '220822300000'
                        }, {
                            name: '开明派出所',
                            code: '220822210000'
                        }, {
                            name: '双岗派出所',
                            code: '220822380000'
                        }, {
                            name: '新华派出所',
                            code: '220822290000'
                        }, {
                            name: '苏公坨派出所',
                            code: '220822320000'
                        }, {
                            name: '包拉温都派出所',
                            code: '220822410000'
                        }, {
                            name: '开通派出所',
                            code: '220822200000'
                        }, {
                            name: '八面派出所',
                            code: '220822400000'
                        }, {
                            name: '乌兰花派出所',
                            code: '220822250000'
                        }, {
                            name: '兴隆山派出所',
                            code: '220822260000'
                        }, {
                            name: '新兴派出所',
                            code: '220822240000'
                        }, {
                            name: '什花道派出所',
                            code: '220822390000'
                        }, {
                            name: '鸿兴派出所',
                            code: '220822370000'
                        }]
                    }, {
                        name: '大安市公安局',
                        code: '220882000000',
                        city: [{
                            name: '丰收派出所',
                            code: '220882810000'
                        }, {
                            name: '安广派出所',
                            code: '220882670000'
                        }, {
                            name: '舍力派出所',
                            code: '220882790000'
                        }, {
                            name: '新平安派出所',
                            code: '220882760000'
                        }, {
                            name: '大赉派出所',
                            code: '220882680000'
                        }, {
                            name: '太山派出所',
                            code: '220882780000'
                        }, {
                            name: '联合派出所',
                            code: '220882710000'
                        }, {
                            name: '两家子派出所',
                            code: '220882690000'
                        }, {
                            name: '海坨派出所',
                            code: '220882870000'
                        }, {
                            name: '叉干派出所',
                            code: '220882730000'
                        }, {
                            name: '锦华派出所',
                            code: '220882630000'
                        }, {
                            name: '新艾里派出所',
                            code: '220882840000'
                        }, {
                            name: '大岗子派出所',
                            code: '220882860000'
                        }, {
                            name: '红岗子派出所',
                            code: '220882800000'
                        }, {
                            name: '龙沼派出所',
                            code: '220882750000'
                        }, {
                            name: '临江派出所',
                            code: '220882620000'
                        }, {
                            name: '乐胜派出所',
                            code: '220882740000'
                        }, {
                            name: '长虹派出所',
                            code: '220882660000'
                        }, {
                            name: '烧锅镇派出所',
                            code: '220882830000'
                        }, {
                            name: '四棵树派出所',
                            code: '220882700000'
                        }, {
                            name: '安北派出所',
                            code: '220882650000'
                        }, {
                            name: '月亮泡派出所',
                            code: '220882720000'
                        }, {
                            name: '慧阳派出所',
                            code: '220882640000'
                        }]
                    }, {
                        name: '镇赉县公安局',
                        code: '220821000000',
                        city: [{
                            name: '四方坨子派出所',
                            code: '220821270000'
                        }, {
                            name: '哈吐气派出所',
                            code: '220821180000'
                        }, {
                            name: '城南派出所',
                            code: '220821090000'
                        }, {
                            name: '黑鱼泡派出所',
                            code: '220821170000'
                        }, {
                            name: '大屯派出所',
                            code: '220821120000'
                        }, {
                            name: '城北派出所',
                            code: '220821100000'
                        }, {
                            name: '五棵树派出所',
                            code: '220821200000'
                        }, {
                            name: '坦途派出所',
                            code: '220821110000'
                        }, {
                            name: '沿江派出所',
                            code: '220821190000'
                        }, {
                            name: '建平派出所',
                            code: '220821150000'
                        }, {
                            name: '莫莫格派出所',
                            code: '220821130000'
                        }, {
                            name: '城郊派出所',
                            code: '220821210000'
                        }, {
                            name: '东屏派出所',
                            code: '220821160000'
                        }, {
                            name: '嘎什根派出所',
                            code: '220821140000'
                        }]
                    }]
                }
            },  {
                region: {
                    name: '四平市公安局',
                    code: '220300000000',
                    state: [{
                        name: '铁东区分局',
                        code: '220881000000',
                        city: [{
                            name: '石岭镇派出所',
                            code: '220303180000'
                        }, {
                            name: '解放派出所',
                            code: '220303060000'
                        }, {
                            name: '七马路派出所',
                            code: '220303120000'
                        }, {
                            name: '四马路派出所',
                            code: '220303080000'
                        }, {
                            name: '南四派出所',
                            code: '220303110000'
                        }, {
                            name: '平东派出所',
                            code: '220303130000'
                        }, {
                            name: '叶赫派出所',
                            code: '220303190000'
                        }, {
                            name: '黄土坑派出所',
                            code: '220303100000'
                        }, {
                            name: '北市场派出所',
                            code: '220303090000'
                        }, {
                            name: '北门派出所',
                            code: '220303070000'
                        }, {
                            name: '城东派出所',
                            code: '220303140000'
                        }, {
                            name: '二龙山派出所',
                            code: '220303170000'
                        }, {
                            name: '立业派出所',
                            code: '220303160000'
                        }, {
                            name: '山门派出所',
                            code: '220303150000'
                        }]
                    }, {
                        name: '政治部',
                        code: '220300010000',
                    }, {
                        name: '伊通满族自治县公安局',
                        code: '220323000000',
                        city: [{
                            name: '景台派出所',
                            code: '220323141000'
                        }, {
                            name: '河源派出所',
                            code: '220323141600'
                        }, {
                            name: '营城子派出所',
                            code: '220323140200'
                        }, {
                            name: '西苇派出所',
                            code: '220323141700'
                        }, {
                            name: '伊通派出所',
                            code: '220323140900'
                        }, {
                            name: '莫里派出所',
                            code: '220323141200'
                        }, {
                            name: '福庆派出所',
                            code: '220323140800'
                        }, {
                            name: '福安派出所 ',
                            code: '220323140700'
                        }, {
                            name: '新兴派出所',
                            code: '220323141500'
                        }, {
                            name: '大孤山派出所',
                            code: '220323140300'
                        }, {
                            name: '马安派出所',
                            code: '220323140400'
                        }, {
                            name: '靠山派出所',
                            code: '220323141100'
                        }, {
                            name: '福宁派出所',
                            code: '220323140500'
                        }, {
                            name: '二道派出所',
                            code: '220323141400'
                        }, {
                            name: '福康派出所',
                            code: '220323140600'
                        }, {
                            name: '三道派出所',
                            code: '220323141900'
                        }, {
                            name: '伊丹派出所',
                            code: '220323140100'
                        }, {
                            name: '小孤山派出所',
                            code: '220323141800'
                        }, {
                            name: '黄岭子派出所',
                            code: '220323141300'
                        }, {
                            name: '森林公安中心派出所',
                            code: '220323S09700'
                        }, {
                            name: '马安森林公安派出所',
                            code: '220323S09800'
                        }, {
                            name: '营城子森林公安派出所',
                            code: '220323S09900'
                        }]
                    }, {
                        name: '铁西区分局',
                        code: '220302000000',
                        city: [{
                            name: '仁兴街派出所',
                            code: '220302110000'
                        }, {
                            name: '机场派出所',
                            code: '220302160000'
                        }, {
                            name: '英雄街派出所',
                            code: '220302100000'
                        }, {
                            name: '阳光派出所',
                            code: '220302140000'
                        }, {
                            name: '平西乡派出所',
                            code: '220302150000'
                        }, {
                            name: '地直街派出所',
                            code: '220302120000'
                        }, {
                            name: '站前街派出所',
                            code: '220302090000'
                        }, {
                            name: '北沟街派出所',
                            code: '220302130000'
                        }, {
                            name: '红嘴子派出所',
                            code: '220302170000'
                        }, {
                            name: '石岭镇派出所',
                            code: '220303180000'
                        }, {
                            name: '解放派出所',
                            code: '220303060000'
                        }, {
                            name: '七马路派出所',
                            code: '220303120000'
                        }, {
                            name: '四马路派出所',
                            code: '220303080000'
                        }, {
                            name: '南四派出所',
                            code: '220303110000'
                        }, {
                            name: '平东派出所',
                            code: '220303130000'
                        }, {
                            name: '叶赫派出所',
                            code: '220303190000'
                         }, {
                            name: '黄土坑派出所',
                            code: '220303100000'
                        }, {
                            name: '北市场派出所',
                            code: '220303090000'
                        }, {
                            name: '北门派出所',
                            code: '220303070000'
                        }, {
                            name: '城东派出所',
                            code: '220303140000'
                        }, {
                            name: '二龙山派出所',
                            code: '220303170000'
                        }, {
                            name: '立业派出所',
                            code: '220303160000'
                        }, {
                            name: '山门派出所',
                            code: '220303150000'
                        }]
                    }, {
                        name: '梨树县公安局',
                        code: '220322000000',
                        city: [{
                            name: '康平派出所',
                            code: '220322210000'
                        }, {
                            name: '孟家岭派出所',
                            code: '220322270000'
                        }, {
                            name: '城东派出所',
                            code: '220322220000'
                        }, {
                            name: '白山派出所',
                            code: '220322230000'
                        }, {
                            name: '喇嘛甸派出所',
                            code: '220322240000'
                        }, {
                            name: '刘家馆派出所',
                            code: '220322380000'
                        }, {
                            name: '石岭派出所',
                            code: '220322150000'
                        }, {
                            name: '十家堡派出所',
                            code: '220322260000'
                        }, {
                            name: '小宽派出所',
                            code: '220322350000'
                        }, {
                            name: '树文派出所',
                            code: '220322200000'
                        }, {
                            name: '胜利派出所',
                            code: '220322330000'
                        }, {
                            name: '朝阳派出所',
                            code: '220322180000'
                        }, {
                            name: '小城子派出所',
                            code: '220322170000'
                        }, {
                            name: '双河派出所',
                            code: '220322280000'
                        }, {
                            name: '万发派出所',
                            code: '220322310000'
                        }, {
                            name: '四棵树派出所',
                            code: '220322340000'
                        }, {
                            name: '金山派出所',
                            code: '220322290000'
                        }, {
                            name: '林海派出所',
                            code: '220322370000'
                        }, {
                            name: '榆树台派出所',
                            code: '220322160000'
                        }, {
                            name: '蔡家派出所',
                            code: '220322250000'
                        }, {
                            name: '泰安派出所',
                            code: '220322306000'
                        }, {
                            name: '郭家店派出所',
                            code: '220322140000'
                        }, {
                            name: '沈洋派出所',
                            code: '220322360000'
                        }, {
                            name: '奉化派出所',
                            code: '220322190000'
                        }, {
                            name: '泉眼岭派出所',
                            code: '220322320000'
                        }, {
                            name: '东河派出所',
                            code: '220322300000'
                        }, {
                            name: '榆树台森林公安派出所',
                            code: '220322S09900'
                        }]
                    }, {
                        name: '辽河农垦管理区分局',
                        code: '220398000000',
                        city: [{
                            name: '孤家子派出所',
                            code: '220322390000'
                        }]
                    }, {
                        name: '双辽市公安局',
                        code: '220382000000',
                        city: [{
                            name: '红旗派出所',
                            code: '220382280000'
                        }, {
                            name: '柳条派出所',
                            code: '220382260000'
                        }, {
                            name: '双山派出所',
                            code: '220382210000'
                        }, {
                            name: '那木派出所',
                            code: '220382290000'
                        }, {
                            name: '茂林派出所',
                            code: '220382230000'
                        }, {
                            name: '辽西派出所',
                            code: '220382180000'
                        }, {
                            name: '辽东派出所',
                            code: '220382160000'
                        }, {
                            name: '辽北派出所',
                            code: '220382190000'
                        }, {
                            name: '新立派出所',
                            code: '220382270000'
                        }, {
                            name: '玻璃山派出所',
                            code: '220382310000'
                        }, {
                            name: '服先派出所',
                            code: '220382340000'
                        }, {
                            name: '兴隆派出所',
                            code: '220382320000'
                        }, {
                            name: '东明派出所',
                            code: '220382250000'
                        }, {
                            name: '卧虎派出所',
                            code: '220382220000'
                        }, {
                            name: '永加派出所',
                            code: '220382300000'
                        }, {
                            name: '王奔派出所',
                            code: '220382240000'
                        }, {
                            name: '郑家屯派出所',
                            code: '220382200000'
                        }, {
                            name: '辽南派出所',
                            code: '220382170000'
                        }, {
                            name: '向阳派出所',
                            code: '220382330000'
                        }]
                    }]
                }
            },  {
                region: {
                    name: '延边州公安局',
                    code: '222400000000',
                    state: [{
                        name: '和龙市公安局',
                        code: '222406000000',
                        city: [{
                            name: '东城派出所',
                            code: '222406220000'
                        }, {
                            name: '民惠派出所',
                            code: '222406140000'
                        }, {
                            name: '文化派出所',
                            code: '222406160000'
                        }, {
                            name: '南崇边防派出所',
                            code: '222406700000'
                        }, {
                            name: '八家子派出所',
                            code: '222406190000'
                        }, {
                            name: '龙城派出所',
                            code: '222406210000'
                        }, {
                            name: '勇化边防派出所',
                            code: '222406730000'
                        }, {
                            name: '芦果边防派出所',
                            code: '222406710000'
                        }, {
                            name: '头道派出所',
                            code: '222406170000'
                        }, {
                            name: '光明派出所',
                            code: '222406150000'
                        }, {
                            name: '西城派出所',
                            code: '222406200000'
                        }, {
                            name: '福洞派出所',
                            code: '222406180000'
                        }, {
                            name: '南坪边防派出所',
                            code: '222406720000'
                        }]
                    }, {
                        name: '图们市公安局',
                        code: '222402000000',
                        city: [{
                            name: '月晴边防派出所',
                            code: '222402670000'
                        }, {
                            name: '向上边防派出所',
                            code: '222402650000'
                        }, {
                            name: '红光边防派出所',
                            code: '222402660000'
                        }, {
                            name: '石岘派出所',
                            code: '222402150000'
                        }, {
                            name: '凉水边防派出所',
                            code: '222402680000'
                        }, {
                            name: '新华边防派出所',
                            code: '222402640000'
                        }, {
                            name: '长安派出所',
                            code: '222402160000'
                        }, {
                            name: '月宫派出所 ',
                            code: '222402130000'
                        }]
                    }, {
                        name: '敦化市公安局',
                        code: '222403000000',
                        city: [{
                            name: '渤海派出所',
                            code: '222403140000'
                        }, {
                            name: '沙河沿派出所',
                            code: '222403180000'
                        }, {
                            name: '胜利派出所',
                            code: '222403160000'
                        }, {
                            name: '丹江派出所',
                            code: '222403170000'
                        }, {
                            name: '贤儒派出所',
                            code: '222403220000'
                        }, {
                            name: '民主派出所',
                            code: '222403150000'
                        }, {
                            name: '红石派出所',
                            code: '222403290000'
                        }, {
                            name: '秋梨沟派出所',
                            code: '222403300000'
                        }, {
                            name: '大蒲柴河派出所',
                            code: '222403250000'
                        }, {
                            name: '江南派出所',
                            code: '222403240000'
                        }, {
                            name: '江源派出所',
                            code: '222403320000'
                        }, {
                            name: '黑石派出所',
                            code: '222403280000'
                        }, {
                            name: '大石头派出所',
                            code: '222403190000'
                        }, {
                            name: '雁鸣湖派出所',
                            code: '222403260000'
                        }, {
                            name: '青沟子派出所',
                            code: '222403330000'
                        }, {
                            name: '曙光派出所',
                            code: '222403810000'
                        }, {
                            name: '官地派出所',
                            code: '222403210000'
                        }, {
                            name: '大桥派出所',
                            code: '222403310000'
                        }, {
                            name: '黄泥河派出所',
                            code: '222403200000'
                        }, {
                            name: '额穆派出所',
                            code: '222403230000'
                        }, {
                            name: '开发区派出所',
                            code: '222403910000'
                        }, {
                            name: '翰章派出所',
                            code: '222403270000'
                        }]
                    }, {
                        name: '龙井市公安局',
                        code: '222405000000',
                        city: [{
                            name: '德新派出所',
                            code: '222405220000'
                        }, {
                            name: '三合派出所',
                            code: '222405670000'
                        }, {
                            name: '东盛派出所',
                            code: '222405210000'
                        }, {
                            name: '白金派出所',
                            code: '222405710000'
                        }, {
                            name: '老头沟派出所',
                            code: '222405200000'
                        }, {
                            name: '安民派出所',
                            code: '222405160000'
                        }, {
                            name: '智新派出所',
                            code: '222405180000'
                        }, {
                            name: '明东派出所',
                            code: '222405730000'
                        }, {
                            name: '南山派出所',
                            code: '222405720000'
                        }, {
                            name: '开山屯派出所',
                            code: '222405700000'
                        }, {
                            name: '龙门派出所',
                            code: '222405170000'
                        }]
                    }, {
                        name: '安图县公安局',
                        code: '222426000000',
                        city: [{
                            name: '户籍派出所',
                            code: '222426840000'
                        }, {
                            name: '明月派出所',
                            code: '222426210000'
                        }, {
                            name: '万宝派出所',
                            code: '222426260000'
                        }, {
                            name: '两江派出所',
                            code: '222426280000'
                        }, {
                            name: '九龙派出所',
                            code: '222426220000'
                        }, {
                            name: '松江派出所',
                            code: '222426290000'
                        }, {
                            name: '永庆派出所',
                            code: '222426270000'
                        }, {
                            name: '石门派出所',
                            code: '222426230000'
                        }, {
                            name: '亮兵派出所',
                            code: '222426240000'
                        }, {
                            name: '二道白河派出所',
                            code: '222426300000'
                        }, {
                            name: '新合派出所',
                            code: '222426250000'
                        }]
                    }, {
                        name: '白河林业公安局',
                        code: '222426S99000'

                    }, {
                        name: '珲春市公安局',
                        code: '222404000000',
                        city: [{
                            name: '英安边防派出所',
                            code: '222404700000'
                        }, {
                            name: '新安派出所',
                            code: '222404140000'
                        }, {
                            name: '杨泡边防派出所',
                            code: '222404730000'
                        }, {
                            name: '春化边防派出所',
                            code: '222404670000'
                        }, {
                            name: '敬信边防派出所',
                            code: '222404760000'
                        }, {
                            name: '小西南岔派出所',
                            code: '222404830000'
                        }, {
                            name: '光明派出所',
                            code: '222404170000'
                        }, {
                            name: '马川子边防派出所',
                            code: '222404740000'
                        }, {
                            name: '板石边防派出所',
                            code: '222404750000'
                        }, {
                            name: '靖和派出所',
                            code: '222404150000'
                        }, {
                            name: '马滴达边防派出所',
                            code: '222404680000'
                        }, {
                            name: '哈达门边防派出所',
                            code: '222404690000'
                        }, {
                            name: '春城派出所',
                            code: '222404200000'
                        }, {
                            name: '三家子边防派出所',
                            code: '222404720000'
                        }, {
                            name: '河南派出所',
                            code: '222404160000'
                        }, {
                            name: '近海派出所',
                            code: '222404180000'
                         }, {
                            name: '中俄互市贸易区派出所',
                            code: '222404190000'
                        }, {
                            name: '密江边防派出所',
                            code: '222404710000'
                        }]
                    }, {
                        name: '汪清县公安局',
                        code: '222424000000',
                        city: [{
                            name: '鸡冠派出所',
                            code: '222424220000'
                        }, {
                            name: '复兴派出所',
                            code: '222424180000'
                        }, {
                            name: '汪清派出所',
                            code: '222424110000'
                        }, {
                            name: '百草沟派出所',
                            code: '222424190000'
                        }, {
                            name: '春阳派出所',
                            code: '222424170000'
                        }, {
                            name: '东光派出所',
                            code: '222424140000'
                        }, {
                            name: '罗子沟派出所',
                            code: '222424160000'
                        }, {
                            name: '东振派出所',
                            code: '222424210000'
                        }, {
                            name: '大兴沟派出所',
                            code: '222424130000'
                        }, {
                            name: '大川派出所',
                            code: '222424120000'
                        }, {
                            name: '天桥岭派出所',
                            code: '222424150000'
                        }]
                    }, {
                        name: '延吉市公安局',
                        code: '222401000000',
                        city: [{
                            name: '依兰派出所',
                            code: '222401220000'
                        }, {
                            name: '公园派出所',
                            code: '222401180000'
                        }, {
                            name: '进学派出所',
                            code: '222401150000'
                        }, {
                            name: '新兴派出所',
                            code: '222401170000'
                        }, {
                            name: '小营派出所',
                            code: '222401210000'
                        }, {
                            name: '建工派出所',
                            code: '222401200000'
                        }, {
                            name: '朝阳川派出所',
                            code: '222401240000'
                        }, {
                            name: '河南派出所',
                            code: '222401190000'
                        }, {
                            name: '三道派出所',
                            code: '222401230000'
                        }, {
                            name: '北山派出所',
                            code: '222401160000'
                        }]
                    }]
                }
            },  {
                region: {
                    name: '通化市公安局',
                    code: '220500000000',
                    state: [{
                        name: '通化县公安局',
                        code: '220521000000',
                        city: [{
                            name: '快大茂派出所',
                            code: '220521620000'
                        }, {
                            name: '东来派出所',
                            code: '220521720000'
                        }, {
                            name: '光华派出所',
                            code: '220521710000'
                        }, {
                            name: '果松派出所',
                            code: '220521630000'
                        }, {
                            name: '富江派出所',
                            code: '220521740000'
                        }, {
                            name: '四棚派出所',
                            code: '220521700000'
                        }, {
                            name: '金斗派出所',
                            code: '220521750000'
                        }, {
                            name: '西江派出所',
                            code: '220521660000'
                        }, {
                            name: '三棵榆树派出所',
                            code: '220521680000'
                        }, {
                            name: '大泉源派出所',
                            code: '220521650000'
                        }, {
                            name: '英额布派出所',
                            code: '220521670000'
                        }, {
                            name: '兴林派出所',
                            code: '220521730000'
                        }, {
                            name: '大安派出所',
                            code: '220521640000'
                        }, {
                            name: '二密派出所',
                            code: '220521690000'
                        }, {
                            name: '聚鑫派出所',
                            code: '220521610000'
                        }]
                    }, {
                        name: '东华分局',
                        code: '220555000000',
                        city: [{
                            name: '东强派出所',
                            code: '220555090000'
                        }, {
                            name: '东源派出所',
                            code: '220555100000'
                        }, {
                            name: '东庆派出所',
                            code: '220555080000'
                        }, {
                            name: '向阳派出所',
                            code: '220555850000'
                        }]
                    }, {
                        name: '辉南县公安局',
                        code: '220523000000',
                        city: [{
                            name: '团林派出所',
                            code: '220523260000'
                        }, {
                            name: '样子哨派出所',
                            code: '220523170000'
                        }, {
                            name: '辉发城派出所',
                            code: '220523200000'
                        }, {
                            name: '富兴派出所',
                            code: '220523150000'
                        }, {
                            name: '金川派出所',
                            code: '220523240000'
                        }, {
                            name: '楼街派出所',
                            code: '220523230000'
                        }, {
                            name: '城郊派出所',
                            code: '220523220000'
                        }, {
                            name: '抚民派出所',
                            code: '220523190000'
                        }, {
                            name: '杉松岗派出所',
                            code: '220523180000'
                        }, {
                            name: '朝阳派出所',
                            code: '220523140000'
                        }, {
                            name: '庆阳派出所',
                            code: '220523250000'
                        }, {
                            name: '石道河派出所',
                            code: '220523210000'
                        }, {
                            name: '辉南派出所',
                            code: '220523160000'
                        }]
                    }, {
                        name: '东昌分局',
                        code: '220502000000',
                        city: [{
                            name: '民主派出所',
                            code: '220502170000'
                        }, {
                            name: '新站派出所',
                            code: '220502140000'
                        }, {
                            name: '光明派出所',
                            code: '220502180000'
                        }, {
                            name: '江东派出所',
                            code: '220502190000'
                        }, {
                            name: '团结派出所',
                            code: '220502130000'
                        }, {
                            name: '金厂派出所',
                            code: '220502210000'
                        }, {
                            name: '东昌派出所',
                            code: '220502160000'
                        }, {
                            name: '龙泉派出所',
                            code: '220502150000'
                        }, {
                            name: '环通派出所',
                            code: '220502200000'
                        }, {
                            name: '老站派出所',
                            code: '220502120000'
                        }]
                    }, {
                        name: '二道江分局',
                        code: '220503000000',
                        city: [{
                            name: '山下派出所',
                            code: '220503130000'
                        }, {
                            name: '铁厂派出所',
                            code: '220503180000'
                        }, {
                            name: '矿山派出所',
                            code: '220503190000'
                        }, {
                            name: '山上派出所',
                            code: '220503120000'
                        }, {
                            name: '五道江派出所',
                            code: '220503160000'
                        }, {
                            name: '二道江派出所',
                            code: '220503150000'
                        }, {
                            name: '鸭园派出所',
                            code: '220503170000'
                        }, {
                            name: '桃源派出所',
                            code: '220503140000'
                        }]
                    },  {
                        name: '集安市公安局',
                        code: '220582000000',
                        city: [{
                            name: '太平边防派出所',
                            code: '220582250000'
                        }, {
                            name: '太王边防派出所',
                            code: '220582160000'
                        }, {
                            name: '黎明边防派出所',
                            code: '220582140000'
                        }, {
                            name: '清河派出所',
                            code: '220582110000'
                        }, {
                            name: '青石边防派出所',
                            code: '220582270000'
                        }, {
                            name: '大路边防派出所',
                            code: '220582210000'
                        }, {
                            name: '阳岔边防派出所',
                            code: '220582260000'
                        }, {
                            name: '麻线边防派出所',
                            code: '220582180000'
                        }, {
                            name: '凉水边防派出所',
                            code: '220582220000'
                        }, {
                            name: '黄柏边防派出所',
                            code: '220582170000'
                        }, {
                            name: '通胜边防派出所',
                            code: '220582150000'
                        }, {
                            name: '头道派出所',
                            code: '220582120000'
                        }, {
                            name: '文保派出所',
                            code: '220582090000'
                        }, {
                            name: '文物保护派出所',
                            code: '220582860000'
                        }, {
                            name: '团结边防派出所',
                            code: '220582130000'
                        }, {
                            name: '花甸派出所',
                            code: '220582100000'
                        }, {
                            name: '开发区边防派出所',
                            code: '220582240000'
                        }, {
                            name: '榆林边防派出所',
                            code: '220582230000'
                        }]
                    }, {
                        name: '柳河县公安局',
                        code: '220524000000',
                        city: [{
                            name: '罗通山派出所',
                            code: '220524290000'
                        }, {
                            name: '向阳派出所',
                            code: '220524260000'
                        }, {
                            name: '圣水派出所',
                            code: '220524230000'
                        }, {
                            name: '时家店派出所',
                            code: '220524300000'
                        }, {
                            name: '柳南派出所',
                            code: '220524330000'
                        }, {
                            name: '红石派出所',
                            code: '220524340000'
                        }, {
                            name: '三源浦派出所',
                            code: '220524210000'
                        }, {
                            name: '姜家店派出所',
                            code: '220524310000'
                        }, {
                            name: '驼腰岭派出所',
                            code: '220524240000'
                        }, {
                            name: '安口派出所',
                            code: '220524270000'
                        }, {
                            name: '前进派出所',
                            code: '220524200000'
                        }, {
                            name: '亨通派出所',
                            code: '220524280000'
                        }, {
                            name: '凉水派出所',
                            code: '220524320000'
                        }, {
                            name: '五道沟派出所',
                            code: '220524250000'
                        }, {
                            name: '孤山子派出所',
                            code: '220524220000'
                        }, {
                            name: '建设派出所',
                            code: '220524190000'
                        }]
                    }]
                }
            },  {
                region: {
                    name: '长白山市公安局',
                    code: '220000960000',
                    state: [{
                        name: '池北区分局',
                        code: '220000965100',
                        city: [{
                            name: '天文峰派出所',
                            code: '220000965122'
                        }, {
                            name: '滨河派出所',
                            code: '220000965121'
                        }, {
                            name: '长白山公安局滨河派出所',
                            code: '229701610000'
                        }]
                    }, {
                        name: '池南区分局',
                        code: '220000965300',
                        city: [{
                            name: '维东派出所',
                            code: '220000965222'
                        }, {
                            name: '东岗派出所',
                            code: '220000965221'
                        }]
                    }, {
                        name: '池西区分局',
                        code: '220000965200',
                        city: [{
                            name: '峰岭派出所',
                            code: '220000965323'
                        }, {
                            name: '漫江派出所',
                            code: '220000965321'
                        }, {
                            name: '横山派出所',
                            code: '220000965322'
                        }]
                    }]
                }
            },  {
                region: {
                    name: '白山市公安局',
                    code: '220600000000',
                    state: [{
                        name: '东兴分局',
                        code: '220698000000',
                        city: [{
                            name: '三道沟派出所',
                            code: '220698640000'
                        }, {
                            name: '户籍室',
                            code: '220698850000'
                        }, {
                            name: '河口派出所',
                            code: '220698620000'
                        }, {
                            name: '红土崖派出所',
                            code: '220698610000'
                        }]
                    }, {
                        name: '通沟分局',
                        code: '220696000000',
                        city: [{
                            name: '六道江派出所',
                            code: '220696810000'
                        }, {
                            name: '太安乡派出所',
                            code: '220696820000'
                        }, {
                            name: '户籍室',
                            code: '220696850000'
                        }]
                    }, {
                        name: '红旗分局',
                        code: '220695000000',
                        city: [{
                            name: '吉林省白山市公安局红旗户籍室',
                            code: '220695500000'
                        }]
                    }, {
                        name: '江北分局',
                        code: '220697000000',
                        city: [{
                            name: '板石派出所',
                            code: '220697640000'
                        }, {
                            name: '户籍室',
                            code: '220697850000'
                        }]
                    }, {
                        name: '靖宇县公安局',
                        code: '220622000000',
                        city: [{
                            name: '三道湖派出所',
                            code: '220622670000'
                        }, {
                            name: '那尔轰派出所',
                            code: '220622660000'
                        }, {
                            name: '龙泉派出所',
                            code: '220622610000'
                        }, {
                            name: '景山派出所',
                            code: '220622680000'
                        }, {
                            name: '花园口派出所',
                            code: '220622690000'
                        }, {
                            name: '河北派出所',
                            code: '220622650000'
                        }, {
                            name: '河南派出所',
                            code: '220622620000'
                        }, {
                            name: '赤松派出所',
                            code: '220622630000'
                        }, {
                            name: '吉林省白山市森林资源保卫大队',
                            code: '220622570000'
                        }, {
                            name: '蒙江派出所',
                            code: '220622640000'
                        }]
                    }, {
                        name: '江源区公安局',
                        code: '220625000000',
                        city: [{
                            name: '正岔派出所',
                            code: '220625680000'
                        }, {
                            name: '城墙派出所',
                            code: '220625630000'
                        }, {
                            name: '孙家堡子派出所',
                            code: '220625640000'
                        }, {
                            name: '大石人派出所',
                            code: '220625700000'
                        }, {
                            name: '江源派出所',
                            code: '220625690000'
                        }, {
                            name: '大阳岔派出所',
                            code: '220625670000'
                        }, {
                            name: '松树派出所',
                            code: '220625610000'
                        }, {
                            name: '石人派出所',
                            code: '220625660000'
                        }, {
                            name: '砟子派出所',
                            code: '220625650000'
                        }, {
                            name: '湾沟派出所',
                            code: '220625620000'
                        }]
                    }, {
                        name: '抚松县公安局',
                        code: '220621000000',
                        city: [{
                            name: '露水河派出所',
                            code: '220621690000'
                        }, {
                            name: '兴隆派出所',
                            code: '220621770000'
                        }, {
                            name: '北岗派出所',
                            code: '220621740000'
                        }, {
                            name: '沿江派出所',
                            code: '220621750000'
                        }, {
                            name: '兴参派出所',
                            code: '220621730000'
                        }, {
                            name: '泉阳派出所',
                            code: '220621680000'
                        }, {
                            name: '新屯子派出所',
                            code: '220621760000'
                        }, {
                            name: '仙人桥派出所',
                            code: '220621710000'
                        }, {
                            name: '抽水派出所',
                            code: '220621720000'
                        }, {
                            name: '漫江边防派出所',
                            code: '220621790000'
                        }, {
                            name: '东岗边防派出所',
                            code: '220621780000'
                        }, {
                            name: '松江河派出所',
                            code: '220621670000'
                        }, {
                            name: '抚松派出所',
                            code: '220621660000'
                        }, {
                            name: '万良派出所',
                            code: '220621700000'
                        }]
                    }, {
                        name: '新建分局',
                        code: '220699000000',
                        city: [{
                            name: '户籍室',
                            code: '220699850000'
                        }, {
                            name: '长岭县公安局',
                            code: '220722000000'
                        }, {
                            name: '宁江一分局',
                            code: '220701000000'
                        }, {
                            name: '松江分局',
                            code: '220797000000'
                        }, {
                            name: '扶余市公安局',
                            code: '220724000000'
                        }, {
                            name: '宁江二分局',
                            code: '220702000000'
                        }, {
                            name: '经济技术开发区分局',
                            code: '220799000000'
                        }, {
                            name: '乾安县公安局',
                            code: '220723000000'
                        }, {
                            name: '前郭县公安局',
                            code: '220721000000'
                        }]
                    }, {
                        name: '长白县公安局',
                        code: '220623000000',
                        city: [{
                            name: '十三道沟边防派出所',
                            code: '220623760000'
                        }, {
                            name: '十二道沟边防派出所',
                            code: '220623770000'
                        }, {
                            name: '新房子边防派出所',
                            code: '220623800000'
                        }, {
                            name: '长白镇边防派出所',
                            code: '220623710000'
                        }, {
                            name: '宝泉山边防派出所',
                            code: '220623810000'
                        }, {
                            name: '十四道沟边防派出所',
                            code: '220623750000'
                        }, {
                            name: '金华乡边防派出所',
                            code: '220623740000'
                        }, {
                            name: '马鹿沟镇边防派出所',
                            code: '220623720000'
                        }, {
                            name: '八道沟边防派出所',
                            code: '220623790000'
                        }, {
                            name: '十一道沟边防派出所',
                            code: '220623780000'
                        }, {
                            name: '龙岗边防派出所',
                            code: '220623730000'
                        }]
                    }, {
                        name: '临江市公安局',
                        code: '220681000000',
                        city: [{
                            name: '苇沙河派出所',
                            code: '220681690000'
                        }, {
                            name: '兴隆派出所',
                            code: '220681670000'
                        }, {
                            name: '西小山派出所',
                            code: '220681780000'
                        }, {
                            name: '三公里地区派出所',
                            code: '220681740000'
                        }, {
                            name: '临城乡派出所',
                            code: '220681680000'
                        }, {
                            name: '六道沟镇派出所',
                            code: '220681720000'
                        }, {
                            name: '花山派出所',
                            code: '220681610000'
                        }, {
                            name: '大栗子镇派出所',
                            code: '220681700000'
                        }, {
                            name: '桦树地区派出所',
                            code: '220681750000'
                        }, {
                            name: '闹枝派出所',
                            code: '220681630000'
                        }, {
                            name: '大湖派出所',
                            code: '220681620000'
                        }, {
                            name: '四道沟镇派出所',
                            code: '220681710000'
                        }, {
                            name: '建国派出所',
                            code: '220681730000'
                        }, {
                            name: '蚂蚁河派出所',
                            code: '220681650000'
                        }, {
                            name: '新市派出所',
                            code: '220681660000'
                        }, {
                            name: '金山派出所',
                            code: '220681770000'
                        }, {
                            name: '柳树河派出所',
                            code: '220681760000'
                        }, {
                            name: '桦树派出所',
                            code: '220681640000'
                        }]
                    }]
                }
            },  {
                region: {
                    name: '梅河口市公安局',
                    code: '220581000000',
                    state: [{
                        name: '铁北派出所',
                        code: '220581130000',

                    }, {
                        name: '进化派出所',
                        code: '220581240000',

                    }, {
                        name: '红梅派出所',
                        code: '220581170000',

                    }, {
                        name: '吉乐派出所',
                        code: '220581350000',

                    }, {
                        name: '康大营派出所',
                        code: '220581270000',

                    }, {
                        name: '李炉派出所',
                        code: '220581300000',

                    }, {
                        name: '黑山头派出所',
                        code: '220581220000',

                    }, {
                        name: '山城派出所',
                        code: '220581190000',

                    }, {
                        name: '兴华派出所',
                        code: '220581330000',

                    }, {
                        name: '水道派出所',
                        code: '220581230000',

                    }, {
                        name: '湾龙派出所',
                        code: '220581310000',

                    }, {
                        name: '中和派出所',
                        code: '220581210000',

                    }, {
                        name: '一座营派出所',
                        code: '220581250000',

                    }, {
                        name: '新合派出所',
                        code: '220581200000',

                    }, {
                        name: '海龙派出所',
                        code: '220581180000',

                    }, {
                        name: '解放派出所',
                        code: '220581140000',

                    }, {
                        name: '小杨派出所',
                        code: '220581340000',

                    }, {
                        name: '杏岭派出所',
                        code: '220581290000',

                    }, {
                        name: '福民派出所',
                        code: '220581150000',

                    }, {
                        name: '牛心顶派出所',
                        code: '220581280000',

                    }, {
                        name: '双兴派出所',
                        code: '220581320000',

                    }, {
                        name: '曙光派出所',
                        code: '220581260000',

                    }, {
                        name: '河南派出所',
                        code: '220581160000',

                    }, {
                        name: '新华派出所',
                        code: '220581120000'
                    }]
                }
            },  {
                region: {
                    name: '省森林公安局',
                    code: '220000S00000',
                    state: [{
                        name: '辉南分局森林公安分局',
                        code: '220000S04700',
                        city: [{
                            name: '后河派出所',
                            code: '220000S04789'
                        }, {
                            name: '爱林派出所',
                            code: '220000S04797'
                        }, {
                            name: '大龙湾派出所',
                            code: '220000S04799'
                        }, {
                            name: '三角龙湾派出所',
                            code: '220000S04793'
                        }, {
                            name: '金川派出所',
                            code: '220000S04795'
                        }, {
                            name: '榆树岔派出所',
                            code: '220000S04792'
                        }, {
                            name: '红旗派出所',
                            code: '220000S04794'
                        }, {
                            name: '石道河派出所',
                            code: '220000S04790'
                        }, {
                            name: '四岔派出所',
                            code: '220000S04791'
                        }, {
                            name: '二岔派出所',
                            code: '220000S04798'
                        }, {
                            name: '辉南地区派出所',
                            code: '220000S04796'
                        }]
                    }, {
                        name: '白石山森林公安分局',
                        code: '220000S04900',
                        city: [{
                            name: '白石山第二派出所',
                            code: '220000S04999'
                        }, {
                            name: '胜利河派出所',
                            code: '220000S04994'
                        }, {
                            name: '宝石矿治安派出所',
                            code: '220000S04995'
                        }, {
                            name: '漂河森林派出所',
                            code: '220000S04998'
                        }, {
                            name: '大石河森林派出所',
                            code: '220000S04996'
                        }, {
                            name: '白石山森林派出所',
                            code: '220000S04990'
                        }, {
                            name: '大趟子森林派出所',
                            code: '220000S04997'
                        }, {
                            name: '双山派出所 ',
                            code: '220000S04993'
                        }, {
                            name: '琵河派出所',
                            code: '220000S04992'
                        }, {
                            name: '黄松甸森林派出所',
                            code: '220000S04991'
                        }]
                    }, {
                        name: '泉阳森林公安分局',
                        code: '220000S05200',
                        city: [{
                            name: '胜利中心派出所',
                            code: '220000S05289'
                        }, {
                            name: '地区第一派出所',
                            code: '220000S05292'
                        }, {
                            name: '抚安派出所',
                            code: '220000S05298'
                        }, {
                            name: '地区第四派出所',
                            code: '220000S05295'
                        }, {
                            name: '大东中心派出所',
                            code: '220000S05291'
                        }, {
                            name: '地区第二派出所',
                            code: '220000S05293'
                        }, {
                            name: '榆树派出所',
                            code: '220000S05299'
                        }, {
                            name: '泉水中心派出所',
                            code: '220000S05288'
                        }, {
                            name: '北岗派出所',
                            code: '220000S05297'
                        }, {
                            name: '地区第三派出所',
                            code: '220000S05294'
                        }, {
                            name: '东北岔中心派出所',
                            code: '220000S05290'
                        }, {
                            name: '大顶子派出所',
                            code: '220000S05296'
                        }]
                    }, {
                        name: '红石森林公安分局',
                        code: '220000S04800',
                        city: [{
                            name: '东兴派出所',
                            code: '220000S04893'
                        }, {
                            name: '红石中心派出所',
                            code: '220000S04898'
                        }, {
                            name: '第一派出所',
                            code: '220000S04899'
                        }, {
                            name: '贮木场派出所',
                            code: '220000S04889'
                        }, {
                            name: '帽山中心派出所',
                            code: '220000S04897'
                        }, {
                            name: '中密度派出所',
                            code: '220000S04890'
                        }, {
                            name: '白山派出所',
                            code: '220000S04891'
                        }, {
                            name: '二道沟中心派出所',
                            code: '220000S04895'
                        }, {
                            name: '黄泥河派出所',
                            code: '220000S04892'
                        }, {
                            name: '板庙子中心派出所',
                            code: '220000S04896'
                        }, {
                            name: '批洲中心派出所',
                            code: '220000S04894'
                        }]
                    }, {
                        name: '松江河森林公安分局',
                        code: '220000S05300',
                        city: [{
                            name: '漫江派出所',
                            code: '220000S05397'
                        }, {
                            name: '第一派出所',
                            code: '220000S05393'
                        }, {
                            name: '板石河派出所',
                            code: '220000S05396'
                        }, {
                            name: '第三派出所',
                            code: '220000S05395'
                        }, {
                            name: '马鞍山派出所',
                            code: '220000S05398'
                        }, {
                            name: '前川派出所',
                            code: '220000S05399'
                        }, {
                            name: '第二派出所',
                            code: '220000S05394'
                        }]
                    }, {
                        name: '临江森林公安分局',
                        code: '220000S05000',
                        city: [{
                            name: '西小山派出所',
                            code: '220000S05096'
                        }, {
                            name: '贾家营林场派出所',
                            code: '220000S05086'
                        }, {
                            name: '桦树地区派出所',
                            code: '220000S05098'
                        }, {
                            name: '芒河林场派出所',
                            code: '220000S05088'
                        }, {
                            name: '桦树林场派出所',
                            code: '220000S05093'
                        }, {
                            name: '东小山林场派出所',
                            code: '220000S05090'
                        }, {
                            name: '金山派出所',
                            code: '220000S05097'
                        }, {
                            name: '大西林场派出所',
                            code: '220000S05092'
                        }, {
                            name: '三公里地区派出所',
                            code: '220000S05099'
                        }, {
                            name: '银山林场派出所',
                            code: '220000S05087'
                        }, {
                            name: '闹枝派出所',
                            code: '220000S05094'
                        }, {
                            name: '柳树河派出所',
                            code: '220000S05095'
                        }, {
                            name: '柳毛河林场派出所',
                            code: '220000S05089'
                        }, {
                            name: '红土山林场派出所',
                            code: '220000S05091'
                        }]
                    }, {
                        name: '白城市森林公安局',
                        code: '220800S00000',
                        city: [{
                            name: '洮南市森林公安大队',
                            code: '220881S00000'
                        }, {
                            name: '通榆县森林大队',
                            code: '220822S00000'
                        }, {
                            name: '大安市森林公安大队',
                            code: '220882S00000'
                        }, {
                            name: '永茂森林公安派出所',
                            code: '220881S09600'
                        }, {
                            name: '镇赉县森林公安大队',
                            code: '220821S00000'
                        }]
                    }, {
                        name: '湾沟森林公安分局',
                        code: '220000S05500',
                        city: [{
                            name: '夹皮沟派出所',
                            code: '220000S05592'
                        }, {
                            name: '三道花园派出所',
                            code: '220000S05591'
                        }, {
                            name: '地区第一派出所',
                            code: '220000S05586'
                        }, {
                            name: '湾沟派出所',
                            code: '220000S05596'
                        }, {
                            name: '仙人洞派出所',
                            code: '220000S05594'
                        }, {
                            name: '大安派出所',
                            code: '220000S05593'
                        }, {
                            name: '四平派出所',
                            code: '220000S05598'
                        }, {
                            name: '二道花园派出所',
                            code: '220000S05589'
                        }, {
                            name: '地区第二派出所',
                            code: '220000S05587'
                        }, {
                            name: '仙人桥派出所',
                            code: '220000S05588'
                        }, {
                            name: '松树派出所',
                            code: '220000S05597'
                        }, {
                            name: '榆树川派出所',
                            code: '220000S05590'
                        }, {
                            name: '马鹿沟派出所',
                            code: '220000S05599'
                        }, {
                            name: '大营派出所',
                            code: '220000S05595'
                        }]
                    }, {
                        name: '露水河森林公安分局',
                        code: '220000S05100',
                        city: [{
                            name: '新兴中心派出所',
                            code: '220000S05191'
                        }, {
                            name: '西林河派出所',
                            code: '220000S05196'
                        }, {
                            name: '第一派出所',
                            code: '220000S05192'
                        }, {
                            name: '第三派出所',
                            code: '220000S05194'
                        }, {
                            name: '四湖中心派出所',
                            code: '220000S05190'
                        }, {
                            name: '黎明派出所',
                            code: '220000S05199'
                        }, {
                            name: '宏伟派出所',
                            code: '220000S05197'
                        }, {
                            name: '东升中心派出所',
                            code: '220000S05189'
                        }, {
                            name: '第二派出所',
                            code: '220000S05193'
                        }, {
                            name: '永青派出所',
                            code: '220000S05198'
                        }, {
                            name: '清水河派出所',
                            code: '220000S05195'
                        }]
                    }, {
                        name: '三岔子森林公安分局',
                        code: '220000S05400',
                        city: [{
                            name: '景山派出所',
                            code: '220000S05494'
                        }, {
                            name: '新胜派出所',
                            code: '220000S05493'
                        }, {
                            name: '胜利派出所',
                            code: '220000S05489'
                        }, {
                            name: '地区派出所',
                            code: '220000S05499'
                        }, {
                            name: '森铁派出所',
                            code: '220000S05490'
                        }, {
                            name: '西南岔派出所',
                            code: '220000S05487'
                        }, {
                            name: '三道湖派出所',
                            code: '220000S05495'
                        }, {
                            name: '正岔派出所',
                            code: '220000S05491'
                        }, {
                            name: '白江河派出所',
                            code: '220000S05496'
                        }, {
                            name: '三岔子派出所',
                            code: '220000S05498'
                        }, {
                            name: '龙湾派出所',
                            code: '220000S05497'
                        }, {
                            name: '崇礼派出所',
                            code: '220000S05486'
                        }, {
                            name: '四海派出所',
                            code: '220000S05488'
                        }, {
                            name: '那尔轰派出所',
                            code: '220000S05492'
                        }]
                    }, {
                        name: '四平市森林公安局',
                        code: '220300S00000',
                        city: [{
                            name: '伊通满族自治县森林公安大队',
                            code: '220323S00000'
                        }, {
                            name: '双辽市森林公安大队',
                            code: '220382S00000'
                        }, {
                            name: '梨树县森林公安大队',
                            code: '220322S00000'
                        }, {
                            name: '四平市山门森林公安派出所',
                            code: '220300S09800'
                        }, {
                            name: '公主岭市森林公安大队',
                            code: '220381S00000'
                        }, {
                            name: '四平市石岭森林公安派出所',
                            code: '220300S09900'
                        }]
                         }
                    ]}
                    },  {
                region: {
                    name: '公主岭市公安局',
                    code: '220381000000',
                    state: [{
                        name: '岭西派出所',
                        code: '220381150000'

                    }, {
                        name: '大岭派出所',
                        code: '220381240000'
                    }, {
                        name: '桑树台派出所',
                        code: '220381360000'
                    }, {
                        name: '双城堡派出所',
                        code: '220381380000'
                    }, {
                        name: '苇子沟派出所',
                        code: '220381210000'
                    },  {
                        name: '南崴子派出所',
                        code: '220381280000'
                    }, {
                        name: '怀德派出所',
                        code: '220381430000'
                    }, {
                        name: '大榆树派出所',
                        code: '220381320000'
                    }, {
                        name: '杨大城子派出所',
                        code: '220381390000'
                    }, {
                        name: '河北派出所',
                        code: '220381170000'
                    }, {
                        name: '毛城子派出所',
                        code: '220381400000'
                    }, {
                        name: '河南派出所',
                        code: '220381140000'
                    }, {
                        name: '范家屯派出所',
                        code: '220381220000'
                    }, {
                        name: '永发派出所',
                        code: '220381250000'
                    }, {
                        name: '响水派出所',
                        code: '220381230000'
                    }, {
                        name: '东三派出所',
                        code: '220381160000'
                    }, {
                        name: '朝阳坡派出所',
                        code: '220381310000'
                    }, {
                        name: '陶家派出所',
                        code: '220381270000'
                    }, {
                        name: '双龙派出所',
                        code: '220381370000'
                    }, {
                        name: '环岭派出所',
                        code: '220381200000'
                    }, {
                        name: '岭东派出所',
                        code: '220381180000'
                    }, {
                        name: '二十家子派出所',
                        code: '220381290000'
                    }, {
                        name: '龙山派出所',
                        code: '220381300000'
                    }, {
                        name: '十屋派出所',
                        code: '220381350000'
                    }, {
                        name: '黑林子派出所',
                        code: '220381420000'
                    }, {
                        name: '铁北派出所',
                        code: '220381190000'
                    }, {
                        name: '八屋派出所',
                        code: '220381340000'
                    }, {
                        name: '刘房子派出所',
                        code: '220381260000'
                    }, {
                        name: '玻璃城子派出所',
                        code: '220381410000'
                    }, {
                        name: '秦家屯派出所',
                        code: '220381330000'
                    }]
                }
            },  {
                region: {
                    name: '吉林市公安局',
                    code: '220200000000',
                    state: [{
                        name: '龙潭分局',
                        code: '220203000000',
                        city: [{
                            name: '龙钢派出所',
                            code: '220203990000'
                        }, {
                            name: '江密峰派出所',
                            code: '220203320000'
                        }, {
                            name: '龙潭派出所',
                            code: '220203210000'
                        }, {
                            name: '乌拉街派出所',
                            code: '220203330000'
                        }, {
                            name: '榆树沟派出所',
                            code: '220203150000'
                        }, {
                            name: '新安派出所',
                            code: '220203220000'
                        }, {
                            name: '江北派出所',
                            code: '220203290000'
                        }, {
                            name: '宁波路派出所',
                            code: '220203390000'
                        }, {
                            name: '靠山派出所',
                            code: '220203350000'
                        }, {
                            name: '铁东派出所',
                            code: '220203170000'
                        }, {
                            name: '泡子沿派出所',
                            code: '220203280000'
                        }, {
                            name: '山前派出所',
                            code: '220203270000'
                        }, {
                            name: '遵义派出所',
                            code: '220203160000'
                        }, {
                            name: '大口钦派出所',
                            code: '220203340000'
                        }, {
                            name: '土城子派出所',
                            code: '220203230000'
                        }, {
                            name: '缸窑派出所',
                            code: '220203360000'
                        }, {
                            name: '金珠派出所',
                            code: '220203310000'
                        }, {
                            name: '龙华派出所',
                            code: '220203240000'
                        }, {
                            name: '新吉林派出所',
                            code: '220203260000'
                        }, {
                            name: '龙潭山治安派出所',
                            code: '220203190000'
                        }]
                    }, {
                        name: '高新分局',
                        code: '220299000000',
                        city:[{
                            name:'新北派出所',
                            code:'220299100000'
                        },{
                            name:'高新派出所',
                            code:'220299070000'
                        },{
                            name:'长江路派出所',
                            code:'220299080000'
                        }]
                    }, {
                        name: '松花湖风景旅游区分局',
                        code: '220297000000',
                        city:[{
                            name:'丰电派出所',
                            code:'220297080000'
                        },{
                            name:'北大壶派出所',
                            code:'220297070000'
                        },{
                            name:'水上派出所',
                            code:'220297040000'
                        },{
                            name:'码头派出所',
                            code:'220297000000'
                        },{
                            name:'五虎岛派出所',
                            code:'220297050000'
                        }]
                    }, {
                        name: '船营分局',
                        code: '220204000000',
                        city:[{
                            name:'北极派出所',
                            code:'220204260000'
                        },{
                            name:'青河治安派出所',
                            code:'220204320000'
                        },{
                            name:'北山派出所',
                            code:'220204200000'
                        },{
                            name:'大厦治安派出所',
                            code:'220204340000'
                        },{
                            name:'搜登站派出所',
                            code:'220204360000'
                        },{
                            name:'长春路派出所',
                            code:'220204170000'
                        },{
                            name:'河南派出所',
                            code:'220204300000'
                        },{
                            name:'欢喜派出所',
                            code:'220204350000'
                        },{
                            name:'福绥治安派出所',
                            code:'220204330000'
                        },{
                            name:'大东派出所',
                            code:'220204250000'
                        },{
                            name:'南京派出所',
                            code:'220204240000'
                        },{
                            name:'临江派出所',
                            code:'220204190000'
                        },{
                            name:'大绥河派出所',
                            code:'220204370000'
                        },{
                            name:'越北派出所',
                            code:'220204290000'
                        },{
                            name:'向阳派出所',
                            code:'220204270000'
                        },{
                            name:'北京路派出所',
                            code:'220204220000'
                        },{
                            name:'黄旗屯派出所',
                            code:'220204160000'
                        },{
                            name:'致和派出所',
                            code:'220204280000'
                        }]
                    }, {
                        name: '昌邑分局',
                        code: '220202000000',
                        city:[{
                            name:'两家子满族乡派出所',
                            code:'220202380000'
                        },{
                            name:'兰天派出所',
                            code:'220202440000'
                        },{
                            name:'和平派出所',
                            code:'220202460000'
                        },{
                            name:'新地号派出所',
                            code:'220202300000'
                        },{
                            name:'新建派出所',
                            code:'220202160000'
                        },{
                            name:'新和派出所',
                            code:'220202450000'
                        },{
                            name:'站前派出所',
                            code:'220202250000'
                        },{
                            name:'哈达湾派出所',
                            code:'220202170000'
                        },{
                            name:'东市场治安派出所',
                            code:'220202340000'
                        },{
                            name:'桦皮厂派出所',
                            code:'220202360000'
                        },{
                            name:'土城子满族朝鲜族乡派出所',
                            code:'220202370000'
                        },{
                            name:'延江派出所',
                            code:'220202200000'
                        },{
                            name:'莲花派出所',
                            code:'220202210000'
                        },{
                            name:'延安路派出所',
                            code:'220202230000'
                        },{
                            name:'通江派出所',
                            code:'220202190000'
                        },{
                            name:'民主路派出所',
                            code:'220202220000'
                        },{
                            name:'兴华派出所',
                            code:'220202180000'
                        },{
                            name:'文庙派出所',
                            code:'220202260000'
                        },{
                            name:'孤店子派出所',
                            code:'220202320000'
                        },{
                            name:'东站派出所',
                            code:'220202330000'
                        },{
                            name:'左家特区派出所',
                            code:'220202350000'
                        },{
                            name:'东局子派出所',
                            code:'220202280000'
                        }]
                    },  {
                        name: '丰满分局',
                        code: '220211000000',
                        city:[{
                            name:'华山路派出所',
                            code:'220211190000'
                        },{
                            name:'旺起镇派出所',
                            code:'220211260000'
                        },{
                            name:'泰山路派出所',
                            code:'220211180000'
                        },{
                            name:'二道河派出所',
                            code:'220211250000'
                        },{
                            name:'石井沟派出所',
                            code:'220211200000'
                        },{
                            name:'白山派出所',
                            code:'220211170000'
                        },{
                            name:'桥南派出所',
                            code:'220211270000'
                        },{
                            name:'丰满派出所',
                            code:'220211220000'
                        },{
                            name:'大长屯派出所',
                            code:'220211240000'
                        },{
                            name:'红旗派出所',
                            code:'220211210000'
                        },{
                            name:'江南派出所',
                            code:'220211160000'
                        }]
                    }, {
                        name: '永吉县公安局',
                        code: '220221000000',
                        city:[{
                            name:'城郊派出所',
                            code:'220221220000'
                        },{
                            name:'开发区派出所',
                            code:'220221230000'
                        },{
                            name:'城北派出所',
                            code:'220221210000'
                        },{
                            name:'北大湖派出所',
                            code:'220221240000'
                        },{
                            name:'黄榆派出所',
                            code:'220221340000'
                        },{
                            name:'岔路河派出所',
                            code:'220221250000'
                        },{
                            name:'西阳派出所',
                            code:'220221320000'
                        },{
                            name:'万昌派出所',
                            code:'220221270000'
                        },{
                            name:'双河镇派出所',
                            code:'220221260000'
                        },{
                            name:'金家派出所',
                            code:'220221310000'
                        },{
                            name:'城南派出所',
                            code:'220221200000'
                        },{
                            name:'一拉溪派出所',
                            code:'220221280000'
                        }]
                    }, {
                        name: '磐石市公安局',
                        code: '220284000000',
                        city:[{
                            name:'宝山派出所',
                            code:'220284280000'
                        },{
                            name:'驿马派出所',
                            code:'220284300000'
                        },{
                            name:'牛心派出所',
                            code:'220284350000'
                        },{
                            name:'呼兰派出所',
                            code:'220284290000'
                        },{
                            name:'黑石派出所',
                            code:'220284360000'
                        },{
                            name:'红旗岭派出所',
                            code:'220284260000'
                        },{
                            name:'经济开发区派出所',
                            code:'220284380000'
                        },{
                            name:'石嘴派出所',
                            code:'220284270000'
                        },{
                            name:'明城派出所',
                            code:'220284250000'
                        },{
                            name:'河南派出所',
                            code:'220284210000'
                        },{
                            name:'吉昌派出所',
                            code:'220284310000'
                        },{
                            name:'朝阳山派出所',
                            code:'220284370000'
                        },{
                            name:'东宁派出所',
                            code:'220284230000'
                        },{
                            name:'松山派出所',
                            code:'220284340000'
                        },{
                            name:'富太派出所',
                            code:'220284330000'
                        },{
                            name:'烟筒山派出所',
                            code:'220284240000'
                        },{
                            name:'福安派出所',
                            code:'220284220000'
                        },{
                            name:'取柴河派出所',
                            code:'220284320000'
                        }]
                    }, {
                        name: '江北分局',
                        code: '220293000000',
                        city:[{
                            name:'郑州路派出所',
                            code:'220293100000'
                        },{
                            name:'清源派出所',
                            code:'220293130000'
                        },{
                            name:'华健派出所',
                            code:'220293150000'
                        },{
                            name:'龙江派出所',
                            code:'220293170000'
                        },{
                            name:'秀山派出所',
                            code:'220293140000'
                        },{
                            name:'兴城街派出所',
                            code:'220293160000'
                        },{
                            name:'凌山派出所',
                            code:'220293120000'
                        },{
                            name:'合肥路派出所',
                            code:'220293110000'
                        },{
                            name:'郑州路派出所',
                            code:'220293100000'
                        }]
                    }, {
                        name: '桦甸市公安局',
                        code: '220282000000',
                        city:[{
                            name:'二道甸子派出所',
                            code:'220282350000'
                        },{
                            name:'桦郊派出所',
                            code:'220282370000'
                        },{
                            name:'新华派出所',
                            code:'220282200000'
                        },{
                            name:'永吉派出所',
                            code:'220282210000'
                        },{
                            name:'红石砬子派出所',
                            code:'220282280000'
                        },{
                            name:'桦树派出所',
                            code:'220282250000'
                        },{
                            name:'夹皮沟派出所',
                            code:'220282270000'
                        },{
                            name:'胜利派出所',
                            code:'220282170000'
                        },{
                            name:'明华派出所',
                            code:'220282180000'
                        },{
                            name:'常山镇派出所',
                            code:'220282240000'
                        },{
                            name:'金沙派出所',
                            code:'220282220000'
                        },{
                            name:'横道河子派出所',
                            code:'220282300000'
                        },{
                            name:'苏密沟派出所',
                            code:'220282290000'
                        },{
                            name:'八道河子派出所',
                            code:'220282340000'
                        },{
                            name:'启新派出所',
                            code:'220282190000'
                        },{
                            name:'公吉派出所',
                            code:'220282320000'
                        }]
                    }, {
                        name: '经济技术开发区分局',
                        code: '220296000000',
                        city:[{
                            name:'九站派出所',
                            code:'220296070000'
                        },{
                            name:'新九派出所',
                            code:'220296080000'
                        },{
                            name:'双吉派出所',
                            code:'220296310000'
                        },{
                            name:'机场派出所',
                            code:'220296090000'
                        },{
                            name:'九华派出所',
                            code:'220296100000'
                        }]
                    }, {
                        name: '蛟河市公安局',
                        code: '220281000000',
                        city:[{
                            name:'天北派出所',
                            code:'220281240000'
                        },{
                            name:'庆岭派出所',
                            code:'220281230000'
                        },{
                            name:'白石山派出所',
                            code:'220281170000'
                        },{
                            name:'长安派出所',
                            code:'220281100000'
                        },{
                            name:'新农派出所',
                            code:'220281150000'
                        },{
                            name:'民主派出所',
                            code:'220281110000'
                        },{
                            name:'河北派出所',
                            code:'220281130000'
                        },{
                            name:'松江派出所',
                            code:'220281210000'
                        },{
                            name:'新站派出所',
                            code:'220281180000'
                        },{
                            name:'奶子山派出所',
                            code:'220281140000'
                        },{
                            name:'天岗派出所',
                            code:'220281190000'
                        },{
                            name:'黄松甸派出所',
                            code:'220281220000'
                        },{
                            name:'前进派出所',
                            code:'220281260000'
                        },{
                            name:'乌林派出所',
                            code:'220281250000'
                        },{
                            name:'漂河派出所',
                            code:'220281200000'
                        },{
                            name:'河南派出所',
                            code:'220281120000'
                        },{
                            name:'拉法派出所',
                            code:'220281160000'
                        }]
                    }, {
                        name: '舒兰市公安局',
                        code: '220283000000',
                        city:[{
                            name:'开原派出所',
                            code:'220283340000'
                        },{
                            name:'溪河派出所',
                            code:'220283310000'
                        },{
                            name:'金马派出所',
                            code:'220283370000'
                        },{
                            name:'水曲柳派出所',
                            code:'220283320000'
                        },{
                            name:'七里派出所',
                            code:'220283330000'
                        },{
                            name:'莲花派出所',
                            code:'220283400000'
                        },{
                            name:'上营派出所',
                            code:'220283430000'
                        },{
                            name:'北城派出所',
                            code:'220283200000'
                        },{
                            name:'南城派出所',
                            code:'220283210000'
                        },{
                            name:'小城派出所',
                            code:'220283440000'
                        },{
                            name:'亮甲山派出所',
                            code:'220283300000'
                        },{
                            name:'天德派出所',
                            code:'220283420000'
                        },{
                            name:'环城派出所',
                            code:'220283220000'
                        },{
                            name:'平安派出所',
                            code:'220283240000'
                        },{
                            name:'法特派出所',
                            code:'220283390000'
                        },{
                            name:'朝阳派出所',
                            code:'220283290000'
                        },{
                            name:'白旗派出所',
                            code:'220283380000'
                        },{
                            name:'吉舒派出所',
                            code:'220283190000'
                        },{
                            name:'新安派出所',
                            code:'220283350000'
                        },{
                            name:'铁东派出所',
                            code:'220283230000'
                        }]
                    }]
                }
            }, {
                region: {
                    name:'辽源市公安局',
                    code:'220400000000',
                    state: [{
                        name:'经济开发区分局',
                        code:'220404000000',
                        city:[{
                            name:'兴阳派出所',
                            code:'220404010000'
                        }]
                    },{
                        name:'南康分局',
                        code:'220403000000',
                        city:[{
                            name:'南康派出所',
                            code:'220403010000'
                        }]
                    },{
                        name:'向阳分局',
                        code:'220402000000',
                        city:[{
                            name:'向阳派出所',
                            code:'220402010000'
                        }]
                    },{
                        name:'东吉分局',
                        code:'220401000000',
                        city:[{
                            name:'东吉派出所',
                            code:'220401010000'
                        }]

                    },{
                        name:'东辽县公安局',
                        code:'220422000000',
                        city:[{
                            name:'凌云派出所',
                            code:'220422200000'
                        },{
                            name:'安石派出所',
                            code:'220422120000'
                        },{
                            name:'足民派出所',
                            code:'220422210000'
                        },{
                            name:'渭津派出所',
                            code:'220422140000'
                        },{
                            name:'平岗镇派出所',
                            code:'220422810000'
                        },{
                            name:'甲山派出所',
                            code:'220422220000'
                        },{
                            name:'云顶派出所',
                            code:'220422230000'
                        },{
                            name:'金州派出所',
                            code:'220422190000'
                        },{
                            name:'泉太派出所',
                            code:'220422100000'
                        },{
                            name:'辽河源派出所',
                            code:'220422130000'
                        },{
                            name:'建安派出所',
                            code:'220422110000'
                        },{
                            name:'安恕派出所',
                            code:'220422180000'
                        },{
                            name:'白泉派出所',
                            code:'220422090000'
                        }]
                    },{
                        name:'东丰县公安局',
                        code:'220421000000',
                        city:[{
                            name:'拉拉河派出所',
                            code:'220421250000'
                        },{
                            name:'小四平派出所',
                            code:'220421130000'
                        },{
                            name:'东丰派出所',
                            code:'220421100000'
                        },{
                            name:'横道河派出所',
                            code:'220421110000'
                        },{
                            name:'猴石派出所',
                            code:'220421140000'
                        },{
                            name:'大阳派出所',
                            code:'220421120000'
                        },{
                            name:'三合派出所',
                            code:'220421150000'
                        },{
                            name:'二龙派出所',
                            code:'220421160000'
                        },{
                            name:'南屯基派出所',
                            code:'220421230000'
                        },{
                            name:'大兴派出所',
                            code:'220421220000'
                        },{
                            name:'黄河派出所',
                            code:'220421210000'
                        },{
                            name:'沙河派出所',
                            code:'220421170000'
                        },{
                            name:'那丹伯派出所',
                            code:'220421200000'
                        },{
                            name:'杨木林派出所',
                            code:'220421240000'
                        }]
                    },{
                        name:'泰安分局',
                        code:'220406000000',
                        city:[{
                            name:'泰安派出所',
                            code:'220406010000'
                        }]
                    },{
                        name:'东山分局',
                        code:'220407000000',
                        city:[{
                            name:'东山派出所',
                            code:'220407010000'
                        }]
                    },{
                        name:'仙城分局',
                        code:'220405000000',
                        city:[{
                            name:'仙城派出所',
                            code:'220405010000'
                        }]
                    }
                    ]}

            },{
                region:{
                    name:'松原市公安局',
                    code:'220700000000',
                    state:[{
                        name:'长岭县公安局',
                        code:'220722000000',
                        city:[{
                            name:'太平山派出所',
                            code:'220722220000'
                        },{
                            name:'腰坨子派出所',
                            code:'220722310000'
                        },{
                            name:'北正镇派出所',
                            code:'220722270000'
                        },{
                            name:'海青派出所',
                            code:'220722290000'
                        },{
                            name:'大兴派出所',
                            code:'220722280000'
                        },{
                            name:'西南派出所',
                            code:'220722160000'
                        },{
                            name:'三青山派出所',
                            code:'220722200000'
                        },{
                            name:'利发盛派出所',
                            code:'220722240000'
                        },{
                            name:'八十八派出所',
                            code:'220722380000'
                        },{
                            name:'西北派出所',
                            code:'220722180000'
                        },{
                            name:'三团派出所',
                            code:'220722360000'
                        },{
                            name:'东南派出所',
                            code:'220722150000'
                        },{
                            name:'前进派出所',
                            code:'220722330000'
                        },{
                            name:'光明派出所',
                            code:'220722340000'
                        },{
                            name:'巨宝山派出所',
                            code:'220722190000'
                        },{
                            name:'流水派出所',
                            code:'220722230000'
                        },{
                            name:'永久派出所',
                            code:'220722210000'
                        },{
                            name:'集体派出所',
                            code:'220722350000'
                        },{
                            name:'东北派出所',
                            code:'220722170000'
                        },{
                            name:'前七号派出所',
                            code:'220722260000'
                        },{
                            name:'太平川派出所',
                            code:'220722140000'
                        },{
                            name:'三县堡派出所',
                            code:'220722320000'
                        },{
                            name:'新安镇派出所',
                            code:'220722250000'
                        },{
                            name:'三十号派出所',
                            code:'220722370000'
                        },{
                            name:'东岭派出所',
                            code:'220722300000'
                        }]
                    },{
                        name:'宁江一分局',
                        code:'220701000000',
                        city:[{
                            name:'临江派出所',
                            code:'220701230000'
                        },{
                            name:'善友派出所',
                            code:'220701330000'
                        },{
                            name:'团结派出所',
                            code:'220701220000'
                        },{
                            name:'长宁派出所',
                            code:'220701250000'
                        },{
                            name:'民主派出所',
                            code:'220701210000'
                        },{
                            name:'前进派出所',
                            code:'220701240000'
                        },{
                            name:'伯都讷派出所',
                            code:'220701350000'
                        },{
                            name:'和平派出所',
                            code:'220701270000'
                        },{
                            name:'新城派出所',
                            code:'220701290000'
                        },{
                            name:'文化派出所',
                            code:'220701200000'
                        },{
                            name:'新区派出所',
                            code:'220701280000'
                        },{
                            name:'伯都派出所',
                            code:'220701320000'
                        },{
                            name:'大洼派出所',
                            code:'220701310000'
                        },{
                            name:'交通派出所',
                            code:'220701340000'
                        },{
                            name:'治安派出所',
                            code:'220701300000'
                        },{
                            name:'工农派出所',
                            code:'220701260000'
                        }]
                    },{
                        name:'松江分局',
                        code:'220797000000',
                        city:[{
                            name:'乾采治安派出所',
                            code:'220797170000'
                        },{
                            name:'江南治安派出所',
                            code:'220797130000'
                        },{
                            name:'新立派出所',
                            code:'220797280000'
                        },{
                            name:'红岗治安派出所',
                            code:'220797190000'
                        },{
                            name:'前大治安派出所',
                            code:'220797180000'
                        },{
                            name:'长春岭派出所',
                            code:'220797310000'
                        },{
                            name:'三新治安派出所',
                            code:'220797150000'
                        },{
                            name:'新华治安派出所',
                            code:'220797160000'
                        },{
                            name:'英台派出所',
                            code:'220797290000'
                        },{
                            name:'洮儿河派出所',
                            code:'220797300000'
                        },{
                            name:'江北治安派出所',
                            code:'220797140000'
                        },{
                            name:'长采治安派出所',
                            code:'220797200000'
                        }]
                    },{
                        name:'扶余市公安局',
                        code:'220724000000',
                        city:[{
                            name:'弓棚子派出所',
                            code:'220724160000'
                        },{
                            name:'增盛派出所',
                            code:'220724210000'
                        },{
                            name:'镇郊派出所',
                            code:'220724130000'
                        },{
                            name:'肖家派出所',
                            code:'220724260000'
                        },{
                            name:'道西派出所',
                            code:'220724330000'
                        },{
                            name:'西北派出所',
                            code:'220724300000'
                        },{
                            name:'五家站派出所',
                            code:'220724240000'
                        },{
                            name:'三骏派出所',
                            code:'220724180000'
                        },{
                            name:'新源镇派出所',
                            code:'220724380000'
                        },{
                            name:'长春岭派出所',
                            code:'220724230000'
                        },{
                            name:'新站派出所',
                            code:'220724250000'
                        },{
                            name:'万发派出所',
                            code:'220724170000'
                        },{
                            name:'蔡家沟派出所',
                            code:'220724140000'
                        },{
                            name:'三井子派出所',
                            code:'220724190000'
                        },{
                            name:'士英派出所',
                            code:'220724320000'
                        },{
                            name:'永平派出所',
                            code:'220724200000'
                        },{
                            name:'更新派出所',
                            code:'220724290000'
                        },{
                            name:'新城局农业示范园区派出所',
                            code:'220724340000'
                        },{
                            name:'大林子派出所',
                            code:'220724270000'
                        },{
                            name:'东北派出所',
                            code:'220724370000'
                        },{
                            name:'西南派出所',
                            code:'220724310000'
                        },{
                            name:'得胜派出所',
                            code:'220724280000'
                        },{
                            name:'陶赖昭派出所',
                            code:'220724150000'
                        }]
                    },{
                        name:'宁江二分局',
                        code:'220702000000',
                        city:[{
                            name:'铁西派出所',
                            code:'220702140000'
                        },{
                            name:'石化派出所',
                            code:'220702170000'
                        },{
                            name:'繁荣派出所',
                            code:'220702150000'
                        },{
                            name:'毛都站派出所',
                            code:'220702180000'
                        },{
                            name:'社里派出所',
                            code:'220702210000'
                        },{
                            name:'站前治安派出所',
                            code:'220702200000'
                        },{
                            name:'滨江派出所',
                            code:'220702120000'
                        },{
                            name:'镜湖派出所',
                            code:'220702270000'
                        },{
                            name:'治安派出所',
                            code:'220702310000'
                        },{
                            name:'建设派出所',
                            code:'220702160000'
                        },{
                            name:'革新派出所',
                            code:'220702190000'
                        },{
                            name:'沿江派出所',
                            code:'220702130000'
                        }]
                    },{
                        name:'经济技术开发区分局',
                        code:'220799000000',
                        city:[{
                            name:'兴原派出所',
                            code:'220799130000'
                        }]
                    },{
                        name:'乾安县公安局',
                        code:'220723000000',
                        city:[{
                            name:'严字派出所',
                            code:'220723230000'
                        },{
                            name:'大布苏派出所',
                            code:'220723170000'
                        },{
                            name:'安字派出所',
                            code:'220723180000'
                        },{
                            name:'水字派出所',
                            code:'220723160000'
                        },{
                            name:'昆池派出所',
                            code:'220723140000'
                        },{
                            name:'赞字派出所',
                            code:'220723210000'
                        },{
                            name:'宇宙派出所',
                            code:'220723130000'
                        },{
                            name:'余字派出所',
                            code:'220723240000'
                        },{
                            name:'鸣凤派出所',
                            code:'220723150000'
                        },{
                            name:'让字派出所',
                            code:'220723190000'
                        },{
                            name:'道字派出所',
                            code:'220723220000'
                        },{
                            name:'所字派出所',
                            code:'220723200000'
                        }]
                    },{
                        name:'前郭县公安局',
                        code:'220721000000',
                        city:[{
                            name:'胜利派出所',
                            code:'220721140000'
                        },{
                            name:'哈拉毛都派出所',
                            code:'220721230000'
                        },{
                            name:'洪泉派出所',
                            code:'220721260000'
                        },{
                            name:'育才派出所',
                            code:'220721150000'
                        },{
                            name:'镇郊派出所',
                            code:'220721170000'
                        },{
                            name:'蒙古艾里派出所',
                            code:'220721220000'
                        },{
                            name:'长龙派出所',
                            code:'220721270000'
                        },{
                            name:'平凤派出所',
                            code:'220721200000'
                        },{
                            name:'浩特芒哈派出所',
                            code:'220721360000'
                        },{
                            name:'乌兰派出所',
                            code:'220721160000'
                        },{
                            name:'吉拉吐派出所',
                            code:'220721380000'
                        },{
                            name:'达里巴派出所',
                            code:'220721390000'
                        },{
                            name:'长山公安派出所',
                            code:'220721190000'
                        },{
                            name:'查干花派出所',
                            code:'220721330000'
                        },{
                            name:'套浩太派出所',
                            code:'220721280000'
                        },{
                            name:'乌兰图嘎派出所',
                            code:'220721310000'
                        },{
                            name:'乌兰傲都派出所',
                            code:'220721340000'
                        },{
                            name:'额如派出所',
                            code:'220721250000'
                        },{
                            name:'海勃日戈派出所',
                            code:'220721300000'
                        },{
                            name:'王府派出所',
                            code:'220721240000'
                        },{
                            name:'八郎派出所',
                            code:'220721210000'
                        },{
                            name:'东三家子派出所',
                            code:'220721350000'
                        },{
                            name:'白依拉嘎派出所',
                            code:'220721370000'
                        },{
                            name:'查干湖派出所',
                            code:'220721130000'
                        },{
                            name:'乌兰塔拉派出所',
                            code:'220721320000'
                        },{
                            name:'宝甸派出所',
                            code:'220721290000'
                        }]
                     }]
                }
            }
 	    ]}
    }
});
