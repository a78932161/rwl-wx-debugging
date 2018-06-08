<template>
  <div class="furnishing" ref="furnishing">

    <loading :screen="true" v-show="loading"></loading>
    <div v-show="!loading" class="content-container">
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
          <li class="item" v-for="item in result" @click="selectItem(item)">
            <img class="img" v-lazy="imgUrl(item.logo)">
            <span class="name" v-text="item.name"></span>
            <span class="price" v-text="price(item.price)"></span>
          </li>
          <loading v-show="hasMore" title=""></loading>
        </ul>
      </scroll>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  let size = 10;
  import {mapGetters, mapMutations} from 'vuex';
  import NoResult from 'base/no-result/no-result'
  import Scroll from 'base/scroll/scroll';
  import Loading from 'base/loading/loading';
  import {copyObj} from 'common/js/array';
  import {shopBarMixin,searchMoreMixin,imgUrlMixin} from 'common/js/mixin';
  import {findFurnishingList} from 'api/shopList';
  import {ERR_OK,baseURL} from 'api/config';
  export default {
    data(){
      return {
        pullUp: true,
        loading: true
      }
    },
    components: {
      Scroll,
      Loading,
      NoResult
    },
    mixins: [shopBarMixin, searchMoreMixin,imgUrlMixin],
    created(){
      this.setShopList(this.furnishList);
      this.searchMore(function () {
        this.loading = false;
        this.$nextTick(() => {
          this.$refs.scroll.refresh();
        })
      });
    },
    computed: {
      ...mapGetters([
        'furnishList',
        'shopBarHeight'
      ])
    },
    methods: {
      search(callback){
        findFurnishingList(this.page, size).then((ops) => {
          if (ops.code === ERR_OK) {
            this.result = this.result.concat(ops.data.content);
            this.hasMore = ops.data.last ? false : true;
            typeof callback === 'function' && callback.call(this);
          }
        });
      },
      selectItem(item){
        let obj=copyObj(item);
        obj.image = this.spliceImgUrl(obj.image);
        obj.sowingMap=this.spliceImgUrl(obj.sowingMap);
        obj.price=obj.price/100;
        this.setCurrentShop(obj);
        this.$router.push(`/home/furnishing/commodity/${obj.id}`);
      },
      imgUrl(url){
        return url != null ? `${baseURL}/${url}` : '';
      },
      price(price){
        return `¥ ${price / 100}`
      },
      handleShopBar(shopList){
        this.$nextTick(() => {
          let bottom = shopList.length > 0 ? `${this.shopBarHeight}px` : '';
          this.$refs.furnishing.style.bottom = bottom;
          this.$refs.scroll.refresh();
        });
      },
      ...mapMutations({
        setShopList: 'SET_SHOP_LIST',
        setCurrentShop: 'SET_CURRENT_SHOP'
      })
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
    .content-container {
      height: 100%;
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
  }
</style>
