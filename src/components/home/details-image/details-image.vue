<template>
  <div class="details-image">
    <scroll :data="orderSelectImages" ref="scroll">
      <ul class="img-list">
        <li class="item" v-for="item in orderSelectImages">
          <img :src="item"/>
        </li>
      </ul>
    </scroll>
  </div>
</template>


<script>
  import {mapGetters} from 'vuex';
  import Scroll from 'base/scroll/scroll';

  export default {
    components: {
      Scroll
    },
    data() {
      return {
        imgList: [],
      }
    },
    computed: {
      ...mapGetters([
        'orderSelectImages'
      ])
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .details-image {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: $color-background-d;
    .img-list {
      display: flex;
      flex-direction: column;
      align-items: center;
      .item {
        margin-bottom: px2rem(-5);
        img {
          width: px2rem(750);
          background-size: auto;
          height: px2rem(600);
          /*width: 100%;*/
          /*height: 100%;*/
          /*max-width: 100%;*/
          /*max-height: 100%;*/
        }
      }
    }
  }
</style>
