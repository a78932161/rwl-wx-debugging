<template>
  <div class="number">
    <i class="reduce-button iconfont icon-jian" @click="reduce"></i>
    <span class="num" v-text="num"></span>
    <i class="add-button iconfont icon-jia" @click="add"></i>
    <alert ref="alert"
           :content="alertText"
           :cancelBtnText="cancelBtnText"
           @confirm="confirm"></alert>
  </div>
</template>
<script>
  import Alert from 'base/alert/alert';
  export default {
    data(){
      return {
        num: 0
      }
    },
    components: {
      Alert
    },
    props: {
      cancelBtnText:{
       type:String,
        default:''
      },
      alertText:{
        type:String,
        default:''
      },
      alertShow: {
        type: Boolean,
        default: false
      },
      number: {
        type: Number,
        default: 0
      },
      id: {
        type: String,
        default: ''
      }
    },
    created(){
      this.num = this.number;
    },
    methods: {
      confirm(){
        this.num--;
        this.$emit('numberChange', this.num, this.id)
      },
      add(){
        this.num++;
        this.$emit('numberChange', this.num, this.id);
      },
      reduce(){
        if (this.num === 1&&this.alertShow) {
          this.$refs.alert.show();
            return ;
        }
        this.num--;
        this.$emit('numberChange', this.num, this.id)
      }
    }
  }
</script>


<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .number {
    display: flex;
    justify-content: center;
    align-items: center;
    .button {
      color: $color-theme;
      @include font(6);
    }
    .reduce-button, .add-button {
      @extend .button;
    }
    .num {
      @include px2rem(width, 90);
      text-align: center;
      @include font(2);

    }
  }
</style>
