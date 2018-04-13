<template>
  <transition name="shop-bar">
    <div class="shop-bar" ref="shopBar">
      <div class="left-box" @click="detailsToggle">
        <div v-show="detailsShow" class="logo">
          <span class="badge" v-text="list.length"></span>
        </div>
        <span class="price" v-text="totalPrice"></span>
      </div>
      <span class="right-button">去结算</span>
      <shop-details ref="shopDetails" @coverHide="detailsToggle" :list="list"></shop-details>
    </div>
  </transition>
</template>


<script>
  import {mapGetters,mapMutations} from 'vuex';
  import ShopDetails from 'components/home/shop-details/shop-details';
  export default {
    data(){
      return {
        detailsShow: true
      }
    },
    components: {
      ShopDetails
    },
    props: {
      list: {
        type: Array,
        default: []
      }
    },
    computed: {
      totalPrice(){
        let totalPrice = 0;
        this.list.forEach((item) => {
          totalPrice += item.number * item.price;
        });
        return `¥ ${totalPrice}`;
      },
      ...mapGetters([
        'shopList'
      ])
    },
    mounted(){
      this.setHeight();
    },
    methods: {
      setHeight(){
          this.setBarHeight(this.$refs.shopBar.clientHeight);
      },
      detailsToggle(){
        let shopDetails = this.$refs.shopDetails;
        if (shopDetails.showFlag) {
          shopDetails.hide();
          this.detailsShow = true;
        }
        else {
          shopDetails.show();
          this.detailsShow = false;
        }
      },
      ...mapMutations({
          setBarHeight:'SET_BAR_HEIGHT'
      })
    },
    watch: {
      shopList(newList){
        if (newList.length === 0) {
          this.$refs.shopDetails.hide();
          this.detailsShow = true;
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .shop-bar {
    z-index: 100;
    display: flex;
    justify-content: space-between;
    width: 10rem;
    @include px2rem(height, $tab-height);
    position: fixed;
    bottom: 0;
    background: #313236;
    &.shop-bar-enter-active, &.shop-bar-leave-active {
      transition: all .3s;
    }
    &.shop-bar-enter, &.shop-bar-leave-to {
      opacity: 0;
      transform: translate3d(0, 100%, 0)
    }

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
    .left-box {
      display: flex;
      align-items: center;
      height: 100%;
      flex-grow: 1;
      .logo {
        @extend .E-logo;
      }
      .price {
        font-weight: 600;
        color: $color-theme;
        @include font(10);
        @include px2rem(margin-left, 26);

      }

    }
    .right-button {
      display: flex;
      justify-content: center;
      align-items: center;
      @include px2rem(width, 224);
      height: 100%;
      @include font(5);
      background: $color-theme;
      color: #fff;
    }
  }

</style>

