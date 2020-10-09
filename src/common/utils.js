    /*
     **  防抖函数,防止短时间调用太多
     */
    export function debounce(func,delay){
        let timer = null;
        return function (...args){
          if(timer)clearTimeout(timer);
          timer = setTimeout(()=>{
            func.apply(this,args)
          },delay);
        }
      }