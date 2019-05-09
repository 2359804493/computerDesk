<template>
  <div id="content">
    <div class="title">
      <span>图片浏览器</span>
    </div>
    <div class="main">
      <div class="box" v-for="item in imgList" >
        <img :src="item" alt="" >
      </div>
      <div class="updata">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
     
    </div>
   
  </div>
</template>

<script>
export default {
   data () {
    return {
      imgList:[
        '../static/img/photo/full/1.jpg',
        '../static/img/photo/full/2.jpg',
        '../static/img/photo/full/3.jpg',
        '../static/img/photo/full/4.jpg',
        '../static/img/photo/full/5.jpg',
        '../static/img/photo/full/6.jpg',
        '../static/img/photo/full/7.jpg',
        '../static/img/photo/full/8.jpg',
        '../static/img/photo/full/9.jpg',
        '../static/img/photo/full/10.jpg',
        '../static/img/photo/full/11.jpg',
        '../static/img/photo/full/12`.jpg',
        '../static/img/photo/full/13.jpg',
        '../static/img/photo/full/14.jpg',
      ],
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    }
}
</script>
<style>
.main{
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  justify-content: space-around
}
.title {
  text-align: center;
  margin: 20px 0 30px;
}
.title span{
  font-size: 26px;
  color: #666;
  font-weight: bolder
}
.box img {
  width: 200px;
  height: 200px;
}
.box{
  margin: 20px;
}
.updata{
  margin-top: 45px;;
}

</style>
<style>
.el-upload--picture-card{
  /* width: 200px!important;
  height: 200px!important;
  line-height: 200px!important; */
}
</style>



　　　