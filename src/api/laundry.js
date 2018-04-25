/**
 * Created by Administrator on 2018/4/25.
 */
import fetch from 'common/js/fetch';



export function findLaundryList(category){
  return fetch({
    url:'/rwlmall/laundryproduct/findbytypeandcategoryandstatus',
    params:{
      category,
      type:1,   //type:1 => 普通洗护
      status:0,  //status:0 => 上架商品
    }
  })
}
