/**
 * Created by Administrator on 2018/4/23.
 */
import fetch from 'common/js/fetch';


export function findRecharge(){   //获取充值列表
  return fetch({
    url:'/rwlmall/recharge/getall',
    method:'post'
  })
}


export function rechargeCreate(rechargekey){  //创建充值订单
  return fetch({
    url:'/rwlmall/rechargeorder/create',
    method:'post',
    params:{
      rechargekey
    }
  })
}

export function payCreate(orderid){  //创建支付订单
  return fetch({
    url:'/rwlmall/pay/create',
    method:'post',
    params:{
      orderid
    }
  })
}
