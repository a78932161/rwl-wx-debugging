<template>
  <transition name="cover">
    <div v-if="showFlag" class="commodity-buy" @touchmove.prevent @click="hide">
      <div class="buy-container" @click.stop>
        <div class="wrapper">
          <div class="buy-info">
            <img :src="imgUrl(shop.logo)"/>
            <div class="text-box">
              <span class="name" v-text="shop.name"></span>
              <span class="price" v-text="price(shop.price)"></span>
            </div>
            <i class="iconfont icon-guanbi close" @click="hide"></i>
          </div>
          <div class="buy-number">
            <div class="stock-box">
              <span>库存数量：</span>
              <span v-text="stock(shop.stock)"></span>
            </div>
            <number @numberChange="numberChange" class="number"
                    :number="number"
                    :alertShow="alert.state"
                    :alertText="alert.text"
                    :cancelBtnText="alert.cancelBtnText"
            ></number>
          </div>
        </div>
      </div>
      <B-button content="去支付"
                bgColor="#FE4543"
                @buttonClick="onPayClick"
      ></B-button>
      <alert ref="alert" content="库存不足，请重新选择购买数量"></alert>
    </div>
  </transition>
</template>

<script>
  import {mapMutations} from 'vuex';
  import Alert from 'base/alert/alert';
  import Number from 'base/number/number';
  import BButton from 'base/b-button/b-button';
  import {copyObj} from 'common/js/array';
  import {ERR_OK, baseURL, advertisement} from 'api/config';

  export default {
    data() {
      return {
        showFlag: false,
        number: 1,
        alert: {
          state: true,
          text: '您确定取消购买该商品？',
          cancelBtnText: '取消'
        }
      }
    },
    components: {
      Alert,
      BButton,
      Number
    },
    props: {
      shop: {
        type: Object,
        default: {}
      }
    },
    methods: {
      onPayClick() {
        if (this.number > this.shop.stock) {
          this.$refs.alert.show();
          return;
        }
        this.showFlag = false;
        let shop = copyObj(this.shop);
        shop.number = this.number;
        this.setShopList([shop]);
        let category = (this.$route.name === 'furnishing-commodity') ? 'furnishing' : 'mall';
        this.$router.push({path: '/home/pay/single', query: {category}});
      },
      numberChange(number) {
        this.number = number || 1;  //当number数量为0时，重置为1
        if (number === 0) {
          this.showFlag = false;
        }
      },
      show() {
        this.showFlag = true;
      },
      hide() {
        this.showFlag = false;
      },
      price(price) {
        return `¥${price}`
      },
      stock(stock) {
        return `剩余${stock}件`
      },
      imgUrl(url) {
        return url != null ? `${baseURL}/${url}` : '';
      },
      ...mapMutations({
        setShopList: 'SET_SHOP_LIST'
      })
    }
  }

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .commodity-buy {
    z-index: 10;
    position: fixed;
    top: 0;
    @include px2rem(bottom, $button-height);
    left: 0;
    right: 0;
    background: $color-background-cover;
    &.cover-enter-active, &.cover-leave-active {
      transition: all .3s;
      .buy-container {
        transition: all .3s;
      }
    }
    &.cover-enter, &.cover-leave-to {
      .buy-container {
        opacity: 0;
        transform: translate(0, 100%);
      }
    }
    .buy-container {
      position: absolute;
      bottom: 0;
      display: flex;
      background: $color-background-d;
      .wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        width: 10rem;
        .buy-info {
          position: relative;
          display: flex;
          align-items: center;
          border-bottom: px2rem(3) solid #D5D5D5;
          @include px2rem(width, 726);
          @include px2rem(height, 148);
          img {
            @include px2rem(width, 126);
            @include px2rem(height, 102);
          }
          .text-box {
            display: flex;
            flex-direction: column;
            @include px2rem(margin-left, 28);
            .name {
              @include px2rem(margin-bottom, 28);
              @include font(2);
            }
            .price {
              @include font(2);
              color: #D7574C;
            }
          }
          .close {
            position: absolute;
            @include font(10);
            color: $color-text-d;
            @include px2rem(top, 42);
            @include px2rem(right, 31);
          }
        }
        .buy-number {
          display: flex;
          @include px2rem(width, 726);
          @include px2rem(height, 189);
          .stock-box {
            display: flex;
            flex-direction: column;
            @include px2rem(margin-top, 29);
            span {
              @include px2rem(margin-bottom, 13);
            }
          }
          .number {
            margin: px2rem(-55) 0 0 px2rem(370);
          }
        }
      }
    }
  }
</style>
