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
