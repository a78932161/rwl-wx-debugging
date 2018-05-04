/**
 * Created by Administrator on 2018/4/25.
 */
import fetch from 'common/js/fetch';



export function findLaundryList(category,type){
  return fetch({
    url:'/rwlmall/laundryproduct/findbytypeandcategoryandstatus',
    params:{
      category,
      type,
      status:0,  //status:0 => 上架商品
    }
  })
}

export function findMallList(category,page,size){
  return fetch({
    url:'/rwlmall/mallproduct/findbycategoryandstatus',
    params:{
      category,
      page,
      size,
      status:0,  //status:0 => 上架商品
    }
  })
}



export function findFurnishingList(page,size){
  return fetch({
    url:'/rwlmall/furnitureproduct/findbystatus',
    params:{
      page,
      size,
      status:0  //status:0 => 上架商品
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
