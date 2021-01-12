function initData(y, m, arr =[]){
    y = ~~y;
    m = ~~m;
    let currentMonthLastDay = new Date(y,m,0).getDate();   // 当前月最后一天
    let lastMonthLastDay = new Date(y,m - 1,0).getDate();   // 上一月月最后一天
    let startDay = new Date(y,m-1,1).getDay();    // 当前月第一天的星期数
    let _arr = [];

    let lastYear = new Date(y, m - 2, 1).getFullYear();  // 上一月的年份
    let lastMonth = new Date(y, m - 2, 1).getMonth() + 1;  // 上一月的月份
    for(let i=1;i <= startDay;i++){
        _arr.push({
            year: lastYear,
            month: lastMonth,
            date: lastMonthLastDay - startDay + i,
            noCurrent: true,
        });
    }
    for(let i=1;i <= currentMonthLastDay; i++ ){
        let _b = false;
        for(let j = 0;j<arr.length;j++){
            if(i == arr[j]){
                _b=true;
                break;
            }
        }
        _arr.push({
            year: y,
            month: m,
            date: i,
            noCurrent: false,
            isSelect: _b,
        });
    }

    let nextYear = new Date(y, m, 1).getFullYear();  // 上一月的年份
    let nextMonth = new Date(y, m, 1).getMonth() + 1;  // 上一月的月份
    let _l=_arr.length % 7;
    if(_l){
        _l = 7 - _l;
        for(let i =1;i<=_l;i++){
            _arr.push({
                year: nextYear,
                month: nextMonth,
                date: i,
                noCurrent: true,
            })
        }
    }
    return _arr;
};