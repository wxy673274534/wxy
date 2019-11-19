!function(){
    let _arr=[20,49,83,73,39,77,58,93],
    _spans=document.querySelectorAll('.lineChart span'),
    _as=document.querySelectorAll('.lineChart a'),
    _is=document.querySelectorAll('.lineChart i');
    _arr.forEach((e,i) => {
        _spans[i].style.height= e+'%';
        _spans[i].setAttribute('title',e);
    });
    _as.forEach((e,i)=>{
        let nextEl=_as[i+1];
        if(!nextEl)return;
        let nextInfo=_fn(nextEl),
        current=_fn(e);
        let _x=nextInfo.t-current.t,
        _y=nextInfo.l-current.l;
        _is[i].style.cssText=`width: ${Math.sqrt(_x*_x+_y*_y)}px;transform: rotate(${Math.atan(_x/_y)}rad);`;
    });
    function _fn(e){
        let _o=e.getBoundingClientRect();
        return {
            t: _o.top,
            l: _o.left,
        }
    }
}();