/**
 * Created by Administrator on 2018/6/8.
 */
import fetch from 'common/js/fetch';
export function getText(type){
  return fetch({
    url:'/rwlmall/platformtext/findbytype',
    params:{
      type
    }
  })
}


export function getAdvertisement(){
  return fetch({
    url:'/rwlmall/advertisement/findbytype',
    params:{
      type:0
    }
  })
}


