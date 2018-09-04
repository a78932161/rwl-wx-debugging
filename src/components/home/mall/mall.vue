<template>
  <div class="mall" ref="mall">
    <slider ref="slider" :interval="time" class="slider-container">
      <img @click="toWebAddress(index)" v-for="(item,index) in images" :src="item" />
    </slider>
    <switches :list="switchList" @switchItem="switchItem"></switches>
    <no-result class="zh-center" v-show="!result.length>0&&loading"></no-result>
    <scroll ref="scroll"
            :data="result"
            :pullUp="pullUp"
            @scrollToEnd="searchMore">
      <ul class="mall-list">
        <li class="mall-item" v-for="item in result" @click="selectItem(item)">
          <div class="img-box">
            <img :src="imgUrl(item.logo)">
          </div>
          <span class="name" v-text="item.name"></span>
          <div class="info-box">
            <span class="price" v-text="price(item.price)"></span>
            <span class="stock" v-text="stock(item.stock)"></span>
          </div>
        </li>
        <loading title="" v-show="hasMore"></loading>
      </ul>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  let size = 10;
  import {mapGetters,mapMutations} from 'vuex';
  import {shopBarMixin,searchMoreMixin,imgUrlMixin,advertisementMixin} from 'common/js/mixin'
  import Slider from 'base/slider/slider';
  import NoResult from 'base/no-result/no-result'
  import Loading from 'base/loading/loading'
  import Scroll from 'base/scroll/scroll';
  import Switches from 'base/switches/switches';
  import {copyObj} from 'common/js/array';
  import {findMallList} from 'api/shopList';
  import {getAdvertisement} from 'api/info';
  import {ERR_OK,baseURL,advertisement} from 'api/config';


  export default {
    data(){
      return {
        loading: false,
        switchVal: 0,
        pullUp: true,
        switchList: [
          {name: '生活用品类', className: 'life'},
          {name: '服务类', className: 'service'},
          {name: '爆款类', className: 'jd'},
          {name: '鞋服类', className: 'shoes'}
        ]
      }
    },
    components: {
      Loading,
      Switches,
      Scroll,
      NoResult,
      Slider
    },
    mixins: [shopBarMixin, searchMoreMixin,imgUrlMixin,advertisementMixin],
    created(){
      this._getAdvertisement(advertisement.mall);
      this.setShopList(this.mallList);
      this.searchMore();
    },
    computed: {
      ...mapGetters([
        'mallList',
        'shopBarHeight'
      ])
    },
    methods: {
      search(callback){
        findMallList(this.switchVal, this.page, size).then((ops) => {
          if (ops.code === ERR_OK) {
            this.result = this.result.concat(ops.data.content);
            this.hasMore = ops.data.last?false : true;
            this.loading=true;
            typeof callback === 'function' && callback.call(this);
            console.log(ops.data)
          }
        })
      },
      selectItem(item){
        let obj=copyObj(item);
        obj.image = this.spliceImgUrl(obj.image);
        obj.sowingMap=this.spliceImgUrl(obj.sowingMap);
        obj.price=obj.price/100;
        this.setCurrentShop(obj);
        this.$router.push({path:`/home/mall/commodity/${obj.id}`,query:{category:this.switchVal}});
      },
      handleShopBar(shopList){
        this.$nextTick(() => {
          let bottom = shopList.length > 0 ? `${this.shopBarHeight}px` : '';
          this.$refs.mall.style.bottom = bottom;
          this.$refs.scroll.refresh();
        });
      },
      imgUrl(url){
        return url != null ? `${baseURL}/${url}` : '';
      },
      price(price){
        return `¥ ${price/100}`
      },
      stock(stock){
        return `库存:${stock}件`
      },
      switchItem(index){
        this.switchVal = index;
      },
      ...mapMutations({
        setShopList: 'SET_SHOP_LIST',
        setCurrentShop: 'SET_CURRENT_SHOP'
      })
    },
    watch: {
      switchVal(newVal){
        this.$refs.scroll.scrollTo(0, 0); //switch变化时，滚动条到顶部
        this.loading=false;
        this.hasMore = true;
        this.page = 0;
        this.result = [];
        this.searchMore();
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  $bg-height: 170;

  .mall {
    z-index: 10;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #EFF0F5;
    .slider-container {
      width: 10rem;
      @include px2rem(height, 170);
      img {
        @include px2rem(height, 170);
      }
    }
    .mall-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      width: 10rem;
      @include px2rem(padding-bottom, $switches-height+$bg-height+20);
      .mall-item {
        display: flex;
        flex-direction: column;
        @include px2rem(width, 332);
        @include px2rem(height, 421);
        @include px2rem(margin-top, 16);
        @include px2rem(border-radius, 5);
        background: $color-background-d;
        box-shadow: px2rem(2) px2rem(2) px2rem(2) rgba(127, 126, 126, .47);
        &:nth-child(odd) {
          @include px2rem(margin-left, 29);
        }
        &:nth-child(even) {
          @include px2rem(margin-right, 29);
        }
        .img-box {
          @include px2rem(width, 332);
          @include px2rem(height, 282);
          background-repeat: no-repeat;
          background-position: center center;
          @include bg-image('~common/images/default');
          img {
            width: 100%;
            height: 100%;
          }
        }
        .name {
          margin: px2rem(29) 0 px2rem(22) px2rem(29);
          @include font(5);
          color: #3A3A3A;
        }
        .info-box {
          display: flex;
          align-items: flex-start;
          .price {
            margin: 0 px2rem(32) 0 px2rem(27);
            @include font(2);
            color: #FF1A29;
          }
          .stock {
            color: #818181;
          }
        }
      }
    }

  }
</style>
