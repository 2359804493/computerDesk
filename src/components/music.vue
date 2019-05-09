<template>
  <div id="app">
  <!-- 头部导航 -->
    <header>
      <div class="nav-bar">
        <!-- logo图片 -->
        <div class="logo">
          <a href="#"><img :src="musicLogo" alt=""></a>
        </div>
        <div class="bar-list">
          <a class="" href="#">发现音乐</a>
          <a class="" href="#">我的音乐</a>
          <a class="" href="#">朋友</a>
          <a class="" href="#">商城</a>
          <a class="" href="#">音乐人</a>
          <a class="" href="#">下载客户端</a>
        </div>
        <div class="searchBox">
          <input type="text" placeholder="音乐 /视频 /电台 /用户">
        </div>
        <div class="uer-login">
          <!-- 用户登录头像 -->
        </div>
      </div>
    </header>
  <!-- 子导航 -->
    <div class="sub-nav">
      <div class="sub-nav-container">
        <ul class="sub-nav-ul">
          <li class="subNav-active"><a class="" href="#">推荐</a></li>
          <li class=""><a class="" href="#">排行榜</a></li>
          <li class=""><a class="" href="#">歌单</a></li>
          <li class=""><a class="" href="#">主播电台</a></li>
          <li class=""><a class="" href="#">歌手</a></li>
          <li class=""><a class="" href="#">新碟上架</a></li>
        </ul>
      </div>
    </div> 
  <!-- 轮播图 -->
    <div class="carousel-box">
      <div class="carousel-row">
        <div class="carousel-container">
          <template>
            <el-carousel :interval="4000" type="card" height="330px">
              <el-carousel-item  v-for="item in carousel" :key="item">
                <img :src="item">
              </el-carousel-item>
            </el-carousel>
          </template>
        </div>
      </div>
    </div>
  <!-- 热歌榜 -->
    <div class="newSong">
      <div class="newSong-con">
        <div class="hotSongs">
          <div class="hotSongs-title">
            <span><a href="#">热歌榜</a></span>
            <ul class="hotSongs-ul">
              <li><a href="#">华语</a></li>
              <li><a href="#">欧美</a></li>
              <li><a href="#">韩国</a></li>
              <li><a href="#">日本</a></li>
            </ul>
            <button class="hotSongs-playAll">全部播放</button>
          </div>
          <div class="hotSongs-con">
            <ul>
              <li v-for="(item,index) in hotSongDataList" :key="item.id" @click="getId(item.id,item.name,item.ar[0].name)">
                <div class="songName">{{ index+1 }} . {{ item.name }} </div>
                <div class="singerName">{{ item.ar[0].name }}</div>
                <div class="songTime">{{ item.dt | musicTime }}</div>
              </li>
            </ul>
          </div>
        </div>
        <div class="hotMvs">
          <div class="hotMvs-title">
            <span><a href="#">推荐MV</a></span>
            <a href="#">更多</a>
          </div>
          <div class="hotMvs-img">
            <div class="hotMvs-img-line1">
              <div v-for="item in hotMvData" :key="item.id">
                <a href="#">
                  <img :src="item.picUrl" alt="" height="130px">
                  <p class="songListName">{{ item.name }}—{{ item.artistName }}</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  <!-- 新歌推荐 -->
    <div class="songSheet">
        <div class="mod-container">
            <div class="mod-title">
                <h2 class="mod-title-h2">歌单推荐</h2>
            </div>
            <div class="mod-nav">
                <a href="#" class="mod-active">为你推荐</a>
                <a href="#">KTV热歌</a>
                <a href="#">经典</a>
                <a href="#">影视</a>
                <a href="#">情歌</a>
                <a href="#">背景音乐</a>
            </div>
            <div class="songSheet-content">
                <ul class="songSheet-ul">
                    <li v-for="item in songListData" :key="item.id">
                        <div class="songSheet-div">
                            <div class="songSheet-div-img">
                                <a href="#"><img :src="item.coverImgUrl" alt="" class="songSheet-pic"></a>
                            </div>
                            <div class="songSheet-div-p">
                              <div>{{ item.name }}</div>
                              <span>{{ item.description }}</span>
                            </div>
                            <div class="mod-po">播放量:{{item.subscribedCount}}万</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- <div class="mod-slide">
            <div class="mod-action mod-action-left">
                <a href="#"></a>
            </div>
            <div class="mod-action mod-action-right">
                <a href="#"></a>
            </div>
        </div> -->
    </div>
  <!--首发-->
    <div class="newSongs">
        <div class="mod-container">
            <div class="mod-title">
                <h2 class="mod-title-h2">新歌首发</h2>
            </div>
            <a href="#" class="newSongs-playAll">播放全部</a>
            <div class="mod-nav">
                <a href="#" class="mod-active">为你推荐</a>
                <a href="#">内地</a>
                <a href="#">港台</a>
                <a href="#">欧美</a>
                <a href="#">日本</a>
                <a href="#">韩国</a>
            </div>
            <div class="newSongs-content">
                <ul class="newSongs-ul">
                    <li v-for="item in newSongData" :key="item.id" @click="getId(item.id,item.name,item.song.artists[0].name)">
                       <img :src="item.song.album.picUrl" alt="">
                       <div>
                          <p>{{ item.name}}</p>
                          <p>{{ item.song.artists[0].name }}</p>
                       </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- <div class="mod-slide">
                <div class="mod-action mod-action-left"></div>
                <div class="mod-action mod-action-right"></div>
        </div> -->
    </div>
  <!--排行榜-->
    <div class="rankingList">
        <div class="mod-container">
            <div class="mod-title">
                <h2 class="mod-title-h2">排行榜</h2>
            </div>
            <a href="#" class="rankingList-more">更多</a>
            <div class="rankingList-content">
                <ul class="rankingList-ul">
                    <li>
                        <div class="rankingList-div">
                            <div class="rankingList-bg" :style="rankingBg1"></div>
                            <div class="rankingList-hd">
                                <a href="#" class="rankingList-tit">流行指数</a>
                            </div>
                            <ul class="rankingList-list">
                                <li class="rankingList-song" v-for="(item,index) in rankingList1" :key="item.id" @click="getId(item.id,item.name,item.ar[0].name)">
                                    <div class="rankingList-song-name"><a href="#">{{ index+1 }} . {{ item.name }}</a></div>
                                    <div><a href="#">{{ item.ar[0].name }}</a></div>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div class="rankingList-div">
                            <div class="rankingList-bg" :style="rankingBg2"></div>
                            <div class="rankingList-hd">
                                <a href="#" class="rankingList-tit">热歌</a>
                            </div>
                             <ul class="rankingList-list">
                                <li class="rankingList-song" v-for="(item,index) in rankingList2" :key="item.id" @click="getId(item.id,item.name,item.ar[0].name)">
                                    <div class="rankingList-song-name"><a href="#">{{ index+1 }} . {{ item.name }}</a></div>
                                    <div><a href="#">{{ item.ar[0].name }}</a></div>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div class="rankingList-div">
                            <div class="rankingList-bg" :style="rankingBg3"></div>
                            <div class="rankingList-hd">
                                <a href="#" class="rankingList-tit">新歌</a>
                            </div>
                             <ul class="rankingList-list">
                                <li class="rankingList-song" v-for="(item,index) in rankingList3" :key="item.id" @click="getId(item.id,item.name,item.ar[0].name)">
                                    <div class="rankingList-song-name"><a href="#">{{ index+1 }} . {{ item.name }}</a></div>
                                    <div><a href="#">{{ item.ar[0].name }}</a></div>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div class="rankingList-div">
                            <div class="rankingList-bg" :style="rankingBg4"></div>
                            <div class="rankingList-hd">
                                <a href="#" class="rankingList-tit">欧美</a>
                            </div>
                             <ul class="rankingList-list">
                                <li class="rankingList-song" v-for="(item,index) in rankingList4" :key="item.id" @click="getId(item.id,item.name,item.ar[0].name)">
                                    <div class="rankingList-song-name"><a href="#">{{ index+1 }} . {{ item.name }}</a></div>
                                    <div><a href="#">{{ item.ar[0].name }}</a></div>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div class="rankingList-div">
                            <div class="rankingList-bg" :style="rankingBg5"></div>
                            <div class="rankingList-hd">
                                <a href="#" class="rankingList-tit">韩国</a>
                            </div>
                             <ul class="rankingList-list">
                                <li class="rankingList-song" v-for="(item,index) in rankingList5" :key="item.id" @click="getId(item.id,item.name,item.ar[0].name)">
                                    <div class="rankingList-song-name"><a href="#">{{ index+1 }} . {{ item.name }}</a></div>
                                    <div><a href="#">{{ item.ar[0].name }}</a></div>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  <!--MV-->
    <div class="MV">
        <div class="mod-container">
            <div class="mod-title">
                <h2 class="mod-title-h2">MV</h2>
            </div>
            <div class="mod-nav">
                <a href="#" class="mod-active">精选</a>
                <a href="#">内地</a>
                <a href="#">韩国</a>
                <a href="#">港台</a>
                <a href="#">欧美</a>
                <a href="#">日本</a>
            </div>
            <div class="MV-content">
                <ul class="MV-ul">
                    <li v-for="item in mvsData" :key="item.id">
                      <img :src="item.cover" alt="">
                      <div class="MV-div">
                        <p> {{item.name}}—{{ item.artistName }} </p>
                        <p></p>
                        <p>{{ item.playCount }} 人气</p>
                      </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- <div class="mod-slide">
            <div class="mod-action mod-action-left"></div>
            <div class="mod-action mod-action-right"></div>
        </div> -->
    </div>
  <!-- 播放栏 -->
    <div class="line-container" @mouseenter="enter()" @mouseleave="leave()" id="line">
      <transition name="fade">
      <div class="music-line" transiton="fade" v-show="isLine">
          <div class="audioBody">
            <audio :src="songUrlLink" id="audio" loop>
              您的浏览器不支持 audio 标签。
            </audio>
            <div class="singgerPost">
                <img src="" alt="">
            </div>
            <div class="audioButton">
              <img :src="audioPrev" alt="上一首">
              <img :src="audioPlay" alt="" @click="play()" v-show="showButtom">
              <img :src="audioStop" alt="" @click="pause()" v-show="!showButtom">
              <img :src="audioNext" alt="">
            </div>
            <div class="audio-mid">
                <div clsaa="songsTitle"><span>{{ songName }}-{{ singerName }}</span></div>
                <div class="progress" @mousemove="mouseMoveEvent(e)" @mouseup="mouseupEvent()">
                  <div class="progress_bg" @click="clickEvent(e)" @mouseup="mouseupEvent()">
                    <div class="progress_bar"></div>
                  </div>
                  <div class="progress_btn" @mousedown="mousedownEvent(e)" @mouseup="mouseupEvent()" ></div>
                  <!-- <div class="text">0%</div> -->
                </div>
            </div>
            <div class="audio-time">
                <div class="audio-this-time">00:00/</div>
				<div class="audio-count-time">00:00</div>
            </div>
            <div class="audio-control">
              <div class="audio-menu">
                <img :src="menu" alt="">
              </div>
              <div class="audio-volume">
                <img :src="volume" alt="">
              </div>
              <div class="audio-lock">
                <img :src="lock" alt="" v-show="!lockButtom" @click="unLockLine()">
                <img :src="unLock" alt="" v-show="lockButtom" @click="lockLine()">
              </div>
            </div>
          </div>
      </div>
      </transition>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  import audio from '../assets/js/audio.js'
  export default {
    data () {
      return {
        songName :'未知歌曲',
        singerName: '未知歌手',
        hotSongList: 'http://localhost:3000/top/list', // 热门歌曲列表，排行榜
        songUrl: 'http://localhost:3000/song/url', // 歌曲链接
        songList: 'http://localhost:3000/top/playlist', // 歌单列表
        hotMv:' http://localhost:3000/personalized/mv', // 热门mv
        mvs: 'http://localhost:3000/top/mv', // mvs
        newSong: 'http://localhost:3000/personalized/newsong', // 新歌
        // logo图片地址
        musicLogo: '../static/img/music/logo.png', 
        // 轮播图图片地址
        carousel: ['../static/img/music/carousel/banner (1).jpg','../static/img/music/carousel/banner (2).jpg',
        '../static/img/music/carousel/banner (3).jpg','../static/img/music/carousel/banner (4).jpg','../static/img/music/carousel/banner (5).jpg',
        '../static/img/music/carousel/banner (6).jpg','../static/img/music/carousel/banner (7).jpg','../static/img/music/carousel/banner (8).jpg'],
        // 排行榜背景图路径
        rankingBg1: { 
          background: "url('../static/img/music/bg_index_top.jpg')",
          "background-position": "0 0"
        },
          rankingBg2: { 
          background: "url('../static/img/music/bg_index_top.jpg')",
          "background-position": "224px 0"
        },
          rankingBg3: { 
          background: "url('../static/img/music/bg_index_top.jpg')",
          "background-position": "448px 0"
        },
          rankingBg4: { 
          background: "url('../static/img/music/bg_index_top.jpg')",
          "background-position": "672px 0"
        },
          rankingBg5: { 
          background: "url('../static/img/music/bg_index_top.jpg')",
          "background-position": "896px 0"
        },
        // 播放栏图片路径
        audioPrev: '../static/img/music/music-line/prev.png', // 上一首
        audioNext: '../static/img/music/music-line/next.png', // 下一首
        audioPlay: '../static/img/music/music-line/play.png', // 播放
        audioStop: '../static/img/music/music-line/pause.png', // 暂停
        audioMenu: '../static/img/music/music-line/menu.png', // 音乐列表
        // audioVolume: '../static/img/music/music-line/volume.png',
        lock: '../static/img/music/music-line/suo.png', // 加锁
        unLock: '../static/img/music/music-line/suo_1.png', // 解锁
        volume: '../static/img/music/music-line/shengyin.png', // 音量
        menu: '../static/img/music/music-line/caidan.png', // 歌曲列表
        // 请求数据
        hotSongDataList:[], // 热歌列表数据
        songListData:[], // 歌单列表数据
        hotMvData: [], // 热门mv数据
        mvsData: [], // mv数据
        newSongData: [], // 新歌数据
        rankingList1: [], // 排行榜1
        rankingList2: [], // 排行榜2
        rankingList3: [], // 排行榜3
        rankingList4: [], // 排行榜4
        rankingList5: [], // 排行榜5
        songUrlLink: '', // 歌曲链接
        isLine: 'false', // 播放栏
        line:false, // 是否打开音乐播放控制栏
        showButtom: true, // 控制播放按钮
        lockButtom: true, // 控制播放栏锁
        musicTotleTime:'', // 音乐总时长
        musicNowTime: '', // 音乐播放时长
        tag:false,
        ox:0,
        left:0,
        bgleft:0
      }  
    },
    methods: {
      // 初始数据
      init () { 
        this.getHotSongList();
        this.getsongList();
        this.getHotMv();
        this.getMvs();
        this.getNewSong();
        this.getNewSong();
        this.getRankingList();
      },
      // 播放栏鼠标进入
      enter () {
        if(this.lockButtom==true){
          this.isLine=true;
        }
      },
       // 播放栏鼠标移出
      leave () {
        if(this.lockButtom==true){
          this.isLine=false;
        }else{
          this.isLine=true;
        }
      },
      // 获取歌曲id和歌名，歌手
      getId (id,songName,singerName) {
        this.getSongUrl(id);
        this.songName = songName;
        this.singerName = singerName;
        this.showButtom=true;
        setTimeout(function(){
          var audio = document.getElementById("audio");
        },1000)
      },
      // 获取热门歌曲列表
      getHotSongList () {
        this.axios.get(this.hotSongList, {params:{idx:1}})
          .then(res => {
            // 成功回调
            this.hotSongDataList=res.data.playlist.tracks.splice(0,10);
          }, res => {
              // 错误回调
              console.log("获取数据出错！")
          })
      },
      // 获取歌曲链接
      getSongUrl (id) {
        this.axios.get(this.songUrl, {params:{id:id}})
          .then(res => {
            // 成功回调
            this.songUrlLink=res.data.data[0].url;
          }, res => {
              // 错误回调
              console.log("获取歌曲链接出错！")
          })
      },
      // 获取歌曲列表
      getsongList () {
         this.axios.get(this.songList, {params:{limit:5,order:'hot'}})
          .then(res => {
            // 成功回调
            this.songListData=res.data.playlists;
          }, res => {
              // 错误回调
              console.log("获取歌单出错！")
          })
      },
      // 获取热门mv列表
      getHotMv () {
        this.axios.get(this.hotMv, {params:{}})
          .then(res => {
            // 成功回调
            this.hotMvData=res.data.result.splice(0,2);
          }, res => {
              // 错误回调
              console.log("获取热门mv出错！")
        })
      },
      // 获取mv列表
      getMvs () {
        this.axios.get(this.mvs, {params:{limit:10}})
          .then(res => {
            // 成功回调
            this.mvsData=res.data.data;
          }, res => {
              // 错误回调
              console.log("获取mvs出错！")
        })
      },
      // 获取新歌列表
      getNewSong () {
        this.axios.get(this.newSong, {params:{}})
          .then(res => {
            // 成功回调
            this.newSongData=res.data.result.splice(0,8);
            console.log(this.newSongData)
          }, res => {
              // 错误回调
              console.log("获取新歌出错！")
        })
      },
    // 获取排行榜
      getRankingList () {
        this.axios.get(this.hotSongList, {params:{idx:0}})
        .then(res => {
          // 成功回调
          this.rankingList1=res.data.playlist.tracks.splice(0,5);
        }, res => {
            // 错误回调
            console.log("获取数据出错！")
        });
        this.axios.get(this.hotSongList, {params:{idx:2}})
          .then(res => {
            // 成功回调
            this.rankingList2=res.data.playlist.tracks.splice(0,5);
          }, res => {
              // 错误回调
              console.log("获取数据出错！")
          });
        this.axios.get(this.hotSongList, {params:{idx:3}})
          .then(res => {
            // 成功回调
            this.rankingList3=res.data.playlist.tracks.splice(0,5);
          }, res => {
              // 错误回调
              console.log("获取数据出错！")
          });
        this.axios.get(this.hotSongList, {params:{idx:4}})
          .then(res => {
            // 成功回调
            this.rankingList4=res.data.playlist.tracks.splice(0,5);
          }, res => {
              // 错误回调
              console.log("获取数据出错！")
          });
        this.axios.get(this.hotSongList, {params:{idx:15}})
          .then(res => {
            // 成功回调
            this.rankingList5=res.data.playlist.tracks.splice(0,5);
          }, res => {
              // 错误回调
              console.log("获取数据出错！")
          })
      },
      // 播放
      play () {
        var audio = document.getElementById("audio");
        this.showButtom= false;
        audio.play();
      },
       // 暂停
      pause () {
        var audio = document.getElementById("audio");
        this.showButtom= true;
        audio.pause()
      },
      // 播放栏加锁
      lockLine () {
        this.lockButtom = false;
      },
      // 播放栏解锁
      unLockLine () {
        this.lockButtom = true;
        this.isLine=false;
      },
      mousedownEvent (e) {
        this.ox = e.pageX - left;
        this.tag = true;
      },
      mouseupEvent () {
        this.tag = false;
      },
      mouseMoveEvent (e) {  //鼠标移动
        if (this.tag) {
          this.left = e.pageX - this.ox;
          if (this.left <= 0) {
            this.left = 0;
          }else if (this.left > 500) {
            this.left = 500;
          }
        $('.progress_btn').css('left', this.left);
        $('.progress_bar').width(this.left);
        // $('.text').html(parseInt((this.left/500)*100) + '%');
        }
      },
      clickEvent (e) {//鼠标点击
        if (!this.tag) {
          this.bgleft = $('.progress_bg').offset().left;
          this.left = e.pageX - this.bgleft;
          if (this.left <= 0) {
            this.left = 0;
          }else if (this.left > 500) {
            this.left = 500;
        }
        $('.progress_btn').css('left', this.left);
        $('.progress_bar').animate({width:this.left},500);
        // $('.text').html(parseInt((this.left/500)*100) + '%');
        }
      },
    },
    filters: {
      // 音乐时间转换
      musicTime: function (value) {
        if (!value) return ''
          var min = parseInt((value % 3600000) / 60000).toString();
          var second= parseInt((value % 60000 ) / 1000).toString();
        if(min.length<2){
            min="0"+min;
        }
        if(second.length<2){
           second="0"+second;
        }
        return min+":"+second;
      }
    },
    created () {
     this.init ()
    }
  }
</script>
<style scoped>
  @import  '../assets/css/header.css';
/*共用样式*/
  html,body,#app {
      width: 100%;
      height: 100%;
      margin: 0 !important;
      padding: 0 !important;
      background: white;
      display: flex;
      flex-direction: column;
      overflow-y:auto;
  }
  ul,li{
      list-style: none;
      padding: 0;
      margin: 0;
  }
  .mod-container{
      max-width:1200px;
      height:100%;
      margin:0 auto;
      position: relative;
  }
  .mod-title{
      max-width:1200px;
      height: 40px;
      padding-bottom: 24px;
      text-align: center;
      margin-top: 10px;
  }
  .mod-title-h2{
      font-size: 2em;
      font-weight: 400;
      letter-spacing: 10px;
  }
  .mod-nav{
      width: 100%;
      height: 50px;
      margin:30px auto;
      text-align: center;
  }
  .mod-nav>a{
      display: inline-block;
      height: 22px;
      margin:0 24px;
  }
  .mod-active{
      color:#C20C0C;
  }
  .mod-po,.mod-singer{
      color:#999;
      margin-bottom: 10px;
  }
  .mod-page{
      width: 1200px;
      text-align: center;
      margin-top: 0px auto;
  }
  .mod-page>a{
      display: inline-block;
      width: 28px;
      height: 12px;
      margin: 0 1px;
      margin-bottom: 26px;
  }
  .mod-page-span{
      display:inline-block;
      width: 8px;
      height: 8px;
      border-radius: 12px;
      margin:30px auto;
      background:rgb(0,0,0,.1);
  }
  .mod-page-active,.mod-page-span:hover{
      background: rgb(0,0,0,.3);
  }
  .mod-slide{
      width:100%;
      height:100%;
      position: absolute;
      left:0;
      top:0;
      overflow: hidden;
  }
  .mod-action{
      width:200px;
      height:100%;
  }
  .mod-action-left{
      float: left;
  }
  .mod-action-right{
      float:right;
  }
/* 头部导航 */
  header{
    width: 100%;
    height: 70px;
    background: #333;
  }
  .nav-bar {
    width: 1200px;
    height: 70px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
  }
  .logo {
    width: 200px;
    height: 70px;
    line-height: 70px;
    line-height: 70px;
  }
  .logo img {
    height: 70px;
    vertical-align: center;
  }
  .logo span {
    vertical-align: center;
    font-size: 20px;
    color: #f5f8fb;
  }
  a{
    text-decoration: none;
    color: #333;
  }
  .bar-list a {
    display: inline-block;
    height: 70px;
    line-height: 70px;
    padding: 0 25px;
    flex: 1;
    color: lightgray;
  }
  .bar-list a:hover{
    color:white;
    background: #000;
  }
  .searchBox{
    height: 70px;
    line-height: 70px;
  }
  .searchBox input{
    width: 160px;
    height: 32px;
    border-radius: 15px;
    border:none;
    text-align: center;
    outline: none;
  }
  .uer-login{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-top: 10px;
    background: white;
  }
/* 子导航 */
  .sub-nav{
    width: 100%;
    background-color: #C20C0C;
    height: 35px;
  }
  .sub-nav-container{
    width: 1200px;
    height: 35px;
    margin:0 auto;
  }
  .sub-nav-ul{
    list-style: none;
    margin: 0;
    text-align: center;
  }
  .sub-nav-ul li{
    display: inline;
    margin: 0;
    padding: 0 40px;
  }
  .sub-nav-ul li a{
    text-decoration: none;
    color: white;
    line-height: 36px;
    font-size: 12px;
    padding: 3px 13px;
  }
  .sub-nav-ul li a:hover{
    border-radius: 20px;
    background: rgb(158, 3, 3);
  }
  .active{
    margin-left: 205px;
  }
  .subNav-active a {
    padding: 3px 13px;
    border-radius: 20px;
    background: rgb(158, 3, 3);
  }
/* 轮播图 */
 .carousel-box {
   width: 100%;
   height: 350px;
   background: #475768;
 }
 .carousel-row{
    width: 1200px;
    height: 350px;
    margin: 10px auto;
  }
  .carousel-container{
    width: 100%;
    height: 100%;
  }
  .el-carousel{
    text-align: center;
    margin: 0 auto !important;
  } 
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 330px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
/* 热歌榜 */
  .newSong{
    width: 100%;
    height: 375px;
    color: #333;
    margin-top: 50px;
  }
  .newSong-con{
    width: 1200px;
    height: 375px;
    margin: 0 auto;
  }
  .hotSongs{
    width: 760px;
    height: 375px;
    background: white;
    float: left;
  }
  .hotSongs-title span{
    float: left;
    font-size: 30px;
    margin:0 25px;
    color: #333 !important;
    line-height: 50px;
  }
  .hotSongs-title button{
    float: right;
    width: 91px;
    height: 31px;
    margin-top: 10px;
    margin-right: 20px;
  }
  .hotSongs-title a:hover{
    color: #C20C0C;
  }
  .hotSongs-ul li{
    float: left;
    font-size: 14px;
    margin-right: 20px;
    line-height: 50px;
  }
  .hotSongs-con{
    margin-top: 15px;
    color: #333;
    font-size: 13px;
    line-height: 35px;
    cursor: pointer;
  }
  .songName {
    width: 33%;
    height: 35px;
    text-align: left;
  }
  .songTime{
    width: 33%;
    height: 35px;
    text-align: right;
  }
  .singerName {
    width: 33%;
    height: 35px;
    text-align: left;
  }
  .hotSongs-con ul li{
    width: 760px;
    height: 35px;
    line-height: 35px;
    text-indent: 10px;
    display: flex;
    justify-content: space-between;
  }
  .hotSongs-con ul li a{
    float: left;
    color: #333;
    font-size: 13px;
  }
  .hotSongs-con ul li:hover a{
    color: #C20C0C;
  }
  .hotSongs-con ul li:hover{
    background-color: #eee;  
  }
  .hotSongs-title{
    width: 100%;
    height: 50px;
    background: white;
    border-bottom: 1px solid lightgray;
  }
  .hotMvs{
    width: 400px;
    height: 410px;
    background: white;
    float: right;
  }
  .hotMvs p{
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .hotMvs-title{
    width: 100%;
    height: 50px;
    border-bottom: 1px solid lightgray;
  }
  .hotMvs-title a:hover{
    color: #C20C0C;
  }
  .hotSongs-playAll{
    border:none;
    border:1px solid #c9c9c9;
    background: white;
  }
  .hotSongs-playAll:hover{
    border: 1px solid  #C20C0C;
    color: #C20C0C;
  }
  .hotMvs-title span{
    float: left;
    font-size: 30px;
    margin:0 25px;
      color: #555;
      line-height: 50px;
  }
  .hotMvs-title a{
    float: right;
    margin:0 25px;
    color: #555;
    line-height: 50px;
    font-size: 13px;
  }
  .hotMvs-img-line1{
    width: 320px;
    height: 175px;
    margin: 0 auto;
    margin-top: 10px;
    text-align: center;
  }
  .hotMvs-img-line1 p {
    margin: 10px 0;
    overflow: hidden;
    text-overflow: ellipsis;
   }
  .songListName{
    font-size: 14px;
  }
  .hotMvs-img-line2 a:hover .songListName{
    color: #C20C0C;
  }
  .songListSinger{
    color: #888;
      font-size: 12px;
  }
/*歌单推荐*/
  .songSheet{
      width: 100%;
      height: 532px;
      margin-top: 50px;
  }
  .songSheet-content{
      width: 1220px;
      margin-right: 20px;
      margin-bottom: 20px;
  }
  .songSheet-ul::after,.newSongs-ul::after,.MV-ul::after{
      display: block;
      content: "";
      clear: both;
  }
  .songSheet-ul {
    display: flex;
    justify-content: space-between;
  }
  /* .songSheet-ul>li{
      float: left;
  } */
  .songSheet-div{
      margin-right: 20px;
  }
  .songSheet-div-img{
      height: 220px;
      margin-bottom: 15px;
  }
  .songSheet-div-p{
      max-width: 220px;
      height: 135px;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 16px;
      margin-bottom: 10px;
  }
  .songSheet-div-p div {
    text-align: center;
    width: 100%;
    height: 50px;
  }
  .songSheet-div-p span {
      color: #c9c9c9;
      font-size: 13px;
  }
  .songSheet-pic{
      width: 220px;
  }
/* 新歌首发 */
  .newSongs{
      width: 100%;
      height: 450px;
      margin-top: 80px;
  }
  .newSongs-playAll{
      display: inline-block;
      padding:10px;
      border:1px solid #c9c9c9;
      position:absolute;
      left:0;
      text-align: center;
      font-size: 14px;
  }
  .newSongs-content{
      width: 1230px;
      margin: 0 auto;
  }
  .newSongs-ul {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      height: 350px;
  }
  .newSongs-ul>li{
      width: 305px;
      height: 100px;
      display: flex;
      cursor: pointer;
      text-align: center;
  }
  .newSongs-ul>li p{
    text-indent: 20px;
    font-size: 13px;
  }
  .newSongs-ul li img {
      width: 130px;
      height: 130px;
  }
/*排行榜*/
  .rankingList{
    width:100%;
    height:690px;
    margin-top:70px;
  }
  .rankingList-more{
    display: inline-block;
    width: 41px;
    height: 21px;
    position:absolute;
    right:0;
    top:56px;
    text-align: center;
  }
  .rankingList-content{
    width: 1200px;
  }
  .rankingList-ul{
    width: 1220px;
    margin-right: 20px;
    display: flex;
    justify-content: space-between;
    margin-top:30px;
  }
 .rankingList-div{
    width: 224px;
    height: 500px;
    margin-right: 20px;
    position: relative;
    overflow: hidden;
  }
  .rankingList-bg{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 567px;
  }
  .rankingList-hd{
    position: absolute;
    top: 50px;
    left:12px;
    width: 200px;
    text-align: center;
  } 
  .rankingList-hd::before{
    content: "巅峰榜";
    display: block;
    height: 22px;
    margin: 0 auto 9px;
    font-size: 20px;
    color: #fff;
  }
  .rankingList-tit{
    height: 36px;
    line-height: 1;
    font-size: 26px;
    color: #fff;
  }
  .rankingList-list{
    position: absolute;
    top: 130px;
    left: 30px;
    right: 30px;
  }
  .rankingList-song{
    position: relative;
    padding-left: 15px;
    margin-bottom: 20px;
  }
  .rankingList-song a{
    color: #fff;
    font-size: 14px;
  }
  .rankingList-song-num{
    position: absolute;
    top: 0;
    left: 0;
    color:#fff;
  }
  .rankingList-song-name{
    overflow: hidden;
    margin-bottom: 5px;
  }
/*MV部分*/
  .MV{
    width: 100%;
    height: 730px;
    margin-top: -40px;
    margin-bottom: 30px;
  }
  .MV-content{
    width: 1200px;
    margin: 0 auto;
    height: auto;
  }
  .MV-ul{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .MV-ul img {
    margin-left: 20px;
    width:200px;
    height: 126.66px;
  }
  .MV-ul>li{
    width: 240px;
    height: 244px;
  }
  .MV-div{
    width: 240px;
    text-align: center
  }
  .MV-div p{
    text-align: center;
    font-size: 13px;
  }

/* 播放控制条 */
  .line-container {
    position: fixed;
    bottom: 0px;
    right: 0;
    width: 100%;
    height: 50px;
    z-index: 999;
    cursor: pointer;
  }
  .music-line {
    background-color: rgba(0,0,0,1);
    width:100%;
    height: 50px;
    position: relative;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
  .audioBody {
    width: 950px;
    height: 50px;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    color: #eee;
  }
  .singgerPost {
    width: 45px;
    height: 45px;
    background: #eee;
    margin-top: 2px;
    border-radius: 3px;
  }
  .audioButton {
    width: 80px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    text-align: center;
    line-height: 50px;
    padding: 0 10px;
    margin-left: 30px;
  }
  .audioButton img {
    width: 15px;
    height: 15px;
    margin-top: 17px;
  }
  .audio-mid {
    width: 500px;
    height: 50px;
  }
  .songsTitle {
    width: 100%;
    height: 40px;
  }
  .progress{
    position: relative;
    width:100%;
    margin:0px auto;
  }
  .progress_bg{
    margin-top: 8px;
    height: 3px;
    border: 1px solid #fff;
    overflow: hidden;
    background-color:#fff;
    border-radius: 5px;
    outline: none;
  }
  .progress_bar{
    background: #C20C0C; 
    width: 0; 
    height: 3px; 
    border-radius: 5px;
    outline: none;
  }
  .progress_btn{
    width: 10px; 
    height:10px; 
    position: absolute;
    background:#333; 
    left: 0px; 
    top:-3px; 
    border-radius: 50%;
    cursor: pointer;border:1px #ddd solid;
    box-sizing:border-box;
  }
  .progress_btn:hover{
    border-color:#F7B824;
  }
  .audio-time{
    font-size: 12px !important;
    width:100px;
    height: 50px;
    display: flex;
    line-height: 50px;
  }
  .audio-control {
    width: 130px;
    height: 50px;
    display: flex;
    justify-content: space-between;
  }
  .audio-control img {
    width: 20px;
    height: 20px;
    margin-top: 15px;
  }
  .dot {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #fff;
    left: 790px;
    top: 24px;
  }
  

    
</style>


