<template>
  <div class="mall-progress">
    <div class="container">
      <div class="progress-item">
        <i :style="iconStyle(0)" :class="['icon','iconfont',iconClass(0)]"></i>
        <span class="text">新订单</span>
      </div>
      <div class="progress-item">
        <i :style="iconStyle(1)" :class="['icon','iconfont',iconClass(1)]"></i>
        <span class="text">已派</span>
      </div>
      <div class="progress-item">
        <i :style="iconStyle(2)" :class="['icon','iconfont',iconClass(2)]"></i>
        <span class="text">完结</span>
      </div>
      <div class="line">
        <span class="progress" :style="progressStyle"></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      progress: {
        type: Number,
        default: 0

      }
    },
    created(){
    },
    computed:{
      progressStyle(){
        switch (this.progress){
          case 0:
              break;
          case 1:
              return 'width:50%';
              break;
          case 2:
              return 'width:100%';
              break
        }
      }
    },
    methods: {
      iconStyle(flag){
        return `color:${this.progress >= flag ? '' : '#DCDCDC'}`;
      },
      iconClass(flag){
        return this.progress >= flag ? 'icon-selected' : 'icon-yuan';
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .mall-progress {
    display: flex;
    justify-content: center;
    width: 10rem;
    .container {
      position: relative;
      display: flex;
      justify-content: space-between;
      width: px2rem(700);
      .progress-item {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .icon {
          background: #fff;
          @include font(38);
          color: $color-theme;
        }
        .text {
          position: absolute;
          top: 110%;
          right: px2rem(-10);
          display: inline-block;
          text-align: center;
          width: 120%;
          font-weight: 600;
          @include font(5);
        }
      }
      .line {
        position: absolute;
        z-index: -1;
        top: 50%;
        width: 100%;
        height: px2rem(11);
        background: #DCDCDC;
        .progress {
          position: absolute;
          top: 0;
          left: 0;
          display: inline-block;
          width: 0;
          height: 100%;
          background: $color-theme;
        }
      }
    }
  }
</style>
