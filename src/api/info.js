/**
 * Created by Administrator on 2018/6/8.
 */
import fetch from 'common/js/fetch';
import {advertisement} from 'api/config';
export function getText(type){
  return fetch({
    url:'/rwlmall/platformtext/findbytype',
    params:{
      type
    }
  })
}


export function getAdvertisement(type){
  return fetch({
    url:'/rwlmall/advertisement/findbytype',
    params:{
      type
    }
  })
}


