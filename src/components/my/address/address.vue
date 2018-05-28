<template>
  <div class="address">
    <div v-if="fetchLoad">
      <span class="no-result" v-show="!addressList.length>0">没有可用地址，点击下方按钮添加</span>
      <div class="scroll-container">
        <scroll>
          <ul class="result">
            <li class="result-item"
                v-for="item in addressList"
                :key="item.id"
                @click="choseAddress(item)">
              <div class="wrapper">
                <span class="default" v-show="item.status===0">默认</span>
                <div class="info-box">
                  <span class="name" v-text="item.consignee"></span>
                  <span class="phone" v-text="item.phone"></span>
                </div>
                <span class="address-text" v-text="item.address"></span>
                <div class="set-container">
                  <div class="left-box h100" @click.stop
                       :style="defaultStyle(item.status)"
                       @click="defaultAddress(item.id)">
                    <i :class="['icon','iconfont',defaultIcon(item.status)]"></i>
                    <span class="text">设为默认地址</span>
                  </div>
                  <div class="right-box">
                    <div class="edit-box h100" @click="selectEdit(item.id)" @click.stop>
                      <i class="icon-edit iconfont icon-bianji1"></i>
                      <span class="edit-text">编辑</span>
                    </div>
                    <div class="h100" @click="removeAddress(item.id)" @click.stop>
                      <i class="icon-remove iconfont icon-105"></i>
                      <span class="remove-text">删除</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </scroll>
      </div>
      <b-button content="＋新增地址" @buttonClick="addAddress"></b-button>
      <router-view></router-view>
    </div>
    <loading v-else></loading>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex';
  import Alert from 'base/alert/alert';
  import Scroll from 'base/scroll/scroll';
  import BButton from 'base/b-button/b-button';
  import {findAddress, removeAddress, setDefaultAddress,getDefaultAddress} from 'api/address';
  import {ERR_OK, ADDRESS_DEFAULT} from 'api/config';
  export default {
    data(){
      return {
        fetchLoad: false,
        addressList: []
      }
    },
    components: {
      BButton,
      Scroll,
      Alert
    },
    created(){
      this._findAddress();
    },
    methods: {
      choseAddress(item){
          if(this.$route.query.pay){
            this.setCurrentAddress(item);
            this.$router.back();
          }

      },
      selectEdit(id){
        this.$router.push({path: '/my/address/add', query: {id}})
      },
      defaultAddress(id){
        this.$loading.show('正在设置');
        setDefaultAddress(id).then(() => {
          this._findAddress();
          this.$loading.hide();
          this._getDefaultAddress();
        })
      },
      defaultIcon(status){
        return `${ADDRESS_DEFAULT !== status ? 'icon-unselected' : 'icon-xuanzhong'}`;
      },
      defaultStyle(status){
        return `color:${ADDRESS_DEFAULT !== status ? '#C7C7C7' : ''}`;
      },
      _getDefaultAddress(){
        getDefaultAddress().then((ops) => {
          if (ops.code === ERR_OK) {
            this.setCurrentAddress(ops.data);
          }
        })
      },
      _findAddress(){
        findAddress().then((ops) => {
          if (ops.code === ERR_OK) {
            this.addressList = ops.data;
          }
          this.fetchLoad = true;
        }).catch(() => {
          this.fetchLoad = true;
        })
      },
      removeAddress(id){
        this.$alert('您确定删除此条地址信息吗？', ['确定', '取消']).then(() => {
          this.$loading.show();
          removeAddress(id).then((ops) => {
            if (ops.code === ERR_OK) {
              this._findAddress();
              this.$loading.hide();
              this.$msg.setShow('删除成功');
            }
          });
        });
      },
      addAddress(){
        this.$router.push('/my/address/add');
      },
      ...mapMutations({
        setCurrentAddress: 'SET_CURRENT_ADDRESS'
      })
    },
    watch: {
      '$route'(to, from){
        if (from.path === '/my/address/add') {  //当从地址添加页回来时，刷新页面
          console.log(1234345)
          this._findAddress();
        }
      }
    }
  }
</script>


<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .address {
    z-index: 10;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: $color-background;
    .no-result {
      display: inline-block;
      width: 10rem;
      @include font(5);
      color: #FF6A03;
      text-align: center;
      margin-top: px2rem(40);
    }
    .scroll-container {
      position: fixed;
      top: 0;
      bottom: px2rem($button-height);
      left: 0;
      right: 0;
    }
    .result {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      width: 10rem;
      .result-item {
        display: flex;
        justify-content: flex-end;
        width: 10rem;
        height: px2rem(236);
        box-sizing: border-box;
        margin-top: px2rem(28);
        background: $color-background-d;
        &:nth-last-child(1) {
          margin-bottom: px2rem(28);
        }
        .wrapper {
          position: relative;
          display: flex;
          flex-direction: column;
          width: px2rem(726);
          .default {
            position: absolute;
            top: px2rem(30);
            right: px2rem(35);
            display: flex;
            justify-content: center;
            align-items: center;
            width: px2rem(91);
            height: px2rem(44);
            border-radius: px2rem(5);
            background: $color-theme;
            color: #fff;
          }
          .info-box {
            margin: px2rem(38) 0 0 px2rem(26);
            @include font(2);
            .name {
              margin-right: px2rem(32);
            }
          }
          .address-text {
            @include font(2);
            color: $color-text-d;
            margin: px2rem(29) 0 px2rem(28) px2rem(26);
          }
          .set-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: px2rem(96);
            box-sizing: border-box;
            border-top: px2rem(3) solid $color-text-l;
            .h100{
              display: flex;
              align-items: center;
              height: px2rem(96);
            }
            .left-box {
              display: flex;
              align-items: center;
              color: $color-theme;
              .text {
                font-weight: 600;
              }
              .icon {
                @include font(5);
                margin-right: px2rem(24);
              }
            }
            .right-box {
              display: flex;
              align-items: center;
              color: $color-text-ll;
              margin-right: px2rem(28);
              .edit-box {
                margin-right: px2rem(47);
              }
              i {
                @include font(3);
                margin-right: px2rem(13);
              }
            }
          }
        }

      }

    }
  }
</style>
