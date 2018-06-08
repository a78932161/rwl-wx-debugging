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
          <img v-lazy="imgUrl(item.logo)"/>
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
  import {copyObj} from 'common/js/array';
  import {imgUrlMixin} from 'common/js/mixin';
  import {baseURL} from 'api/config';
  export default {

    props: {
      list: {
        type: Array,
        default: []
      }
    },
    mixins: [imgUrlMixin],
    methods: {
      selectItem(item){
        let obj = copyObj(item);
        obj.image = this.spliceImgUrl(obj.image);
        obj.sowingMap = this.spliceImgUrl(obj.sowingMap);
        obj.price=obj.price/100;
        this.setCurrentShop(obj);
        let name=this.$route.name,apiUrl;
        if(name==='furnishing-commodity'){
          apiUrl='furnishing';
          this.$router.replace(`/home/${apiUrl}/commodity/${obj.id}`);
        }
        else{
            let category=this.$route.query.category;
          apiUrl='mall';
          this.$router.replace({path:`/home/${apiUrl}/commodity/${obj.id}`,query:{category}});
        }
        this.$emit('selectItem');
      },
      imgUrl(url){
        return url != null ? `${baseURL}/${url}`:'';
      },
      price(price){
        return `¥ ${price / 100}`;
      },
      stock(stock){
        return `库存：${stock}件`
      },
      ...mapMutations({
        setCurrentShop: 'SET_CURRENT_SHOP'
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
      justify-content: space-between;
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
        &:nth-child(odd) {
          @include px2rem(margin-left, 28);
        }
        &:nth-child(even) {
          @include px2rem(margin-right, 28);
        }
        .img-box {
          width: 100%;
          text-align: center;
          img {
            @include px2rem(width, 230);
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
          align-items: center;
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
