<template>
  <div id="app" class="desk" :style ="bg" @mousedown="changeImg()">
    <div class="appBox">
      <ul>
          <li @click="openWindow('http://localhost:8080/#/music/playlist',1000,600,'音乐')">
            <img src=" ../static/img/app/music.png">
            <span>音你而来</span>
          </li>
          <li @click="openWindow('http://localhost:8088/#/photo',1000,600,'图片')">
            <img src=" ../static/img/app/photo.png">
            <span>我的相册</span>
          </li>
          <li @click="openWindow('http://localhost:8088/#/manager',1000,600,'文件')">
            <img src=" ../static/img/app/file.png">
            <span>后台管理</span>
          </li>
          <li @click="openWindow('http://localhost:8088/#/article',1000,600,'myblog')">
            <img src=" ../static/img/app/article.png">
            <span>我的blog</span>
          </li>
           <li @click="openWindow('http://localhost:5000',1000,600,'CCStore')">
            <img src=" ../static/img/app/CCStore.png">
            <span>CC果园</span>
          </li>
          <li  @click="openWindow('http://www.baidu.com',1000,600,'百度一下')">
            <img src=" ../static/img/app/baidu.jpg">
            <span>百度一下</span>
          </li>
      </ul>
    </div>
    <div class="bottom">
      <div class="mennue"></div>
      <div class="time"> {{ nowTime }} </div>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  data () {
    return {
      bg: { 
        background: "url('../static/img/desk/Windows.jpg') no-repeat fixed center",
        backgroundSize: '100%'
      },
      nowTime: '',
      screenWidth: '',
      screenHeight: '',
      dialogVisible: false,
    }
  },
  methods: {
    getTime () {
      setInterval (() => { 
        var today = new Date()
        var h = today.getHours().toString();
        var m = today.getMinutes().toString();
        var s = today.getSeconds().toString();
        if(h.length<2){
            h="0"+h;
        }
        if(m.length<2){
           m="0"+m;
        }
        if(s.length<2){
            s="0"+s;
        }
        var time = h + ':' + m + ': ' + s
        this.nowTime = time
      }, 1000)
    },
    openWindow (pageUrl, innerWidth, innerHeight,name) {  
      this.screenWidth = (screen.availWidth - innerWidth)/2;  
      this.screenHeight = (screen.availHeight - innerHeight)/2;  
      window.open(pageUrl, name, "left=" + this.screenWidth + ",top=" + this.screenHeight +",width=" + innerWidth + ",height=" + innerHeight + ",menubar=yes，status=yes，toolbar=yes，resizable=yes,scrollbars=no,status=no,toolbar=no,menubar=no,location=no");  
    },
    changeImg(){
      $(document).mousedown(function(e){ 
        if(3 == e.which){ 
          if(confirm("需要更换壁纸吗？")){
            this.bg="url('../static/img/desk/time.jpg') no-repeat fixed center"
            console.log(this.bg)
          }
        }else {
          return
        }
      })
    }
  }, 
  created() {
    this.getTime();
    // this.changeImg(); 
  },
}
</script>
<style scoped>
  html,body,#app {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
  }
  .desk ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex
  }
  .desk a{
    text-decoration: none;
    color: black;
  }
  .desk .appBox ul li {
    margin-top: 15px;
    cursor: pointer;
    padding: 10px 10px;
    text-align: center;
    width: 60px;
    list-style: none;
  }
  .desk .appBox ul li img {
    border-radius: 3px;
    display: block;
    height: 32px;
    margin: auto;
    width: 32px;
  }
  .desk .appBox ul li span {
    font-size: 12px !important;
    margin-top: 10px;
    color: #fff;
  }
  .desk .appBox ul li:hover {
    background: rgba(241, 240, 240, 0.8);
  }
  .desk .bottom {
    position: absolute;
    width: 100%;
    background: none repeat scroll 0 0 rgba(40, 40, 40, 0.9);
    border-color: rgba(20, 20, 20, 0.8);
    border-top: 1px solid rgba(20, 20, 20, 0.8);
    bottom: 0;
    height: 30px;
    right: 0;
    left: 0;
    opacity: 0.9;
  }
  .desk .mennue{
    float: left;
    margin-left: 30px;
    display: flex;
    width: auto;
    line-height: 30px;
  }
  .desk .time{
    color: white;
    font-size: 14px;
    float: right;
    margin-right: 30px;
    line-height: 30px;
  }
</style>

