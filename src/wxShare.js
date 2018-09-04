import router from './router'
import store from './store'
import {baseURL} from 'api/config';


router.beforeEach((to, from, next) => {

  let currentShop=store.getters.currentShop,
    isDetails=to.path.indexOf('commodity')!==-1;

  wx.onMenuShareAppMessage({
    title:isDetails?` ${currentShop.price}元 ${currentShop.name}`:'分享页面', // 分享标题
    imgUrl:isDetails&&currentShop.logo?encodeURI(`${baseURL}${currentShop.logo}`):'', // 分享图标
    link: 'https://rtest.rwlai.com/rwlmall/wechat/authorize?returnUrl='+'https://rtest.rwlai.com'+to.path, // 分享链接，该链接域名必须与当前企业的可信域名一致

  });
  next();
});

