/**
 * Created by Administrator on 2018/4/27.
 */
import fetch from 'common/js/fetch';


export function findFinishOrders() {
  return fetch({
    url:'/rwlmall/user/finishorder'
  })
}

export function findConductOrders() {
  return fetch({
    url:'/rwlmall/user/carryonorder'
  })
}

export function finishOrder(url,orderid) {
  return fetch({
    url:`/rwlmall/${url}/finish`,
    params:{
      orderid
    }
  })
}

export function cancelOrder(url,orderid) {
  return fetch({
    url:`/rwlmall/${url}/cancel`,
    params:{
      orderid
    }
  })
}
export function getPostage(){
  return fetch({
    url:'/rwlmall/freightset/get'
  })
}
