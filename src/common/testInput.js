//过滤特殊字符串
export function filter(str) { 
    var pattern=/[`~!@#$^&*()=|{}':;',\\\[\]\.<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？]/g;
    return str.replace(pattern,"");
} 