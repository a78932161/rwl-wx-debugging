<template>

  <div class="home">
    <scroll>
      <div class="scroll-container">
        <m-header></m-header>
        <slider class="slider-container">
          <img v-for="item in images" :src="item"/>
        </slider>
        <m-menu></m-menu>
        <div class="problem" @click="selectProblem"></div>
      </div>
    </scroll>
    <router-view></router-view>
    <shop-bar :list="shopList" v-if="shopBarState&&shopList.length>0"></shop-bar>
  </div>


</template>


<script>
  import {mapGetters, mapMutations} from 'vuex';
  import MHeader from 'components/home/m-header/m-header';
  import MMenu from 'components/home/m-menu/m-menu';
  import ShopBar from 'components/home/shop-bar/shop-bar';
  import Slider from 'base/slider/slider';
  import Scroll from 'base/scroll/scroll';
  import {getDefaultAddress} from 'api/address';
  import {ERR_OK} from 'api/config';
  export default {
    data(){
      return {
        images: [require('./1.jpg'), require('./2.jpg'), require('./3.jpg')]
      }
    },
    components: {
      MHeader,
      MMenu,
      ShopBar,
      Slider,
      Scroll
    },
    computed: {
      ...mapGetters([
        'shopBarState',
        'shopList'
      ])
    },
    created(){
      this._getDefaultAddress();
    },
    methods: {
      _getDefaultAddress(){
        getDefaultAddress().then((ops) => {
          if (ops.code === ERR_OK) {
            this.setCurrentAddress(ops.data);
          }
        })
      },
      selectProblem(){
        this.$router.push('/home/problem');
      },
      ...mapMutations({
        setCurrentAddress:'SET_CURRENT_ADDRESS'
      })

    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .home {
    position: absolute;
    top: 0;
    @include px2rem(bottom, $tab-height);
    left: 0;
    right: 0;
    .scroll-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 105%;
    }
    .slider-container {
      width: 10rem;
      @include px2rem(height, 281);
      img {
        @include px2rem(height, 281);
      }
    }
    .problem {
      @include px2rem(width, 454);
      @include px2rem(height, 82);
      background-size: px2rem(454) px2rem(82);
      @include px2rem(margin-top, 177);
      @include bg-image('./problem');
    }
  }
</style>
