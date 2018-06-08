<template>
  <div class="orders" @touchmove.prevent>
    <loading v-if="isLoading"></loading>
    <div v-else>
      <orders-list ref="ordersList"
                   v-show="result.length>0"
                   @finishReload="finishReload"
                   :list="result"
                   :hasMore="hasMore"
                   @searchMore="searchMore"></orders-list>
      <no-result title="暂无订单记录" v-show="!result.length>0" class="zh-center"></no-result>
    </div>
    <o-switch @switchItem="switchItem"></o-switch>
    <router-view></router-view>
  </div>
</template>


<script>
  let perpage = 5;
  import {mapGetters, mapMutations} from 'vuex';
  import OrdersList from 'components/orders/orders-list/orders-list'
  import OSwitch from 'components/orders/switch/switch';
  import NoResult from 'base/no-result/no-result'
  import {findFinishOrders, findConductOrders} from 'api/orders';
  import {ERR_OK} from 'api/config';
  export default {
    name: 'orders',
    data(){
      return {
        isLoading: true,
        orderList: [],
        result: [],
        hasMore: true,
        switchVal:2,
        page: 0
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
    computed: {
      ...mapGetters([
        'isFinish'
      ])
    },
    methods: {
      ordersFn(code, data){
        if (code === ERR_OK) {
          this.isLoading = false;
          this.orderList = data;
          this.searchMore();
        }
      },
      _findConductOrders(){   //进行中订单
        this.isLoading = true;
        findConductOrders().then((ops) => {
          this.ordersFn(ops.code, ops.data);
        })
      },
      _findFinishOrders(){  //完结订单
        this.isLoading = true;
        findFinishOrders().then((ops) => {
          this.ordersFn(ops.code, ops.data);
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
      },
      finishReload(){
        this.result = [];
        this.hasMore = true;
        this.page = 0;
        this._findConductOrders();
        this.setIsFinish(false);
      },
      ...mapMutations({
        setSelectItem: 'SET_SELECT_ITEM',
        setIsFinish: 'SET_IS_FINISH'
      })
    },
    watch: {
      '$route'(to, from){
        if (this.switchVal === 2 && from.path === '/orders/details' && this.isFinish === true) {
          this.setSelectItem([]);
          this.finishReload();
        }
      },
      switchVal(newSwitch){
        this.hasMore = true;
        this.page = 0;
        this.result = [];
        this.$nextTick(() => {
          if (this.$refs.ordersList) {
            this.$refs.ordersList.scrollTop(); //switch变化时，滚动条到顶部
          }
        });
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
