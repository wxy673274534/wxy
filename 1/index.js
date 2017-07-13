window.onload=function(){
	
	//addEvent兼容
	var addEvent=document.addEventListener?
        function(elem,type,listener,useCapture){
    	    elem.addEventListener(type,listener,useCapture);
        }:
        function(elem,type,listener,useCapture){
    	    elem.attachEvent('on'+type,listener,useCapture);
        };
	//getElementsByClassName兼容
	//用getclass是，要加个下标，不然会用BUG，下面的reg_img就是这个原因
	//用getclass获取的节点不能用insertBefore
	function getclass(name){
		var tags =document.getElementsByTagName('*'); 
		var resultArr = [];
		for(var i = 0;  i < tags.length; i++){
			var tempArr = tags[i].className.split(' '); 
			for( var j = 0; j < tempArr.length; j++ ){
				if(tempArr[j] == name){
					resultArr [ resultArr.length ]= tags[i];
				};
			};
		};
		return resultArr;
	};
	
	
	//模拟数据
	var simUser={"wxy":[{"user":"wxy"},{"pass":"123asd"}]};
		
//下拉菜单
	var opc=document.getElementById('pc');
	var PCul=opc.getElementsByTagName('ul')[0];
	opc.onmouseover=function(){
		PCul.style.display= 'block';
	};
	opc.onmouseout=function(){
		PCul.style.display='none';
	};
		
		
//弹出登录框
	var sign1=getclass('sign')[1];
	var sign2=getclass('sign')[2];
	var login=document.getElementById('login-box');
	var guanbi=login.getElementsByTagName('img')[0];
	var zhezhao=document.getElementById('zhezhao');
	var login_but=document.getElementById('login-but');
	var login_input=getclass('lb-input');
	var iogin_text=document.getElementById('iogin-text');
	//居中
	function toponleft(elem,t,l){
		if((innerHeight-t)/2<=0){
			elem.style.top=0;
			elem.style.left=(innerWidth-l)/2+"px";
		}else{
			elem.style.top=(innerHeight-t)/2+"px";
			elem.style.left=(innerWidth-l)/2+"px";
		};
	};
	/* 
    浏览器窗口大小改变是触发
	window.onresize=function(){
		toponleft();
	}; 
	*/
	addEvent(sign1,'click',function() {
		toponleft(login,250,350);
		login.style.display="block";
		zhezhao.style.display="block";
	});
	addEvent(guanbi,'click',function(){
		login.style.display="none";
		zhezhao.style.display="none";
	});
	addEvent(login_but,"click",function(){
		if(login_input[0].value==simUser.wxy[0].user && login_input[1].value==simUser.wxy[1].pass){
			loading.style.display="block";
			toponleft(loading,40,200);
			loading_p.innerHTML="正在登录。。。"
			login_but.style.backgroundPosition="right";
			login_but.disabled = true;
			setTimeout(function(){
				toponleft(success,40,200);
				loading.style.display="none";
				login.style.display="none";
				success.style.display="block";
				success_p.innerHTML="登录成功！";
				setTimeout(function(){
					zhezhao.style.display="none";
					login_but.style.backgroundPosition="left";
					login_but.disabled = false;
					success.style.display="none";
					sign0.style.display="none";
					sign1.style.display="none";
					sign2.innerHTML="欢迎您 !"+login_input[0].value;
					opc.style.display='block';
				},1500);
			},3000);
		}else{
			iogin_text.style.display="block";
			iogin_text.innerHTML="登录失败! ";
		};
	});
	
	
//注册表单
	var sign0=getclass('sign')[0];
	var reg=document.getElementById('reg');
	var h2=reg.getElementsByTagName('h2')[0];
	var dd=getclass('text');
	//这里有个BUG，用getclass获取到的reg_img触发不了事件，用addEvent还会报错
	var reg_img=reg.getElementsByTagName('img')[0];
	//点击弹出表单
	addEvent(sign0,'click',function(){
		toponleft(reg,600,550);
		reg.style.display="block";
		zhezhao.style.display="block";
	});
	addEvent(reg_img,'click',function(){
		reg.style.display="none";
		zhezhao.style.display="none";
	});
//表单验证
	//用户名验证
	var info_user=getclass('info_user')[0];
	var error_user=getclass('error_user')[0];
	var succ_user=getclass('succ_user')[0];
	var user_loading=getclass('loading')[0];
	addEvent(dd[0],'focus',function(){
		if(dd[0].value==''){
			info_user.style.display="block";
			error_user.style.display="none";
			succ_user.style.display="none";
		}
	});
	addEvent(dd[0],'blur',function(){
		if(!check_user() || dd[0].value==''){
			info_user.style.display="none";
			error_user.style.display="block";
			succ_user.style.display="none";
		}else{
			user_loading.style.display="block";
			info_user.style.display="none";
			error_user.style.display="none";
			succ_user.style.display="none";
			setTimeout(function(){
				user_loading.style.display="none";
				if(dd[0].value==simUser.wxy[0].user){
					error_user.style.display="block";
					error_user.innerHTML="用户名重复，请重新输入";
				}else{
					succ_user.style.display="block";
				}
			},3000);
		};
	});
	function check_user(){
		if(/[\w]{2,20}/.test(dd[0].value) &&  dd[0].value.length<20){
			return true;
		}else{
			return false;
		};
	};
	//密码验证
	var info_pass=getclass('info_pass')[0];
	var s1=getclass('s1')[0]; var s2=getclass('s2')[0]; var s3=getclass('s3')[0]; var s4=getclass('s4')[0];
	var q1=getclass('q1')[0]; var q2=getclass('q2')[0]; var q3=getclass('q3')[0];
	var error_pass=getclass('error_pass')[0];
	var succ_pass=getclass('succ_pass')[0];
	addEvent(dd[1],'focus',function(){
		//当user_loading显示时，info_pass延迟显示
		var userLoadingTim=setInterval(function(){
			if(user_loading.style.display=="block"){
				info_pass.style.display="none";
				error_pass.style.display="none";
				succ_pass.style.display="none";
			}else{
				if(dd[1].value==''){
					setTimeout(function(){
						info_pass.style.display="block";
						error_pass.style.display="none";
						succ_pass.style.display="none";
					},700);
				};
				clearInterval(userLoadingTim);
			};
		},500);
		
	});
	addEvent(dd[1],'blur',function(){
		info_pass.style.display="none";
		if(check_pass()){
			info_pass.style.display="none";
			error_pass.style.display="none";
			succ_pass.style.display="block";
		}else{
			info_pass.style.display="none";
			error_pass.style.display="block";
			succ_pass.style.display="none";
		};
	});
	//密码强度验证
	addEvent(dd[1],'keyup',function(event){
		if(dd[1].value==''){
			info_pass.style.display="block";
			error_pass.style.display="none";
			succ_pass.style.display="none";
		};
		check_pass();
	});
	function check_pass(){
		var code_length = 0;
		//第一的条件验证
		if(dd[1].value.length>=6 && dd[1].value.length<=20){
			q1.innerHTML="●"; 
			q1.style.color="green";
		}else{
			q1.innerHTML="○";
			q1.style.color="#666";
		};
		//第二的条件验证
		if(dd[1].value.length>0 && !/\s/.test(dd[1].value)){
			q2.innerHTML="●"; 
			q2.style.color="green";
		}else{
			q2.innerHTML="○";
			q2.style.color="#666";
		};
		//第三的条件验证,大写字母，小写字母，数字，非空字符 任意两种混拼即可
		if (/[\d]/.test(dd[1].value)) {
			code_length++;
		};
		if (/[a-z]/.test(dd[1].value)) {
			code_length++;
		};
		if (/[A-Z]/.test(dd[1].value)) {
			code_length++;
		};
		if (/[^\w]/.test(dd[1].value)) {
			code_length++;
		};
		if(code_length>=2){
			q3.innerHTML="●"; 
			q3.style.color="green";
		}else{
			q3.innerHTML="○";
			q3.style.color="#666";
		};
		//安全级别
		if(dd[1].value.length>=10 && code_length>=3){
			s3.style.color="green";
			s4.innerHTML="高";
			s4.style.color="green";
		}else if(dd[1].value.length>=8 && code_length>=2){
			s2.style.color="#f60";
			s4.innerHTML="中";
			s4.style.color="#f60";
		}else if(dd[1].value.length>=1){
			s1.style.color="maroon";
			s4.innerHTML="低";
			s4.style.color="maroon";
		}else{
			s1.style.color="#ccc";
			s2.style.color="#ccc";
			s3.style.color="#ccc";
			s4.innerHTML="";
		};
		if(dd[1].value.length>=6 && dd[1].value.length<=20 && !/\s/.test(dd[1].value) && code_length>=2){
			return true;
		}else{
			return false;
		};
	};
	//密码确认验证
	var info_notpass=getclass('info_notpass')[0];
	var error_notpass=getclass('error_notpass')[0];
	var succ_notpass=getclass('succ_notpass')[0];
	addEvent(dd[2],'focus',function(){
		if(dd[2].value==''){
			info_notpass.style.display="block";
			error_notpass.style.display="none";
			succ_notpass.style.display="none";
		};
	});
	addEvent(dd[2],'blur',check_notpass);
	function check_notpass(){
		 if(dd[2].value==dd[1].value && dd[2].value!=''){
			info_notpass.style.display="none";
			error_notpass.style.display="none";
			succ_notpass.style.display="block";
			return true;
		}else{
			info_notpass.style.display="none";
			error_notpass.style.display="block";
			succ_notpass.style.display="none";
			return false;
		};
	};
	addEvent(dd[2],'keyup',function(){
		if(dd[2].value==''){
			info_notpass.style.display="block";
			error_notpass.style.display="none";
			succ_notpass.style.display="none";
		};
	});
	//提问验证
	var ques=getclass('ques')[0];
	var error_ques=getclass('error_ques')[0];
	addEvent(ques,'change',function () {
		if (check_ques()){
			error_ques.style.display='none';
		};
	});
	function check_ques(){
		if(ques.value!=0){
			error_ques.style.display="none";
			return true;
		}else{
			error_ques.style.display="block";
			return false;
		};
	};
	//回答验证
	var info_ans=getclass('info_ans')[0];
	var error_ans=getclass('error_ans')[0];
	var succ_ans=getclass('succ_ans')[0];
	addEvent(dd[3],'focus',function(){
		if(dd[3].value==''){
			info_ans.style.display="block";
			error_ans.style.display="none";
			succ_ans.style.display="none";
		}
	});
	addEvent(dd[3],'keyup',check_ans);
	function check_ans(){
		if(dd[3].value.length>=2 && dd[3].value.length<=20){
			info_ans.style.display="none";
			error_ans.style.display="none";
			succ_ans.style.display="block";
			return true;
		}else {
			info_ans.style.display="none";
			error_ans.style.display="block";
			succ_ans.style.display="none";
			return false;
		};
	};
	addEvent(dd[3],'blur',check_ans);
	//电子邮件验证
	var info_email=getclass('info_email')[0];
	var error_email=getclass('error_email')[0];
	var succ_email=getclass('succ_email')[0];
	var all_email=getclass('all_email')[0];
	var all_li=all_email.getElementsByTagName('li');
	addEvent(dd[4],'focus',function(){
		if(dd[4].value==''){
			info_email.style.display="block";
			error_email.style.display="none";
			succ_email.style.display="none";
		};
	});
	addEvent(dd[4],'blur',function(){
	//键盘和鼠标补全时触发blur事件，如果马上隐藏会出现错误
		check_email();
		setTimeout(function(){
			all_email.style.display="none";
		},200);
	});
	function check_email(){
		//all_email.style.display="none";
		if(/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(dd[4].value)){
			info_email.style.display="none";
			error_email.style.display="none";
			succ_email.style.display="block";
			return true;
		}else{
			info_email.style.display="none";
			error_email.style.display="block";
			succ_email.style.display="none";
			return false;
		};
	};
	//电子邮件补全,鼠标补全
	var a=0;
	addEvent(dd[4],'keyup',function(event){
		var event=event||window;
		if(this.value.indexOf('@')==-1 ){
			all_email.style.display="block";
			for(var i=0; i<all_li.length; i++){
				all_li[i].index=i;
				all_li[i].onmouseover=function(){
					a=this.index;
					for(var j=0;j<all_li.length;j++){
						all_li[j].style.backgroundColor="white";
						all_li[j].style.color="#666";
					};
					this.style.backgroundColor="#e5edf2";
					this.style.color="#369";
				};
				all_li[i].onclick=function(){
					var li_text=this.innerHTML.replace('<span></span>','');
					var email_value=dd[4].value;
					dd[4].value=email_value+li_text;
					all_email.style.display="none";
					check_email();
				};
			};
		}else{
			all_email.style.display="none";
		};
	//键盘补全
		if(event.keyCode==40){
			if(a>=4 || a==null){
				a=0;
			}else{
				a++;
			}
			for(var i=0;i<all_li.length;i++){
				all_li[i].style.backgroundColor="white";
				all_li[i].style.color="#666";
			};
			all_li[a].style.backgroundColor="#e5edf2";
			all_li[a].style.color="#369";
			console.log(a);
		};
		if(event.keyCode==38){
			if(a<=0 || a==null){
				a=4;
			}else{
				a--;
			};
			for(var i=0;i<all_li.length;i++){
				all_li[i].style.backgroundColor="white";
				all_li[i].style.color="#666";
			};
			all_li[a].style.backgroundColor="#e5edf2";
			all_li[a].style.color="#369";
		};
		if(event.keyCode==13){
			if(dd[4].value.indexOf('@')!=-1) return;
			var li_text=all_li[a].innerHTML.replace('<span></span>','');
			var email_value=dd[4].value;
			dd[4].value=email_value+li_text;
			all_email.style.display="none";
			check_email();
		};
	});
	//生日验证
	var error_birthday=getclass('error_birthday')[0];
	var year=getclass('year')[0];
	var month=getclass('month')[0];
	var day=getclass('day')[0];
	var day30=[4,6,9,11];
	var day31=[1,3,5,7,8,10,12];
	//注入年
	for(var i=1970;i<2018;i++){
		year.add(new Option(i, i), undefined);
	};
	//注入月
	for(var i=1;i<13;i++){
		month.add(new Option(i, i), undefined);
	};
	//注入日的函数
	function inArray(string,array){
		for(var i=0;i<array.length;i++){
			var thisEntry=array[i].toString();
			if(string==thisEntry){
				return true;
			};
		}
		return false;
	};
	function check_day(){
		if(year.value != 0 && month.value != 0){
			var cur_day=0;
			day.options.length=1;
			if(inArray(month.value,day30)){
				cur_day=30;
			}else if(inArray(month.value,day31)){
				cur_day=31;
			}else{
				if((parseInt(year.value) % 4 == 0 && parseInt(year.value) % 100 != 0) || parseInt(year.value) % 400 == 0){
					cur_day=29;
				}else{
					cur_day=29;
				};
			};
			for(var i=0;i<=cur_day;i++){
				day.add(new Option(i, i), undefined);
			};
		};
	};
	addEvent(month,'change',check_day);
	//关闭提交时没填生日的提示
	addEvent(day,'change',function () {
		if (check_birthday()){
			error_birthday.style.display='none';
		};
	});
	function check_birthday() {
		if (year.value!= 0 && month.value != 0 && day.value != 0) return true;
	};
	//备注验证
	var ps=getclass('ps');
	var num=getclass('num');
	var clear=getclass('clear')[0];
	addEvent(dd[5],'keyup',check_ps)
    //粘贴事件
	addEvent(dd[5],'paste',function () {
		//粘贴事件会在内容粘贴到文本框之前触发
		setTimeout(check_ps, 50);
	});
	function check_ps(){
		var value_difference=200-dd[5].value.length;
		if(value_difference>=0){
			ps[0].style.display="block";
			ps[1].style.display="none";
			num[0].innerHTML=value_difference;
			return true;
		}else{
			num[1].innerHTML=Math.abs(value_difference);
			ps[1].style.display="block";
			ps[0].style.display="none";
			ps[1].style.color="red";
			return false;
		};
	};
	//清尾
	addEvent(clear,'click',function(){
		dd[5].value=dd[5].value.substring(0,200);
		check_ps();
	});
	//提交验证
	var sub=getclass('submit')[0];
	var loading=document.getElementById('loading');
	var loading_p=loading.getElementsByTagName('p')[0];
	var success=document.getElementById('success');
	var success_p=success.getElementsByTagName('p')[0];
	addEvent(sub,'click',function(){
		var flag=true;
		if(!check_user()){
			error_user.style.display="block";
			flag=false;
		};
		if(!check_pass()){
			error_pass.style.display="block";
			flag=false;
		};
		if(!check_notpass()){
			error_notpass.style.display="block";
			flag=false;
		};
		if(!check_ques()){
			error_ques.style.display="block";
			flag=false;
		};
		if(!check_ans()){
			error_ans.style.display="block";
			flag=false;
		};
		if(!check_email()){
			error_email.style.display="block";
			flag=false;
		};
		if(!check_birthday()){
			error_birthday.style.display="block";
			flag=false;
		};
		if(!check_ps()){
			flag=false;
		};
		if(flag){
			//注册成功
			loading.style.display="block";
			toponleft(loading,40,200);
			loading_p.innerHTML="正在提交注册中。。。"
			sub.style.backgroundPosition="right";
			sub.disabled = true;
			setTimeout(function(){
				toponleft(success,40,200);
				loading.style.display="none";
				reg.style.display="none";
				success.style.display="block";
				success_p.innerHTML="注册成功，请登录！";
				setTimeout(function(){
					zhezhao.style.display="none";
					sub.style.backgroundPosition="left";
					sub.disabled = false;
					success.style.display="none";
				},1500);
			},3000);
		};
	});
	
	
//拖拽
    var hsan=login.getElementsByTagName('h3')[0];
	var clientX,clientY,client_X,client_Y,z;
	//鼠标按下时记录鼠标当前的位置
	var press=function(event){
		var event=event||window.event;
		clientX=event.clientX;
		clientY=event.clientY;
		//把z设置成一个开关
		z=true;
	};
	//计算鼠标移动的距离，让登录框login也移动相同的距离
	var move=function(event){
		//z为true时执行下面的代码，为false时不执行
		if(!z) return;
		var event=event||window.event;
		client_X=event.clientX;
		client_Y=event.clientY;
		var x=clientX-client_X;
		var y=clientY-client_Y;
		var left=login.offsetLeft;
		var top=login.offsetTop;
		//鼠标超出浏览器窗口停止执行代码
		if(event.clientY<0){
			z=false;
		};
		//限制拖拽范围为浏览器窗口
		if(left<0){
			left=0;
		}else if(left>innerWidth-350){
			left=innerWidth-350;
		};
		if(top<0){
			top=0;
		}else if(top>innerHeight-250){
			top=innerHeight-250;
		};
		login.style.left=(left-x)+'px';
		login.style.top=(top-y)+'px';
		clientX=client_X;
		clientY=client_Y;
	};
	var rel=function(){
		z=false;
	};
	addEvent(hsan,'mousedown',press);
	addEvent(document,'mousemove',move);
	addEvent(login,'mouseup',rel);
	
	
//百度分享侧栏
	var baidu=document.getElementById('baidu');
	var oli=baidu.getElementsByTagName('li');
	var dS_right=null;
	var dS_left=null;
	function isMouseLeaveOrEnter(e, handler) {    
		var reltg=e.relatedTarget?e.relatedTarget:e.type=='mouseout'?e.toElement:e.fromElement;    
		while (reltg && reltg != handler){
			reltg = reltg.parentNode; 
		};
		return (reltg != handler);    
	};
	baidu.onmouseover=function(event){
		var e=event||window.event;
        if (!isMouseLeaveOrEnter(e, baidu)) {
			return false;
        };
		var left=-211;
		clearInterval(dS_left);
		dS_right=setInterval(function(){
			baidu.style.left=left+'px';
			left+=10;
			if(left>=0){
				clearInterval(dS_right);
				baidu.style.left=0+'px';
			};
		}, 20);
	};
	baidu.onmouseout=function(event){
		var e=event||window.event; 
		 if (!isMouseLeaveOrEnter(e, baidu)) {
			return false;
		 };
		 var left2=0;
		clearInterval(dS_right);
		dS_left=setInterval(function(){
			baidu.style.left=left2-10+'px';
			left2-=10;
			if(left2<=-211){
				clearInterval(dS_left);
				baidu.style.left=-211+'px';
			};
		}, 20);
	};
	
	
//滑动导航
	var about=getclass('about')[0];
	var about_li=about.getElementsByTagName('li');
	var white=getclass('white')[0];
	var nav_bg=getclass('nav_bg')[0];
	var left=null;
	var white_left=0;
	var bg_left=0;
	var bg_dsq=null;
	var bg_dsq2=null;
	for(var i=0; i<about_li.length; i++){
		    //给每个about下的li加个自定义属性，方便选中
			about_li[i].index=i;
			about_li[i].onmouseover=function(){
				left=85*this.index;
			};
		};
	//这里不直接在for循环里面用about_li[i].onmouseover事件
	//是因为鼠标在li之间移动时会不断触发onmouseover事件，导致定时器混乱，形成错误
	about.onmouseover=function(){
		clearInterval(bg_dsq2);
		bg_dsq=setInterval(function(){
			if(bg_left>=85*4+20){
				clearInterval(bg_dsq);
				nav_bg.style.left=left+20+'px';
				bg_left=left;
			}else if(bg_left<left){
				nav_bg.style.left=bg_left+20+'px';
				bg_left+=5;
			}else if(bg_left>left){
				nav_bg.style.left=bg_left+20+'px';
				bg_left-=5;
			}else if(bg_left==left){
				nav_bg.style.left=bg_left+20+'px';
				clearInterval(bg_dsq);
				////obj.style.left是获取不到值的，所以用 ||0  ，后面给obj.style.left赋值了才能获取
				var white_style=Math.abs(parseInt(white.style.left))||0;
				//黑色按钮移动到目标点后，上层的white再运动
				//外面的if是判断white向左还是向右运动
				if(white_style<left){
					var white_dsq=setInterval(function (){
						if(white_left>=left){
							clearInterval(white_dsq);
							white.style.left=(-left)+'px';
							white_left=left;
						}else {
							white.style.left=(-white_left)+'px';
							white_left+=30;
						};
					},10);
				}else if(white_style>left){
					var white_dsq=setInterval(function (){
						if(white_left<=left){
							clearInterval(white_dsq);
							white.style.left=(-left)+'px';
							white_left=left;
						}else {
							white.style.left=(-white_left)+'px';
							white_left-=30;
						};
					},10);
				}
			};
		},30);
		
	};
	about.onmouseout=function(){
		clearInterval(bg_dsq);
		bg_dsq2=setInterval(function(){
			if(bg_left<=0){
				clearInterval(bg_dsq2);
				nav_bg.style.left=20+'px';
				bg_left=0;
				//黑色按钮移动到目标点后，上层的white再运动
				if(nav_bg.style.left==20+'px'){
					var white_dsq=setInterval(function (){
							if(white_left<=0){
								clearInterval(white_dsq);
								white.style.left=0+'px';
								white_left=0;
							}else {
								white.style.left=(-white_left)+'px';
								white_left-=30;
							};
					},10);
				};
			}else{
				nav_bg.style.left=bg_left+20+'px';
				bg_left-=5;
			};
		},30);
		
	};
	
	
//菜单切换
	var sidebar=document.getElementById('sidebar');
	var sidebar_h2=sidebar.getElementsByTagName('h2');
	var sidebar_ul=sidebar.getElementsByTagName('ul');
	
	for(var i=0; i<sidebar_h2.length; i++){
		//添加一个自定义属性，以便选取
		sidebar_h2[i].index=i;
		//创建一个计数器数组，每个sidebar_h2分配一个，以防计数器混乱
		var count=[0,0,0];
		sidebar_h2[i].onclick=function(){
			var _this=this;
			//用计数器判断sidebar_h2向下运动还是向上运动
			if(count[this.index]%2==0){
				var ul_heigth=150;
				var ul_dsq=setInterval(function(){
					ul_heigth-=10;
					if(ul_heigth<=0){
						clearInterval(ul_dsq);
						sidebar_ul[_this.index].style.height=0+'px';
					};
					sidebar_ul[_this.index].style.height=ul_heigth+'px';
				},50);
				count[this.index]++;
			}else if(count[this.index]%2==1){
				var ul_heigth=0;
				var ul_dsq=setInterval(function(){
					ul_heigth+=10;
					if(ul_heigth>=150){
						clearInterval(ul_dsq);
						sidebar_ul[_this.index].style.height=150+'px';
					};
					sidebar_ul[_this.index].style.height=ul_heigth+'px';
				},50);
				count[this.index]++;
			};
		};
	};
	
	
//轮播图
	var banner=document.getElementById('banner');
	var banner_img=banner.getElementsByTagName('img');
	var banner_span=banner.getElementsByTagName('span');
	var banner_strong=banner.getElementsByTagName('strong')[0];
	//计数器
	//从0开始会原地执行一次，影响体验
	//所以从1开始
	var banner_coun=1;
	//初始化
	banner_strong.innerHTML=banner_img[0].alt;
	//手动轮播
	function empty(){
		for(var j=0;j<banner_span.length;j++){
			banner_span[j].className="";
			banner_img[j].className="";
			banner_strong.innerHTML="";
		};
		
	};
	function selected(num){
		banner_span[num].className="sele";
		banner_img[num].className="sele";
		banner_strong.innerHTML=banner_img[num].alt;
	}
	for(var i=0;i<banner_span.length;i++){
		banner_span[i].index=i;
		banner_span[i].onmouseover=function(){
			clearInterval(banner_timer);
			empty();
			banner_coun=this.index;
			selected(this.index);
			fadeIn(this.index);
			fadeOut(this.index);
		};
		banner_span[i].onmouseout=function(){
			banner_timer=setInterval(function(){
			if(banner_coun==banner_span.length){
				banner_coun=0;
			};
			empty();
			selected(banner_coun);
			fadeIn(banner_coun);
			fadeOut(banner_coun);
			banner_coun++;
			},2000);
		};
	};
	//自动切换
	var banner_timer=setInterval(function(){
		if(banner_coun==banner_span.length){
			banner_coun=0;
		};
		empty();
		selected(banner_coun);
		fadeIn(banner_coun);
		fadeOut(banner_coun);
		banner_coun++;
	},2000);
	//淡入淡出函数
	function fadeIn(num){
		var speed=0;
		var fadeIn_timer=setInterval(function(){
			banner_img[num].style.opacity=speed;
			speed=speed+0.1;
			if(speed>1){
				clearInterval(fadeIn_timer);
			};
		},30);
	};
	function fadeOut(num){
		if(num==0){
			num=2;
		}else{
			num=num-1;
		}
		var speed=1;
		var fadeOut_timer=setInterval(function(){
			banner_img[num].style.opacity=speed;
			speed=speed-0.1;
			if(speed<0){
				clearInterval(fadeOut_timer);
			};
		},30);
	};
	
	
	//发文
	var pc_fw=getclass('pc-fw')[0];
	var blog=document.getElementById('blog');
	var blog_img=blog.getElementsByTagName('img')[0];
	var blog_info=getclass('blog_info')[0];
	var blog_title=getclass('title')[0];
	var blog_con=getclass('content')[0];
	var blog_sub=getclass('blog-submit')[0];
	//弹出发文框
	addEvent(pc_fw,'click',function(){
		toponleft(blog,320,580);
		blog.style.display="block";
		zhezhao.style.display="block";
	});
	addEvent(blog_img,'click',function(){
		blog.style.display="none";
		zhezhao.style.display="none";
	});
	//发文
	addEvent(blog_sub,'click',function(){
		if(blog_title.value.length>0 && blog_con.value.length>0){
			loading.style.display="block";
			toponleft(loading,40,200);
			loading_p.innerHTML="正在发表"
			blog_sub.style.backgroundPosition="right";
			blog_sub.disabled = true;
			setTimeout(function(){
				toponleft(success,40,200);
				loading.style.display="none";
				blog.style.display="none";
				success.style.display="block";
				success_p.innerHTML="发表成功！";
				setTimeout(function(){
					zhezhao.style.display="none";
					blog_sub.style.backgroundPosition="left";
					blog_sub.disabled = false;
					success.style.display="none";
					//发文内容
					var index=document.getElementById('index');
					var index_con=index.getElementsByTagName('div');
					var index_div=document.createElement('div');
					index.insertBefore(index_div,index_con[0]);
					index_div.className="content";
					var con_h2=document.createElement('h2');
					con_h2.innerHTML=blog_title.value;
					index_div.appendChild(con_h2);
					var con_p=document.createElement('p');
					con_p.innerHTML=blog_con.value;
					index_div.appendChild(con_p);
					//超出显示滚动条
					index.style.overflowY='auto';
				},1500);
			},3000);
		}else{
			blog_info.innerHTML="发表失败！标题或内容不能为空";
		};
	})
	
	
	
	
	
};










