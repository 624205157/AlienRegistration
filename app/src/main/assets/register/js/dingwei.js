    	var regionName = "";
    	var cityName = "";

    	function showMap(inputId, ssqId) {
    	    var map, geolocation;
    	    //市名称
    	    var sname = "";
    	    // //县名称
    	    // var qxname="";
    	    // //区名称
    	    // var qname="";
    	    //加载地图，调用浏览器定位服务
    	    map = new AMap.Map('container');
    	    map.plugin('AMap.Geolocation', function() {
    	        geolocation = new AMap.Geolocation({
    	            enableHighAccuracy: true, //是否使用高精度定位，默认:true
    	            timeout: 1000, //超过10秒后停止定位，默认：无穷大
    	            maximumAge: 0, //定位结果缓存0毫秒，默认：0
    	            convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
    	            showButton: true, //显示定位按钮，默认：true
    	            buttonPosition: 'LB', //定位按钮停靠位置，默认：'LB'，左下角
    	            buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
    	            showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
    	            showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
    	            panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
    	            zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false

    	        });
    	        map.addControl(geolocation);
    	        geolocation.getCurrentPosition();
    	        AMap.event.addListener(geolocation, 'complete', onComplete); //返回定位信息
    	        AMap.event.addListener(geolocation, 'error', onError); //返回定位出错信息

    	    });

    	    //解析定位结果
    	    function onComplete(data) {

    	        $("#txMapWd").val(data.position.lat);
    	        $("#txMapJd").val(data.position.lng);
    	        if (data.formattedAddress != null && data.formattedAddress != '' && data.formattedAddress != undefined) {
    	            address = data.formattedAddress;
    	            var qsString = address.split('省')[1]; // 留的是省后面的内容
    	            regionName = qsString.split('市')[0] + "市公安局"; //  市前面的内容
    	            //cityName =qsString.split('市')[1].split('区')[0]+"区分局";    //  取得是市和区 之间的内容
    	            var a = qsString.split('市')[1];
    	            //qxname =qsString.split('区');
    	            //  取得是市和县之间的内容
    	            if (a.split("区")[1] != undefined) {
    	                cityName = qsString.split('市')[1].split('区')[0] + "区分局";
    	            } else {
    	                cityName = qsString.split('市')[1].split('县')[0] + "县公安局";
    	            }

					//alert(regionName)
    	            //  alert(qsString); //  长春市朝阳区南湖街道力旺广场
    	            //  alert(sname);    // 长春
    	            //  alert(qxname);   // 朝阳
    	            //  alert(qname);    // 朝阳区南湖街道力旺广场

    	            $(inputId).val(address.split('区')[1]);
                    $("#cityR3").val(address.split('区')[1]);

    	            if (ssqId = '#cityResult3') {
    	                $(ssqId).html(address.split('区')[0] + '区');
    	                $(ssqId).val(address.split('区')[0] + '区');

    	            } else {
    	                $(ssqId).val(address.split('区')[0] + '区');
    	            }
    	            $("#addressDiv").html("<span style='color:grey;'>我在</span><" + address + "><span style='color:grey'>附近</span>");
					for (var j = 0; j < CityJson.length; j++) {
	                    if (CityJson[j].region.text == regionName) {

	                        for (var k = 0; k < CityJson[j].region.state.length; k++) {
	                            if (CityJson[j].region.state[k].text == cityName) {
	//                              for (var l = 0; l < CityJson[j].region.state[k].city.length; l++) {
	//                                  cityDom += '<li><a>' + CityJson[j].region.state[k].city[l].name + '<input value="' + CityJson[j].region.state[k].city[l].code + '" style="display:none"></a></li>';
	//                              }
//									console.log(CityJson[j].region.state[k].city)
									dataP=CityJson[j].region.state[k].city;
									//console.log(dataP)
	                            }
	                        }
	                        //console.log(dataP)
	                    }
	                };
    	        } else {
    	            $("#address").val('定位失败');

    	        }
    	    }
    	    }
    	    //解析定位错误信息
    	    function onError(data) {
//    	        var str = '定位失败,';
//                str += '错误信息：';
//                switch(data.info) {
//                    case 'PERMISSION_DENIED':
//                        str += '浏览器阻止了定位操作';
//                        break;
//                    case 'POSITION_UNAVAILBLE':
//                        str += '无法获得当前位置';
//                        break;
//                    case 'TIMEOUT':
//                        str += '定位超时';
//                        break;
//                    default:
//                        str += '未知错误';
//                        break;
//                }
////                alert(data.message);
//
//    	        document.getElementById('container').innerHTML = '定位失败';
//    	    }
 //测试
    	        	        var str = '定位失败,';
                            str += '错误信息：';
                            switch(data.info) {
                                case 'PERMISSION_DENIED':
                                    str += '浏览器阻止了定位操作';
                                    break;
                                case 'POSITION_UNAVAILBLE':
                                    str += '无法获得当前位置';
                                    break;
                                case 'TIMEOUT':
                                    str += '定位超时';
                                    break;
                                default:
                                    str += '未知错误';
                                    break;
                            }
            //                alert(data.message);

                	        document.getElementById('container').innerHTML = '<img src="img/ceshi.jpg"  style="margin-top:3px;width:100%;height:160px;"/> ';
                	        //document.getElementById('cityR3').innerHTML = '吉林省长春市朝阳区';
                	        document.getElementById('xxdz').innerHTML = '红旗街道青海街8-2号2-1室';
    	}
