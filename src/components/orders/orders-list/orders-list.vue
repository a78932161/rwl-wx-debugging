<template>
  <div class="orders-list">
    <scroll ref="scroll"
            :data="list"
            :pullUp="pullUp"
            @scrollToEnd="searchMore">
      <ul>
        <li class="item" v-for="item in list">
          <div class="item-info" v-for="obj in item.items">
            <img src=""/>
            <!--<img v-lazy="imgUrl(obj[judgeType(item.id)].logo)"  />-->
            <div class="wrapper">
              <div class="price-container">
                <span class="name" v-text="obj[judgeType(item.id)].name"></span>
                <span class="price" v-text="price(obj[judgeType(item.id)].price)"></span>
              </div>
              <div class="number-container">
                <span class="name" v-text="standard(obj[judgeType(item.id)].standard)"></span>
                <span class="number">x{{obj.count}}</span>
              </div>
            </div>
          </div>
          <p class="price-sum"><span class="text">共{{item.items.length}}件商品合计：
        </span><span class="sum" v-text="totalPrice(item)"></span></p>
          <div class="button-container">
            <span class="cancel">取消订单</span>
            <span class="check" @click="checkProgress">查看进度</span>
            <span class="finish">完结订单</span>
          </div>
        </li>
        <loading v-show="hasMore"></loading>
      </ul>
    </scroll>
  </div>
</template>

<script>
  import {baseURL} from 'api/config';
  import Scroll from 'base/scroll/scroll';
  export default {
    data(){
      return {
        pullUp: true
      }
    },
    components: {
      Scroll
    },
    props: {
      list: {
        type: Array,
        default: []
      },
      hasMore: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      scrollTop(){
        this.$refs.scroll.scrollTo(0, 0); //switch变化时，滚动条到顶部
      },
      searchMore(){
        this.$emit('searchMore');
      },
      judgeType(id){
        let type = id.slice(-3);
        switch (type) {
          case 'A03':
            return 'laundryProduct';
            break;
          case 'A10':
            return 'mallProduct';
            break;
          case 'A13':
            return 'furnitureProduct'
        }
      },
      imgUrl(url){
        return url != null ? `${baseURL}/rwlmall/images/${url}` : '';
      },
      totalPrice(item){
        let type = this.judgeType(item.id);
        let items = item.items;
        let sum = 0;
        items.forEach((obj) => {
          sum += obj.count * obj[type].price;
        });
        return `¥ ${sum / 100}`

      },
      price(flag){
        return `¥ ${flag / 100}`
      },
      standard(flag){
        return flag ? `净含量：${flag}` : '';
      },
      checkProgress(){
        this.$router.push('/orders/details')
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .orders-list {
    position: absolute;
    top: 0;
    bottom: px2rem($tab-height);
    left: 0;
    right: 0;
    background: $color-background-d;
    .item {
      width: 10rem;
      .item-info {
        display: flex;
        align-items: center;
        width: 100%;
        height: px2rem(185);
        background: #FAFAFA;
        margin-top: px2rem(10);
        &:nth-child(1) {
          margin-top: 0;
        }
        img {
          width: px2rem(160);
          height: px2rem(157);
          margin-left: px2rem(25);
        }
        .wrapper {
          margin-left: px2rem(33);
          .price-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: px2rem(565);
            @include font(2);
            margin-bottom: px2rem(63);
            .name {
              flex-grow: 1;
              font-weight: 600;
            }
            .price {

              font-weight: 600;
              margin-right: px2rem(27);
            }
          }
          .number-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            @include font(-1);
            color: $color-text-d;
            .net-content {
              flex-grow: 1;
            }
            .number {
              margin-right: px2rem(27);
            }
          }
        }

      }
      .price-sum {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: px2rem(27);
        height: px2rem(85);
        border-bottom: px2rem(4) solid #F0F0F0;
        .text {
          @include font(-1);
        }
        .sum {
          @include font(2);
        }
      }
      .button-container {
        display: flex;
        align-items: center;
        width: 10rem;
        height: px2rem(93);
        border-bottom: px2rem(15) solid #F4F4F4;
        .button {
          display: flex;
          justify-content: center;
          align-items: center;
          width: px2rem(158);
          height: px2rem(58);
          @include font(-1);
          box-sizing: border-box;
          border-radius: px2rem(30);
          border: px2rem(2) solid #000;
        }
        .cancel {
          @extend .button;
          margin-left: px2rem(203);
        }
        .check {
          @extend .button;
          margin: 0 px2rem(26);
        }
        .finish {
          @extend .button;
          color: $color-theme;
          border: px2rem(2) solid $color-theme;
        }
      }

    }
  }
</style>
