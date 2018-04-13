<template>
  <div class="m-header">
    <div class="header-container">
      <div :class="[move,'logo']" @click="moveClick"></div>
      <div class="right-box">
        <div class="position item">
          <i class="icon iconfont icon-dingwei"></i>
          <span class="text">浙江杭州</span>
        </div>
        <div class="service item">
          <i class="icon iconfont icon-dianhua"></i>
          <span class="text">联系客服</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
      data(){
        return {
          animation:true
        }
      },
    computed:{
          move(){
            return this.animation?'move':'';
          }
    },
      methods:{
        moveClick(){
           this.animation=!this.animation;
        }
      }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";
  .m-header{
    width: 10rem;
    @include px2rem(height,93);
    background: $color-background-d;
    .header-container{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 9rem;
      margin-left: 0.5rem;
      height: 100%;
      .logo{
        @include px2rem(width,130);
        @include px2rem(height,27);
        background-size:px2rem(130) px2rem(27);
        @include bg-image('./name');
        &.move{
          animation:mymove 2s;
        }
      }
      @keyframes mymove{
        10%{
          transform: translate(0,20%);
        }
        20%{
          transform: translate(0,-20%);
        }
        30%{
          transform: translate(0,20%);
        }
        40%{
          transform: translate(0,-20%);
        }
        50%{
          transform: translate(0,20%);
        }
        60%{
          transform: translate(0,-20%);
        }
        70%{
          transform: translate(0,20%);
        }
        80%{
          transform: translate(0,-20%);
        }
        90%{
          transform: translate(0,20%);
        }
      }

      .right-box{
        display: flex;
          .item{
            display: flex;
            align-items: center;
            .icon{
              @include font(4);
              @include px2rem(margin-right,16);
            }
          .icon,.text{
            color: $color-theme;
          }
          }
        .position{
          @include px2rem(margin-right,40);
        }
      }
    }
  }
</style>
