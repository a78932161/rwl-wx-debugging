<template>
  <div class="bind-card">

    <input type="number"
           placeholder="请输入卡号"
           v-model="card"
           class="input card"/>
    <input type="number"
           placeholder="请输入物理编码"
           v-model="code"
           class="input code"/>
    <span :style="bindTextStyle"
          v-text="bindText"
          class="bind"
          @click="bindCardClick"></span>
    <span class="card-info" v-show="cid" v-text="cardInfo"></span>

  </div>
</template>


<script>
  import {mapGetters, mapMutations} from 'vuex';
  import {bindingCard} from 'api/user';
  import {ERR_OK} from 'api/config';

  export default {
    data(){
      return {
        card: '',
        code: ''
      }
    },
    computed: {
      cardInfo(){
        return `当前绑定的卡号为：${this.cid}`
      },
      bindText(){
        return this.bindCard ? '更改卡号' : '绑定卡号';
      },
      bindTextStyle(){
        return `background-color:${this.card && this.code ? '#01C6FD' : '#DFDFDF'}`
      },
      ...mapGetters([
        'bindCard',
        'cid'
      ])
    },
    methods: {
      bindCardClick(){
        if (this.card && this.code) {
          bindingCard(this.card, this.code).then((ops) => {
            if (ops.code === ERR_OK) {
              this.setBindCard(true);
              this.setCid(this.card);
              this.card = '';
              this.code = '';
              this.$msg.setShow('绑定成功');
              return;
            }
            this.$msg.setShow(ops.msg)
          })
        }

      },
      ...mapMutations({
        setBindCard: 'SET_BIND_CARD',
        setCid: 'SET_CID'
      })
    }
  }

</script>


<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .bind-card {
    z-index: 10;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: $color-background-d;
    .input {
      width: px2rem(482);
      height: px2rem(59);
      @include font(0);
      color: $color-text-l;
      border: px2rem(2) solid $color-text-l;
      text-indent: px2rem(27);
      border-radius: px2rem(6);
      &.card {
        margin-top: px2rem(100);
      }
      &.code {
        margin-top: px2rem(30);
      }
    }
    .bind {
      display: flex;
      justify-content: center;
      align-items: center;
      width: px2rem(482);
      height: px2rem(58);
      color: #fff;
      border-radius: px2rem(6);
      margin-top: px2rem(42);
    }
    .card-info {
      color: $color-theme;
      margin-top: px2rem(35);
      @include font(2);
    }

  }
</style>
