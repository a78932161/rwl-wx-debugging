<template>
  <div class="commodity-details">
    <scroll :data="result"
            :pullUp="pullUp"
            @scrollToEnd="searchMore">
      <div>
        <slider class="slider-container">
          <img v-for="item in images" :src="item"/>
        </slider>
        <div class="text-container">
          <span class="name">皮具清洁剂</span>
          <span class="price">149</span>
          <div class="text-box">
            <span class="express">快递：免运费</span>
            <span class="stock">剩余：9999件</span>
          </div>
        </div>
        <div class="shop-details">
          <div class="parameter">
            <span class="text">产品参数</span>
            <i class="icon-right iconfont icon-iconfonticonfonti2copycopy"></i>
          </div>
          <div class="detail">
            <span class="text">查看商品详情</span>
            <i class="icon-right iconfont icon-iconfonticonfonti2copycopy"></i>
          </div>
          <div class="badge">
            <div class="badge-wraper">
              <p><i class="iconfont icon-xuanzhong"></i><span>企业认证</span></p>
              <p><i class="iconfont icon-xuanzhong"></i><span>担保交易</span></p>
            </div>
          </div>
        </div>
        <div class="other">
          <div class="un">
            <i class="iconfont icon-zan un-icon"></i>
            <i class="icon-right iconfont icon-iconfonticonfonti2copycopy"></i>
          </div>
        </div>
        <recommend :list="result"></recommend>
        <loading v-show="hasMore" title=""></loading>
      </div>
    </scroll>
  </div>


</template>


<script>
  import {mapMutations} from 'vuex'
  import Scroll from 'base/scroll/scroll';
  import Slider from 'base/slider/slider';
  import Loading from 'base/loading/loading';
  import Recommend from 'components/home/recommend/recommend';
  import {searchMoreMixin} from 'common/js/mixin'
  import list from 'mock/shop'; //数据模拟
  export default {
    data(){
      return {
        pullUp: true,
        images: [require('./1.jpg'), require('./2.jpg'), require('./3.jpg')]
      }
    },
    mixins: [searchMoreMixin],
    components: {
      Recommend,
      Slider,
      Scroll,
      Loading
    },
    created(){
      this.list = list;
      this.searchMore();
      this.setBarState(false);
    },
    destroyed(){
      this.setBarState(true);
    },
    methods: {
      ...mapMutations({
        setBarState: 'SET_BAR_STATE'
      })
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  $margin-left: 21;
  .commodity-details {
    z-index: 100;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #F8F8F8;
    .slider-container {
      width: 10rem;
      @include px2rem(height, 549);
      img {
        @include px2rem(height, 549);
      }
    }
    .text-container {
      width: 10rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      background: $color-background-d;
      .name {
        font-weight: 600;
        @include font(2);
        margin: px2rem(25) 0 0 px2rem($margin-left);
      }
      .price {
        color: #D7574C;
        @include font(5);
        margin: px2rem(33) 0 px2rem(27) px2rem($margin-left);
      }
      .text-box {
        @include px2rem(margin-bottom, 20);
        color: $color-text-d;
        .express {
          margin: 0 px2rem(147) 0 px2rem($margin-left);
        }
      }
    }
    .container-flex {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      width: 10rem;
      background: $color-background-d;
    }
    .box-flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      @include px2rem(width, 729);
      @include px2rem(height, 75);
      @include font(-1);
      .text {
        @include px2rem(margin-left, 3);
      }
    }
    .icon-right {
      @include px2rem(margin-right, 30);
      @include font(3);
      color: #D5D5D5;
    }
    .other {
      @extend .container-flex;
      @include px2rem(margin-top, 23);
      .un {
        @extend .box-flex;
        .un-icon {
          @include px2rem(margin-left, 10);
          @include font(5);
          color: #D81E06;
        }
      }
    }
    .shop-details {
      @extend .container-flex;
      @include px2rem(margin-top, 21);
      .parameter {
        border-bottom: px2rem(4) solid $color-line-d;
        @extend .box-flex;

      }
      .detail {
        border-bottom: px2rem(4) solid $color-line-d;
        @extend .box-flex;
      }
      .badge {
        @extend .box-flex;
        .badge-wraper {
          display: flex;
          p {
            @include font(-3);
            color: $color-text-d;
            @include px2rem(margin-right, 35);
            i {
              @include px2rem(margin-right, 13);
            }
          }
        }
      }
    }
  }
</style>
