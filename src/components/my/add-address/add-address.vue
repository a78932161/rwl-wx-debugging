<template>
  <div class="add-address">
    <scroll>
    <div class="scroll-wrapper">
    <span class="title">联系人信息</span>
    <div class="info-container">
      <div class="box">
        <div class="box-item line">
          <span class="text">姓名：</span>
          <input type="text" placeholder="请填写联系人姓名" v-model="user.consignee"/>
        </div>
        <div class="box-item">
          <span class="text">电话：</span>
          <input type="text" placeholder="请填写手机号码" v-model="user.phone"/>
        </div>
      </div>
    </div>
    <span class="title">联系人地址</span>
    <div class="info-container">
      <div class="box">
        <div class="picker-container">
          <popup-picker @on-change="cityChange"
                        class="picker line"
                        confirm-text="确定"
                        :title="city.title"
                        v-model="city.value"
                        :columns="3"
                        :data='city.list'></popup-picker>
          <i class="icon-right iconfont icon-iconfonticonfonti2copycopy"></i>
        </div>
        <div class="box-item">
          <span class="text">详细地址：</span>
          <input type="text" placeholder="例：浙江农林大学A4楼512号" v-model="user.address"/>
        </div>
      </div>
    </div>
    <span class="tip">各高校下单：请注明学校生活区号楼栋号和寝室号</span>
    <div :class="['button',saveClass]" @click="saveAddress">保存地址</div>
    </div>
    </scroll>
    <loading v-show="load.showFlag"
             :screen="load.screen"
             :title="load.title"></loading>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex';
  import cityData from 'components/my/address/citydata' //城市数据
  import {PopupPicker} from 'vux';
  import Scroll from 'base/scroll/scroll';
  import Loading from 'base/loading/loading';
  import {saveAddress} from 'api/address';
  import {ERR_OK} from 'api/config';
  export default {
    data(){
      return {
        load: {
          showFlag: false,
          screen: true,
          title: '保存中'
        },
        user: {
          consignee: '1',
          phone: '1',
          address: '1',
          province: '',//省级
          city: '',//市级
          area: ''//县级
        },
        city: {
          title: "选择省市区",
          list: [],
          value: []
        }
      }
    },
    components: {
      PopupPicker,
      Loading,
      Scroll
    },
    created(){
      this._initCity();
    },
    computed: {
      saveClass(){
        let user = this.user;
        return user.phone && user.consignee && user.address && this.city.value.length > 0 ? 'save' : '';
      }
    },
    methods: {
      _initCity(){
        let arr = [];
        this._each(cityData, (item) => {   //循环省级数据
          arr = this._push(arr, item, 0);
          if (item.children && item.children.length > 0) {  //判断市级数据是否存在
            this._each(item.children, (aItem) => {  //循环市级数据
              arr = this._push(arr, aItem, item.name);
              if (aItem.children && aItem.children.length > 0) {  //判断县级数据是否存在
                this._each(aItem.children, (bItem) => {  //循环县级数据
                  arr = this._push(arr, bItem, aItem.name);
                })
              }
              else {  //市级数据没有子数据时，给其加上子数据（picker需加上，否则其他数据没有三联）
                arr.push({
                  name: '',
                  value: '',
                  parent: aItem.name
                });
              }
            })
          }
          else {
            arr.push({
              name: '',
              value: '',
              parent: item.name
            });
          }
        });
        this.city.list = arr;
      },
      _each(arrData, callback){
        arrData.forEach((item) => {
          callback.call(this, item);
        })
      },
      _push(arr, item, parent){
        arr.push({
          name: item.name,
          value: item.name,
          parent,
        });
        return arr;
      },
      cityChange(){
        let city = this.city.value;
        this.user.province = city[0];
        this.user.city = city[1] || '';
        this.user.area = city[2] || '';
      },
      saveAddress(){
        let user = this.user;
        if (user.phone && user.consignee && user.address && this.city.value.length > 0) {
          this.load.showFlag = true;
          saveAddress(this.user).then((ops) => {
            if (ops.code === ERR_OK) {
              this.$router.back();
              this.setMsgContent('地址添加成功');
              this.setMsgEvent('setShow');
            }
            else {
              tthis.setMsgContent('添加失败');
              this.setMsgEvent('setShow');
            }
            this.load.showFlag = false;
          });
        }
      },
      ...mapMutations({
        setMsgContent:'SET_MSG_CONTENT',
        setMsgEvent:'SET_MSG_EVENT'
      })
    }
  }

</script>


<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .add-address {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: $color-background;
    .scroll-wrapper{
      height: 105%;
      .title {
        display: inline-block;
        margin: px2rem(32) 0 px2rem(21) px2rem(26);
        font-weight: 600;
      }
      .info-container {
        display: flex;
        justify-content: flex-end;
        width: 10rem;
        background: $color-background-d;
        .box {
          @include px2rem(width, 726);
          .picker-container {
            position: relative;
            height: px2rem(88);
            .picker {
              display: flex;
              align-items: center;
              @include px2rem(width, 729);
              height: 100%;
              @include font(2);
              box-sizing: border-box;
              &.line {
                border-bottom: px2rem(3) solid $color-line-d;
              }
            }
            .icon-right {
              position: absolute;
              top: 50%;
              @include px2rem(right, 23);
              transform: translate(0, -50%);
              color: $color-text-d;
              @include font(2);
            }
          }
          .box-item {
            display: flex;
            height: px2rem(88);
            box-sizing: border-box;
            &.line {
              border-bottom: px2rem(3) solid $color-line-d;
            }
            .text {
              display: flex;
              align-items: center;
              width: px2rem(185);
              height: 100%;
              @include font(2);
              margin: 0 px2rem(21) 0 0;
              padding-top: px2rem(3);
            }
            input {
              display: flex;
              align-items: center;
              flex-grow: 1;
              height: 100%;
              @include font(2);
              color: #B0B0B0;
              box-sizing: border-box;
              outline: 0;
            }
          }
        }
      }
      .tip {
        display: inline-block;
        color: #636363;
        margin: px2rem(16) 0 0 px2rem(24);
      }
      .button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 93%;
        height: px2rem(90);
        margin-left: 3.5%;
        margin-top: px2rem(44);
        @include font(2);
        border-radius: px2rem(8);
        background: #DFDFDF;
        color: #B0B0B0;
        &.save {
          background: $color-theme !important;
          color: #fff !important;
        }
      }
    }
  }
</style>
