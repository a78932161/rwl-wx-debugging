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


export function findOneAddress(addressid){
  return fetch({
    url:'/rwlmall/address/findone',
    params:{
      addressid,
      userid
    }
  })
}


export function updateAddress(addressid,data){
  return fetch({
    url:'/rwlmall/address/update',
    method:'post',
    params:{
      addressid,
      userid
    },
    data
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

export function setDefaultAddress(addressid){
  return fetch({
    url:'/rwlmall/address/changestatus',
    method:'post',
    params:{
      userid,
      addressid
    }
  })
}


export function getDefaultAddress(){
  return fetch({
    url:'/rwlmall/address/getdefaultaddress',
    params:{
      userid
    }
  })
}
