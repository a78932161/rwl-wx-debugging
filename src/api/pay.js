/**
 * Created by Administrator on 2018/4/23.
 */
import fetch from 'common/js/fetch';


export function findRecharge() {   //获取充值列表
  return fetch({
    url: '/rwlmall/recharge/getall',
    method: 'post'
  })
}


export function orderCreate(url,data) {  //创建购物订单
  return fetch({
    url: `/rwlmall/${url}order/create`,
    method: 'post',
    data
  })
}


export function rechargeCreate(rechargekey) {  //创建充值订单
  return fetch({
    url: '/rwlmall/rechargeorder/create',
    method: 'post',
    params: {
      rechargekey
    }
  })
}

export function payCreate(orderid) {  //创建支付订单
  return fetch({
    url: '/rwlmall/pay/wechatpay',
    method: 'post',
    params: {
      orderid
    }
  })
}

export function payMoney(url,orderid) {  //支付钱款
  return fetch({
    url: `/rwlmall/pay/${url}`,
    method: 'post',
    params: {
      orderid
    }
  })
}


