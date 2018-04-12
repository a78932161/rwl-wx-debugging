/**
 * Created by Administrator on 2018/4/11.
 */
const shop={
 state:{
   barState:false,
   list:[]
 },
  mutations:{
   SET_SHOP_LIST(state,flag){
     state.list=flag;
   },
    SET_BAR_STATE(state,flag){
     state.barState=flag;
    }
  }
};
export default shop;
