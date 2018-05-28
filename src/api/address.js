/**
 * Created by Administrator on 2018/4/18.
 */
import fetch from 'common/js/fetch';


export function findAddress(){
  return fetch({
    url:'/rwlmall/address/getlist'
  })
}


export function findOneAddress(addressid){
  return fetch({
    url:'/rwlmall/address/findone',
    params:{
      addressid
    }
  })
}


export function updateAddress(addressid,data){
  return fetch({
    url:'/rwlmall/address/update',
    method:'post',
    params:{
      addressid
    },
    data
  })
}



export function removeAddress(addressid){
  return fetch({
    url:'/rwlmall/address/delete',
    method:'post',
    params:{
      addressid
    }
  })
}

export function saveAddress(data){
   return fetch({
     url:'/rwlmall/address/save',
     method:'post',
     data

   })
}

export function setDefaultAddress(addressid){
  return fetch({
    url:'/rwlmall/address/changestatus',
    method:'post',
    params:{
      addressid
    }
  })
}


export function getDefaultAddress(){
  return fetch({
    url:'/rwlmall/address/getdefaultaddress'
  })
}
