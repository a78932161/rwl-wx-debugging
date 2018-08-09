<template>

  <div class="clothes-details">

    <scroll :data="orderSelectItem">
      <div>
        <div class="detail-container" v-for="item in orderSelectItem.items" v-if="item.problemImage">
          <div class="result-box">衣物名称：<span v-text="item.laundryProduct.name"></span></div>
          <div class="result-box">衣服瑕疵：<span v-text="item.flaw"></span></div>
          <div class="result-box">洗后效果：<span v-text="item.washingEffect"></span></div>
          入站照片：
          <div class="img-result">
            <img :src="imgUrl"  v-for="imgUrl in spliceImgUrl(item.problemImage)" />
          </div>
        </div>
      </div>
    </scroll>

  </div>

</template>


<script>
  import {mapGetters} from 'vuex';
  import Scroll from 'base/scroll/scroll';
  import {imgUrlMixin} from 'common/js/mixin';
  export default {
    mixins:[imgUrlMixin],
    components: {
      Scroll
    },
    computed: {
      ...mapGetters([
        'orderSelectItem'
      ])
    }
  }
</script>


<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .clothes-details {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: $color-background-d;
    .detail-container {
      background: #EFF0F5;
      @include font(2);
      font-weight: 500;
      color: #000;
      margin-bottom: px2rem(25);
      padding: px2rem(28) px2rem(12);
      .result-box {
        font-weight: 500;
        margin-bottom: px2rem(24);
        span {
          font-weight: 500;
        }
      }
      .img-result {
        img {
          width: px2rem(350);
          height: px2rem(330);
          margin-top: px2rem(18);
        }
      }
    }
  }
</style>
