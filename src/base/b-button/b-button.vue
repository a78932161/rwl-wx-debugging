<template>
  <div class="button-container"
       v-text="content"
       :style="bg"
       @click="buttonClick" @click.stop></div>
</template>


<script>
  export default {
      props:{
          content:{
              type:String,
              default:'确定'
          },
         bgColor:{
              type:String,
              default:'#00C6FF'
         }
      },
    computed:{
          bg(){
              return `background-color:${this.bgColor}`
          }
    },
    methods:{
          buttonClick(){
              this.$emit('buttonClick');
          }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";
  .button-container{
    position: fixed;
    bottom: 0;
    width: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
    @include px2rem(height,$button-height);
    color: #fff;
    @include font(5);
  }
  </style>
