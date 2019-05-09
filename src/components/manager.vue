<template>
 <section class="el-container">  
   <aside class="aside">
     <h2>后台管理系统</h2>
     <el-menu
      :default-active="$route.path"
      router
      text-color="#595d70"
      active-text-color = "#0082ff"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="router">
      <el-menu-item index="/welcome">
        <i class="iconfont icon-shouye"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="iconfont icon-xinwen"></i>
          <span>个人博客</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/myblogEditor">文章管理</el-menu-item>
          <el-menu-item index="/wordEditor">评论管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="iconfont icon-rencai"></i>
          <span>图片浏览器</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/imgEditor">图片管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
   </aside>
   <section class="content">
     <header class="header">
       <div class="logo"></div>
       <div class="logout"><i class="iconfont icon-jieshu" @click="logout"></i></div>
     </header>
     <main class="main">
       <router-view></router-view>
     </main>
   </section>
 </section>
</template>

<script>
  export default {
    data () {
    return {
    }
  },
    methods: {
      logout(){
        this.axios.get('/loginOut',{ withCredentials: true} )
            .then(res => {
              this.$router.push('/login')
                })
            .catch(err => {
                this.$Message.error(err);
            }); 
      },
      router(index,indexPath){
        this.$router.push(index)
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath){
        console.log(key, keyPath);
      },
      
    }
  }
</script>

<style lang="less" scoped>
  .el-container {
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction: row;
    box-sizing: border-box;
  }
  .content{
    flex:1;
    overflow-x: auto;
    display:flex;
    flex-direction: column;
    .header{
       height: 74px;
       background-color:#0082ff;
      //  background-color:red;
       .logo{
         display:inline-block;
         width: 163px;
         height: 22px;
         margin-left: 42px;
         position: relative;
         top:8px;
        //  background-image:url('../../static/Img/logo_small.png') ;
       }
       .logout{
         color:#0082ff;
         float: right;
         margin-right: 42px;
         i{
            height: 43px;
            line-height: 43px;
            font-size: 30px;
         }
       }
    }
    .main{
      flex:1;
      overflow: auto;
      // height:100%;
    }  
  }
  .aside{
    flex-shrink: 0;
    width: 186px;
    overflow: auto;
    box-sizing: border-box;
    background-color: #0082ff;
    h2{
      color:#fff;
      font-size: 21px;
      text-align: center;
      margin-top: 30px;
    }
  }
</style>
<style>
   .el-menu {
    width: 185px!important;
    border-right: none;
  }
  .el-submenu__title,.el-menu-item {
    font-size: 14px;
  } 
  .el-submenu .el-menu-item{
    min-width: 185px;
  }
</style>
