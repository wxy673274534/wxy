(function(){
    const myC=document.getElementById('myCanvas'),
        ct=myC.getContext("2d"),
        winH=myC.clientHeight,
        [but_1,but_2]=document.getElementsByClassName('controlBut'),
        _bezierInfo=document.getElementsByClassName('info')[0].getElementsByTagName('p')[0];
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
        _bezierInfo.innerText=`cubic-bezier(${_fn(_c1[0]/300)},${_fn(-((_c1[1] - _but1_y)/300))},${_fn(_c2[0]/300)},${_fn((_c2[1] - _but2_y)/300)})`;
        function _fn(n){
            return Number(n.toFixed(2));
        }
    }
})();