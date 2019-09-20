let arr=[];
let start=document.getElementById("start");
let staBut=start.getElementsByTagName("button")[0];
let staSpan=start.getElementsByTagName("span")[0];

let startX=0;
let startY=0;
let endX=0;
let endY=0;

//设置百分比宽高，以适应移动端
let docuWidth=window.screen.availWidth;
let container=document.getElementById("container");
let back=document.getElementById("back");
container.style.width=0.92*docuWidth+"px";
back.style.height=0.92*docuWidth+"px";
let xiaoWidth=0.18*docuWidth>100?100:0.18*docuWidth;
let jianju=0.04*docuWidth>20?20:0.04*docuWidth;

//判断游戏是否结束
gameOver=()=>{
	for(let i=0;i<4;i++){
		for(let j=0;j<4;j++){
			if(arr[i][j]==0){
				return;
			}
		}
	}
	alert("游戏结束，请重新开始！");
};

//点击开始
staBut.onclick=()=>{
	staSpan.innerText=0;
	//初始化
	initi();
	//随机开始位置
	random();
	random();
	deleteNode();
	refresh();
};
initi=()=>{
	for(let i=0;i<4;i++){
		arr[i]=[];
		for(let j=0;j<4;j++){
			let under=document.getElementById("under-"+i+"-"+j);
			under.style.top=jianju+(xiaoWidth+jianju)*i+"px";
			under.style.left=jianju+(xiaoWidth+jianju)*j+"px";
			under.style.width=xiaoWidth+"px";
			under.style.height=xiaoWidth+"px";
			arr[i][j]=0;
		};
	} ;
};
random=()=>{
	//随机位置
	let arrX=Math.floor(Math.random()*4);
	let arrY=Math.floor(Math.random()*4);
	//随机数
	let num=Math.random()>0.5?2:4;
	let a=0; 
	while(true){
		if(arr[arrX][arrY]==0){
			break;
		}
		arrX=Math.floor(Math.random()*4);
		arrY=Math.floor(Math.random()*4);
		a++;
		if(a==50){
			for(let i=0;i<4;i++){
				for(let j=0;j<4;j++){
					if(arr[i][j]==0){
						arrX=i;
						arrY=j;
						break;
					}
				}
			}
			break;
		}
	};
	arr[arrX][arrY]=num;
};

//刷新upper的位置
deleteNode=()=>{
	for(let i=0;i<4;i++){
		for(let j=0;j<4;j++){
			let up=document.getElementById("upper-"+i+"-"+j);	
			back.removeChild(up);
		}
	}
}
refresh=()=>{
	for(let i=0;i<4;i++){
		for(let j=0;j<4;j++){
			let upper=document.createElement("div");
			back.appendChild(upper);
			upper.className="upper";
			upper.id="upper-"+i+"-"+j;
			upper.style.top=jianju+(xiaoWidth+jianju)*i+"px";
			upper.style.left=jianju+(xiaoWidth+jianju)*j+"px";
			upper.style.width=xiaoWidth+"px";
			upper.style.height=xiaoWidth+"px";
			upper.style.lineHeight=xiaoWidth+"px";
			upper.innerText=arr[i][j];
			if(arr[i][j]==0){
				upper.style.display="none";
			}else if(arr[i][j]!=0){
				upper.style.backgroundColor=setcolor(arr[i][j]);
				upper.style.display="block";
			}
		};
	};
};
initi();
random();
random();
refresh();

//按键移动
document.onkeydown=(event)=>{
	let e=event || window.event;
	if(e.keyCode==37){ 	//left
		if(!!moveLeft()){
			setTimeout(()=>{
				random();
				deleteNode();
				refresh();
				gameOver();
			},400);
		}
	}else if(e.keyCode==39){  //right
		if(moveRight()){
			setTimeout(()=>{
				random();
				deleteNode();
				refresh();
				gameOver();
			},400);
		}
	}else if(e.keyCode==38){  //top
		if(moveTop()){
			setTimeout(()=>{
				random();
				deleteNode();
				refresh();
				gameOver();
			},400);
		}
	}else if(e.keyCode==40){  //bottom
		if(moveBottom()){
			setTimeout(()=>{
				random();
				deleteNode();
				refresh();
				gameOver();
			},400);
		}
	}
}


//移动端触控移动
document.ontouchstart=(event)=>{
	let e=event || window.event;
	startX=e.touches[0].pageX;
	startY=e.touches[0].pageY;
}
document.ontouchend=(event)=>{
	let e=event || window.event;
	endX=e.changedTouches[0].pageX;
	endY=e.changedTouches[0].pageY; 
	let deltaX=endX-startX;
	let deltaY=endY-startY;
	if(Math.abs(deltaX)>=Math.abs(deltaY)){   //x轴
		if(deltaX>0){				//right
			if(moveRight()){
				setTimeout(()=>{
					random();
					deleteNode();
					refresh();
					gameOver();
				},400);
			}
		}else{                      //left
			if(moveLeft()){          
				setTimeout(()=>{
					random();
					deleteNode();
					refresh();
					gameOver();
				},400);
			}
		}
	}else{                                   //y轴
		if(deltaY>0){				//bottom
			if(moveBottom()){
				setTimeout(()=>{
					random();
					deleteNode();
					refresh();
					gameOver();
				},400);
			}
		}else{                      
			if(moveTop()){            //top
				setTimeout(()=>{
					random();
					deleteNode();
					refresh();
					gameOver();
				},400);
			}
		}
	}
}

//判断是否能移动
//左
canYouMove1=()=>{
	for(let i=0;i<4;i++){
		for(let j=1;j<4;j++){
			if(arr[i][j-1]==0 || arr[i][j-1]==arr[i][j]){
				return true;
			};
		};
	};
	return false;
};
//右
canYouMove2=()=>{
	for(let i=0;i<4;i++){
		for(let j=0;j<3;j++){
			if(arr[i][j+1]==0 || arr[i][j+1]==arr[i][j]){
				return true;
			};
		};
	};
	return false;
};
//上
canYouMove3=()=>{
	for(let i=1;i<4;i++){
		for(let j=0;j<4;j++){
			if(arr[i-1][j]==0 || arr[i-1][j]==arr[i][j]){
				return true;
			};
		};
	};
	return false;
};
//下
canYouMove4=()=>{
	for(let i=0;i<3;i++){
		for(let j=0;j<4;j++){
			if(arr[i+1][j]==0 || arr[i+1][j]==arr[i][j]){
				return true;
			};
		};
	};
	return false;
};
//判断是否有障碍物
//左
obstacle1=(x,y1,y2)=>{
	for(let i=y1+1;i<y2;i++){
		if(arr[x][i]!=0){
			return false;
		};
	};
	return true;
};
//右
obstacle2=(x,y1,y2)=>{
	for(let i=y1-1;i>y2;i--){
		if(arr[x][i]!=0){
			return false;
		};
	};
	return true;
};
//上
obstacle3=(x1,x2,y)=>{
	for(let i=x2+1;i<x1;i++){
		if(arr[i][y]!=0){
			return false;
		};
	};
	return true;
};
//下
obstacle4=(x1,x2,y)=>{
	for(let i=x2-1;i>x1;i--){
		if(arr[i][y]!=0){
			return false;
		};
	};
	return true;
};
//向左移动
moveLeft=()=>{
	if(!canYouMove1()){
		return false;
	};
	for(let i=0;i<4;i++){
		for(let j=1;j<4;j++){
			//判断是谁要移动
			if(arr[i][j]!=0){
				for(let k=0;k<j;k++){
					if(arr[i][k]==0 && obstacle1(i,k,j)){
						moveFnLeft(i,k,j);
						arr[i][k]=arr[i][j];
						arr[i][j]=0;
						continue;
					};
					if(arr[i][k]==arr[i][j] && obstacle1(i,k,j)){
						moveFnLeft(i,k,j);
						arr[i][k]+=arr[i][j];
						staSpan.innerText=parseInt(staSpan.innerText)+arr[i][k];
						arr[i][j]=0;
						continue;
					}
				};
			};
		};
	};
	return true;
};
//向右移动
moveRight=()=>{
	if(!canYouMove2()){
		return false;
	};
	for(let i=0;i<4;i++){
		for(let j=3;j>-1;j--){
			//判断是谁要移动
			if(arr[i][j]!=0){
				for(let k=3;k>j;k--){
					if(arr[i][k]==0 && obstacle2(i,k,j)){
						moveFnLeft(i,k,j);
						arr[i][k]=arr[i][j];
						arr[i][j]=0;
						continue;
					};
					if(arr[i][k]==arr[i][j] && obstacle2(i,k,j)){
						moveFnLeft(i,k,j);
						arr[i][k]+=arr[i][j];
						arr[i][j]=0;
						staSpan.innerText=parseInt(staSpan.innerText)+arr[i][k];
						continue;
					}
				};
			};
		};
	};
	return true;
};
//向上移动
moveTop=()=>{
	if(!canYouMove3()){
		return false;
	};
	for(let i=1;i<4;i++){
		for(let j=0;j<4;j++){
			//判断是谁要移动
			if(arr[i][j]!=0){
				for(let k=0;k<i;k++){
					if(arr[k][j]==0 && obstacle3(i,k,j)){
						moveFnTop(i,k,j);
						arr[k][j]=arr[i][j];
						arr[i][j]=0;
						continue;
					};
					if(arr[k][j]==arr[i][j] && obstacle3(i,k,j)){
						moveFnTop(i,k,j);
						arr[k][j]+=arr[i][j];
						staSpan.innerText=parseInt(staSpan.innerText)+arr[k][j];
						arr[i][j]=0;
						continue;
					}
				};
			};
		};
	};
	return true;
};
//向下移动
moveBottom=()=>{
	if(!canYouMove4()){
		return false;
	};
	for(let i=3;i>-1;i--){
		for(let j=0;j<4;j++){
			//判断是谁要移动
			if(arr[i][j]!=0){
				for(let k=3;k>i;k--){
					if(arr[k][j]==0 && obstacle4(i,k,j)){
						moveFnTop(i,k,j);
						arr[k][j]=arr[i][j];
						arr[i][j]=0;
						continue;
					};
					if(arr[k][j]==arr[i][j] && obstacle4(i,k,j)){
						moveFnTop(i,k,j);
						arr[k][j]+=arr[i][j];
						staSpan.innerText=parseInt(staSpan.innerText)+arr[k][j];
						arr[i][j]=0;
						continue;
					}
				};
			};
		};
	};
	return true;
};

//运动函数
//左右运动
moveFnLeft=(i,k,j)=>{
	let numLeft=jianju+(xiaoWidth+jianju)*j;
	let oDiv=document.getElementById("upper-"+i+"-"+j);
	var time=setInterval(()=>{
		if(k>=j){
			numLeft+=0.1*xiaoWidth;
			if(numLeft>=jianju+(xiaoWidth+jianju)*k){
				numLeft=jianju+(xiaoWidth+jianju)*k
				oDiv.style.left=numLeft+"px";
				clearInterval(time);
			}
		}
		if(k<=j){
			numLeft-=0.1*xiaoWidth;
			if(numLeft<=jianju+(xiaoWidth+jianju)*k){
				numLeft=jianju+(xiaoWidth+jianju)*k
				oDiv.style.left=numLeft+"px";
				clearInterval(time);
			}
		}
		oDiv.style.left=numLeft+"px";
	},10);
};
//上下运动
moveFnTop=(i,k,j)=>{
	let numLeft=jianju+(xiaoWidth+jianju)*i;
	let oDiv=document.getElementById("upper-"+i+"-"+j);
	var time=setInterval(()=>{
		if(k>=i){
			numLeft+=0.1*xiaoWidth;
			if(numLeft>=jianju+(xiaoWidth+jianju)*k){
				numLeft=jianju+(xiaoWidth+jianju)*k
				oDiv.style.top=numLeft+"px";
				clearInterval(time);
			}
		}
		if(k<=i){
			numLeft-=0.1*xiaoWidth;
			if(numLeft<=jianju+(xiaoWidth+jianju)*k){
				numLeft=jianju+(xiaoWidth+jianju)*k
				oDiv.style.top=numLeft+"px";
				clearInterval(time);
			}
		}
		oDiv.style.top=numLeft+"px";
	},10);
};
function setcolor(num){
	switch(num){
		case 2:
			return "#bdb76b";
			break;
		case 4:
			return "#006400";
			break;
		case 8:
			return "#8b008b";
			break;
		case 16:
			return "#556b2f";
			break;
		case 32:
			return "#ff8c00";
			break;
		case 64:
			return "#9932cc";
			break;
		case 128:
			return "#8b0000";
			break;
		case 256:
			return "#e9967a";
			break;
		case 512:
			return "#9400d3";
			break;
		case 1024:
			return "#ff1493";
			break;
		case 2408:
			return "#b22222";
			break;	
	};
};




