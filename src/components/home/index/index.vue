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
    <shop-bar :list="shopList" v-show="shopBarState&&shopList.length>0"></shop-bar>
  </div>


</template>


<script>
  import {mapGetters} from 'vuex';
  import MHeader from 'components/home/m-header/m-header';
  import MMenu from 'components/home/m-menu/m-menu';
  import ShopBar from 'components/home/shop-bar/shop-bar';
  import Slider from 'base/slider/slider';
  import Scroll from 'base/scroll/scroll';
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
    methods: {
      selectProblem(){
        this.$router.push('/home/problem');
      }
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
