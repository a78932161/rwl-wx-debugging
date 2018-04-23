<template>
  <div class="more-suggest">
    <scroll>
      <div class="scroll-container">
        <textarea :placeholder="placeholder"
                  v-model="text"
                  class="textarea"></textarea>
        <span :style="buttonStyle" class="button">提交</span>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll';
  export default {
    data(){
      return {
        text: '',
        placeholder: '希望你对我们的服务提出更好的意见！让我们更好的为您服务！'
      }
    },
    components: {
      Scroll
    },
    computed: {
      buttonStyle(){
        return `background-color:${this.text ? '#01C6FD' : ''}`
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .more-suggest {
    z-index: 10;
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
    }
    .textarea {
      width: px2rem(688);
      height: px2rem(358);
      @include font(3);
      color: #9A9A9A;
      border: px2rem(2) solid #ccc;
      margin-top: px2rem(34);
      padding-top: px2rem(26)

    }
    .button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: px2rem(688);
      height: px2rem(80);
      @include font(3);
      color: #fff;
      background: #ccc;
      font-weight: 600;
      margin-top: px2rem(58);
      border-radius: px2rem(5);
    }
  }
</style>
