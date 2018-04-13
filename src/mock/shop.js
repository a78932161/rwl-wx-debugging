/**
 * Created by Administrator on 2018/4/13.
 */
let item1 = {
  id:'1',
  name: '单衬衫',
  price: '29.0',
  stock:2030,
  imgUrl: "https://img.alicdn.com/imgextra/i1/912266212/TB2svPoav5TBuNjSspmXXaDRVXa_!!912266212.jpg_430x430q90.jpg"
};

let item2 = {
  id:'2',
  name: '衬衫',
  price: '39.0',
  stock:3020,
  imgUrl: "https://img.alicdn.com/bao/uploaded/i1/912266212/TB2NAv9hnJYBeNjy1zeXXahzVXa_!!912266212-0-item_pic.jpg_430x430q90.jpg"
};

let list=[];
for (let i = 0; i < 46; i++) {
  if(i%2===0){
    list.push(item1);
    continue;
  }
  list.push(item2);
}

export default list;
