/**
 * Created by Administrator on 2018/4/24.
 */

import fetch from 'common/js/fetch';
import {userid} from './config'  //token后删除

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
