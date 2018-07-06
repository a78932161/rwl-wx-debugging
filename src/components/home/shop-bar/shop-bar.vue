<template>
  <transition name="shop-bar">
    <div class="shop-bar" ref="shopBar">
      <div class="postage-tip" v-if="postageTip&&detailsShow" v-text="postageText"></div>
      <div class="left-box" @click="detailsToggle">
        <div v-show="detailsShow" class="logo">
          <span class="badge" v-text="shopNumber"></span>
        </div>
        <span class="price" v-text="totalPrice"></span>
      </div>
      <span class="right-button" @click="onPayClick">去结算</span>
      <shop-details :tip="postageTip"
                    ref="shopDetails"
                    @coverHide="detailsToggle"
                    :list="list"
      ></shop-details>
    </div>
  </transition>
</template>


<script>
  import {mapGetters, mapMutations} from 'vuex';
  import ShopDetails from 'components/home/shop-details/shop-details';
  import {expressTipMixin} from 'common/js/mixin';
  export default {
    data(){
      return {
        shopNumber: 0,
        postageTip: false,
        detailsShow: true
      }
    },
    components: {
      ShopDetails
    },
    mixins: [expressTipMixin],
    props: {
      list: {
        type: Array,
        default: []
      }
    },
    computed: {

      totalPrice(){
        let totalPrice = 0;
        this.shopNumber = 0;
        this.list.forEach((item) => {
          this.shopNumber += item.number;
          totalPrice += item.number * item.price;
        });
        if (this.$route.name === 'laundry') {
          let express = this.express;
          totalPrice = (totalPrice >= express.threshold / 100) ? totalPrice : totalPrice + express.freight / 100;
        }

        return `¥ ${totalPrice}`;
      },
      ...mapGetters([
        'shopList'
      ])
    },
    mounted(){
      this.postageTip = (this.$route.name === 'laundry') ? true : false;
      this.setHeight();
    },
    methods: {
      onPayClick(){
        let route = this.$route;
        if (route.query.top) {  //当top为true时则为高端洗护
          this.$router.push({path: `/home/pay/${this.$route.name}`, query: {top: true}});
          return;
        }
        this.$router.push(`/home/pay/${this.$route.name}`);

      },
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
        setBarHeight: 'SET_BAR_HEIGHT'
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
    .postage-tip {
      position: absolute;
      top: px2rem(-46);
      display: flex;
      justify-content: center;
      align-items: center;
      width: 10rem;
      height: px2rem(46);
      @include font(-3);
      background: #FFFCDF;
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

