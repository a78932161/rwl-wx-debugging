<template>
  <div class="laundry" @touchmove.prevent>

    <switches :list="switchList" @switchItem="switchItem"></switches>

    <loading v-show="load"></loading>


    <no-result class="zh-center"
               v-show="!list.length>0&&!load"
               title="商品正在赶来的路上..."
    ></no-result>
    <div ref="scrollContainer" class="scroll-container">
      <scroll ref="scroll" :data="list">
        <div class="shop-container">
          <ul class="shop-list">
            <li class="shop-item" @click="addShop(item)" v-for="item in list" v-if="item.stock!==0">
              <img v-lazy="imgUrl(item.logo)" class="clothes-img"/>
              <span class="text" v-text="item.name"></span>
              <span class="price" v-text="price(item.price)"></span>
            <!--  <div class="add-shop">
                <i class="iconfont icon-icon-test"></i>
              </div>-->
            </li>
          </ul>
        </div>
      </scroll>
    </div>

  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';
  import NoResult from 'base/no-result/no-result';
  import Switches from 'base/switches/switches';
  import Scroll from 'base/scroll/scroll';
  import {shopBarMixin} from 'common/js/mixin'
  import {isShopAdd} from 'common/js/util';
  import {findLaundryList} from 'api/shopList'
  import {ERR_OK,baseURL,payType} from 'api/config';
  export default {
    data(){
      return {
        load:true,
        switchVal:0,
        switchList: [
          {name: '上衣类', className: 'clothes'},
          {name: '裤裙类', className: 'culottes'},
          {name: '皮草类', className: 'overcoat'},
          {name: '装饰类', className: 'decorate'},
          {name: '鞋包类', className: 'shoes'}
        ],
        list: []
      }
    },
    components: {
      Switches,
      Scroll,
      NoResult
    },
    mixins: [shopBarMixin],
    created(){
        if(this.$route.query.top){   //top值存在，则为高端洗护
           this.type=payType.topLaundry;
           this.setShopList(this.topLaundryList);
          this._findLaundryList(this.switchVal);
        }
        else{
          this.type=payType.laundry;
          this.setShopList(this.laundryList);
          this._findLaundryList(this.switchVal);
        }
    },
    computed: {
      ...mapGetters([
        'shopList',
        'shopBarHeight',
        'laundryList',
        'topLaundryList'
      ])
    },
    methods: {
      _findLaundryList(category){
        findLaundryList(category,this.type).then((ops)=>{
          if(ops.code===ERR_OK){
            this.load=false;
            this.list = ops.data;
          }
        });
      },
      handleShopBar(shopList){
        this.$nextTick(() => {
          let tip=46; //邮费tip的高度
          let bottom = shopList.length > 0 ? `${this.shopBarHeight+tip}px` : '';
          this.$refs.scrollContainer.style.bottom = bottom;
          this.$refs.scroll.refresh();
        });
      },
      addShop(obj){   //后续可能还要保存ID，或者用id查询信息
        let shopList=isShopAdd(this.shopList,obj);

        this.setShopList(shopList);
        if(this.$route.query.top){//top值存在，则为高端洗护
            this.setTopLaundryList(shopList);
            return ;
        }
        this.setLaundryList(shopList);
      },
      switchItem(index){
          this.switchVal=index;
        console.log('switch:' + index)
      },
      price(price){
        return `¥ ${price/100}`
      },
      imgUrl(url){
          return url!=null?`${baseURL}/${url}`:'';
      },
      bgImg(url){
        return `background-image:url(${url})`
      },
      ...mapMutations({
        setShopList: 'SET_SHOP_LIST',
        setLaundryList:'SET_LAUNDRY_LIST',
        setTopLaundryList:'SET_TOP_LAUNDRY_LIST'
      })
    },
    watch:{
      switchVal(newVal){
        this._findLaundryList(newVal);
        this.$refs.scroll.scrollTo(0, 0);  //switch变化时，滚动条到顶部
      }
    }
  }
</script>


<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .laundry {
    z-index: 10;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    .scroll-container {
      position: fixed;
      @include px2rem(top, $switches-height);
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
            @include px2rem(height,273);
            border-right: px2rem(3) solid $color-line;
            border-bottom: px2rem(3) solid $color-line;
            &:nth-child(3n) {
              border-right: 0;
            }
            box-sizing: border-box;
            .clothes-img {
              @include px2rem(width, 112);
              @include px2rem(height, 128);
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
