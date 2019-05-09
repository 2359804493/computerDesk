<template>
  <div id="app">
    <section class="el-container">  
      <aside class="aside">
         <h2 class="blank"></h2>
        <el-menu
          :default-active="$route.path"
          router
          text-color="#595d70"
          active-text-color = "#0082ff"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          @select="router">
          <el-menu-item index="/writeArticle">
            <i class="iconfont icon-shouye"></i>
            <span slot="title">写文章</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="iconfont icon-xinwen"></i>
              <span>我的文章</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/articleDetail">第一章</el-menu-item>
              <el-menu-item index="">第二章</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="iconfont icon-rencai"></i>
              <span>分类</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="">随笔心情</el-menu-item>
            </el-menu-item-group>
             <el-menu-item-group>
              <el-menu-item index="">记事</el-menu-item>
               <el-menu-item-group>
              <el-menu-item index="">笔记</el-menu-item>
            </el-menu-item-group>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </aside>
      <section class="content">
        <header class="header">
           <h2 class="title">我的博客</h2>
        </header>
        <main class="main">
          <router-view></router-view>
        </main>
      </section>
    </section>
     
    <!-- 右下角圆圈导航 -->
    <ul id="menu" class="mfb-component--br mfb-slidein" data-mfb-toggle="hover">
      <li class="mfb-component__wrap">
        <a href="#" class="mfb-component__button--main">
          <i class="mfb-component__main-icon--resting el-icon-plus"></i>
          <i class="mfb-component__main-icon--active el-icon-close"></i>
        </a>
        <ul class="mfb-component__list">
          <li>
            <a href="#" data-mfb-label="管理" class="mfb-component__button--child">
              <i class="mfb-component__child-icon el-icon-share"></i>
            </a>
          </li>
          <li>
            <a href="#" data-mfb-label="评论" class="mfb-component__button--child">
              <i class="mfb-component__child-icon el-icon-setting"></i>
            </a>
          </li>
          <li>
            <router-link to="/writeArticle" data-mfb-label="写文章" class="mfb-component__button--child">
            <i class="mfb-component__child-icon el-icon-edit"></i>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>                  
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  created() {
    
  },
}
</script>
  import mfb from '../assets/js/mfb.js';
<style scoped>
  @import '../assets/css/mfb.css';
</style>
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
       background-color:yellowgreen!important;
       text-align: center;
       color: #fff;
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
    background-color: yellowgreen!important;
    .blank {
      height: 34px;
    }
    .title{
      height: 27px;
      font-size: 21px;
    }
  }
</style>
<style scoped>
.mfb-component__button--main[data-v-6338ec16], .mfb-component__button--child[data-v-6338ec16] {
    background-color:yellowgreen!important;
  }
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



