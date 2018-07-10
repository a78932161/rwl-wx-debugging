<template>
  <div class="details-image">
    <scroll>
    <ul class="img-list">
      <li class="item" v-for="item in orderSelectImages">
        <img :src="item" />
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
    computed: {
      ...mapGetters([
        'orderSelectImages'
      ])
    }
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
      width: 10rem;
      .item {
        margin-bottom: px2rem(-3);
        img {
          width: px2rem(640);
          height: px2rem(415);
        }
      }
    }
  }
</style>
