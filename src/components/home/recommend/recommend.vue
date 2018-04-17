<template>
  <div class="recommend">
    <p class="title">
      <span class="line"></span>
      <i class="iconfont icon-baobao"></i>
      <span class="text">推荐</span>
      <span class="line"></span>
    </p>
    <ul class="recommend-list">
      <li class="recommend-item" @click="selectItem(item)" v-for="item in list">
        <div class="img-box">
        <img v-lazy="item.imgUrl"/>
        </div>
        <span class="name" v-text="item.name"></span>
        <p class="info-box">
          <span class="price" v-text="price(item.price)"></span>
          <span class="stock" v-text="stock(item.stock)"></span>
        </p>
      </li>
    </ul>

  </div>
</template>

<script>
  import {mapMutations} from 'vuex';
  export default {

    props: {
      list: {
        type: Array,
        default: []
      }
    },
    methods: {
        selectItem(item){
          this.setCurrentShop(item);
          this.$router.push('/home/furnishing/commodity');
          this.$emit('selectItem');
        },
      price(price){
        return `¥ ${price}`;
      },
      stock(stock){
        return `库存：${stock}件`
      },
      ...mapMutations({
        setCurrentShop:'SET_CURRENT_SHOP'
      })
    }
  }
</script>


<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .recommend {
    width: 10rem;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      @include px2rem(height, 59);
      color: $color-text-d;
      i {
        @include font(5);
      }
      .text {
        @include px2rem(margin-left, 9);
        @include font(-1);
      }
      .line {
        margin: 0 px2rem(30);
        @include px2rem(width, 82);
        @include px2rem(height, 5);
        background: $color-text-d;
      }
    }
    .recommend-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      width: 10rem;
      background: $color-background-d;
      padding: px2rem(22) 0;
      .recommend-item {
        display: flex;
        flex-direction: column;
        @include px2rem(width, 332);
        @include px2rem(height, 365);
        box-shadow: px2rem(3) px2rem(4) px2rem(3) #F3F3F3;
        @include px2rem(margin-bottom, 50);
        &:nth-child(2n) {
          @include px2rem(margin-left, 28);
        }
        .img-box{
          width: 100%;
          text-align: center;
          img {
            @include px2rem(width,230);
            @include px2rem(height, 226);
          }
        }

        .name {
          @include font(5);
          color: #3A3A3A;
          margin: px2rem(30) 0 px2rem(22) px2rem(29);
        }
        .info-box {
          display: flex;
          align-items:center;
          margin: 0 0 px2rem(28) px2rem(27);
          .price {
            @include font(3);
            color: #FF1A29;
          }
          .stock {
            white-space: nowrap;
            color: #818181;
            @include px2rem(margin-left, 12);
          }
        }
      }
    }
  }
</style>
