	// 校验验证码
	var bzsy_type = '';
	function getDateDiff(t1,t2){
        var arr1=dateB;
        var date2=$('#sorts').val();
 		/*var arr2=date2.split('-');
 		var d1=new Date(arr1[0],arr1[1],arr1[2]);
 		var d2=new Date(arr2[0],arr2[1],arr2[2]);
 		var d=(d2.getTime()-d1.getTime())/(1000*3600*24); 	*/
 		
		
		var arrDate, objDate1, objDate2, d;

		objDate1 = new Date();
		objDate2 = new Date();

		arrDate = arr1.split("-");
		objDate1.setFullYear(arrDate[0], arrDate[1], arrDate[2]);

		arrDate = date2.split("-");
		objDate2.setFullYear(arrDate[0], arrDate[1], arrDate[2]);

		d = parseInt(Math.abs(objDate1 - objDate2) / 1000 / 60 / 60 / 24);
 		
 		return(( t1>=d && t2<=d));
	}
	function DateDiff(){
        var arr1=dateB;
        var date2=$('#sorts').val();
 		var arr2=date2.split('-');
 		var d1=new Date(arr1[0],arr1[1],arr1[2]);
 		var d2=new Date(arr2[0],arr2[1],arr2[2]);
 		var d=(d2.getTime()-d1.getTime())/(1000*3600*24);
 		return(( 180>=d ));
	}
	function Check(){
		if($('#sorts').val() == '') {
			alert("在吉停留居留时限不能为空！/");
			 return false;

		}
		if(($("#bzsy_gz").is(':visible'))) {
		if($('#gz').val() == 'rz') {
			if(!getDateDiff(365,1)) {
				alert("该签证，在吉停留居留时限不得大于365天！");
				 return false;
			}
		}
		if($('#gz').val() == 'zz') {
			if(!getDateDiff(365,90)) {
				alert("该签证，在吉停留居留时限不得大于365天或小于90天！");
				 return false;
			}
		}
		if($('#gz').val() == 'gz') {
			if(!getDateDiff(365,180)) {
				alert("该签证，在吉停留居留时限不得大于365天或小于180天！");
				 return false;
			}
		}
		}
		
		if(($("#bzsy_ly").is(':visible'))) {
		if($('#lyzjzl').val() == 'lz') {
			if(!getDateDiff(30,1)) {
				alert("该签证，在吉停留居留时限不得大于30！");
				 return false;
			}
		} else if($('#lyzjzl').val() == 'mq') {
			if(!getDateDiff(30,1)) {
				alert("该签证，在吉停留居留时限不得大于30！");
				 return false;
			}
		} else  {
				alert("您不符合此类证件申请条件，详情请咨询当地公安机关！");
				 return false;
		}
		}
		
		
		//学习类的
		
		if(($("#bzsy_xx").is(':visible'))) {
			if($('#xx').val() == 'xx_s2q2') {
				if(!getDateDiff(365,1)) {
					alert("该签证，在吉停留居留时限不得大于365天！");
					 return false;
				}
			}
			if($('#xx').val() == 'xx_x2') {
				if(!getDateDiff(365,1)) {
					alert("该签证，在吉停留居留时限不得大于365天！");
					 return false;
				}
			}
			if($('#xx').val() == 'xx_mq') {
				if(!getDateDiff(180,1)) {
					alert("该签证，在吉停留居留时限不得大于180天！");
					 return false;
				}
			}
			if($('#xx').val() == 'xx_jl') {
				if(!getDateDiff(365,180)) {
					alert("该签证，在吉停留居留时限不得大于365天或小于180天！");
					 return false;
				}
			}
			if($('#xx').val() == 'xx_x1') {
				if(!getDateDiff(365,180)) {
					alert("该签证，在吉停留居留时限不得大于365天或小于180天！");
					 return false;
				}
			}
			if($('#xx').val() == 'xx_tj') {
				if(!getDateDiff(365,180)) {
					alert("该签证，在吉停留居留时限不得大于365天或小于180天！");
					 return false;
				}
			}
			}
			//私人事务
		
			if(($("#bzsy_srsw").is(':visible'))) {
			if($('#srsw').val() == 'srsw_01') {
				if(!getDateDiff(365,1)) {
					alert("该签证，在吉停留居留时限不得大于365天！");
					 return false;
				}
			}
			if($('#srsw').val() == 'srsw_s2') {
				if(!getDateDiff(365,1)) {
					alert("该签证，在吉停留居留时限不得大于365天！");
					 return false;
				}
			}
			if($('#srsw').val() == 'srsw_mq') {
				if(!getDateDiff(180,1)) {
					alert("该签证，在吉停留居留时限不得大于180天！");
					 return false;
				}
			}
			if($('#srsw').val() == 'srsw_sr') {
				if(!getDateDiff(365,180)) {
					alert("该签证，在吉停留居留时限不得大于365天或小于180天！");
					 return false;
				}
			}
			if($('#srsw').val() == 'srsw_tj') {
				if(!getDateDiff(365,180)) {
					alert("该签证，在吉停留居留时限不得大于365天或小于180天！");
					 return false;
				}
			}
			if($('#srsw').val() == 'srsw_s1') {
				if(!getDateDiff(365,180)) {
					alert("该签证，在吉停留居留时限不得大于365天或小于180天！");
					 return false;
				}
			}
			}
			//贸易类
			if(($("#bzsy_my").is(':visible'))) {
				if(!getDateDiff(180,1)) {
						alert("该签证，在吉停留居留时限不得大于180！");
						 return false;
				}
			}
			//访问类
			if(($("#bzsy_fw").is(':visible'))) {
				if(!getDateDiff(180,1)) {
						alert("该签证，在吉停留居留时限不得大于180！");
						 return false;
				}
			}
			//寄养类
			if(($("#bzsy_jy").is(':visible'))) {
				if(!getDateDiff(1095,180)) {
						alert("该签证，在吉停留居留时限不得大于1095或小于180天！！");
						 return false;
				}
			}
		
		if(($("#brzp_f").is(':visible'))) {
			if($('#brzp').val() == '') {
				alert("申请人本人照片不能为空！");
				 return false;
			}
		}
	if(!$("#yxhzzly_f").is(":hidden")){
		
		if($('#yxhzzly').val() == '') {
			alert("有效护照资料页不能为空！");
			 return false;
		}
	} 
	if(!$("#yxqz_f").is(":hidden")){
		if($('#yxqz').val() == '') {
			alert("有效签证不能为空！");
			 return false;
		}
	} 
	if(!$("#yqjddwdzmh_f").is(":hidden")){
		if($('#yqjddwdzmh').val() == '') {
			alert("邀请接待单位的证明函不能为空！");
			 return false;
		}
	}
	if(!$("#tjzm_f").is(":hidden")){
		if($('#tjzm').val() == '') {
			alert("体检证明不能为空！");
			 return false;
		}
	}
	if(!$("#lyghhxxap_f").is(":hidden")){
		if($('#lyghhxxap').val() == '') {
			alert("旅游规划和行程安排不能为空！");
			 return false;
		}
	}
	if(!$("#rxhzdzm_f").is(":hidden")){
		if($('#rxhzdzm').val() == '') {
			alert("旅游规教育机构出具的入学或在读证明不能为空！");
			 return false;
		}
	}
	if(!$("#202bh201b_f").is(":hidden")){
		if($('#202bh201b').val() == '') {
			alert("201表或202表不能为空！");
			 return false;
		}
	}
	if(!$("#xgzmcl_f").is(":hidden")){
		if($('#xgzmcl').val() == '') {
			alert("相关证明材料不能为空！");
			 return false;
		}
	}
	if(!$("#maoyi_f").is(":hidden")){
		if($('#maoyi').val() == '') {
			alert("合作方邀请函不能为空！");
			 return false;
		}
	}
	if(!$("#fangwen_f").is(":hidden")){
		if($('#fangwen').val() == '') {
			alert("合作方邀请函不能为空！");
			 return false;
		}
	}
	if(!$("#jy_hzhdjzm_f").is(":hidden")){
		if($('#jy_hzhdjzm').val() == '') {
			alert("外籍父母护照或中方父母在境外定居证明不能为空！");
			 return false;
		}
	}
	if(!$("#jy_fmwthjystrdwts_f").is(":hidden")){
		if($('#jy_fmwthjystrdwts').val() == '') {
			alert("父母委托或寄养受托人的委托书不能为空！");
			return;
		}
	}
	if(!$("#jy_strhjzm_f").is(":hidden")){
		if($('#jy_strhjzm').val() == '') {
			alert("受托人户籍证明或实际居住地6个月以上居住证明和居民身份证不能为空！");
			 return false;
		}
	}
	/*var bzsy=$('#bzsy').val();
	var sorts=$('#sorts').val();
	var xcyxkzzl=$('#xcyxkzzl').val();
	var brzp=$('#brzp').val();
	alert(brzp);*/
	/*$.ajax({
		url : crjbasePath+"sfrz/bzsy_sq.do",
		data : {
			"bzsy":bzsy,
			"bzsy_type":bzsy_type,
			"sorts":sorts,
			"brzp":brzp,
			"xcyxkzzl":xcyxkzzl
			},
		type : "post",
		dataType : 'json',
		 success: function(data) {
			 location="num.jsp?flag="+data;	
		 }, 
		 error:function(){
			 //alert("222");
        	 //location="1sfrz.jsp";
         } 
	
	});*/
	
}
	
	function f_1_1(){
		//基表信息
		$('#brzp_f').show();
		$('#yxhzzly_f').show();
		$('#yxqz_f').show();
		
		
		
		//工作信息
		$('#yqjddwdzmh_f').show();
		$('#gzxkzzm_f').hide();
		//旅游信息
		$('#lyghhxxap_f').hide();
		//学习类
		$('#rxhzdzm_f').hide();
		$('#202bh201b_f').hide();
		//私人事务
		$('#xgzmcl_f').hide();
		//贸易
		$('#maoyi_f').hide();
		//访问
		$('#fangwen_f').hide();
		//寄养
		$('#jy_hzhdjzm_f').hide();
		$('#jy_fmwthjystrdwts_f').hide();
		$('#jy_strhjzm_f').hide();
	}
	function f_1_2(){
		//基表信息
		$('#brzp_f').show();
		$('#yxhzzly_f').show();
		$('#yxqz_f').show();
		
		//你发证件
		$('#bzsy_zl').show();
		//工作信息
		$('#yqjddwdzmh_f').hide();
		$('#gzxkzzm_f').show();
		//旅游信息
		$('#lyghhxxap_f').hide();
		//学习类
		$('#rxhzdzm_f').hide();
		$('#202bh201b_f').hide();
		//私人事务
		$('#xgzmcl_f').hide();
		//贸易
		$('#maoyi_f').hide();
		//访问
		$('#fangwen_f').hide();
		//寄养
		$('#jy_hzhdjzm_f').hide();
		$('#jy_fmwthjystrdwts_f').hide();
		$('#jy_strhjzm_f').hide();
	}
	function f_2(){
		//基表信息
		$('#brzp_f').show();
		$('#yxhzzly_f').show();
		$('#yxqz_f').show();
		//工作信息
		$('#yqjddwdzmh_f').hide();
		$('#gzxkzzm_f').hide();
		//旅游信息
		$('#lyghhxxap_f').show();
		//学习类
		$('#rxhzdzm_f').hide();
		$('#202bh201b_f').hide();
		//私人事务
		$('#xgzmcl_f').hide();
		//贸易
		$('#maoyi_f').hide();
		//访问
		$('#fangwen_f').hide();
		//寄养
		$('#jy_hzhdjzm_f').hide();
		$('#jy_fmwthjystrdwts_f').hide();
		$('#jy_strhjzm_f').hide();
		//你发证件
		$('#bzsy_zl').hide();
	}
	
	function f_3(){
		//基表信息
		$('#brzp_f').show();
		$('#yxhzzly_f').show();
		$('#yxqz_f').show();
		//工作信息
		$('#yqjddwdzmh_f').hide();
		$('#gzxkzzm_f').hide();
		//旅游信息
		$('#lyghhxxap_f').hide();
		//学习类
		$('#rxhzdzm_f').show();
		$('#202bh201b_f').show();
		//私人事务
		$('#xgzmcl_f').hide();
		//贸易
		$('#maoyi_f').hide();
		//访问
		$('#fangwen_f').hide();
		//寄养
		$('#jy_hzhdjzm_f').hide();
		$('#jy_fmwthjystrdwts_f').hide();
		$('#jy_strhjzm_f').hide();
		//你发证件
		$('#bzsy_zl').hide();
	}
	function f_4(){
		//基表信息
		$('#brzp_f').show();
		$('#yxhzzly_f').show();
		$('#yxqz_f').show();
		//工作信息
		$('#yqjddwdzmh_f').hide();
		$('#gzxkzzm_f').hide();
		//旅游信息
		$('#lyghhxxap_f').hide();
		//学习类
		$('#rxhzdzm_f').hide();
		$('#202bh201b_f').hide();
		
		//私人事务
		$('#xgzmcl_f').show();
		
		//贸易
		$('#maoyi_f').hide();
		//访问
		$('#fangwen_f').hide();
		//寄养
		$('#jy_hzhdjzm_f').hide();
		$('#jy_fmwthjystrdwts_f').hide();
		$('#jy_strhjzm_f').hide();
		//你发证件
		$('#bzsy_zl').hide();
	}
	function f_5(){
		//基表信息
		$('#brzp_f').show();
		$('#yxhzzly_f').show();
		$('#yxqz_f').show();
		//工作信息
		$('#yqjddwdzmh_f').hide();
		$('#gzxkzzm_f').hide();
		//旅游信息
		$('#lyghhxxap_f').hide();
		//学习类
		$('#rxhzdzm_f').hide();
		$('#202bh201b_f').hide();
		
		//私人事务
		$('#xgzmcl_f').hide();
		//贸易
		$('#maoyi_f').show();
		//访问
		$('#fangwen_f').hide();
		//寄养
		$('#jy_hzhdjzm_f').hide();
		$('#jy_fmwthjystrdwts_f').hide();
		$('#jy_strhjzm_f').hide();
		//你发证件
		$('#bzsy_zl').hide();
	}
	
	function f_6(){
		//基表信息
		$('#brzp_f').show();
		$('#yxhzzly_f').show();
		$('#yxqz_f').show();
		//工作信息
		$('#yqjddwdzmh_f').hide();
		$('#gzxkzzm_f').hide();
		//旅游信息
		$('#lyghhxxap_f').hide();
		//学习类
		$('#rxhzdzm_f').hide();
		$('#202bh201b_f').hide();
		
		//私人事务
		$('#xgzmcl_f').hide();
		//贸易
		$('#maoyi_f').hide();
		//访问
		$('#fangwen_f').show();
		//寄养
		$('#jy_hzhdjzm_f').hide();
		$('#jy_fmwthjystrdwts_f').hide();
		$('#jy_strhjzm_f').hide();
		//你发证件
		$('#bzsy_zl').hide();
	}
	
 	function f_7(){
		//基表信息
		$('#brzp_f').show();
		$('#yxhzzly_f').show();
		$('#yxqz_f').show();
		//工作信息
		$('#yqjddwdzmh_f').hide();
		$('#gzxkzzm_f').hide();
		//旅游信息
		$('#lyghhxxap_f').hide();
		//学习类
		$('#rxhzdzm_f').hide();
		$('#202bh201b_f').hide();
		
		//私人事务
		$('#xgzmcl_f').hide();
		//贸易
		$('#maoyi_f').hide();
		//访问
		$('#fangwen_f').hide();
		//寄养
		$('#jy_hzhdjzm_f').show();
		$('#jy_fmwthjystrdwts_f').show();
		$('#jy_strhjzm_f').show();
		//你发证件
		$('#bzsy_zl').hide();
	}
		function changefgz(){
		
			if($('#xcyxkzzl').val() == 'gx') {
				f_1_2()
	    	}else {// 办事事由：旅游
	    		f_1_1()
			} 
		}
		function Datechange(){
			if(DateDiff()) {
				$('#tjzm_f').hide();
			} else if($('#bzsy').val() == '7'){
				$('#tjzm_f').hide();
			} else {
				$('#tjzm_f').show();
			}
		}
	    function changef(){
	    	if($('#gz').val() == 'rz') {
	    		f_1_1()
	    		
	    		//$('#xcyxkzzl').val(gx).attr('selected','selected'); 
	    		$('#xcyxkzzl option[value=ry]').attr('selected',true);
	    		$('#xcyxkzzl').removeAttr("disabled");
	    	} else {// 办事事由：旅游
	    		f_1_2()
	    		$('#xcyxkzzl option[value=gx]').attr('selected',true);
	    		$('#xcyxkzzl').attr("disabled","disabled")

			} 
	    }
		function change(){
			if($('#bzsy').val() == '1') {// 办事事由：工作
				$('#bzsy_gz').show();
				$('#bzsy_ly').hide();
				$('#bzsy_xx').hide();
				$('#bzsy_srsw').hide();
				$('#bzsy_my').hide();
				$('#bzsy_fw').hide();
				$('#bzsy_jy').hide();
				$('#bzsy_tq').hide();
				// 办事事由：工作类
				bzsy_type=$('#gz').val();
				f_1_1()
				
			} else if ($('#bzsy').val() == '2') {// 办事事由：旅游
				$('#bzsy_ly').show();
				
				$('#bzsy_gz').hide();
				$('#bzsy_xx').hide();
				$('#bzsy_srsw').hide();
				$('#bzsy_my').hide();
				$('#bzsy_fw').hide();
				$('#bzsy_jy').hide();
				$('#bzsy_tq').hide();
				// 办事事由：旅游
				bzsy_type=$('#lyzjzl').val();
				f_2();
			}  else if ($('#bzsy').val() == '3') {// 办事事由：学习
				$('#bzsy_xx').show();
			
				$('#bzsy_gz').hide();
				$('#bzsy_ly').hide();
				$('#bzsy_srsw').hide();
				$('#bzsy_my').hide();
				$('#bzsy_fw').hide();
				$('#bzsy_jy').hide();
				$('#bzsy_tq').hide();
				// 办事事由：学习
				bzsy_type=$('#xx').val();
				f_3();
			}  else if ($('#bzsy').val() == '4') {// 办事事由：私人事务
				$('#bzsy_srsw').show();
			
				$('#bzsy_gz').hide();
				$('#bzsy_ly').hide();
				$('#bzsy_xx').hide();
				$('#bzsy_my').hide();
				$('#bzsy_fw').hide();
				$('#bzsy_jy').hide();
				$('#bzsy_tq').hide();
				// 办事事由：私人事务
				bzsy_type=$('#srsw').val();
				f_4();
			} else if ($('#bzsy').val() == '5') {// 办事事由：贸易
				$('#bzsy_my').show();
			
				$('#bzsy_gz').hide();
				$('#bzsy_ly').hide();
				$('#bzsy_xx').hide();
				$('#bzsy_srsw').hide();
				$('#bzsy_fw').hide();
				$('#bzsy_jy').hide();
				$('#bzsy_tq').hide();
				// 办事事由：贸易
				bzsy_type=$('#my').val();
				f_5();
			}  else if ($('#bzsy').val() == '6') {// 办事事由：访问
				$('#bzsy_fw').show();
			
				$('#bzsy_gz').hide();
				$('#bzsy_ly').hide();
				$('#bzsy_xx').hide();
				$('#bzsy_srsw').hide();
				$('#bzsy_my').hide();
				$('#bzsy_jy').hide();
				$('#bzsy_tq').hide();
				// 办事事由：访问
				bzsy_type=$('#fw').val();
				f_6();
			} else if ($('#bzsy').val() == '7') {// 办事事由：寄养
				$('#bzsy_jy').show();
			
				$('#bzsy_gz').hide();
				$('#bzsy_ly').hide();
				$('#bzsy_xx').hide();
				$('#bzsy_srsw').hide();
				$('#bzsy_my').hide();
				$('#bzsy_fw').hide();
				$('#bzsy_tq').hide();
				// 办事事由：寄养
				bzsy_type=$('#jy').val();
				$('#tjzm_f').hide();
				f_7();
			} else if ($('#bzsy').val() == '8') {// 办事事由：探亲
				$('#bzsy_tq').show();
			
				$('#bzsy_gz').hide();
				$('#bzsy_ly').hide();
				$('#bzsy_xx').hide();
				$('#bzsy_srsw').hide();
				$('#bzsy_my').hide();
				$('#bzsy_fw').hide();
				$('#bzsy_jy').hide();
				
				// 办事事由：探亲
				bzsy_type=$('#rq').val();
			}  else {
				
			}
			
		}