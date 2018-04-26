/**
 * Created by Administrator on 2018/4/13.
 */
import {propEq, copyObj} from './array';

export function isShopAdd(list,obj){
  let shopList = copyObj(list);  //复制一份进行改动，否则vuex警告
  let index = shopList.findIndex(propEq(obj.id, 'id'));
  if (index !== -1) { //商品是否存在，存在数量+1
    shopList[index].number++;
  }
  else {
    let item = {
      id: obj.id,
      name: obj.name,
      price: obj.price/100,
      number: 1
    };
    shopList.unshift(item);
  }
  return shopList;
}


export function changeShopNumber(list,number,id){
  let shopList = copyObj(list);
  let index = shopList.findIndex(propEq(id, 'id'));  //index一定存在，因为此时只展示已存在的list
  shopList[index].number = number;
  if (number === 0) {
    shopList.splice(index, 1);
  }
  return shopList;
}


export function debounce(func,delay){
  let timer;
  return ()=>{
    if(timer){
      clearTimeout(timer);
    }
    timer=setTimeout(()=>{
      func.apply(this,args);
    },delay)
  }
}

export function wxPay(data,callback){  //调用微信付款
  WeixinJSBridge.invoke(
    'getBrandWCPayRequest', {
      "appId": data.appId,
      "timeStamp": data.timeStamp,
      "nonceStr": data.nonceStr,
      "package": data.package,
      "signType": data.signType,
      "paySign": data.paySign
    },
    function(res){// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
      if (res.err_msg == "get_brand_wcpay_request:ok") {
       callback&&callback();
      }
    }
  );
}
