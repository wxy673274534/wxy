function Base(){};
//var $=new Base();
function $(){
	return new Base();
};
//用class获取元素
Base.prototype.getClass=function(name){
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
//用ID获取元素
Base.prototype.getId=function(id){
	return document.getElementById(id);
};
//用tagname获取元素
Base.prototype.getTag=function(fu,tag){
	return fu.getElementsByTagName(tag);
};
//清空className
Base.prototype.emptyClass=function(elem){
	for(var i=0;i<elem.length;i++){
		elem[i].className="";
	};
};
//事件
Base.prototype.addEvent=document.addEventListener?
    function(elem,type,listener,useCapture){
    	elem.addEventListener(type,listener,useCapture);
    }:
     function(elem,type,listener,useCapture){
    	elem.attachEvent('on'+type,listener,useCapture);
    };

	
/* 顶部下拉菜单 */
for(var i=0;i<$().getClass('pullDown').length;i++){
	$().getClass('pullDown')[i].index=i;
	var a=$().getTag($().getId("xiala"),'div');
	var _this=null;
	$().addEvent($().getClass('pullDown')[i],'mouseover',function(){
		_this=this;
		a[_this.index].style.display="block";
		$().getId("xiala").style.left=this.offsetLeft+2+"px";
		$().addEvent($().getId("xiala"),'mouseover',function(){
			a[_this.index].style.display="block";
		});
	});
	$().addEvent($().getClass('pullDown')[i],'mouseout',function(){
		_this=this;
		a[_this.index].style.display="none";
		$().addEvent($().getId("xiala"),'mouseout',function(){
			a[_this.index].style.display="none";
		});
	});
};


/* 主题市场 */
for(var i=0;i<$().getTag($().getId("m-classification"),"li").length;i++){
	$().getTag($().getId("m-classification"),"li")[i].index=i;
	var _this=null;
	$().addEvent($().getTag($().getId("m-classification"),"li")[i],'mouseover',function(){
		_this=this;
		_this.style.backgroundColor="#dc143c";
		$().getId("ztxiala").style.display="block";
		var lia=$().getTag(_this,"a");
		for(var j=0;j<$().getClass("ztxlbiaoti").length;j++){
			$().getClass("ztxlbiaoti")[j].innerText=lia[j].innerText;
			for(var k=0;k<$().getClass('xla').length;k++)
				if(_this.index%2==0){
					$().getTag($().getClass('xla')[k],"img")[0].src="img/女装.jpg";
					$().getTag($().getClass('xla')[k],"a")[0].innerText="夏季连衣裙女2017"
				}else{
					$().getTag($().getClass('xla')[k],"img")[0].src="img/拖鞋.jpg";
					$().getTag($().getClass('xla')[k],"a")[0].innerText="凉鞋女夏2017新款"
				};
		};
		$().addEvent($().getId("ztxiala"),'mouseover',function(){
			this.style.display="block";
		});
	});
	$().addEvent($().getTag($().getId("m-classification"),"li")[i],'mouseout',function(){
		_this=this;
		_this.style.backgroundColor="#ff4200";
		$().getId("ztxiala").style.display="none";
		$().addEvent($().getId("ztxiala"),'mouseout',function(){
			this.style.display="none";
		});
	});
};


/* 选择搜索框 */
for(var i=0;i<$().getTag($().getId("seaBady"),"li").length;i++){
	var bacolor='#c60000';
	$().getTag($().getId("seaBady"),"li")[i].index=i;
	$().addEvent($().getTag($().getId("seaBady"),"li")[i],'click',function(){
		var _this=this;
		$().emptyClass($().getTag($().getId("seaBady"),"li"));
		_this.className="seasz";
		$().getTag($().getId('seaInput'),'input')[0].style.borderColor="#ff4200";
		$().getTag($().getId('seaInput'),'button')[0].style.backgroundColor="#ff4200";
		if(_this.index==1){
			_this.className="seasz1";
			$().getTag($().getId('seaInput'),'input')[0].style.borderColor="#c60000";
			$().getTag($().getId('seaInput'),'button')[0].style.backgroundColor="#c60000";
		};
	});
};


/* 轮播 */
Base.prototype.carouselmotion=function(num){
	clearInterval(carTime);
	if(parseInt($().getId('carContainer').style.left)<=-4680){
		$().getId('carContainer').style.left=-2080+"px";
	}
	if(parseInt($().getId('carContainer').style.left)>=0){
		$().getId('carContainer').style.left=-2600+"px";
	}
	var carLeft=$().getId('carContainer').offsetLeft;
	var carTime=setInterval(function(){
		$().getId('carContainer').style.left=carLeft+"px";
		if(0-(520*num)<=carLeft){
			carLeft-=30;
			if(carLeft<=0-(520*num)){
				carLeft=0-(520*num);
				$().getId('carContainer').style.left=carLeft+"px";
				clearInterval(carTime);
			};
		}else{
			carLeft+=30;
			if(carLeft>=0-(520*num)){
				carLeft=0-(520*num);
				$().getId('carContainer').style.left=carLeft+"px";
				clearInterval(carTime);
			};
		};
	},10);
};
$().addEvent($().getId("m-carousel"),"mouseover",function(){
	for(var i=0;i<$().getClass("jt").length;i++){
		$().getClass("jt")[i].style.display="block";
	};
});
$().addEvent($().getId("m-carousel"),"mouseout",function(){
	for(var i=0;i<$().getClass("jt").length;i++){
		$().getClass("jt")[i].style.display="none";
	};
});
//计数
var count=5;
//点击圆点
for(var i=0;i<$().getTag($().getId("ass"),"span").length;i++){
	$().getTag($().getId("ass"),"span")[i].index=i+5;
	$().addEvent($().getTag($().getId("ass"),"span")[i],"click",function(){
		$().emptyClass($().getTag($().getId("ass"),"span"));
		this.className="sz";
		$().carouselmotion(this.index);
		count=this.index;
	});
};
//点击箭头
Base.prototype.judgeClass=function(num){
	if(num>4){
		$().getTag($().getId("ass"),"span")[num-5].className="sz";
	}else{
		$().getTag($().getId("ass"),"span")[num].className="sz";
	};
};
$().addEvent($().getClass("jtLeft")[0],"click",function(){
	count--;
	if(count==-1){
		count=4;
	};
	$().emptyClass($().getTag($().getId("ass"),"span"));
	$().judgeClass(count);
	$().carouselmotion(count);
});
$().addEvent($().getClass("jtRight")[0],"click",function(){
	count++;
	if(count==10){
		count=5;
	};
	$().emptyClass($().getTag($().getId("ass"),"span"));
	$().judgeClass(count);
	$().carouselmotion(count);
});
//自动
var carAutomatic=setInterval(function(){
	count++;
	if(count==10){
		count=5;
	};
	$().emptyClass($().getTag($().getId("ass"),"span"));
	$().judgeClass(count);
	$().carouselmotion(count);
},3000); 
//移入停止
$().addEvent($().getId("m-carousel"),"mouseover",function(){
	clearInterval(carAutomatic);
});
$().addEvent($().getId("m-carousel"),"mouseout",function(){
	carAutomatic=setInterval(function(){
		count++;
		if(count==10){
			count=5;
		};
		$().emptyClass($().getTag($().getId("ass"),"span"));
		$().judgeClass(count);
		$().carouselmotion(count);
	},3000);
});


/* 顶部搜索框 */
$().addEvent($().getTag($().getClass("seaInput")[1],"ul")[0],"mouseover",function(){
	$().getTag($().getClass("seaInput")[1],"ul")[0].style.height=102+"px";
})
$().addEvent($().getTag($().getClass("seaInput")[1],"ul")[0],"mouseout",function(){
	$().getTag($().getClass("seaInput")[1],"ul")[0].style.height=34+"px";
})
var seaspan=$().getTag($().getClass("seaInput")[1],"span");
for(var i=0;i<seaspan.length;i++){
	$().getClass("seali")[i].index=i;
	$().addEvent($().getClass("seali")[i],"click",function(){
		var litext=seaspan[this.index].innerText;
		seaspan[this.index].innerText=seaspan[0].innerText;
		seaspan[0].innerText=litext;
	})
}
$().addEvent(window,"scroll",function(){
	var t=document.documentElement.scrollTop || document.body.scrollTop;
	if(t>=210){
		$().getId("topSearchBox").style.display="block";
	}else{
		$().getId("topSearchBox").style.display="none";
	};
	if(t>=549){
		$().getId("maodian").style.position="fixed";
		$().getId("maodian").style.top=49+"px";
	}else{
		$().getId("maodian").style.position="absolute";
		$().getId("maodian").style.top=600+"px";
	};
});

