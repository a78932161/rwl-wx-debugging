/**
 * Created by Administrator on 2018/4/24.
 */

import fetch from 'common/js/fetch';
import {userid} from './config'  //token后删除


export function getCurrentTime(){
  return fetch({
    url:'/rwlmall/statistical/getcurrenttime'
  })
}

export function getUserInfo(){
  return fetch({
    url:'/rwlmall/user/findone',
    method:'post',
    params:{
      userid
    }
  })
}


export function getUserConsumeList(){
  return fetch({
    url:'/rwlmall/user/obtainuserrecord',
    method:'post',
    params:{
      userid
    }
  })
}


export function submitSuggest(content) {
  return fetch({
    url:'rwlmall/feedback/save',
    method:'post',
    params:{
      content
    }
  })
}

export function getCode(phonenumber){
  return fetch({
    url:'rwlmall/verify/getcode',
    method:'post',
    params:{
      phonenumber
    }
  })
}

export function verifyCode(phonenumber,code){
  return fetch({
    url:'rwlmall/verify/verifycode',
    method:'post',
    params:{
      phonenumber,
      code
    }
  })
}

export function changePhone(phonenumber){
  return fetch({
    url:'rwlmall/user/changephone',
    method:'post',
    params:{
      phonenumber
    }
  })
}

