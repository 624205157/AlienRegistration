
function ajaxFileUpload(fileid,limitSize,ywbh,type,typeName,eval_param)
{
	
	element =fileid;//获取附件元素对象
	if($(element).val()== null || $(element).val().length < 2)return;
	obj = element.value;//获取附件路径
	   var isIE = (document.all) ? true : false; 
	    var isIE7 = isIE && (navigator.userAgent.indexOf('MSIE 7.0') != -1); 
	    var isIE8 = isIE && (navigator.userAgent.indexOf('MSIE 8.0') != -1); 
	    var file=element; 
	    if(isIE7 || isIE8) { 
	        file.select(); 
//	        obj=document.selection.createRange().text; 
//	        document.selection.empty(); 
	    }
	var allowType = 'txt,zip,rar,doc,xls,xlsx,docx,ppt,pptx,pdf,png,gif,jpg,jpeg';//允许上传附件类型
	//验证附件 是否为空
	if(obj== null && obj.length <1 ){
		return 3 ;
	}
	//验证附件类型
	var fileType = obj.substr(obj.lastIndexOf('.')+1,obj.length);
	if( allowType.indexOf(fileType) == -1){
//		element.select();  //删除符合条件的 文件 路径
//	    document.execCommand("delete");
		alert('不允许上传 '+fileType+' 附件类型');
		return 1;
	}
	
	/*$("#loading")
	.ajaxStart(function(){
		$(this).show();
	})//开始上传文件时显示一个图片
	$("#loading").ajaxComplete(function(){
	});//文件上传完成将图片隐藏起来
	 */	
	
	$.ajaxFileUpload
	(
		{
			//url:'datas/update.json',
			url:crjbasePath+'/crj/flie/fileUpload.do?limitSize='+limitSize+'&ywbh='+ywbh+'&type='+type+'&typeName='+typeName,//用于文件上传的服务器端请求地址
			secureuri:false,//一般设置为false
			fileElementId:fileid,//文件上传空间的id属性  <input type="file" id="file" name="file" />
			dataType: 'text',//返回值类型 一般设置为json
			success: function (data, status)  //服务器成功响应处理函数
			{
				if(data =='1'){
					alert('上传附件过大!请重新上传');
				}else if(data == '2'){
					alert('上传附件不允许为空!请重新上传');
				}else{
					alert('上传附件成功');
					//接受返回数据字符串
					// var datas=data.split(",");
					// $("#"+ywbh).val(datas[0]);
					// eval(eval_param+'("'+data+'")');
					show(element);
				}
			},
			error: function (data, status, e)//服务器响应失败处理函数
			{
				jAlert('附件上传失败', '错  误');
			}
		}
	)
}

function show (obj) {
    var addInput = obj;
    var index = $(obj).attr('data-index');
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
        var ele = '<img src="'+this.result+'" width="50" height="50" />'
        // $(obj).siblings('label').html(ele);
      	$('#add-btn'+index).html(ele);
    }
}




















jQuery.extend({
	

    createUploadIframe: function(id, uri)
	{
			//create frame
            var frameId = 'jUploadFrame' + id;
            
            if(window.ActiveXObject) {
                var io = document.createElement('<iframe id="' + frameId + '" name="' + frameId + '" />');
                if(typeof uri== 'boolean'){
                    io.src = 'javascript:false';
                }
                else if(typeof uri== 'string'){
                    io.src = uri;
                }
            }
            else {
                var io = document.createElement('iframe');
                io.id = frameId;
                io.name = frameId;
            }
            io.style.position = 'absolute';
            io.style.top = '-1000px';
            io.style.left = '-1000px';

            document.body.appendChild(io);

            return io			
    },
    createUploadForm: function(id, fileElementId)
	{
		//create form	
		var formId = 'jUploadForm' + id;
		var fileId = 'jUploadFile' + id;
		var form = $('<form  action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data"></form>');	
		var oldElement = fileElementId;
		var newElement = $(oldElement).clone();
		$(oldElement).attr('id', fileId);
		$(oldElement).before(newElement);
		$(oldElement).appendTo(form);
		//set attributes
		$(form).css('position', 'absolute');
		$(form).css('top', '-1200px');
		$(form).css('left', '-1200px');
		$(form).appendTo('body');		
		return form;
    },

    ajaxFileUpload: function(s) {
        // TODO introduce global settings, allowing the client to modify them for all requests, not only timeout		
        s = jQuery.extend({}, jQuery.ajaxSettings, s);
        var id = new Date().getTime()        
		var form = jQuery.createUploadForm(id, s.fileElementId);
		var io = jQuery.createUploadIframe(id, s.secureuri);
		var frameId = 'jUploadFrame' + id;
		var formId = 'jUploadForm' + id;		
        // Watch for a new set of requests
        if ( s.global && ! jQuery.active++ )
		{
			jQuery.event.trigger( "ajaxStart" );
		}            
        var requestDone = false;
        // Create the request object
        var xml = {}   
        if ( s.global )
            jQuery.event.trigger("ajaxSend", [xml, s]);
        // Wait for a response to come back
        var uploadCallback = function(isTimeout)
		{			
			var io = document.getElementById(frameId);
            try 
			{				
				if(io.contentWindow)
				{
					 xml.responseText = io.contentWindow.document.body?io.contentWindow.document.body.innerHTML:null;
                	 xml.responseXML = io.contentWindow.document.XMLDocument?io.contentWindow.document.XMLDocument:io.contentWindow.document;
					 
				}else if(io.contentDocument)
				{
					 xml.responseText = io.contentDocument.document.body?io.contentDocument.document.body.innerHTML:null;
                	xml.responseXML = io.contentDocument.document.XMLDocument?io.contentDocument.document.XMLDocument:io.contentDocument.document;
				}						
            }catch(e)
			{
			}
            if ( xml || isTimeout == "timeout") 
			{				
                requestDone = true;
                var status;
                try {
                    status = isTimeout != "timeout" ? "success" : "error";
                    // Make sure that the request was successful or notmodified
                    if ( status != "error" )
					{
                        // process the data (runs the xml through httpData regardless of callback)
                        var data = jQuery.uploadHttpData( xml, s.dataType );    
                        // If a local callback was specified, fire it and pass it the data
                        if ( s.success ){
                        	s.success( data, status );
                        }
    
                        // Fire the global callback
                        if( s.global )
                            jQuery.event.trigger( "ajaxSuccess", [xml, s] );
                    } else
                        jQuery.handleError(s, xml, status);
                } catch(e) 
				{
                    status = "error";
//                    jQuery.handleError(s, xml, status, e);
                }

                // The request was completed
                if( s.global )
                    jQuery.event.trigger( "ajaxComplete", [xml, s] );

                // Handle the global AJAX counter
                if ( s.global && ! --jQuery.active )
                    jQuery.event.trigger( "ajaxStop" );

                // Process result
                if ( s.complete )
                    s.complete(xml, status);

                jQuery(io).unbind()

                setTimeout(function()
									{	try 
										{
											$(io).remove();
											$(form).remove();	
											
										} catch(e) 
										{
											jQuery.handleError(s, xml, null, e);
										}									

									}, 100)

                xml = null

            }
        }
        // Timeout checker
        if ( s.timeout > 0 ) 
		{
            setTimeout(function(){
                // Check to see if the request is still happening
                if( !requestDone ) uploadCallback( "timeout" );
            }, s.timeout);
        }
        try 
		{
           // var io = $('#' + frameId);
			var form = $('#' + formId);
			$(form).attr('action', s.url);
			$(form).attr('method', 'POST');
			$(form).attr('target', frameId);
            if(form.encoding)
			{
                form.encoding = 'multipart/form-data';				
            }
            else
			{				
                form.enctype = 'multipart/form-data';
            }			
            $(form).submit();

        } catch(e) 
		{			
        	//验证错误 处理模块
//        	alert(s);
//        	alert(xml);
//        	alert(e);
//        	ajaxFileUpload(fileid,limitSize,type);
            //jQuery.handleError(s, xml, null, e);
        }
        if(window.attachEvent){
            document.getElementById(frameId).attachEvent('onload', uploadCallback);
        }
        else{
            document.getElementById(frameId).addEventListener('load', uploadCallback, false);
        } 		
        return {abort: function () {}};	

    },

    uploadHttpData: function( r, type ) {
        var data = !type;
        data = type == "xml" || data ? r.responseXML : r.responseText;
        // If the type is "script", eval it in global context
        if ( type == "script" )
            jQuery.globalEval( data );
        // Get the JavaScript object, if JSON is used.
        if ( type == "json" )
            eval( "data = " + data );
        // evaluate scripts within html
        if ( type == "html" )
            jQuery("<div>").html(data).evalScripts();
			//alert($('param', data).each(function(){alert($(this).attr('value'));}));
        return data;
    }
})

