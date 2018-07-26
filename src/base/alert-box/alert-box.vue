<template>
  <div class="cover-layer" v-show="showFlag">
    <div class="protocol">
      <h3 class="title" v-text="title"></h3>
      <div class="content-container">
        <scroll>
          <div v-html="content">

          </div>
        </scroll>
      </div>

      <div class="button-container">
        <span class="cancel-button" @click="cancel" v-text="cancelBtnText"></span>
        <span class="confirm-button" @click="confirm" v-text="confirmBtnText"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll';
  export default {
    data(){
      return {
        showFlag: false
      }
    },
    components: {
      Scroll
    },
    props: {
      content: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      cancelBtnText: {
        type: String,
        default: '取消'
      },
      confirmBtnText: {
        type: String,
        default: '确定'
      }

    },
    methods: {
      show(){
        this.showFlag = true;
      },
      cancel(){
        this.showFlag = false;
        this.$emit('cancelClick');
      },
      confirm(){
        this.showFlag = false;
        this.$emit('confirmClick');
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .cover-layer {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $color-background-cover;
    overflow-y: auto;
    .protocol {
      width: px2rem(682);
      height: px2rem(1127);
      border-radius: px2rem(8);
      background: #fff;
      margin-top: px2rem(40);
      .title {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: px2rem(107);
        @include font(5);
        font-weight: 500;
        color: #000;
        border-bottom: px2rem(3) solid $color-line;
      }
      .content-container {
        width: px2rem(600);
        height: px2rem(841);
        padding: px2rem(36) px2rem(41);
        text-align: justify;
      }
      .button-container {
        display: flex;
        width: 100%;
        height: px2rem(106);
        span {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 50%;
          box-sizing: border-box;
          font-weight: 500;
          @include font(5);
          border-top: px2rem(3) solid $color-line;
          &:nth-child(1) {
            border-right: px2rem(3) solid $color-line;
          }
          &.confirm-button {
            color: $color-theme;
          }
          &.cancel-button {
            color: #999;
          }
        }
      }
    }
  }

</style>
