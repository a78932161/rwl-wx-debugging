/**
 * Created by Administrator on 2018/4/11.
 */
const shop={
 state:{
   currentShop:{},
   barState:false,
   barHeight:0,
   list:[],
   singleList:[],
   laundryList:[],
   topLaundryList:[],
   furnishList:[],
   mallList:[]

 },
  mutations:{
    SET_SINGLE_LIST(state,flag){
      state.singleList=flag;
    },
    SET_LAUNDRY_LIST(state,flag){
      state.laundryList=flag;
    },
    SET_TOP_LAUNDRY_LIST(state,flag){
      state.topLaundryList=flag;
    },
    SET_FURNISH_LIST(state,flag){
      state.furnishList=flag;
    },
    SET_MALL_LIST(state,flag){
      state.mallList=flag;
    },
    SET_CURRENT_SHOP(state,flag){
      state.currentShop=flag;
    },
   SET_BAR_HEIGHT(state,flag){
     state.barHeight=flag;
   },
   SET_SHOP_LIST(state,flag){
     state.list=flag;
   },
    SET_BAR_STATE(state,flag){
     state.barState=flag;
    }
  }
};
export default shop;
