<template>
  <scroll>
  <div class="home">
    <m-header></m-header>
    <slider class="slider-container">
      <img v-for="item in images" :src="item"/>
    </slider>
    <m-menu></m-menu>
    <div class="problem"></div>
  </div>
  </scroll>
</template>


<script>
  import MHeader from 'components/home/m-header/m-header';
  import MMenu from 'components/home/m-menu/m-menu';
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
      Slider,
      Scroll
    },
    methods: {}
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .home {
    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    .slider-container {
      img {
        @include px2rem(height, 281);
      }
    }
    .problem{
      @include px2rem(width,454);
      @include px2rem(height,82);
      background-size:px2rem(454) px2rem(82) ;
      @include px2rem(margin-top,177);
      @include bg-image('./problem');
    }
  }
</style>
