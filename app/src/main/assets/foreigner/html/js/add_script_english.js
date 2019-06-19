// alert(1)
//将英文名字转成大写
function UpperCase(id){   
  document.getElementById(id).value = document.getElementById(id).value.toUpperCase();   
}
//根据签证种类，改变字段
function selectDictionary() {
	var sls = document.getElementById("sls").value;
	if (sls == 'mql') {
		$("#xcyyxqz").html("Residence period to");
	}else{
		$("#xcyyxqz").html("The validity of the present visa");
	}
}
// 做非空判断
function checkEach(){
    $('.infor1').each(function(){
        var val = $(this).val();
        if(val == ''){
            var con = $(this).siblings('.me-list-con').text();
            alert(con.substring(0,con.length-1)+'can\'t be empty!')
            return false;
        }
    })
}
//选择停留事由后的页面跳转

function nextNa(type,xcyzjlx){
	 var ly = type ;
	// console.log(type);
	// alert(type)
	if(type=='06'){
		 if(xcyzjlx=='s1zqz' || xcyzjlx=='s2zqz' || xcyzjlx=='srswljlxk'){
			// 存储国籍信息
			var gi = "2" ;
			window.location.href="visitedpersonen_english.html?type="+type+"&xcyzjlx="+xcyzjlx+"&xcyqzUntil="+xcyqzUntil+"&qzyyx="+qzyyx+"&surname="+surname
            +"&givenName="+givenName+"&passportNo="+passportNo+"&njld="+njld+"&ywbh="+ywbh+"&gj="+gj+"&birthday="+birthday+"&djdwxzqh="+djdwxzqh;
		}else{
			window.location.href="nationality_english.html?type="+type+"&xcyzjlx="+xcyzjlx+"&xcyqzUntil="+xcyqzUntil+"&qzyyx="+qzyyx+"&surname="+surname
           +"&givenName="+givenName+"&passportNo="+passportNo+"&njld="+njld+"&ywbh="+ywbh+"&gj="+gj+"&birthday="+birthday+"&djdwxzqh="+djdwxzqh;
		}
		
	}else{
		window.location.href="update_english.html?type="+type+"&xcyzjlx="+xcyzjlx+"&xcyqzUntil="+xcyqzUntil+"&qzyyx="+qzyyx+"&surname="+surname
        +"&givenName="+givenName+"&passportNo="+passportNo+"&njld="+njld+"&ywbh="+ywbh+"&gj="+gj+"&birthday="+birthday+"&djdwxzqh="+djdwxzqh+"&ly="+ly;
	}
	
}
//补填信息
var gj = " " ;
function nextInp(t){
    // 存储国籍信息
     var gj = t  ;
    if(t=='1'){
        window.location.href="visitedpersonch_english.html?type="+t;
    }else if(t=='2'){
        window.location.href="visitedpersonen_english.html?type="+t;
    }else{
        window.location.href="visitedpersonforever_english.html?type="+t;
    }
}
//获取路径中的参数
function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

//被探亲人为外国人

function Check(){
	var ins = 1
    $('.infor1').each(function(i){
        var val = $(this).val();
        if(val == ''){
            var con = $(this).siblings('.me-list-con').text();
            alert(con.substring(0,con.length-1)+'can\'t be empty!')
            ins = 0;
            return false;
        }
        
    })	
    if(ins){			
	// if($("#btwrzhqx").val() == null || $("#btwrzhqx").val() == ''){
	// 	alert("被探望人有效签证期限不能为空！");
	// 	return false;
	// }
		var url = 'datas/visitedpersonen.json'
		$.ajax({
	         url: crjbasePath+"sfrz/findBeitwr.do",
	        //url: url,
	        data:
	         {
	        	surname: $("#surname").val(),
	        	givenName: $("#givenName").val(),
	        	passportNo: $("#passportNo").val(),
	        	guanxi: $("#guanxi").val(),
	        	btwrzhqx: $("#btwrzhqx").val()
	          },
	          type:"post",
	      	 dateType:"json",
	         success: function(data) {
	        	 if(data=="1"){
	     sishu = $("#btwrgx").val();
         btwX = $("#surname").val();
         btwM = $("#givenName").val();
         btwZjhmf = "1";
         btwZjhm = $("#passportNo").val();
         btwyxq = $("#btwrzhqx").val();
	        		window.location.href="choose_date_english.html?type="+type+"&xcyzjlx="+xcyzjlx+"&xcyqzUntil="+xcyqzUntil+"&qzyyx="+qzyyx+"&surname="+surname
                    +"&givenName="+givenName+"&passportNo="+passportNo+"&njld="+njld+"&ywbh="+ywbh+"&gj="+gj+"&birthday="+birthday+"&djdwxzqh="+djdwxzqh+"&ly="+ly;
	        	 }else{
	        		 alert("I didn't find the visor!");//没有找到被探望人！
	        	 }

	      }
	    });
    }
}
//被探望人为中国人

function CheckCh(){
	var ins = 1
    $('.infor1').each(function(i){
        var val = $(this).val();
        if(val == ''){
            var con = $(this).siblings('.me-list-con').text();
            alert(con.substring(0,con.length-1)+'can\'t be empty!')
            ins = 0;
            return false;
        }
        
    })	
    if(ins){
     sishu = $("#btwrgx").val();
     btwName = $("#btwName").val();
     btwZjhmf = "3";
     btwZjhm = $("#passport").val();
		window.location.href="choose_date_english.html?type="+type+"&xcyzjlx="+xcyzjlx+"&xcyqzUntil="+xcyqzUntil+"&qzyyx="+qzyyx+"&surname="+surname
        +"&givenName="+givenName+"&passportNo="+passportNo+"&njld="+njld+"&ywbh="+ywbh+"&gj="+gj+"&birthday="+birthday+"&djdwxzqh="+djdwxzqh+"&ly="+ly;
    }	
	

}
//被探望人为永久居住

function CheckForever(){
	var ins = 1
    $('.infor1').each(function(i){
        var val = $(this).val();
        if(val == ''){
            var con = $(this).siblings('.me-list-con').text();
            alert(con.substring(0,con.length-1)+'can\'t be empty!')
            ins = 0;
            return false;
        }
        
    })	
    if(ins){		
		$("#sishu",window.parent.document).val($("#btwrgx").val());
		$("#btwX",window.parent.document).val($("#surname").val());
		$("#btwM",window.parent.document).val($("#givenName").val());
		$("#btwZjhmf",window.parent.document).val("2");
		$("#btwZjhm",window.parent.document).val($("#passport").val());
		$("#yjjlz",window.parent.document).val($("#yjjlzhm").val());

      sishu =$("#btwrgx").val();
      btwX = $("#surname").val();
      btwM = $("#givenName").val();
      btwZjhmf = "2";
      btwZjhm = $("#passport").val();
      yjjlz = $("#yjjlzhm").val();

		window.location.href="choose_date_english.html?btwrzhqx="+$("#btwrzhqx").val()+"sishu="+$("#btwrgx").val()+"btwX="+$("#surname").val()
                    +"btwZjhmf="+'2'+"btwZjhm="+$("#passport").val()+"btwM="+$("#givenName").val()+"yjjlz="+$("#yjjlzhm").val();
	}	        	
}
//日期选择页的下一步安钮


function CheckDate(){
			
	shiyou = $("#shenqingshiyou").val() ;

	if($('#sorts').val() == '') {
		alert("The intended duration of stay in Jilin Province must be entered!");
		return false;

	}
	if($('#shenqingshiyou').val() == '' && $('#private').attr('data-state') == 1) {
		alert("The reasons for visa application must be entered!");
		return false;

	}

	
	var Bdate = $('#sorts').val() ;
    var qzyyx = $('#scqzyxq').val() ;

	//探亲类签证
	if((ly == '06')) {

		if(xcyzjlx == 'lzqz'||xcyzjlx == 'mzqz'||xcyzjlx == 'fzqz'||xcyzjlx == 'x1zqz'||xcyzjlx == 'x2zqz') {
			alert(06)
			if(!getDateDiff(730,1)) {
				alert("The time limit for this visa is not more than 730 days");
				 return false;
			}
			if(gj=='1'){
				if(day<180){
	        zjzl = "1601";
            nfzjlx = "hfq2qz";
            nfzjlx_cl = "tq_lxmfqz_tjljlxk";
            nfzjlx_name = "Q2字签证";
            zjzlzm = "H";

					window.location.href="visa_num_english.html";
					return false;
				}
				if(day>=180&&day<=730){
					if(sishu=="QT"){
						alert("You do not comply with the application conditions of this certificate. For details, please consult the local public security organ");
						return false;
					}else{
	        zjzl = "1601";
            nfzjlx = "tjljlxk";
            nfzjlx_cl = "tq_lxmfqz_tjljlxk";
            nfzjlx_name = "团聚类居留许可";
            zjzlzm = "R";
					}
				}
			}
			if(gj=='3'){
				if(day<180){
	        zjzl = "1601";
            nfzjlx = "hfq2qz";
            nfzjlx_cl = "tq_lxmfqz_tjljlxk";
            nfzjlx_name = "Q2字签证";
            zjzlzm = "H";
					window.location.href="visa_num_english.html";
					return false;
				}
				if(day>=180&&day<=730){
					if(sishu=="QT"){
						alert("You do not comply with the application conditions of this certificate. For details, please consult the local public security organ");
						return false;
					}else{
	        zjzl = "1601";
            nfzjlx = "tjljlxk";
            nfzjlx_cl = "tq_lxmfqz_tjljlxk";
            nfzjlx_name = "团聚类居留许可";
            zjzlzm = "R";
					}
				}
			}
			if(gj=='2'){
			    var oDate1 = VALID_UNTIL;
			    
			    var oDate2=$('#sorts').val();
			    var b =new Date($('#sorts').val().replace(/-|\/|\,/g,"\/")).getTime();//将对应的日期text id改成唯一的,修改 b下面的e即可

		        var e =new Date(oDate1.replace(/-|\/|\,/g,"\/")).getTime();
		        
		        if(e<b){
		        	alert("The duration of the residence you choose should not be greater than the visiting person.");//您所选择的居留期限不应大于被探望人！
		        	 return false;
		        }
			 		
				if(day<180){
	        zjzl = "1601";
            nfzjlx = "hfs2qz";
            nfzjlx_cl = "tq_lxmfqz_hfs2qz";
            nfzjlx_name = "S2字签证";
            zjzlzm = "O";
					window.location.href="visa_num_english.html";
					 return false;
					
				}
				
				if(day>=180&&day<=730){
					if(sishu=="PO"||sishu=="PODFM"||sishu=="FM"||sishu=="WMZSDZN"){
	        zjzl = "1601";
            nfzjlx = "srswljlxk";
            nfzjlx_cl = "tq_lxmfqz_srswljlxk";
            nfzjlx_name = "私人事务类居留许可";
            zjzlzm = "R";
					}else{
						alert("You do not comply with the application conditions of this certificate. For details, please consult the local public security organ");
						return false;
					}
				}
			}
		}
		if(xcyzjlx == 's2zqz') {
			if(!getDateDiff(730,1)) {
				alert("The time limit for this visa is not more than 730 days");//The time limit for this visa is not more than 730 days
				return false;
			}
			if(day<180){
	        zjzl = "1601";
            nfzjlx = "yqs2qz";
            nfzjlx_cl = "tq_s2qz_s2yq";
            nfzjlx_name = "S2字签证";
            zjzlzm = "O";
				window.location.href="visa_num_english.html";
			}
			
			if(day>=180&&day<=730){
				if(sishu=="PO"||sishu=="PODFM"||sishu=="FM"||sishu=="WMZSDZN"){
	        zjzl = "1601";
            nfzjlx = "tqs2qz";
            nfzjlx_cl = "tq_s2qz_srswljlxk";
            nfzjlx_name = "私人事务类居留许可";
            zjzlzm = "R";
				}else{
					alert("You do not comply with the application conditions of this certificate. For details, please consult the local public security organ");
					return false;
				}
			}
		}

		if(xcyzjlx == 's1zqz') {
			if(!getDateDiff(730,180)) {
				alert("The time limit for this visa should not be more than 730 days or less than 180 days.");//该签证，在吉停留时限不得大于730天或小于180天！
				return false;
			}
			if(sishu=="PO"||sishu=="PODFM"||sishu=="FM"||sishu=="WMZSDZN"){
	        zjzl = "1601";
            nfzjlx = "srswljlxk";
            nfzjlx_cl = "tq_s1qz_srswljlxk";
            nfzjlx_name = "私人事务类居留许可";
            zjzlzm = "R";
			}else{
				alert("You do not comply with the application conditions of this certificate. For details, please consult the local public security organ");
				return false;
			}
		}
		if(xcyzjlx == 'q1zqz') {
			if(!getDateDiff(730,180)) {
				alert("The time limit for this visa should not be more than 730 days or less than 180 days.");//该签证，在吉停留时限不得大于730天或小于180天！
				 return false;
			}
			if(sishu=="QT"){
				alert("You do not comply with the application conditions of this certificate. For details, please consult the local public security organ");
				return false;
			}else{
	        zjzl = "1601";
            nfzjlx = "tjljlxk";
            nfzjlx_cl = "tq_lxmfqz_tjljlxk";
            nfzjlx_name = "团聚类居留许可";
            zjzlzm = "R";
			}
		}

		if(xcyzjlx == 'q2zqz') {
			if(!getDateDiff(730,1)) {
				alert("The time limit for this visa is not more than 730 days");
				return false;
			}
			if(day<180){
				
	        zjzl = "1601";
            nfzjlx = "yqq2qz";
            nfzjlx_cl = "tq_q2qz_yqq2qz";
            nfzjlx_name = "Q2字签证";
            zjzlzm = "y";
			}
			if(day>=180&&day<=730){
				if(sishu=="QT"){
					 alert("You do not comply with the application conditions of this certificate. For details, please consult the local public security organ");
					return false;
				}else{
	        zjzl = "1601";
            nfzjlx = "tjljlxk";
            nfzjlx_cl = "tq_q2qz_tjljlxk";
            nfzjlx_name = "团聚类居留许可";
            zjzlzm = "R";
				}
			}
		}

		if(xcyzjlx == 'tjljlxk') {

			//中国人
			if(!getDateDiff(730,180)) {
				alert("The time limit for this visa should not be more than 730 days or less than 180 days.");//该签证，在吉停留时限不得大于730天或小于180天！
				 return false;
			}
			if(sishu=="QT"){
				alert("You do not comply with the application conditions of this certificate. For details, please consult the local public security organ");
				return false;
			}else{

	        zjzl = "1601";
            nfzjlx = "tjljlxk";
            nfzjlx_cl = "tq_tjljlxk_tjljlxkyq";
            nfzjlx_name = "团聚类居留许可";
            zjzlzm = "R";
			}

		}

		if(xcyzjlx == 'srswljlxk') {

			//外国人
			if(!getDateDiff(730,180)) {
				alert("The time limit for this visa should not be more than 730 days or less than 180 days.");//该签证，在吉停留时限不得大于730天或小于180天！
				 return false;
			}
			if(sishu=="PO"||sishu=="PODFM"||sishu=="FM"||sishu=="WMZSDZN"){
	        zjzl = "1601";
            nfzjlx = "srswljlxk";
            nfzjlx_cl = "tq_s1qz_srswljlxk";
            nfzjlx_name = "私人事务类居留许可";
            zjzlzm = "R";
			}else{
				alert("You do not comply with the application conditions of this certificate. For details, please consult the local public security organ");
				return false;
			}
		}
		if(xcyzjlx == 'xxljlxk'||xcyzjlx == 'gzljlxk') {
			if(!getDateDiff(730,180)) {
				alert("The time limit for this visa should not be more than 730 days or less than 180 days.");//该签证，在吉停留时限不得大于730天或小于180天！
				 return false;
			}
			if(gj=='1'){
				if(day>=180&&day<=730){
	        zjzl = "1601";
            nfzjlx = "tjljlxk";
            nfzjlx_cl = "tq_xxgzjlxk_hftjljlxk";
            nfzjlx_name = "团聚类居留许可";
            zjzlzm = "R";
				}
				if(sishu=="QT"){
					alert("You do not comply with the application conditions of this certificate. For details, please consult the local public security organ");
					return false;
				}else{
	        zjzl = "1601";
            nfzjlx = "tjljlxk";
            nfzjlx_cl = "tq_tjljlxk_tjljlxkyq";
            nfzjlx_name = "团聚类居留许可";
            zjzlzm = "R";
				}
			}
			if(gj=='3'){
				if(day>=180&&day<=730){
					
	        zjzl = "1601";
            nfzjlx = "tjljlxk";
            nfzjlx_cl = "tq_xxgzjlxk_hftjljlxk";
            nfzjlx_name = "团聚类居留许可";
            zjzlzm = "R";
				}
				if(sishu=="QT"){
					alert("You do not comply with the application conditions of this certificate. For details, please consult the local public security organ");
					return false;
				}else{
	        zjzl = "1601";
            nfzjlx = "tjljlxk";
            nfzjlx_cl = "tq_tjljlxk_tjljlxkyq";
            nfzjlx_name = "团聚类居留许可";
            zjzlzm = "R";
				}
			}
			if(gj=='2'){
				if(day>=180&&day<=730){
					if(sishu=="PO"||sishu=="PODFM"||sishu=="FM"||sishu=="WMZSDZN"){
        zjzl = "1601";
        nfzjlx = "srswljlxk";
        nfzjlx_cl = "tq_xxgzjlxk_hfsrswljlxk";
        nfzjlx_name = "私人事务类居留许可";
        zjzlzm = "R";
					}else{
						alert("You do not comply with the application conditions of this certificate. For details, please consult the local public security organ");
						return false;
					}
			  	}
			}
		}
		if(xcyzjlx == 'mql') {
			if(!getDateDiff(180,1)) {
				alert("The time limit for this visa is not more than 180 days！");//该签证，The time limit should not be more than 180 days.
				 return false;
			}else{
        zjzl = "1622";
        nfzjlx = "tlzj";
        nfzjlx_cl = "grly_mq_tlzj";
        nfzjlx_name = "停留证件";
        zjzlzm = "M";
			}
		}
	}
	//工作类
	if(ly == '46') {

		if(xcyzjlx == 'rzqz') {
			if(!getDateDiff(730,1)) {
			    alert("The time limit for this visa is not more than 730 days");
			    return false;
			}else{

				if(day>90&&day<180){
					window.location.href="visa_kind_english.html";
					return false;
				}else if(day<=90){
        zjzl = "1621";
        nfzjlx = "yqrzqz";
        nfzjlx_cl = "gz_rzqz_rzqzyq";
        nfzjlx_name = "R字签证";
        zjzlzm = "y";
				}else if(day>=180){
	        zjzl = "1602";
            nfzjlx = "gzljlxk";
            nfzjlx_cl = "gz_rzqz_gzljlxk";
            nfzjlx_name = "工作类居留许可";
            zjzlzm = "R";
				}
			}

		}
		if(xcyzjlx == 'zzqz') {
			if(!getDateDiff(730,90)) {
			    alert("The time limit for this visa should not be more than 730 days or less than 90 days.");//该签证，在吉停留时限不得大于730天或小于90天！
			    return false;
			}
        zjzl = "1602";
        nfzjlx = "gzljlxk";
        nfzjlx_cl = "gz_zqz_gzljlxk";
        nfzjlx_name = "工作类居留许可";
        zjzlzm = "R";
		}

		if(xcyzjlx == 'gzljlxk') {
			if(!getDateDiff(730,90)) {
			    alert("The time limit for this visa should not be more than 730 days or less than 90 days.");//该签证，在吉停留时限不得大于730天或小于90天！
			    return false;
			}else{
        zjzl = "1602";
        nfzjlx = "gzljlxk";
        nfzjlx_cl = "gz_gzljlxk_gzljlxkyq";
        nfzjlx_name = "工作类居留许可";
        zjzlzm = "R";
			}
		}
	}
	//旅游类
	if(ly == '05') {
		if(xcyzjlx == 'lzqz') {
			if(!getDateDiff(30,1)) {
			    alert("The visa should not stay more than 30 at Jilin.");//该签证，在吉停留时限不得大于30！
			    return false;
			}
        zjzl = "1621";
        nfzjlx = "yqlqz";
        nfzjlx_cl = "grly_clqz_lqzyq";
        nfzjlx_name = "L字签证";
        zjzlzm = "y";
		} else if(xcyzjlx == 'mql') {
			if(!getDateDiff(30,1)) {
				alert("The visa should not stay more than 30 at Jilin.");//该签证，在吉停留时限不得大于30！
			    return false;
			}

        zjzl = "1622";
        nfzjlx = "tlzj";
        nfzjlx_cl = "grly_mq_tlzj";
        nfzjlx_name = "停留证件";
        zjzlzm = "M";
		} else  {
		    alert("You do not meet the application conditions of this kind of certificate. Please consult the local public security organ for details.");//您不符合此类证件申请条件，详情请咨询当地公安机关！
		    return false;
		}
	}


	//学习类的

	if(ly == '01') {
		if(xcyzjlx == 's2zqz'||xcyzjlx == 'q2zqz'||xcyzjlx == 'lzqz'||xcyzjlx == 'mzqz'||xcyzjlx == 'fzqz') {
			if(!getDateDiff(730,1)) {
				alert("The time limit for this visa is not more than 730 days");
				 return false;
			}
			if(day<180){
				
       zjzl = "1601";
        nfzjlx = "hfx2qz";
        nfzjlx_cl = "xx_s2q2qz_hfx2qz";
        nfzjlx_name = "X2字签证";
        zjzlzm = "B";
				window.location.href="visa_num_english.html";
				return false;
			}
			if(day>=180&&day<=730){
				
        zjzl = "1602";
        nfzjlx = "xxljlxk";
        nfzjlx_cl = "xx_s2q2qz_xxljlxk";
        nfzjlx_name = "学习类居留许可";
        zjzlzm = "R";
			}
		}
		if(xcyzjlx == 'x2zqz') {
			if(!getDateDiff(730,1)) {
				alert("The time limit for this visa is not more than 730 days");
				 return false;
			}
			if(day<180){
				
        zjzl = "1621";
        nfzjlx = "yqx2qz";
        nfzjlx_cl = "xx_x2qz_x2qzyq";
        nfzjlx_name = "X2字签证";
        zjzlzm = "y";
			}
			if(day>=180&&day<=730){
				
        zjzl = "1602";
        nfzjlx = "xxljlxk";
        nfzjlx_cl = "xx_x2qz_xxljlxk";
        nfzjlx_name = "学习类居留许可";
        zjzlzm = "R";
			}
		}

		if(xcyzjlx == 'mql') {
			if(!getDateDiff(180,1)) {
				alert("The time limit for this visa is not more than 180 days！");//该签证，在吉停留时限不得大于180天
				 return false;
			}
        zjzl = "1622";
        nfzjlx = "tlzj";
        nfzjlx_cl = "xx_mq_tlzj";
        nfzjlx_name = "停留证件";
        zjzlzm = "M";
		}
		if(xcyzjlx == 'xxljlxk') {
			if(!getDateDiff(730,180)) {
				alert("The time limit for this visa should not be more than 730 days or less than 180 days.");//该签证，在吉停留时限不得大于730天或小于180天！
				 return false;
			}
        zjzl = "1602";
        nfzjlx = "yqxxljlxk";
        nfzjlx_cl = "xx_xxljlxk_xxljlxkyq";
        nfzjlx_name = "学习类居留许可";
        zjzlzm = "R";
		}
		if(xcyzjlx == 'x1zqz') {
			if(!getDateDiff(730,180)) {
				alert("The time limit for this visa should not be more than 730 days or less than 180 days.");//该签证，在吉停留时限不得大于730天或小于180天！
				 return false;
			}
        zjzl = "1602";
        nfzjlx = "xxljlxk";
        nfzjlx_cl = "xx_x1qz_xxljlxk";
        nfzjlx_name = "学习类居留许可";
        zjzlzm = "R";
		}
		if(xcyzjlx == 'tjljlxk'||xcyzjlx == 'srswljlxk'||xcyzjlx == 'gzljlxk') {
			if(!getDateDiff(730,180)) {
				alert("The time limit for this visa should not be more than 730 days or less than 180 days.");//该签证，在吉停留时限不得大于730天或小于180天！
				 return false;
			}

        zjzl = "1601";
        nfzjlx = "hfxxljlxk";
        nfzjlx_cl = "xx_tjsrswgzljlxk_hfxxljlxk";
        nfzjlx_name = "学习类居留许可";
        zjzlzm = "R";
		}
	}
	//私人事务

	if(ly == '48') {
		if(xcyzjlx == 'q2zqz'||xcyzjlx == 'mzqz'||xcyzjlx == 'fzqz'||xcyzjlx == 'x1zqz'||xcyzjlx == 'x2zqz'||xcyzjlx == 'lzqz') {
			if(!getDateDiff(730,1)) {
				alert("The time limit for this visa is not more than 730 days");
				 return false;
			}
			if(day<180){
        zjzl = "1601";
        nfzjlx = "s2qz";
        nfzjlx_cl = "srsw_q2mfxl_s2qz";
        nfzjlx_name = "S2字签证";
        zjzlzm = "O";
				window.location.href="visa_num_english.html";
				 return false;
			}
			if(day>=180&&day<=730){
		zjzl = "1602";
        nfzjlx = "srswljlxk";
        nfzjlx_cl = "srsw_q2mfxl_srswljlxk";
        nfzjlx_name = "私人事务类居留许可";
        zjzlzm = "R";
			}
		}
		if(xcyzjlx == 's2zqz') {
			if(!getDateDiff(730,1)) {
				alert("The time limit for this visa is not more than 730 days");
				 return false;
			}
			if(day<180){
		zjzl = "1621";
        nfzjlx = "yqs2qz";
        nfzjlx_cl = "srsw_s2_s2qzyq";
        nfzjlx_name = "S2字签证";
        zjzlzm = "y";
			}
			if(day>=180&&day<=730){
		zjzl = "1602";
        nfzjlx = "srswljlxk";
        nfzjlx_cl = "srsw_s2_srswljlxk";
        nfzjlx_name = "私人事务类居留许可";
        zjzlzm = "R";
			}
		}
		if(xcyzjlx == 'mql') {
			if(!getDateDiff(180,1)) {
				alert("The time limit for this visa is not more than 180 days！");//该签证，在吉停留时限不得大于180天
				 return false;
			}
		zjzl = "1622";
        nfzjlx = "tlzj";
        nfzjlx_cl = "srsw_mq_tlzj";
        nfzjlx_name = "停留证件";
        zjzlzm = "M";
		}
		if(xcyzjlx == 'xxljlxk'||xcyzjlx == 'tjljlxk') {
			if(!getDateDiff(730,180)) {
				alert("The time limit for this visa should not be more than 730 days or less than 180 days.");//该签证，在吉停留时限不得大于730天或小于180天！
				 return false;
			}
		zjzl = "1602";
        nfzjlx = "hfsrswljlxk";
        nfzjlx_cl = "srsw_xxtjljlxk_hfsrswljlxk";
        nfzjlx_name = "私人事务类居留许可";
        zjzlzm = "R";
		}
		if(xcyzjlx == 'srswljlxk') {
			if(!getDateDiff(730,180)) {
				alert("The time limit for this visa should not be more than 730 days or less than 180 days.");//该签证，在吉停留时限不得大于730天或小于180天！
				 return false;
			}
		zjzl = "1602";
        nfzjlx = "yqsrswljlxk";
        nfzjlx_cl = "srsw_srswljlxk_srswljlxkyq";
        nfzjlx_name = "私人事务类居留许可";
        zjzlzm = "R";
		}
		if(xcyzjlx == 's1zqz') {
			if(!getDateDiff(730,180)) {
				alert("The time limit for this visa should not be more than 730 days or less than 180 days.");//该签证，在吉停留时限不得大于730天或小于180天！
				 return false;
			}
		zjzl = "1602";
        nfzjlx = "srswljlxk";
        nfzjlx_cl = "srsw_s1qz_srsuljlxk";
        nfzjlx_name = "私人事务类居留许可";
        zjzlzm = "R";
		}
	}
	//贸易类
	if(ly == '03') {
		if(!getDateDiff(180,1)) {
				alert("该签证，在吉停留时限不得大于180！");
				return false;
		}
		if(xcyzjlx == 'mzqz') {
		zjzl = "1621";
        nfzjlx = "yqmqz";
        nfzjlx_cl = "my_mqz_mqzyq";
        nfzjlx_name = "M字签证";
        zjzlzm = "y";
		}
		if(xcyzjlx == 'fzqz') {
			
						zjzl = "1601";
                        nfzjlx = "hfmqz";
                        nfzjlx_cl = "my_fqz_mqzhf";
                        nfzjlx_name = "M字签证";
                        zjzlzm = "m";
			window.location.href="visa_num_english.html";
			return false;
		}
		if(xcyzjlx == 'mql') {
					zjzl = "1622";
                    nfzjlx = "tlzj";
                    nfzjlx_cl = "my_mq_tlzj";
                    nfzjlx_name = "停留证件";
                    zjzlzm = "M";
		}

	}
	//访问类
	if(ly == '04') {
		if(!getDateDiff(180,1)) {
			alert("该签证，在吉停留时限不得大于180！");
			return false;
		}
		if(xcyzjlx == 'fzqz') {
			zjzl = "1621";
            nfzjlx = "yqfqz";
            nfzjlx_cl = "jlfwkc_fqz_fqzyq";
            nfzjlx_name = "F字签证";
            zjzlzm = "y";
		}
		if(xcyzjlx == 'mzqz') {
				   zjzl = "1601";
                   nfzjlx = "hffqz";
                   nfzjlx_cl = "jlfwkc_mqz_fqzhf";
                   nfzjlx_name = "F字签证";
                   zjzlzm = "F";
			window.location.href="visa_num_english.html";
			 return false;
		}
		if(xcyzjlx == 'mql') {
		   zjzl = "1622";
           nfzjlx = "tlzj";
           nfzjlx_cl = "jlfwkc_mq_tlzj";
           nfzjlx_name = "停留证件";
           zjzlzm = "M";
		}
	}
	//寄养类
	if(ly == '07') {
		if(!getDateDiff(1095,180)) {
			alert("This visa may not be more than 1095 or less than 180 days at Jilie's stay.");//该签证，在吉停留时限不得大于1095或小于180天！
			 return false;
		}
		if(xcyzjlx == 'q1zqz'||xcyzjlx == 'q2zqz'||xcyzjlx == 'lzqz') {
		     zjzl = "1602";
             nfzjlx = "tjlxkz";
             nfzjlx_cl = "jy_q1q2lqz_tjljlxk";
             nfzjlx_name = "团聚类居留许可";
             zjzlzm = "R";
		}
		if(xcyzjlx == 'tjljlxk') {
		    zjzl = "1602";
            nfzjlx = "yqtjlxkz";
            nfzjlx_cl = "jy_tjljlxk_tjljlxkyq";
            nfzjlx_name = "团聚类居留许可";
            zjzlzm = "R";
		}
	}

	//按钮置灰
	var blwjbtn = document.getElementById("blwjbtn");
	var state = blwjbtn.getAttribute("data-state");
	if (state == 0){
		return false;
	}
	blwjbtn.style.background = 'grey';
	blwjbtn.setAttribute('data-state',0);
	//var url = 'datas/stopDate.json';
	var crjbasePath = 'http://221.8.52.247:8445/jit_crj/';
	$.ajax({
				url : crjbasePath+"sfrz/bzsy_sqWkb.do",
        		//url: url,
        		data : {
		    "ly" : ly,
			"bzsy_type" : GetQueryString('zjlx'),
			"sorts" : GetQueryString('Bdate'),
			"nfzjlx" : GetQueryString('nfzjlx'),
			"nfzjlx_cl" : GetQueryString('nfzjlx_cl'),
			"nfzjlx_name" : GetQueryString('nfzjlx_name'),
			"flagday" : GetQueryString('flagday'),
			"qzyyx" : GetQueryString('scqzyxq'),
			"zjzl" : GetQueryString('zjzl'),
			"zjzlzm" : GetQueryString('zjzlzm'),
			"btwX" : GetQueryString('btwX'),
			"btwM" : GetQueryString('btwM'),
			"btwZjhmf" : GetQueryString('btwZjhmf'),
			"btwZjhm" : GetQueryString('btwZjhm'),
			"yjjlz" : GetQueryString('yjjlz'),
			"btwName" : GetQueryString('btwName'),
			"btwyxq" : GetQueryString('btwyxq'),
		   "sishu" : GetQueryString('sishu'),
			"srswsqsy" : GetQueryString('shiyou'),
			"qzcs" : GetQueryString('qzcs'),
			 "btwZjhmf" : GetQueryString('btwZjhmf'),
			"surname" : GetQueryString('surname'),
            "givenName" : GetQueryString('givenName'),
            "zjhm" : GetQueryString('passportNo'),
            "njld" : GetQueryString('njld'),
            "gj" : GetQueryString('gj'),
            "xcyzjlx" : GetQueryString('xcyzjlx'),
             "birthday" : GetQueryString('birthday'),
             "djdwxzqh" : GetQueryString('djdwxzqh')
        			},

        		type : "post",
        		dataType : 'json',
        		success: function(data) { //
           location="deal_ways_english.html?flag="+data+"&ly="+ ly+"&bzsy_type="+zjlx+"&sorts="+Bdate+"&nfzjlx="+nfzjlx+
            "&nfzjlx_cl="+nfzjlx_cl+"&nfzjlx_name="+GetQueryString('nfzjlx_name')+"&flagday="+flagday+"&qzyyx="+GetQueryString('scqzyxq')+
             "&zjzl="+zjzl+"&zjzlzm="+zjzlzm+"&btwX="+GetQueryString('btwX')+"&btwM="+GetQueryString('btwM')+
              "&btwZjhmf="+GetQueryString('btwZjhmf')+"&btwZjhm="+GetQueryString('btwZjhm')+"&yjjlz="+GetQueryString('yjjlz')+"&btwName="+ GetQueryString('btwName')+
              "&btwyxq="+GetQueryString('btwyxq')+"&sishu="+sishu+"&srswsqsy="+shiyou+"&qzcs="+qzcs+
              "&btwZjhmf="+GetQueryString('btwZjhmf')+"&surname="+surname+"&givenName="+givenName+"&zjhm="+passportNo+
              "&njld="+njld+"&gj="+gj+"&xcyzjlx="+xcyzjlx+"&birthday="+birthday+
               "&djdwxzqh="+GetQueryString('djdwxzqh')+"&ywbh="+ywbh;

        		},
        		error:function(data){
        			 alert("失败了");
        			 location="add_visa_list_english.html";
        			//location="deal_ways.html?flag="+data;
        		}

	});
}
//签证次数
var  qzcs = "";
function checkNum(){
	day=GetQueryString('flagday');
	if('3'== $("#nationality").val()){
		if(day>=365){
			qzcs = "4";
		}else{
			qzcs = $("#nationality").val();
		}
	}else{
		qzcs =  $("#nationality").val();
	}
	//按钮置灰
	var blwjbtn = document.getElementById("nextstep");
	var state = blwjbtn.getAttribute("data-state");
	if (state == 0){
		return false;
	}
	
	$.ajax({
		//url:'datas/num.json',
		url : crjbasePath+"sfrz/bzsy_sq.do",
		data : {
			                        "ly" : GetQueryString('ly'),
                        			"bzsy_type" : GetQueryString('zjlx'),
                        			"sorts" : GetQueryString('Bdate'),
                        			"nfzjlx" : GetQueryString('nfzjlx'),
                        			"nfzjlx_cl" : GetQueryString('nfzjlx_cl'),
                        			"nfzjlx_name" : GetQueryString('nfzjlx_name'),
                        			"flagday" : GetQueryString('flagday'),
                        			"qzyyx" : GetQueryString('scqzyxq'),
                        			"zjzl" : GetQueryString('zjzl'),
                        			"zjzlzm" : GetQueryString('zjzlzm'),
                        			"btwX" : GetQueryString('btwX'),
                        			"btwM" : GetQueryString('btwM'),
                        			"btwZjhmf" : GetQueryString('btwZjhmf'),
                        			"btwZjhm" : GetQueryString('btwZjhm'),
                        			"yjjlz" : GetQueryString('yjjlz'),
                        			"btwName" : GetQueryString('btwName'),
                        			"btwyxq" : GetQueryString('btwyxq'),
                        		   "sishu" : GetQueryString('sishu'),
                        			"srswsqsy" : GetQueryString('shiyou'),
                        			"qzcs" : GetQueryString('qzcs'),
                        			 "btwZjhmf" : GetQueryString('btwZjhmf'),
                        			"surname" : GetQueryString('surname'),
                                    "givenName" : GetQueryString('givenName'),
                                    "zjhm" : GetQueryString('passportNo'),
                                    "njld" : GetQueryString('njld'),
                                    "gj" : GetQueryString('gj'),
                                    "xcyzjlx" : GetQueryString('xcyzjlx'),
                                     "birthday" : GetQueryString('birthday'),
                                     "djdwxzqh" : GetQueryString('djdwxzqh')
			},
		type : "post",
		dataType : 'json',
		 success: function(data) {
			 location="deal_ways_english.html?flag="+data;	
		 }, 
		 error:function(){
			 //alert("222");
        	 //location="1sfrz.jsp";
         } 
	
	});
}
//签证种类
var zjzl = "";
var nfzjlx = "";
var nfzjlx_cl = "";
var zjzlzm = "";
var nfzjlx_name = "" ;
function checkVisaKind(t){
            
    if(t=='1'){
        zjzl = "1602";
        nfzjlx = "yqrzqz";
        nfzjlx_cl = "gz_rzqz_rzqzyq";
        nfzjlx_cl = "R字签证";
        zjzlzm = "r";
    }else{
        
         zjzl = "1621";
         nfzjlx = "gzljlxk";
         nfzjlx_cl = "gz_rzqz_gzljlxk";
         nfzjlx_name = "工作类居留许可";
         zjzlzm = "R";
    }
    
    $.ajax({
    	//url:'datas/num.json',
        url : crjbasePath+"sfrz/bzsy_sq.do",
        data : {
            "ly":GetQueryString('ly'),
            "bzsy_type":GetQueryString('zjlx'),
            "sorts": GetQueryString('Bdate'),
            "gj": GetQueryString('gj'),
            "nfzjlx":GetQueryString('nfzjlx'),
            "nfzjlx_cl":GetQueryString('nfzjlx_cl'),
            "nfzjlx_name":GetQueryString('nfzjlx_name'),

            "flagday": GetQueryString('flagday'),
            //"qzyyx":$("#scqzyxq").val(),
            "zjzl":GetQueryString('zjzl'),
            "zjzlzm":GetQueryString('zjzlzm'),
            "btwX": GetQueryString('btwX'),
            "btwM": GetQueryString('btwM'),
            "btwZjhmf":GetQueryString('btwZjhmf'),
            "btwZjhm": GetQueryString('btwZjhm'),
            "yjjlz": GetQueryString('yjjlz'),
            "btwName":GetQueryString('btwName'),
            "btwyxq":GetQueryString('btwyxq'),
            "sishu":GetQueryString('sishu'),
            "srswsqsy":GetQueryString('shiyou')
            },
        type : "post",
        dataType : 'json',
         success: function(data) {
             location="deal_ways_english.html?flag="+data; 
         }
    }); 
}
//有效期提示 
function dateTips(){
    //工作类
	if((ly == '46')) {
		if(xcyzjlx=='rzqz'){
			$("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 1 days.");//在吉停留时限不得大于等于 730，小于等于1天。
		}
		if(xcyzjlx=='zzqz'){
			$("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 90 days."); //在吉停留时限不得大于等于 730，小于等于90天。
		}
		if(xcyzjlx=='gzljlxk'){
			$("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 90 days."); //在吉停留时限不得大于等于 730，小于等于90天。
		}
		tishistr="How long do you intend to stay in Jilin Province? Tips: intended duration of stay  (shall not exceed the expiry date of passport and work permit!)"
	}	//请问您在吉林省停留多长时间？提示：停留时间(不能超过护照有效期,也不得超过工作许可有效期!)
	//探亲类
	if((ly == '06')) {
		if(GetQueryString('btwZjhmf')=='1'){
			$("#tsnr").html("Hello, you see people in the residence period"+VALID_UNTIL.substr(0,4)+'year'+VALID_UNTIL.substr(5,2)+'month'+VALID_UNTIL.substr(8,2)+'day'+"。The duration of the residence you choose should not be greater than the visiting person.");//您所选择的居留期限不应大于被探望人！					
		}
		if(xcyzjlx == 's1zqz') {
			$("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 180 days.");//在吉停留时限不得超过730天，小于180天
			if(sishu=="PO"||sishu=="PODFM"||sishu=="FM"||sishu=="WMZSDZN"){
				 $("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 180 days.");//在吉停留时限不得超过730天，小于180天
				}else{
				 $("#tssj").html("You do not comply with the application conditions of this certificate. For details, please consult the local public security organ.");//You do not comply with the application conditions of this certificate. For details, please consult the local public security organ
			} 
		}
		if(xcyzjlx == 's2zqz'){
			if(sishu=="PO"||sishu=="PODFM"||sishu=="FM"||sishu=="WMZSDZN"){
				 $("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 180 days.");//在吉停留时限不得超过730天，小于180天
				}else{
					$("#tssj").html("The time limit for this visa is not more than 180 days！")//该签证，在吉停留时限不得大于180天			
				}
			if(gj=='1'){
				if(sishu=="QT"){
					$("#tssj").html("The time limit for this visa is not more than 180 days！");//该签证，在吉停留时限不得大于180天
				}
			}
		}
		if(xcyzjlx == 'q1zqz'){
			$("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 180 days.");//在吉停留时限不得超过730天，小于180天
				if(sishu=="QT"){
					 $("#tssj").html("You do not comply with the application conditions of this certificate. For details, please consult the local public security organ");
				}
		}
		if(xcyzjlx == 'q2zqz'){
			$("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 1 days.");//在吉停留时限不得大于730天，小于等于1天
			if(sishu=="QT"){
				$("#tssj").html("The time limit for this visa is not more than 180 days！");//该签证，在吉停留时限不得大于180天
			}
		}
		if(xcyzjlx == 'lzqz'){
			if(gj=='1'){
				if(sishu=="QT"){
					$("#tssj").html("The time limit for this visa is not more than 180 days！");//该签证，在吉停留时限不得大于180天
				}
			}
			if(gj=='2'){
				 if(sishu=="PO"||sishu=="PODFM"||sishu=="FM"||sishu=="WMZSDZN"){
					 $("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 180 days.");//在吉停留时限不得超过730天，小于180天
					}else{
						$("#tssj").html("The time limit for this visa is not more than 180 days！");//该签证，在吉停留时限不得大于180天
				}
			}
			if(gj=='3'){
				 if(sishu=="PO"||sishu=="PODFM"||sishu=="FM"||sishu=="WMZSDZN"){
					 $("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 180 days.");//在吉停留时限不得超过730天，小于180天
					}else{
						$("#tssj").html("The time limit for this visa is not more than 180 days！");//该签证，在吉停留时限不得大于180天
				}
			}
		}
		if(xcyzjlx == 'mzqz'){
			$("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 1 days.");//在吉停留时限不得大于730天，小于等于1天
			if(gj=='1'){
				if(sishu=="QT"){
					$("#tssj").html("The time limit for this visa is not more than 180 days！");//该签证，在吉停留时限不得大于180天
				}
			}
			if(gj=='2'){
				 if(sishu=="PO"||sishu=="PODFM"||sishu=="FM"||sishu=="WMZSDZN"){
					 $("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 180 days.");//在吉停留时限不得超过730天，小于180天
					}else{
						$("#tssj").html("The time limit for this visa is not more than 180 days！");//该签证，在吉停留时限不得大于180天
				}
			}
			if(gj=='3'){
				 if(sishu=="PO"||sishu=="PODFM"||sishu=="FM"||sishu=="WMZSDZN"){
					 $("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 180 days.");//在吉停留时限不得超过730天，小于180天
					}else{
						$("#tssj").html("The time limit for this visa is not more than 180 days！");//该签证，在吉停留时限不得大于180天
				}
			}
		}
		if(xcyzjlx == 'fzqz'){
			$("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 1 days.");//在吉停留时限不得大于730天，小于等于1天
			if(gj=='1'){
				if(sishu=="QT"){
					$("#tssj").html("The time limit for this visa is not more than 180 days！");//该签证，在吉停留时限不得大于180天
				}
			}
			if(gj=='2'){
				 if(sishu=="PO"||sishu=="PODFM"||sishu=="FM"||sishu=="WMZSDZN"){
					 $("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 180 days.");//在吉停留时限不得超过730天，小于180天
					}else{
						$("#tssj").html("The time limit for this visa is not more than 180 days！");//该签证，在吉停留时限不得大于180天
				}
			}
			if(gj=='3'){
				 if(sishu=="PO"||sishu=="PODFM"||sishu=="FM"||sishu=="WMZSDZN"){
					 $("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 180 days.");//在吉停留时限不得超过730天，小于180天
					}else{
						$("#tssj").html("The time limit for this visa is not more than 180 days！");//该签证，在吉停留时限不得大于180天
				}
			}
		}
		if(xcyzjlx == 'x1zqz'){
			$("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 1 days.");//在吉停留时限不得大于730天，小于等于1天
			if(gj=='1'){
				if(sishu=="QT"){
					$("#tssj").html("The time limit for this visa is not more than 180 days！");//该签证，在吉停留时限不得大于180天
				}
			}
			if(gj=='2'){
				 if(sishu=="PO"||sishu=="PODFM"||sishu=="FM"||sishu=="WMZSDZN"){
					 $("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 180 days.");//在吉停留时限不得超过730天，小于180天
					}else{
						$("#tssj").html("The time limit for this visa is not more than 180 days！");//该签证，在吉停留时限不得大于180天
				}
			}
			if(gj=='3'){
				 if(sishu=="PO"||sishu=="PODFM"||sishu=="FM"||sishu=="WMZSDZN"){
					 $("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 180 days.");//在吉停留时限不得超过730天，小于180天
					}else{
						$("#tssj").html("The time limit for this visa is not more than 180 days！");//该签证，在吉停留时限不得大于180天
				}
			}
		}
		if(xcyzjlx == 'x2zqz'){
			$("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 1 days.");//在吉停留时限不得大于730天，小于等于1天
			if(gj=='1'){
				if(sishu=="QT"){
					$("#tssj").html("The time limit for this visa is not more than 180 days！");//该签证，在吉停留时限不得大于180天
				}
			}
			if(gj=='2'){
				 if(sishu=="PO"||sishu=="PODFM"||sishu=="FM"||sishu=="WMZSDZN"){
					 $("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 180 days.");//在吉停留时限不得超过730天，小于180天
					}else{
						$("#tssj").html("The time limit for this visa is not more than 180 days！");//该签证，在吉停留时限不得大于180天
				}
			}
			if(gj=='3'){
				 if(sishu=="PO"||sishu=="PODFM"||sishu=="FM"||sishu=="WMZSDZN"){
					 $("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 180 days.");//在吉停留时限不得超过730天，小于180天
					}else{
						$("#tssj").html("The time limit for this visa is not more than 180 days！");//该签证，在吉停留时限不得大于180天
				}
			}
		}
		if(xcyzjlx == 'tjljlxk'){
			$("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 180 days.");//在吉停留时限不得超过730天，小于180天
			if(gj=='1'){
				if(sishu=="QT"){
					$("#tssj").html("You do not comply with the application conditions of this certificate. For details, please consult the local public security organ");
				}
			}
			if(gj=='3'){
				if(sishu=="QT"){
					$("#tssj").html("You do not comply with the application conditions of this certificate. For details, please consult the local public security organ");
				}
			}
		}
		if(xcyzjlx == 'srswljlxk'){
			$("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 180 days.");//在吉停留时限不得超过730天，小于180天
			if(gj=='2'){
				 if(sishu=="PO"||sishu=="PODFM"||sishu=="FM"||sishu=="WMZSDZN"){
					 $("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 180 days.");//在吉停留时限不得超过730天，小于180天
   					 $("#tssj").html("You do not comply with the application conditions of this certificate. For details, please consult the local public security organ");
				}
			}
		}
		if(xcyzjlx == 'xxljlxk'){
			$("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 180 days.");//在吉停留时限不得超过730天，小于180天
			if(gj=='1'){
				if(sishu=="QT"){
					$("#tssj").html("You do not comply with the application conditions of this certificate. For details, please consult the local public security organ");
				}
			}
			if(gj=='2'){
				 if(sishu=="PO"||sishu=="PODFM"||sishu=="FM"||sishu=="WMZSDZN"){
					 $("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 180 days.");//在吉停留时限不得超过730天，小于180天
					}else{
						 $("#tssj").html("You do not comply with the application conditions of this certificate. For details, please consult the local public security organ");
				}
			}
			if(gj=='3'){
				if(sishu=="QT"){
					$("#tssj").html("You do not comply with the application conditions of this certificate. For details, please consult the local public security organ");
				}
			}
		}
		if(xcyzjlx == 'gzljlxk'){
			$("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 180 days.");//在吉停留时限不得超过730天，小于180天
			//$("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 180 days.");//在吉停留时限不得超过730天，小于180天
			if(gj=='1'){
				if(sishu=="QT"){
					$("#tssj").html("You do not comply with the application conditions of this certificate. For details, please consult the local public security organ");
				}
			}
			if(gj=='2'){
				 if(sishu=="PO"||sishu=="PODFM"||sishu=="FM"||sishu=="WMZSDZN"){
					 $("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 180 days.");//在吉停留时限不得超过730天，小于180天
					}else{
						 $("#tssj").html("You do not comply with the application conditions of this certificate. For details, please consult the local public security organ");
				}
			}
			if(gj=='3'){
				if(sishu=="QT"){
					$("#tssj").html("You do not comply with the application conditions of this certificate. For details, please consult the local public security organ");
				}
			}
		}		
	}
	//学习类
    if(ly == '01') {
	   $("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 1 days.");//在吉停留时限不得大于730天，小于等于1天
	   if(xcyzjlx == 's2zqz'){
			$("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 1 days.");//在吉停留时限不得大于730天，小于等于1天
		}
	   if(xcyzjlx == 'q2zqz'){
			$("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 1 days.");//在吉停留时限不得大于730天，小于等于1天
		}
	   if(xcyzjlx == 'x2zqz'){
			$("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 1 days.");//在吉停留时限不得大于730天，小于等于1天
		}
	   if(xcyzjlx == 'mql'){
			$("#tssj").html("The time limit should not be more than 180 days.");//在吉停留时限不得大于180天。
		}
	   if(xcyzjlx == 'x1zqz'){
			$("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 180 days.");//在吉停留时限不得超过730天，小于180天
		}
	   if(xcyzjlx == 'tjljlxk'){
			$("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 180 days.");//在吉停留时限不得超过730天，小于180天
		}
		if(xcyzjlx == 'srswljlxk'){
			$("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 180 days.");//在吉停留时限不得超过730天，小于180天
		}
		if(xcyzjlx == 'xxljlxk'){
			$("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 180 days.");//在吉停留时限不得超过730天，小于180天
		}
		if(xcyzjlx == 'gzljlxk'){
			$("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 180 days.");//在吉停留时限不得超过730天，小于180天
		}
		tishistr="How long will you stay in Jilin Province, please? Hint: stay time (not exceed the passport validity period, nor exceed the validity period of the certificate of study license!)";//请问您在吉林省停留多长时间？提示：停留时间(不能超过护照有效期,也不得超过学习许可证明有效期!)
		//$("#tishi").html("请问您在吉林省停留多长时间？提示：停留时间(不能超过护照有效期,也不得超过学习许可证明有效期!)");
    }
	//寄养类
    if(ly == '07') {
	   if(xcyzjlx == 'q1zqz'){
			$("#tssj").html("The intended duration of stay shall not be more than 1095 days and less than 180 days."); //在吉停留时限不得超过1095天，小于180天
		}
	   if(xcyzjlx == 'q2zqz'){
			$("#tssj").html("The intended duration of stay shall not be more than 1095 days and less than 180 days."); //在吉停留时限不得超过1095天，小于180天
		}
	   if(xcyzjlx == 'lzqz'){
			$("#tssj").html("The intended duration of stay shall not be more than 1095 days and less than 180 days."); //在吉停留时限不得超过1095天，小于180天
		}
	   if(xcyzjlx == 'tjljlxk'){
			$("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 180 days.");//在吉停留时限不得超过730天，小于180天
		}
	   tishistr="How long will you stay in Jilin Province, please? Hint: the time of stay should not exceed the validity period of the passport, and the 18 birthday of the applicant should not be exceeded.!";
		//$("#tishi").html("请问您在吉林省停留多长时间？提示：停留时间(不能超过护照有效期,也不得超过申请人18周岁生日!");
    }
    //旅游类
    if(ly == '05') {
	   
	   if(xcyzjlx == 'mql'){
			$("#tssj").html("The time limit should not be more than 30 days."); //在吉停留时限不得大于30天。
		}
	   if(xcyzjlx == 'lzqz'){
			$("#tssj").html("The time limit should not be more than 30 days."); //在吉停留时限不得大于30天。
		}
    }
    //访问类
    if(ly == '03') {
	   
	   if(xcyzjlx == 'mql'){
			$("#tssj").html("The time limit should not be more than 180 days.");
		}
	   if(xcyzjlx == 'fzqz'){
			$("#tssj").html("The time limit should not be more than 180 days.");
		}
	   if(xcyzjlx == 'mzqz'){
			$("#tssj").html("The time limit should not be more than 180 days.");
		}
    }
    //贸易类
    if(ly == '04') {
	   
	   if(xcyzjlx == 'mql'){
			$("#tssj").html("The time limit should not be more than 180 days.");
		}
	   if(xcyzjlx == 'fzqz'){
			$("#tssj").html("The time limit should not be more than 180 days.");
		}
	   if(xcyzjlx == 'mzqz'){
			$("#tssj").html("The time limit should not be more than 180 days.");
		}
    }
	//私人事务类
    if(ly == '48') {
	   
	   		if(xcyzjlx == 'q2zqz'){
			$("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 1 days.");//在吉停留时限不得大于730天，小于等于1天
		}
	   		if(xcyzjlx == 'lzqz'){
			$("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 1 days.");//在吉停留时限不得大于730天，小于等于1天
		}
   	   	if(xcyzjlx == 'fzqz'){
			$("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 1 days.");//在吉停留时限不得大于730天，小于等于1天
		}
   	 	if(xcyzjlx == 'mzqz'){
			$("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 1 days.");//在吉停留时限不得大于730天，小于等于1天
		}
   	 	if(xcyzjlx == 'x1zqz'){
			$("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 1 days.");//在吉停留时限不得大于730天，小于等于1天
		}
   	 	if(xcyzjlx == 'x2zqz'){
			$("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 1 days.");//在吉停留时限不得大于730天，小于等于1天
		}
   	 	if(xcyzjlx == 's1zqz'){
			$("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 180 days.");//在吉停留时限不得超过730天，小于180天
		}
   	 	if(xcyzjlx == 's2zqz'){
			$("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 1 days.");//在吉停留时限不得大于730天，小于等于1天
		}
   	 	if(xcyzjlx == 'mql'){
			$("#tssj").html("The time limit should not be more than 180 days.");
		}
   	   	if(xcyzjlx == 'tjljlxk'){
			$("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 180 days.");//在吉停留时限不得超过730天，小于180天
		}
   	   	if(xcyzjlx == 'xxljlxk'){
			$("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 180 days.");//在吉停留时限不得超过730天，小于180天
		}
   	 	if(xcyzjlx == 'srswljlxk'){
			$("#tssj").html("The intended duration of stay shall not be more than 730 days and less than 180 days.");//在吉停留时限不得超过730天，小于180天
		}
   	 
	 //   var html='';
	 //   html+='<td>&nbsp;</td>';
	 //   html+='<td><p style="margin-left:-5px;">申请事由：</p></td>';
	 //   html+='<td><input type="text" id="shenqingshiyou" name="shenqingshiyou" style="width:50%;height:20px;" datatype="s,*" maxLength="200"/><span style="color:red;margin-left:10px;">必填项</span></td>';
	 //   html+='<td> &nbsp;</td>';      
		// $("#siren").append(html);
		$('#private').show();
		$('#private').attr('data-state', 1);
    }
	if(tishistr==''){
		 $("#tssj").prepend("How long will you stay in Jilin Province, please?<br/>Hint: the stay time cannot exceed the passport validity period!<br/>");//请问您在吉林省停留多长时间？<br/>提示：停留时间不能超过护照有效期！
	}else{
		tishistr = tishistr ;
		$("#tssj").prepend(tishistr);
	}
}
//选择停留日期
var flagday = "" ;
function  changeDate(){
	var date2=$('#sorts').val();//停留日期

	var d =new Date(date2.replace(/-|\/|\,/g,"\/")).getTime();

	var nd =nowdate;
	var now = new Date(nowdate);
	if(nd>d) {
	    alert("The time limit at Jilie should not be less than the current date");//在吉停留时限不能小于当前日期
	    $("#days").html(" ");
	}else{
		var arrDate1,arrDate2, objDate1, objDate2, d;

		objDate1 = new Date();
		objDate2 = new Date();

		arrDate1 = [ now.getFullYear(), now.getMonth(),now.getDate() ];
		objDate1.setFullYear(arrDate1[0], arrDate1[1], arrDate1[2]);

		arrDate2 = date2.split("-");
		objDate2.setFullYear(arrDate2[0], arrDate2[1], arrDate2[2]);

		d = parseInt(Math.abs(objDate1-objDate2) / 1000 / 60 / 60 / 24);
		flagday = d ;
		day = d;
		$("#days").html("The number of days is as follows:"+day+"days");//停留天数为：
	}       
}
var flagday = "" ;
function getDateDiff(t1,t2) {
	//var arr1=nowdate;
	var sorts = $('#sorts').attr('data-kind');
    var date2= document.getElementById('sorts').value;
    //var date2= $('#sorts').attr('value');
    var arrDate, objDate1, objDate2, d;
    var now = new Date(nowdate);
    objDate1 = new Date();
    objDate2 = new Date();
    if(sorts == 1){

        if(date2 == 0){

            objDate2 =91;
            d = objDate2

        } else if(date2==1){
            objDate2 =183;
            d = objDate2
        } else if (date2==2){
            objDate2 =365;
            d = objDate2
        } else if (date2==3){
          objDate2 =365 + 180;
          d = objDate2
        } else if (date2==4){
            objDate2 =365 + 365;
            d = objDate2
         }
        flagday = d ;
        day = d;

    }else{
        arrDate = date2.split("-");
        objDate2.setFullYear(arrDate[0], arrDate[1], arrDate[2]);
        arrDate = [ now.getFullYear(), now.getMonth(), now.getDate() ];
        objDate1.setFullYear(arrDate[0], arrDate[1], arrDate[2]);
        d = parseInt(Math.abs(objDate1-objDate2) / 1000 / 60 / 60 / 24);
        flagday = d ;
        day = d;
    }
	return(( t1>=d && t2<=d));
}