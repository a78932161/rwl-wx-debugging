/**
 * Created by Administrator on 2018/4/12.
 */

export function copyObj(obj){
  return JSON.parse(JSON.stringify(obj));
}
export function propEq(val,prop){
  return (obj)=>{
    let key=prop?obj[prop]:obj;
          return obj&&val===key;
  }
}

export function split(val){
   val=val||'';
  return val.split(/，|,/);
}
