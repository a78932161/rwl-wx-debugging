<template>
  <div class="orders">

    <orders-list ref="ordersList"
                 v-show="result.length>0"
                 :list="result"
                 :hasMore="hasMore"
                 @searchMore="searchMore"></orders-list>
    <no-result title="暂无订单记录" v-show="!result.length>0" class="zh-center"></no-result>
    <o-switch @switchItem="switchItem"></o-switch>
    <router-view></router-view>
  </div>
</template>


<script>
  let perpage = 3;
  import OrdersList from 'components/orders/orders-list/orders-list'
  import OSwitch from 'components/orders/switch/switch';
  import NoResult from 'base/no-result/no-result'
  import {findFinishOrders, findConductOrders} from 'api/orders';
  import {ERR_OK} from 'api/config';
  export default {
    name: 'orders',
    data(){
      return {
        orderList: [],
        result: [],
        hasMore: true,
        switchVal:1,
        page: 0,
      }
    },
    created(){
      this._findConductOrders();
    },
    components: {
      OrdersList,
      OSwitch,
      NoResult
    },
    methods: {
      _findConductOrders(){   //进行中订单
        findConductOrders().then((ops) => {
          if (ops.code === ERR_OK) {
            this.orderList = ops.data;
            this.searchMore();
          }
        })
      },
      _findFinishOrders(){  //完结订单
        findFinishOrders().then((ops) => {
          if (ops.code === ERR_OK) {
            this.orderList = ops.data;
            this.searchMore();

          }
        })
      },

      searchMore(){
        if (!this.hasMore) {
          return;
        }
        this.page++;
        this.result = this.result.concat(this.orderList.slice((this.page - 1) * perpage, this.page * perpage));
        this.hasMore = (this.result.length >= this.orderList.length) ? false : true;
      },
      switchItem(index){

        this.switchVal = index;
      }
    },
    watch: {
      switchVal(newSwitch){
        this.hasMore = true;
        this.page = 0;
        this.result = [];
        this.$refs.ordersList.scrollTop(); //switch变化时，滚动条到顶部
        switch (newSwitch) {
          case 0:
            this.$router.back();
            break;
          case 1:
            this._findFinishOrders();
            break;
          case 2:
            this._findConductOrders();
            break;
        }

      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .orders {
    z-index: 10;
    position: fixed;
    top: 0;
    bottom: px2rem(-$tab-height);
    left: 0;
    right: 0;
    height: 100% !important;
  }
</style>
