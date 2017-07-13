//兼容getElementsByClassName
function getclass(name){
	var tags =document.getElementsByTagName('*'); 
	var resultArr = [];  
		for(var i = 0;  i < tags.length; i++){
			var tempArr = tags[i].className.split(' '); 
			for( var j = 0; j < tempArr.length; j++ ){
				if(tempArr[j] ==  name){
				resultArr [ resultArr.length ]= tags[i];
				};
			};
		};
	return resultArr;
};

//事件注册
var addEvent=document.addEventListener?
    function(elem,type,listener,useCapture){
    	elem.addEventListener(type,listener,useCapture);
    }:
     function(elem,type,listener,useCapture){
    	elem.attachEvent('on'+type,listener,useCapture);
    };
	

//关闭顶部通知条
var topNot=document.getElementById("g-topNot");
var noRemind=getclass("m-noRemind")[0];
addEvent(noRemind,'click',function(){
	topNot.style.display="none";
});


//点击关注，弹出登录框
var follow=getclass("m-follow")[0];
var login=document.getElementById("g-login");
var mask=document.getElementById("g-mask");
	//登录框居中
function elemCenter(elem,width,height){
			elem.style.left=Math.floor((innerWidth-width)/2)+"px";
		if((innerHeight-height)/2<=0){
			elem.style.top=0;
		}else{
			elem.style.top=Math.floor((innerHeight-height)/2)+"px";
		};
};
addEvent(follow,'click',function(){
	elemCenter(login,350,260);
	login.style.display="block";
	mask.style.display="block";
});
//关闭登录框和遮罩
var cha=login.getElementsByTagName("img")[0];
var userpass=login.getElementsByTagName("input");
addEvent(cha,'click',function(){
	login.style.display="none";
	mask.style.display="none";
});
//验证账号密码
var loginKey=login.getElementsByTagName("button")[0];
addEvent(loginKey,'click',function(){
	if(userpass[0].value.length<20 && userpass[0].value.length>6 && userpass[1].value.length<20 && userpass[1].value.length>6){
		follow.style.backgroundColor="#f3f3f3";
		follow.innerHTML="已关注 | <a href=\"#\">取消</a>";
		follow.style.width="85px"
		login.style.display="none";
		mask.style.display="none";
		follow.disabled = true;
	}else{
		alert("账号或密码错误");
	}
})


//轮播
var carousel=document.getElementById("g-carousel");
var carImg=carousel.getElementsByTagName("img");
var carSpan=carousel.getElementsByTagName("span");
carImg[0].style.opacity="1";
//点击切换
var count=0;
carTimer=null;
function initial(elem){
	for(var j=0;j<elem.length;j++){
		elem[j].className="";
	};
};
for(var i=0;i<carSpan.length;i++){
	carSpan[i].index=i;
	addEvent(carSpan[i],"click",function(){
		clearInterval(carTimer);
		initial(carSpan);
		this.className="m-sel";
		displayHidden(this.index,count);
		count=this.index;
	})
}
//淡入淡出
function displayHidden(num,num2){
	var tra1=parseFloat(carImg[num].style.opacity)||0;
	var tra2=parseFloat(carImg[num2].style.opacity)||1;
	carTimer=setInterval(function(){
		carImg[num].style.opacity=tra1;
		tra1+=0.1;
		carImg[num2].style.opacity=tra2;
		tra2-=0.1;
		if(carImg[num].style.opacity>=1 && carImg[num2].style.opacity<=0){
			clearInterval(carTimer);
			carImg[num].style.opacity=1;
			carImg[num2].style.opacity=0;
		}
	},50);
}
//自动切换
var carAutoTime=setInterval(function(){
	count++;
	if(count==carSpan.length){
		count=0;
	};
	initial(carSpan);
	carSpan[count].className="m-sel";
	displayHidden(count,count-1<0?2:count-1);
},5000);
//鼠标移入暂停自动切换
addEvent(carousel,"mouseover",function(){
	clearInterval(carAutoTime);
});
 addEvent(carousel,"mouseout",function(){
	carAutoTime=setInterval(function(){
	count++;
	if(count==carSpan.length){
		count=0;
	};
	initial(carSpan);
	carSpan[count].className="m-sel";
	displayHidden(count,count-1<0?2:count-1);
	},5000);
})


//工作环境滚动
var wor=document.getElementById("g-workEnv");
var workEnv=getclass("m-workEnv")[0];
var worLeft=parseInt(workEnv.style.left)||0;
var worAutoTime=setInterval(function(){
	workEnv.style.left=worLeft+"px";
	worLeft-=10;
	if(workEnv.offsetLeft<=-1616){
		workEnv.style.left=0+"px";
		worLeft=0;
	};
},100);
//鼠标移入停止
addEvent(wor,"mouseover",function(){
	clearInterval(worAutoTime);
});
addEvent(wor,"mouseout",function(){
	worAutoTime=setInterval(function(){
		workEnv.style.left=worLeft-10+"px";
		worLeft-=10;
		if(workEnv.offsetLeft<=-1616){
			workEnv.style.left=0+"px";
			worLeft=0;
		};
	},100);
})



//tad
var proList=getclass("m-proList")[0];
var proListDiv=proList.getElementsByTagName("div");
//鼠标移入标题变色函数
function overout(elem,type,color){
	addEvent(elem,type,function(){
		var proH4=this.getElementsByTagName("h4")[0];
		proH4.style.color=color;
	});
}
//tad左边的数据处理函数
function tabAjax(url){
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			if(xhr.status>=200 && xhr.status<300 || xhr.status==304){
				var jsData=JSON.parse(xhr.responseText);
				proJson=jsData;
				for(var i=0;i<proListDiv.length;i++){
					var oimg=proListDiv[i].getElementsByTagName('img')[0];
					var oh4=proListDiv[i].getElementsByTagName('h4')[0];
					var op0=proListDiv[i].getElementsByTagName('p')[0];
					var op1=proListDiv[i].getElementsByTagName('p')[1];
					var ostr=proListDiv[i].getElementsByTagName('strong')[0];
					oimg.src=jsData.list[i].bigPhotoUrl;
					oimg.style.width=223+"px";
					oimg.style.height=124+"px";
					oh4.innerText=jsData.list[i].name;
					overout(proListDiv[i],"mouseover","#39a030");
					overout(proListDiv[i],"mouseout","#333");
					op0.innerText=jsData.list[i].provider;
					op1.innerText=jsData.list[i].learnerCount;
					ostr.innerText="￥"+jsData.list[i].price+".00";
				};
			};
		};
	}; 
	xhr.open('get',url,true);
	xhr.send(null);
};
//点击切换列表
//url请求数据参数函数
function Url(pageNo,type){
	return "https://study.163.com/webDev/couresByCategory.htm?pageNo="+pageNo+"&psize=20&type="+type;
};
	//初始化
tabAjax(Url(1,10));
//切换类型
var tabBut=getclass("m-tab")[0];
var obut=tabBut.getElementsByTagName("button");
var a=10;
var b=0;
for(var i=0;i<obut.length;i++){
	obut[i].index=i;
	addEvent(obut[i],"click",function(){
		initial(obut);
		this.className="m-tabsel";
		a=(this.index+1)*10;
		tabAjax(Url(b+1,a));
	});
};
//切换列表
var pager=getclass("m-pager")[0];
var pagA=pager.getElementsByTagName("a");
for(var i=0;i<pagA.length;i++){
	pagA[i].index=i;
	addEvent(pagA[i],"click",function(){
		initial(pagA);
		b=this.index;
		this.className="m-pagersel";
		tabAjax(Url(b+1,a));
	});
};
var pagbut=pager.getElementsByTagName("button");
addEvent(pagbut[0],"click",function(){
	initial(pagA);
	if(b-1<0){
		b=1;
	}else{
		b=b-1;
	}
	pagA[b].className="m-pagersel";
	tabAjax(Url(b+1,a));
});
addEvent(pagbut[1],"click",function(){
	initial(pagA);
	if(b+1>1){
		b=0;
	}else{
		b=b+1;
	}
	pagA[b].className="m-pagersel";
	tabAjax(Url(b+1,a));
});


//tad右边的数据处理函数
var mHotList=getclass("m-hotList")[0];
var hotList=getclass("hotList")[0];
var hotListDiv=hotList.getElementsByTagName("div");
function tabRight(){
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			if(xhr.status>=200 && xhr.status<300 || xhr.status==304){
				var jsData=JSON.parse(xhr.responseText);
				for(var i=0;i<hotListDiv.length;i++){
					var oimg=hotListDiv[i].getElementsByTagName('img')[0];
					var oh4=hotListDiv[i].getElementsByTagName('h4')[0];
					var op=hotListDiv[i].getElementsByTagName('p')[0];
					oimg.src=jsData[i].bigPhotoUrl;
					oimg.style.width=50+"px";
					oimg.style.height=50+"px";
					oh4.innerText=jsData[i].name;
					op.innerText=jsData[i].learnerCount;
				};
			};
		};
	}; 
	xhr.open('get',"https://study.163.com/webDev/hotcouresByCategory.htm",true);
	xhr.send(null);
};
tabRight();
var hotListTop=parseInt(hotList.style.top) || 0;
var hotTime=setInterval(function(){
	hotList.style.top=hotListTop+"px";
	hotListTop-=1;
	if(hotListTop<=-715){
		hotListTop=0;
	}
},100);
addEvent(mHotList,"mouseover",function(){
	clearInterval(hotTime);
});
addEvent(mHotList,"mouseout",function(){
	hotTime=setInterval(function(){
		hotList.style.top=hotListTop+"px";
		hotListTop-=1;
		if(hotListTop<=-715){
			hotListTop=0;
		}
	},100);
})

//鼠标移入显示详细信息
var detailed=document.getElementById("g-detailed");
var information=getclass("information")[0];
var introduce=getclass("introduce")[0];
var proJson=null;
for(var i=0; i<proListDiv.length;i++){
	proListDiv[i].index=i;
	addEvent(proListDiv[i],"mouseover",function(){
		var _this=this;
		detailed.style.top=_this.offsetTop+"px";
		detailed.style.left=_this.offsetLeft+240+"px";
		detailed.style.display="block";
		var infimg=information.getElementsByTagName("img")[0];
		var infh3=information.getElementsByTagName("h3")[0];
		var infp0=information.getElementsByTagName("p")[0];
		var infp1=information.getElementsByTagName("p")[1];
		var infp2=information.getElementsByTagName("p")[2];
		var intp=introduce.getElementsByTagName("p")[0];
		infimg.src=proJson.list[_this.index].bigPhotoUrl;
		infh3.innerText=proJson.list[_this.index].name;
		infp0.innerText=proJson.list[_this.index].learnerCount+"人在学";
		infp1.innerText="发布者："+proJson.list[_this.index].provider;
		infp2.innerText="分类："+proJson.list[_this.index].categoryName;
		intp.innerText=proJson.list[_this.index].description;
	})
	addEvent(proListDiv[i],"mouseout",function(){
		detailed.style.display="none";
	})
}



























































