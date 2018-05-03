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


export function findFurnishingList(page,size){
  return fetch({
    url:'/rwlmall/furnitureproduct/findbystatus',
    params:{
      status:0,  //status:0 => 上架商品
      page,
      size
    }
  })
}


export function findOneProduct(url,productid){
 return fetch({
   url:`/rwlmall/${url}product/findone`,
   params:{
     productid
   }
 })
}
