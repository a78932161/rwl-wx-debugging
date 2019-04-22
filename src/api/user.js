/**
 * Created by Administrator on 2018/4/24.
 */

import fetch from 'common/js/fetch';


export function getCurrentTime() {
  return fetch({
    url: '/rwlmall/statistical/getcurrenttime'
  })
}

export function getUserInfo() {
  return fetch({
    url: '/rwlmall/user/findone',
    method: 'post'
  })
}

export function getUserConsumeList() {
  return fetch({
    url: '/rwlmall/user/obtainuserrecord',
    method: 'post'
  })
}

export function submitSuggest(content, phone) {
  return fetch({
    url: 'rwlmall/feedback/save',
    method: 'post',
    params: {
      content,
      phone
    }
  })
}

export function getCode(phonenumber) {
  return fetch({
    url: 'rwlmall/verify/getcode',
    method: 'post',
    params: {
      phonenumber
    }
  })
}

export function verifyCode(phonenumber, code) {
  return fetch({
    url: 'rwlmall/verify/verifycode',
    method: 'post',
    params: {
      phonenumber,
      code
    }
  })
}

export function changePhone(phonenumber) {
  return fetch({
    url: 'rwlmall/user/changephone',
    method: 'post',
    params: {
      phonenumber
    }
  })
}

export function bindingCard(phone, cno, code) {
  return fetch({
    url: 'rwlmall/user/bindingcard',
    method: 'post',
    params: {
      phone,
      cno,
      code
    }
  })
}

export function getSdk(url) {
  return fetch({
    url: 'rwlmall/wechat/jsapisignature',
    params: {
      url
    }
  })
}

export function getShopExpress(key) {
  return fetch({
    url: 'rwlmall/freightset/findbykey',
    method: 'post',
    params: {
      key
    }
  })
}

export function getCardBalance(key) {
  return fetch({
    url: 'rwlmall/user/findbalancebycno',
    method: 'post',
    params: key
  })
}
