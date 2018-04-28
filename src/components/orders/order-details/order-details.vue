<template>
  <div class="order-details">
    <scroll>
      <div>
        <div class="laundry-progress" :style="bgPosition" v-if="isLaundryProgress"></div>
          <mall-progress class="mall-progress" v-else></mall-progress>
        <div class="details">
          <div class="title-box">
            <span class="block"></span>
            <span class="title">订单详情</span>
          </div>
          <div class="details-box">
            <p class="item"><span class="text">订单价格</span><span class="val price" v-text="totalPrice"></span></p>
            <p class="item"><span class="text">付款方式</span><span class="val" v-text="payMode"></span></p>
            <p class="item"><span class="text">付款状态</span><span class="val status" v-text="payStatus"></span></p>
            <p class="item"><span class="text">订单编号</span><span class="val" v-text="obj.number"></span></p>
            <p class="item"><span class="text">联系人</span><span class="val" v-text="obj.name"></span></p>
            <p class="item"><span class="text">联系方式</span><span class="val" v-text="obj.phone"></span></p>
            <p class="item"><span class="text">收货地址</span><span class="val" v-text="obj.address"></span></p>
          </div>
        </div>
      </div>
    </scroll>
    <b-button :content="buttonContent" @buttonClick="buttonClick"></b-button>
  </div>
</template>


<script>
  import {mapGetters,mapMutations} from 'vuex';
  import MallProgress from 'components/orders/mall-progress/mall-progress';
  import Scroll from 'base/scroll/scroll';
  import BButton from 'base/b-button/b-button';
  import {finishOrderMixin} from 'common/js/mixin';
  export default {
    data(){
      return {
        obj: {},
        totalPrice: '',
        isLaundryProgress:false
      }
    },
    components: {
      MallProgress,
      BButton,
      Scroll
    },
    mixins:[finishOrderMixin],
    created(){
      if(!this.orderSelectItem.id){
          this.$router.back();
      }
      this.isLaundryProgress=(this.$route.query.type==='laundryProduct')?true:false;
      this.obj = this.orderSelectItem;
      this.totalPrice = this.$route.query.totalPrice;
    },
    computed: {
      buttonContent(){
          let status=this.obj.status;
          switch (status){
            case 4:
                return '完结订单';
                break;
            case 5:
              return '已完结';
              break;
            default:
                return '返回';
                break;
          }
      },
      bgPosition(){  //(0, 新订单)(1,已派订单)(2,已收订单)(3,入站订单)(4,上挂订单)(5,完结订单)(6,取消订单);
        switch (this.obj.status) {
          case 0:
          case 6:
            return `background-position:0 0`;
            break;
          case 1:
          case 2:
            return `background-position:-10rem 0`;
            break;
          case 3:
            return `background-position:-20rem 0`;
            break;
          case 4:
            return `background-position:-40rem 0`;
            break;
          case 5:
            return `background-position:-50rem 0`;
            break;

        }

      },
      payMode(){
        return this.obj.payMode === 1 ? '余额支付' : '微信支付';
      },
      payStatus(){
        return this.obj.payStatus === 1 ? '已支付' : '未支付';
      },
      ...mapGetters([
        'orderSelectItem'
      ])
    },
    methods:{
      buttonClick(){
        let status=this.obj.status;
        if(status===4){
          this.$alert('您确定完结该订单吗',['确定','取消']).then(()=>{
            this._finishOrder(this.judgeTypeUrl(this.obj.id),this.obj.id).then(()=>{
              this.setIsFinish(true);
              this.$router.back();
            });
          });
          return;
        }
        this.$router.back();
      },
      ...mapMutations({
        setSelectItem: 'SET_SELECT_ITEM',
      })
    }
  }
</script>


<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .order-details {
    position: fixed;
    top: 0;
    bottom: px2rem($button-height);
    left: 0;
    right: 0;
    background: $color-background-d;
    .laundry-progress {
      width: 10rem;
      height: px2rem(457);
      @include bg-image('./laundry-img');
      background-size: px2rem(4500) px2rem(457);
    }
    .mall-progress {
      margin-top: px2rem(40);
    }
    .details {
      margin-top: px2rem(120);
      .title-box {
        display: flex;
        align-items: center;
        margin-bottom: px2rem(45);
        .block {
          width: px2rem(19);
          height: px2rem(37);
          background: $color-theme;
          margin-right: px2rem(20);
        }
        .title {
          @include font(5);
        }
      }
      .details-box {
        margin-left: px2rem(42);
        padding-bottom: 80px;
        .item {
          display: flex;
          align-items: center;
          margin-bottom: px2rem(26);
          .text {
            width: px2rem(190);
            color: $color-text-ll;
            @include font(2);
            margin-right: px2rem(10);
          }
          .val {
            @include font(2);
            &.price {
              color: #FE3D38;
              @include font(7);
            }
            &.status {
              color: $color-theme;
            }
          }
        }

      }
    }
  }

</style>
