(function(){
    const myC=document.getElementById('myCanvas'),
        ct=myC.getContext("2d"),
        winH=myC.clientHeight,
        [but_1,but_2]=document.getElementsByClassName('controlBut'),
        _bezierInfo=document.getElementsByClassName('info')[0].getElementsByTagName('span')[0];
        _but1_y = winH/2 + 150,
        _but2_y = winH/2 -150,
        _q=[0 , _but1_y],
        _c1=[..._q],
        _z=[300 , _but2_y],
        _c2=[..._z];

    (function init(){
        myC.width=300;
        myC.height=winH;
        but_1.style.top = winH/2 + 240 + 'px';
        but_2.style.top = winH/2 - 60 + 'px';
        but_1.onmousedown=but_2.onmousedown=function(e){
            this._switch=true;
        };
        document.onmousemove=function(event){
            let e = event || window.event;
            if(but_1._switch){
                _move([0,_but1_y],e,_c1,but_1);
            }else if(but_2._switch){
                _move([300,_but2_y],e,_c2,but_2);
            }
        };
        document.onmouseup=function(){
            but_1._switch=but_2._switch=false;
        };
        _bezierInfo.nextElementSibling.onclick=function(){
            window.getSelection().selectAllChildren(_bezierInfo);
            document.execCommand ("Copy");
        }
        _initControl();
        _painting();
    })();

    function _painting(){
        ct.clearRect(0,0,300,winH);
        // 辅助线
        ct.strokeStyle="#999";
        ct.lineWidth=1;
        ct.beginPath();
        ct.moveTo(..._q);
        ct.lineTo(..._c1);
        ct.moveTo(..._z);
        ct.lineTo(..._c2);
        ct.stroke();
        // 曲线
        ct.strokeStyle="#36d187";
        ct.lineWidth=2;
        ct.beginPath();
        ct.moveTo(..._q);
        ct.bezierCurveTo(..._c1,..._c2,..._z);
        ct.stroke();
    }
    function _move(arr,e,c,l){
        if(!l._switch)return;
        let _x = e.clientX - 100,
        _y = e.clientY - 100;
        _x > 300 ? _x = 300 : (_x < 0 ? _x = 0 : false);
        _y > winH ? _y = winH : (_y < 0 ? _y = 0 : false);
        l.style.setProperty('--coordinate',`translate(${-(arr[0] - _x)}px,${-(arr[1] -_y)}px)`);
        c[0]= _x;
        c[1]= _y;
        _painting();
        _countBezier();
    }
    function _countBezier(){
        _bezierInfo.innerText=`cubic-bezier(${_fn(_c1[0]/300)},${_fn(-((_c1[1] - _but1_y)/300))},${_fn(_c2[0]/300)},${_fn((_but1_y - _c2[1])/300)})`;
        function _fn(n){
            return Number(n.toFixed(2));
        }
    }
    function _initControl(){
        let arr=[
            [0,0,1,1],
            [0.25, 0.1, 0.25, 1],
            [0.42, 0, 1, 1],
            [0, 0, 0.58, 1],
            [0.42, 0, 0.58, 1],
        ],_e=document.getElementsByClassName('list')[0].getElementsByTagName('canvas'),
        _ct,_item,_oDiv=document.getElementsByClassName('controlGroup')[0],
        _startBut=_oDiv.getElementsByTagName('button')[0],
        _direcbut=document.getElementsByClassName('control')[0].getElementsByTagName('button'),
        _input=document.getElementById('animTime'),_span;
        _oDiv=_oDiv.getElementsByTagName('div')[0];
        _span=_oDiv.getElementsByTagName('span');
        for(let i=0;i<arr.length;i++){
            _e[i].height=_e[i].width=120;
            _item=arr[i];
            _item[0]=_item[0]*100 + 10;
            _item[2]=_item[2]*100 + 10;
            _item[1]=(1 - _item[1])*100 + 10;
            _item[3]=(1 - _item[3])*100 + 10;

            _ct=_e[i].getContext("2d");
            // 辅助线
            _ct.strokeStyle="#fff";
            _ct.lineWidth=2;
            _ct.beginPath();
            _ct.moveTo(10,110);
            _ct.lineTo(_item[0],_item[1]);
            _ct.moveTo(110,10);
            _ct.lineTo(_item[2],_item[3]);
            _ct.stroke();
            // 曲线
            _ct.beginPath();
            _ct.moveTo(10,110);
            _ct.bezierCurveTo(..._item,110,10);
            _ct.stroke();
            //圆点
            _ct.fillStyle="#fff";
            _ct.beginPath();
            _ct.arc(_item[0],_item[1],4,0,2*Math.PI);
            _ct.fill();
            _ct.beginPath();
            _ct.arc(_item[2],_item[3],4,0,2*Math.PI);
            _ct.fill();

            _e[i].onclick=function(){
                for(let k=0;k<_e.length;k++){
                    if(_e[k].className==="select"){
                        _e[k].className='';
                        break;
                    }
                }
                this.className="select";
                _span[1].style.transitionTimingFunction=this.nextElementSibling.innerText;
            }
        }

        _startBut.onclick=function(){
            let _r=/(\sanim|anim)/;
            for(let i=0;i<2;i++){
                _span[i].style.transitionDuration=_input.value + 's';
            }
            _span[0].style.transitionTimingFunction=_bezierInfo.innerText;
            if(_r.test(_oDiv.className)){
                _oDiv.className= _oDiv.className.replace(_r,'');
            }else{
                _oDiv.className+=' anim';
            }
        }

        _direcbut[0].onclick=function(){
            if(/(\sbt|bt)/.test(_oDiv.className)){
                _oDiv.className= _oDiv.className.replace(/(\sbt|bt)/,'');
                _oDiv.className+=' lr';
            }
        }
        _direcbut[1].onclick=function(){
            if(/(\slr|lr)/.test(_oDiv.className)){
                _oDiv.className= _oDiv.className.replace(/(\slr|lr)/,'');
                _oDiv.className+=' bt';
            }
        }
    }
})();