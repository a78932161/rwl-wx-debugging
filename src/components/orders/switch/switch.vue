<template>
  <div class="switch">

    <div class="switch-item" data-index="0"  @click="selectItem">
      <i class="icon iconfont icon-fanhui"></i>
      <span>返回</span>
    </div>

    <div class="switch-item" data-index="1" :style="styleColor(1)" @click="selectItem">
      <i class="icon iconfont icon-rili"></i>
      <span class="text">历史订单</span>
    </div>

    <div class="switch-item" data-index="2" :style="styleColor(2)" @click="selectItem">
      <i class="icon iconfont icon-xunhuan"></i>
      <span class="text">进行中</span>
    </div>

  </div>
</template>

<script>
  export default {
    data(){
      return {
        indexArr: [0, 1, 2],
        index: 1
      }
    },

    methods: {
      styleColor(index){
        return `color:${this.index === index ? '#00B9EF' : ''}`
      },
      selectItem(el){
        let currentIndex = Number(el.currentTarget.dataset.index);
        this.index = currentIndex;
        this.$emit('switchItem', currentIndex);
      }
    }
  }
</script>


<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .switch {
    position: fixed;
    bottom: 0;
    display: flex;
    width: 10rem;
    height: px2rem($tab-height);
    background: $color-background-d;
    .switch-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-grow: 1;
      color: $color-text-d;
      .icon {
        @include font(11);
      }
      .text {
        @include font(-3);
        margin-top: px2rem(8);
      }
    }
  }
</style>
