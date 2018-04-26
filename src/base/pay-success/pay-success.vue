<template>
  <div class="pay-success">
    <scroll>
      <div class="scroll-container">
        <i class="icon iconfont icon-selected"></i>
        <span class="text" v-text="text"></span>
        <span class="val" v-text="val"></span>
        <span class="button next" @click="onNextClick" v-text="nextButton" v-show="nextButton"></span>
        <span class="button back" @click="onBackClick" v-text="backButton" v-show="backButton"></span>
      </div>
    </scroll>
  </div>
</template>


<script>
  import Scroll from 'base/scroll/scroll'
  export default {
    props: {
      text: {
        type: String,
        default: ''
      },
      val: {
        type: String,
        default: ''
      },
      nextButton: {
        type: String,
        default: ''
      },
      backButton: {
        type: String,
        default: ''
      }

    },
    components: {
      Scroll
    },
    methods: {
      onNextClick(){
        this.$emit('afterNext')
      },
      onBackClick(){
        this.$emit('afterBack')
      }

    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .pay-success {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: $color-background-d;
    .scroll-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 105%;
      .icon {
        color: #09BB07;
        @include font(77);
        margin-top: px2rem(197);
      }
      .text {
        @include font(5);
        margin: px2rem(53) 0 px2rem(44) 0;
      }
      .val {
        @include font(17);
      }
      .button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: px2rem(624);
        height: px2rem(82);
        @include font(2);
        border-radius: px2rem(8);
        &.next {
          color: #fff;
          margin: px2rem(69) 0 px2rem(29) 0;
          background: #09BB07;
        }
        &.back {
          border: px2rem(1) solid #D6D5D6;
          background: #FBFAFC;
        }
      }
    }
  }
</style>
