/**
 * Created by Administrator on 2018/4/9.
 */
const getters = {
  currentAddress:state=>state.shop.currentAddress,
  singleList: state => state.shop.singleList,
  laundryList: state => state.shop.laundryList,
  topLaundryList: state => state.shop.topLaundryList,
  furnishList: state => state.shop.furnishList,
  mallList: state => state.shop.mallList,
  currentShop: state => state.shop.currentShop,
  shopBarHeight: state => state.shop.barHeight,
  shopList: state => state.shop.list,
  shopBarState: state => state.shop.barState

};

export default getters;
