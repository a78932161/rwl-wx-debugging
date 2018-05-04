<template>
  <div class="commodity-details">
    <scroll class="scroll"
            ref="scroll"
            :data="result"
            :pullUp="pullUp"
            @scrollToEnd="searchMore">
      <div>
        <slider class="slider-container" ref="slider">
          <img v-for="item in currentShop.sowingMap" :src="item"/>
        </slider>
        <div class="text-container">
          <span class="name" v-text="currentShop.name"></span>
          <span class="price" v-text="price(currentShop.price)"></span>
          <div class="text-box">
            <span class="express" v-text="express(currentShop.express)"></span>
            <span class="stock" v-text="stock(currentShop.stock)"></span>
          </div>
        </div>
        <div class="shop-details">
          <div class="parameter" @click="infoShow" v-show="currentShop.productParameters">
            <span class="text">产品参数</span>
            <i class="icon-right iconfont icon-iconfonticonfonti2copycopy"></i>
          </div>
          <div class="detail" @click="toDetails">
            <span class="text">查看商品详情</span>
            <i class="icon-right iconfont icon-iconfonticonfonti2copycopy"></i>
          </div>
          <div class="badge">
            <div class="badge-wraper">
              <p @click="authenticationShow"><i class="iconfont icon-xuanzhong"></i><span>企业认证</span></p>
              <p @click="authenticationShow"><i class="iconfont icon-xuanzhong"></i><span>担保交易</span></p>
            </div>
          </div>
        </div>
        <!-- <div class="other">
           <div class="un" @click="queryStore">
             <div>
               <i class="iconfont icon-zan un-icon"></i>
               <span>小让商城</span>
             </div>
             <i class="icon-right iconfont icon-iconfonticonfonti2copycopy"></i>
           </div>
         </div>-->
        <recommend :list="result" @selectItem="scrollTop"></recommend>
        <loading v-show="hasMore" title=""></loading>
      </div>
    </scroll>
    <commodity-authentication ref="authentication"></commodity-authentication>
    <commodity-buy ref="buy" :shop="currentShop"></commodity-buy>
    <commodity-info ref="info" :info="currentShop.productParameters||''"></commodity-info>
    <div class="button-container">
      <span class="add-shop" @click="addShop(currentShop)">
        <p>
          加入购物车
          <span class="badge"
                v-show="shopList.length>0"
                v-text="shopList.length"></span>
        </p>
      </span>
      <span class="buy" @click="onBuyClick">立即购买</span>
    </div>
    <msg ref="msg" content="添加成功"></msg>
    <router-view></router-view>
  </div>


</template>


<script>
  let size = 12;
  import {mapGetters, mapMutations} from 'vuex'
  import Scroll from 'base/scroll/scroll';
  import Slider from 'base/slider/slider';
  import Loading from 'base/loading/loading';
  import Msg from 'base/msg/msg';
  import Recommend from 'components/home/recommend/recommend';
  import CommodityAuthentication from 'components/home/commodity-authentication/commodity-authentication';
  import CommodityBuy from'components/home/commodity-buy/commodity-buy';
  import commodityInfo from 'components/home/commodity-info/commodity-info'
  import {searchMoreMixin, keyTypeMixin, imgUrlMixin} from 'common/js/mixin'
  import {isShopAdd} from 'common/js/util';
  import {copyObj} from 'common/js/array';
  import {findFurnishingList,findMallList,findOneProduct} from 'api/shopList';
  import {ERR_OK, baseURL} from 'api/config';
  export default {
    data(){
      return {
        authentication: false,
        pullUp: true
      }
    },
    mixins: [searchMoreMixin, keyTypeMixin, imgUrlMixin],
    components: {
      Recommend,
      CommodityAuthentication,
      CommodityBuy,
      commodityInfo,
      Slider,
      Scroll,
      Loading,
      Msg
    },
    computed: {
      ...mapGetters([
        'shopList',
        'currentShop'
      ])
    },
    created(){
      this._findOneProduct();
      this.searchMore();
      this.setBarState(false);
    },
    destroyed(){
      this.setBarState(true);
    },
    methods: {
      toDetails(){
          let name=this.$route.name;
          this.setSelectImages(this.currentShop.image);
         if(name==='furnishing-commodity'){ //如果从家居页面进来，则跳转到属于家居图片详情页
           this.$router.push({name: 'furnishing-details-image'});
           return ;
         }
        this.$router.push({name: 'mall-details-image'});
      },
      _findOneProduct(){
        let id = this.$route.params.id;
        findOneProduct(this.judgeType(id), id).then((ops) => {
          if (ops.code === ERR_OK) {
            let data = ops.data;
            data.image = this.spliceImgUrl(data.image);
            data.sowingMap = this.spliceImgUrl(data.sowingMap);
            data.price = data.price / 100;
            this.setCurrentShop(data);
            this.$refs.slider.update();  //更新slider
          }
        });
      },
      recommendApi(){  //获取当前推荐列表的api
        let route=this.$route;
        if(route.name==='furnishing-commodity'){
          return findFurnishingList(this.page, size);
        }
          let category=this.$route.query.category;
          return  findMallList(category, this.page, size);
      },
      search(callback){
        this.recommendApi().then((ops) => {
          if (ops.code === ERR_OK) {
            this.result = this.result.concat(ops.data.content);
            this.hasMore = ops.data.last ? false : true;
            typeof callback === 'function' && callback.call(this);
          }
        });
      },
      infoShow(){
        this.$refs.info.show();
      },
      addShop(item){
        let obj = copyObj(item);
        obj.price = obj.price * 100;
        let shopList = isShopAdd(this.shopList, obj);
        this.setShopList(shopList);
        this.$refs.msg.setShow();
        if (this.$route.name === 'furnishing-commodity') {  //是否为小让家居商品详情页面
          this.setFurnishList(shopList);
          return;
        }
        this.setMallList(shopList);

      },
      onBuyClick(){
        this.$refs.buy.show();
      },
      scrollTop(){
        this.$refs.scroll.scrollTo(0, 0);  //点击推荐列表时，重新滚动到顶部
      },
      queryStore(){   //  TODO 如果用id获取，后续路由改成id
        this.$router.push({name: 'storeinfo'});
      },
      authenticationShow(){
        this.$refs.authentication.show();
      },
      stock(stock){
        return `剩余：${stock}件`
      },
      express(express){
        return `快递：${express > 0 ? `${express}元` : '免运费'}`
      },
      price(price){
        return `¥${price}`
      },
      ...mapMutations({
        setSelectImages: 'SET_SELECT_IMAGES',
        setCurrentShop: 'SET_CURRENT_SHOP',
        setShopList: 'SET_SHOP_LIST',
        setFurnishList: 'SET_FURNISH_LIST',
        setBarState: 'SET_BAR_STATE',
        setMallList: 'SET_MALL_LIST'
      })
    },
    watch: {
      '$route'(to, from){  //每次从其他页面页面进入时，重新拉取数据，例如在该页面点击推荐商品
        this._findOneProduct();
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  $margin-left: 21;
  $button-height: 106;
  .commodity-details {
    z-index: 100;
    position: fixed;
    top: 0;
    @include px2rem(bottom, $button-height);
    left: 0;
    right: 0;
    background: #F8F8F8;
    .scroll {
      .slider-container {
        width: 10rem;
        @include px2rem(height, 549);
        img {
          @include px2rem(height, 549);
        }
      }
      .text-container {
        width: 10rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        background: $color-background-d;
        .name {
          font-weight: 600;
          @include font(2);
          margin: px2rem(25) 0 0 px2rem($margin-left);
        }
        .price {
          color: #D7574C;
          @include font(5);
          margin: px2rem(33) 0 px2rem(27) px2rem($margin-left);
        }
        .text-box {
          @include px2rem(margin-bottom, 20);
          color: $color-text-d;
          .express {
            margin: 0 px2rem(147) 0 px2rem($margin-left);
          }
        }
      }
      .container-flex {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        width: 10rem;
        background: $color-background-d;
      }
      .box-flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
        @include px2rem(width, 729);
        @include px2rem(height, 75);
        @include font(-1);
        .text {
          @include px2rem(margin-left, 3);
        }
      }
      .icon-right {
        @include px2rem(margin-right, 30);
        @include font(3);
        color: #D5D5D5;
      }
      .other {
        @extend .container-flex;
        @include px2rem(margin-top, 23);
        .un {
          @extend .box-flex;
          .un-icon {
            @include px2rem(margin-left, 10);
            @include font(5);
            color: #D81E06;
          }
        }
      }
      .shop-details {
        @extend .container-flex;
        @include px2rem(margin-top, 21);
        .parameter {
          border-bottom: px2rem(4) solid $color-line-d;
          @extend .box-flex;

        }
        .detail {
          border-bottom: px2rem(4) solid $color-line-d;
          @extend .box-flex;
        }
        .badge {
          @extend .box-flex;
          .badge-wraper {
            display: flex;
            p {
              @include font(-3);
              color: $color-text-d;
              @include px2rem(margin-right, 35);
              i {
                @include px2rem(margin-right, 13);
              }
            }
          }
        }
      }
    }
    .button-container {
      position: fixed;
      bottom: 0;
      display: flex;
      width: 10rem;
      @include px2rem(height, $button-height);
      .button {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        @include font(5);
        color: #fff;
      }
      .add-shop {
        @extend .button;
        width: 64%;
        background-color: #FF8854;
        p {
          position: relative;
          .badge {
            position: absolute;
            @include px2rem(top, -16);
            @include px2rem(right, -24);
            display: flex;
            justify-content: center;
            align-items: center;
            @include px2rem(width, 30);
            @include px2rem(height, 30);
            @include font(-3);
            border-radius: 50%;
            background: #FE3B30;
            color: #fff;
          }
        }
      }
      .buy {
        @extend .button;
        width: 36%;
        background-color: #FE4543;
      }
    }

  }
</style>
