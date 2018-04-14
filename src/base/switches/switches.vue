<template>
  <div class="switches">
    <ul class="switches-list">
      <li class="item" @click="switchItem(index)" v-for="(item,index) in list">
        <div :class="['line',selectClass(index)]"></div>
        <div class="icon-box">
          <div :class="['icon',item.className]"></div>
        </div>
        <span class="text" v-text="item.name"></span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        currentIndex: 0
      }
    },
    props: {
      list: {
        type: Array,
        default: []
      }
    },
    computed: {},
    methods: {
      selectClass(index){
        return this.currentIndex === index ? 'selected' : '';
      },
      switchItem(index){
        this.currentIndex = index;
        this.$emit('switchItem',index);
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  @mixin icon($width,$height) {
    @include px2rem(width, $width);
    @include px2rem(height, $height);
    background-size: px2rem($width) px2rem($height);
  }

  .switches {
    width: 10rem;
    @include px2rem(height,$switches-height);
    background: $color-background-d;
    .switches-list {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      .item {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
        .line {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          position: absolute;
          border-bottom: px2rem(3) solid $color-line;
          &.selected {
            border-bottom: px2rem(16) solid #171C60;
          }
        }
        .icon-box {
          display: flex;
          justify-content: center;
          align-items: center;
          @include px2rem(width, 76);
          @include px2rem(height, 76);
          border-radius: 50%;
          background: #171C60;
          .icon {
            &.clothes {
              @include icon(50, 43);
              @include bg-image('./clothes');
            }
            &.culottes {
              @include icon(47, 41);
              @include bg-image('./culottes');
            }
            &.decorate {
              @include icon(49, 47);
              @include bg-image('./decorate');
            }
            &.overcoat {
              @include icon(44, 60);
              @include bg-image('./overcoat');
            }
            &.shoes {
              @include icon(49, 49);
              @include bg-image('./shoes');
            }
            &.jd{
              @include icon(29, 44);
              @include bg-image('./jd');
            }
            &.life{
              @include icon(18, 44);
              @include bg-image('./life');
            }
            &.service{
              @include icon(39, 44);
              @include bg-image('./service');
            }
          }
        }
        .text {
          color: $color-text;
          @include font(-1);
          @include px2rem(margin-top, 22);
        }
      }
    }

  }
</style>
