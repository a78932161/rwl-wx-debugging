/**
 * Created by Administrator on 2018/4/27.
 */
import fetch from 'common/js/fetch';

import {userid} from './config'  //token后删除

export function findFinishOrders() {
  return fetch({
    url:'/rwlmall/user/finishorder',
    params:{
      userid
    }

  })
}

export function findConductOrders() {
  return fetch({
    url:'/rwlmall/user/carryonorder',
    params:{
      userid
    }
  })
}
