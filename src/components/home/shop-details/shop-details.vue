<template>
  <transition name="shop-details">
    <div class="shop-details" v-if="showFlag" @click="coverHide">
      <div class="details-container" @click.stop>
        <div class="details-header">
          <div class="logo">
            <span class="badge" v-text="list.length"></span>
          </div>
          <div class="clear" @click="clearShop">
            <i class="icon iconfont icon-icon-test"></i>
            <span class="text">清空购物车</span>
          </div>
        </div>
        <transition-group name="list" tag="ul" class="details-list">
          <li class="item" v-for="item in list" :key="item.id">
            <span class="text" v-text="item.name"></span>
            <span class="price" v-text="price(item.price)"></span>
            <number @numberChange="numChange"
                    :id="item.id"
                    :number="item.number"
                    :alertShow="alert.state"
                    :alertText="alert.text"
                    :cancelBtnText="alert.cancelBtnText"
            ></number>
          </li>
        </transition-group>
      </div>
      <alert
             ref="alert"
             :content="content"
             :cancelBtnText="cancelBtnText"
             @confirm="confirm"></alert>
    </div>
  </transition>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';
  import Number  from 'base/number/number';
  import Alert from 'base/alert/alert';
  import {copyObj, propEq} from 'common/js/array';
  export default {
    data(){
      return {
        content: '您确定清空购物车吗？',
        cancelBtnText: '取消',
        alert: {
          state: true,
          text: '您确定从购物车中移除该商品吗？',
          cancelBtnText: '取消'
        },
        showFlag: false
      }
    },
    components: {
      Number,
      Alert
    },
    props: {
      list: {
        type: Array,
        default: []
      }
    },
    methods: {
      confirm(){
           this.setShopList([]);
      },
      clearShop(){
        this.$refs.alert.show();
      },
      coverHide(){
        this.$emit('coverHide');
      },
      show(){
        this.showFlag = true;
      },
      hide(){
        this.showFlag = false;
      },
      numChange(number, id){
        let shopList = copyObj(this.shopList);
        let index = shopList.findIndex(propEq(id, 'id'));  //index一定存在，因为此时只展示已存在的list
        shopList[index].number = number;
        if (number === 0) {
          shopList.splice(index, 1);
        }
        this.setShopList(shopList);
      },
      price(price){
        return `¥ ${price}`
      },
      ...mapMutations({
        setShopList: 'SET_SHOP_LIST'
      })
    },
    computed: {
      ...mapGetters([
        'shopList'
      ])
    },

  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .shop-details {
    position: fixed;
    top: 0;
    @include px2rem(bottom, $tab-height);
    left: 0;
    right: 0;
    background: $color-background-cover;
    &.shop-details-enter-active, &.shop-details-leave-active {
      transition: all .3s;
      .details-container {
        transition: all .3s;
      }
    }
    &.shop-details-enter, &.shop-details-leave-to {
      .details-container {
        opacity: 0;
        transform: translate(100%, 0);
      }
    }
    .details-container {
      position: absolute;
      bottom: 0;
      .E-logo {
        position: relative;
        @include px2rem(width, 88);
        @include px2rem(height, 88);
        background-size: px2rem(88) px2rem(88);
        @include px2rem(margin-left, 31);
        @include bg-image('~common/images/logo');
        .badge {
          position: absolute;
          top: 0;
          right: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          @include px2rem(width, 30);
          @include px2rem(height, 30);
          @include font(-3);
          border-radius: 50%;
          background: #FE3B30;
          color: #fff;
        }
      }
      .details-header {
        display: flex;
        justify-content: space-between;
        width: 10rem;
        @include px2rem(height, 90);
        background: #F7F7F9;
        .logo {
          transform: translate(0, -50%);
          @extend .E-logo;
        }
        .clear {
          display: flex;
          justify-content: center;
          align-items: center;
          @include px2rem(margin-right, 34);
          .icon {
            @include font(8);
            color: $color-text-d;
          }
          .text {
            @include font(-1);
            color: $color-text-d;
            @include px2rem(margin-left, 5);
          }
        }
      }
      .details-list {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        background: $color-background-d;
        .item {
          display: flex;
          align-items: center;
          @include px2rem(width, 727);
          @include px2rem(height, 88);
          border-bottom: px2rem(3) solid $color-line-d;

          &.list-enter-active, &.list-leave-active {
            transition: all .3s;
          }
          &.list-enter, &.list-leave-to {
            width: 0;
            opacity: 0;
          }
          &:nth-last-child(1) {
            border-bottom: 0;
          }
          .text {
            @include px2rem(width, 230);
            @include font(3);
            color: $color-text-ll;
            white-space: nowrap;
          }
          .price {
            @include px2rem(width, 230);
            @include font(3);
            margin: 0 px2rem(0) 0 px2rem(50);
            color: $color-theme;
            white-space: nowrap;
          }
        }
      }
    }
  }
</style>
