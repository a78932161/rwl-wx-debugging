<template>
  <div class="mall" ref="mall">
    <div class="bg-image"></div>
    <switches :list="switchList" @switchItem="switchItem"></switches>
    <no-result class="zh-center" v-show="!result.length>0"></no-result>
    <scroll ref="scroll"
            :data="result"
            :pullUp="pullUp"
            @scrollToEnd="searchMore">
      <ul class="mall-list">
        <li class="mall-item" v-for="item in result" @click="selectItem(item)">
          <div class="img-box">
            <img :src="item.imgUrl">
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
  import {mapGetters} from 'vuex';
  import {shopBarMixin, searchMoreMixin} from 'common/js/mixin'
  import NoResult from 'base/no-result/no-result'
  import Loading from 'base/loading/loading'
  import Scroll from 'base/scroll/scroll';
  import Switches from 'base/switches/switches';
  import list from 'mock/shop'; //数据模拟
  export default {
    data(){
      return {
        switchVal: -1,
        pullUp: true,
        list: [],
        switchList: [
          {name: '家电类', className: 'jd'},
          {name: '生活用品类', className: 'life'},
          {name: '服务类', className: 'service'},
          {name: '鞋服类', className: 'shoes'}
        ]
      }
    },
    components: {
      Loading,
      Switches,
      Scroll,
      NoResult
    },
    mixins: [shopBarMixin, searchMoreMixin],
    created(){
      this.list = list;
      this.searchMore();
    },
    computed: {
      ...mapGetters([
        'shopBarHeight'
      ])
    },
    methods: {
      selectItem(item){
        this.$router.push('/home/mall/commodity');
      },
      handleShopBar(shopList){
        this.$nextTick(() => {
          let bottom = shopList.length > 0 ? `${this.shopBarHeight}px` : '';
          this.$refs.mall.style.bottom = bottom;
          this.$refs.scroll.refresh();
        });
      },
      price(price){
        return `¥ ${price}`
      },
      stock(stock){
        return `库存:${stock}件`
      },
      switchItem(index){
        this.switchVal = index;
        console.log("index:" + this.switchVal);
      }
    },
    watch: {
      switchVal(newVal){
        this.$refs.scroll.scrollTo(0, 0); //switch变化时，滚动条到顶部
          if(newVal===1||newVal===2){  //TODO  测试 no-result后续删除
              this.list=[];
          }
          else{
              this.list=list;
          }
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

  $bg-height:170;

  .mall {
    z-index: 10;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #EFF0F5;
    .bg-image{
      width: 10rem;
      @include px2rem(height,$bg-height);
      @include bg-image('./bg');
      background-size:10rem px2rem($bg-height);
      background-color:$color-background-d;
    }
    .mall-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
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
        &:nth-child(2n) {
          @include px2rem(margin-left, 28);
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
