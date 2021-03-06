/**
 * Created by Administrator on 2018/4/9.
 */
const getters = {
  cno: state => state.user.cno,
  bindCard: state => state.user.bindCard,
  mPhone: state => state.user.phone,
  binding: state => state.user.binding,
  codeDown: state => state.user.codeDown,
  express: state => state.order.express,
  isFinish: state => state.order.isFinish,
  orderSelectImages: state => state.order.selectImages,
  orderSelectItem: state => state.order.selectItem,
  currentAddress: state => state.shop.currentAddress,
  singleList: state => state.shop.singleList,
  laundryList: state => state.shop.laundryList,
  topLaundryList: state => state.shop.topLaundryList,
  furnishList: state => state.shop.furnishList,
  mallList: state => state.shop.mallList,
  currentShop: state => state.shop.currentShop,
  shopBarHeight: state => state.shop.barHeight,
  shopList: state => state.shop.list,
  shopBarState: state => state.shop.barState,
  shopExpress: state => state.shop.shopExpress,
};

export default getters;
