<template>
  <section class="container">
       <div>
            <!-- <img :src="img"> -->
            <p>欢迎来到网页版电脑管理后台</p>
        </div>
  </section>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      // img:"../static/img/houtai/index.png"
         }
  },
  methods:{
    
  }
}
</script>

<style lang="less" scoped>
.container{
    height: 100%;
    min-height: 100%;
     display: flex;
     justify-content: center;
     align-items: center;
     background-color: #eef3fb;
     img{
      width: 70%;
     }
     p{
       font-weight: bold;
      color: #0084ff;
       font-size: 30px;
         }
}
</style>