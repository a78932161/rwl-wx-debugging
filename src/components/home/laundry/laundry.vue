<template>
  <div class="laundry" @touchmove.prevent>

    <switches :list="switchList" @switchItem="switchItem"></switches>
    <div ref="scrollContainer" class="scroll-container">
    <scroll ref="scroll">
      <div class="shop-container">
        <ul class="shop-list">
          <li class="shop-item" v-for="item in list">
            <img  v-lazy="item.imgUrl" class="clothes-img" />
            <span class="text" v-text="item.name"></span>
            <span class="price" v-text="price(item.price)"></span>
            <div class="add-shop" @click="addShop(item)">
              <i class="iconfont icon-icon-test"></i>
            </div>
          </li>
        </ul>
      </div>
    </scroll>
    </div>
  </div>
</template>

<script>
  import {mapGetters,mapMutations} from 'vuex';
  import Switches from 'base/switches/switches';
  import Scroll from 'base/scroll/scroll';
  import {shopBarMixin} from 'common/js/mixin'
  import {propEq,copyObj} from 'common/js/array';
  export default {
    data(){
      return {
        switchList: [
          {name: '上衣类', className: 'clothes'},
          {name: '裤裙类', className: 'culottes'},
          {name: '装饰类', className: 'decorate'},
          {name: '皮草类', className: 'overcoat'},
          {name: '鞋包类', className: 'shoes'}
        ],
        list: []
      }
    },
    components: {
      Switches,
      Scroll
    },
    mixins:[shopBarMixin],
    created(){
      let item1 = {
          id:'1',
        name: '单衬衫',
        price: '29.0',
        imgUrl: "https://img.alicdn.com/imgextra/i1/912266212/TB2svPoav5TBuNjSspmXXaDRVXa_!!912266212.jpg_430x430q90.jpg"
      };

      let item2 = {
          id:'2',
        name: '衬衫',
        price: '39.0',
        imgUrl: "https://img.alicdn.com/bao/uploaded/i1/912266212/TB2NAv9hnJYBeNjy1zeXXahzVXa_!!912266212-0-item_pic.jpg_430x430q90.jpg"
      };
      for (let i = 0; i < 30; i++) {
        if(i%2===0){
            this.list.push(item1);
            continue;
        }
        this.list.push(item2);
      }
    },
    computed:{
      ...mapGetters([
          'shopList'
      ])
    },
    methods: {
      handleShopBar(shopList){
          this.$nextTick(()=>{
            let bottom=shopList.length>0?'105px':'';
            this.$refs.scrollContainer.style.bottom=bottom;
            this.$refs.scroll.refresh();
          });
      },
      addShop(obj){   //后续可能还要保存ID，或者用id查询信息
        let shopList=copyObj(this.shopList);  //复制一份进行改动，否则vuex警告
       let index=shopList.findIndex(propEq(obj.id,'id'));
       if(index!==-1){ //商品是否存在，存在数量+1
           shopList[index].number++;
       }
       else{
         let item={
           id:obj.id,
           name:obj.name,
           price:obj.price,
           number:1
         };
         shopList.unshift(item);
       }
        this.setShopList(shopList);
       console.log('addShop')
        console.log(this.shopList)

      },
      switchItem(index){
        console.log('switch:' + index)
      },
      price(price){
        return  `¥ ${price}`
      },
      bgImg(url){
        return `background-image:url(${url})`
      },
      ...mapMutations({
          setShopList:'SET_SHOP_LIST'
      })
    }
  }
</script>


<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .laundry {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background: #fff;
    .scroll-container{
      position: fixed;
      @include px2rem(top,$switches-height);
      bottom: 0;
      .shop-container {
        width: 10rem;
        .shop-list {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          .shop-item {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 33.33%;
            @include px2rem(height, 273);
            border-right: px2rem(3) solid $color-line;
            border-bottom: px2rem(3) solid $color-line;
            &:nth-child(3n) {
              border-right: 0;
            }
            box-sizing: border-box;
            .clothes-img {
              @include px2rem(width, 82);
              @include px2rem(height, 98);
            }
            .text {
              color: $color-text;
              @include font(-2);
              font-weight: 600;
              margin: px2rem(27) 0 px2rem(22) 0;
            }
            .price {
              color: #EE0000;
              @include font(-2);
            }
            .add-shop {
              position: absolute;
              @include px2rem(top, 19);
              @include px2rem(right, 20);
              display: flex;
              justify-content: center;
              align-items: center;
              @include px2rem(width, 51);
              @include px2rem(height, 51);
              border-radius: 50%;
              background: $color-theme;
              i {
                @include font(3);
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
</style>
