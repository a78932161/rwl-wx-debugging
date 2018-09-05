/**
 * Created by Administrator on 2018/4/18.
 */


export const ERR_OK = 0;
export const ADDRESS_DEFAULT = 0;
export const baseURL = 'https://image.rwlai.com/';//修改为图片地址
export const payType = {
  laundry: 1,
  topLaundry: 2
};

export const idType = {
  laundry: 'A03', //洗衣订单
  old:'A07',//老订单
  mall: 'A10',   //商城订单
  furniture:'A13' //家居订单
};

export const shopDetailType={
  laundry: 'A01',
  mall: 'A09',
  furniture:'A12'
};

export const platformText={
  problem:1,  //常见问题
  about:2,//关于小让
  joinIn:3,//加盟小让
  userProtocol:4,//用户协议
  accede:5//加入小让
};

export const advertisement={
  homePage:0,   //首页广告位
  mall:1       //商城广告位
};
