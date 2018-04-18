/**
 * Created by Administrator on 2018/4/18.
 */
import fetch from 'common/js/fetch';

import {userid} from './config'  //token后删除

export function findAddress(){
  return fetch({
    url:'/rwlmall/address/getlist',
    params:{
      userid
    }
  })
}

export function removeAddress(addressid){
  return fetch({
    url:'/rwlmall/address/delete',
    method:'post',
    params:{
      userid,
      addressid
    }
  })
}

export function saveAddress(data){
   return fetch({
     url:'/rwlmall/address/save',
     method:'post',
     params:{
       userid
     },
     data

   })
}


