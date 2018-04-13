<template>
  <div class="furnishing" ref="furnishing">

    <no-result class="zh-center"
               v-show="!result.length>0"
               title="商品正在赶来的路上..."
    ></no-result>
    <scroll ref="scroll"
            :data="result"
            :pullUp="pullUp"
            @scrollToEnd="searchMore"
    >
      <ul class="list">
        <li class="item" v-for="item in result">
          <img class="img" v-lazy="item.imgUrl">
          <span class="name" v-text="item.name"></span>
          <span class="price" v-text="price(item.price)"></span>
        </li>
        <loading v-show="hasMore" title=""></loading>
      </ul>
    </scroll>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import NoResult from 'base/no-result/no-result'
  import Scroll from 'base/scroll/scroll';
  import Loading from 'base/loading/loading';
  import {shopBarMixin,searchMoreMixin} from 'common/js/mixin'
  import list from 'mock/shop';  //数据模拟
  export default {
    data(){
      return {
        list: [],
        pullUp: true
      }
    },
    components: {
      Scroll,
      Loading,
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
      price(price){
        return `¥ ${price}`
      },
      handleShopBar(shopList){
        this.$nextTick(() => {
          let bottom = shopList.length > 0 ? `${this.shopBarHeight}px` : '';
          this.$refs.furnishing.style.bottom = bottom;
          this.$refs.scroll.refresh();
        });
      }
    }
  }
</script>


<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .furnishing {
    z-index: 10;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: $color-background-d;
    .list {
      display: flex;
      flex-wrap: wrap;
      width: 10rem;
      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50%;
        @include px2rem(height, 330);
        box-sizing: border-box;
        border-right: px2rem(6) solid $color-background;
        border-bottom: px2rem(6) solid $color-background;
        &:nth-child(2n) {
          border-right: 0;
        }
        .img {
          @include px2rem(width, 206);
          @include px2rem(height, 183);
        }
        .name {
          @include font(-3);
          margin: px2rem(21) 0;
        }
        .price {
          @include font(-3);
          color: #EE0000;
        }
      }
    }
  }
</style>
