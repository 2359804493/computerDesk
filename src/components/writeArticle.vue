<template>
    <div class="hiring_container">
        <div class="title">
          <i class="iconfont icon-zhaopin"></i>
          <span class="title_text">写文章</span>
        </div>
        <div class="mainContainer">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="文章标题：">
            <el-input v-model="form.name" width="80px"></el-input>
          </el-form-item>
          <el-form-item label="章节：">
            <el-select v-model="form.add" width="80px" placeholder="请选择文章章节">
              <el-option  v-for="item in address" :key="item.id" :label="item.regionName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文章内容：" prop="desc">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="footer">
        <el-button type="primary" @click="publicArticle()">发布</el-button>
        <el-button @click="dialogVisible1=true">取消</el-button>
    </div>
    <el-dialog
      title="取消发布"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>确定取消发布吗？这将会清空表中所有数据！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="确认发布"
      :visible.sync="dialogVisible2"
      width="30%"
      :before-close="handleClose">
      <span class="dialogMe" @click="publicArticle()" >确定发布吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取消</el-button>
        <el-button type="primary" @click="publicArticleChec()">确 定</el-button>        
      </span>
    </el-dialog>
</div>
</template>

<script>
  export default {
    data () {
    return {
      defaultMsg: this.message,
      editor2:'editor2',
      editor3:'editor3',
      // 4、根据项目需求自行配置,具体配置参见ueditor.config.js源码或 http://fex.baidu.com/ueditor/#start-start
      config: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 250,
        initialFrameWidth: 650,
        toolbars: [
              ['bold', 'italic', 'underline', 'indent', 'insertorderedlist', 'insertunorderedlist', 'undo', 'redo']
          ],
        // wordCount:false,
        elementPathEnabled : false
      },
      openeds:['1'],
      form: {
          name: '',
          region: '',
          add: '',
          type: [],
          desc:''
        },
      dialogVisible1:false,
      dialogVisible2:false,
      address:'',
      hiringType:'',
    }
  },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      message(){
        return "请输入文本"
      },
      router(index,indexPath){
        this.$router.push(index)
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      publicArticle(){
        console.log(this.form.name)
        if(this.form.name == undefined){
         this.$message({
              showClose: true,
              message: '职位名称不能为空',
              type: 'warning'
            });
          return
         }
        this.dialogVisible2=true;
        },
      // 确认发布
      publicArticleChec(){
          let messages={
            cateId:this.form.region,
            postCateName:this.form.type,
            regionId:this.form.add,
            postName:this.form.name,
            postDesc:this.$refs.ue2.getUEContent(),
            requirement:this.$refs.ue3.getUEContent(),
            isDraft : 1
          }
        this.axios.post('/recruit/add',messages,{ withCredentials: true})
        .then(res => {
          if(res.data.state == 200){
            this.$message({
            showClose: true,
            message: '发布成功',
            type: 'success'
            });
          this.$router.push('/hiringList')
          }else{
            this.$message({
              showClose: true,
              message: '发布失败',
              type: 'warning'
              });
            }
          })
        .catch(err => {
            this.$Message.error(err);
            }); 
      },
      cancelPublic(){
        this.title="确认取消发布吗？"
        this.dialogVisible1=false;
        this.form.region=''
        this.form.type=''
        this.form.add=''
        this.form.name=''
        this.$refs.ue2.clearUEContent();
        this.$refs.ue3.clearUEContent();
      },
      gainAddress(){
        this.axios.get("/recruit/getRegionList",{ withCredentials: true})
          .then(res=>{
            this.address=res.data.data.recruitRegionList;
          })
          .catch(err=>{
            console.log("获取工作地址列表失败")
          })
      },
      gainType(){
        this.axios.get("/recruit/getRecruitCateList",{ withCredentials: true})
          .then(res=>{
            this.hiringType=res.data.data.recruitCateList
          })
          .catch(err=>{
            console.log("获取招聘类别列表失败")
          })
      },
      routerCheck(){
        if (this.$store.state.hiring.id !== null){
          console.log(this.$store.state.hiring)
          console.log(this.$refs.ue2)
          this.form.region=this.$store.state.hiring.recruitCateName
          this.form.type=this.$store.state.hiring.postCateName
          this.form.add=this.$store.state.hiring.regionName
          this.form.name=this.$store.state.hiring.postName
          // this.$refs.ue2.setContent(this.$store.state.hiring.postName);
          // this.$refs.ue3.getUEContent()
        }
      }
    },
    mounted() {
      this.gainType();
      this.gainAddress();
      this.routerCheck();
    }
  }
</script>
<style lang="less" scoped>
.hiring_container {
    padding: 0px 43px 20px;
    background-color: #eef3fb;
    display:flex;
    flex-direction: column;
  }
  .title {
    color:#333;
    height: 45px;
    line-height: 45px;
    font-size: 15px;
  }
  .icon-zhaopin{
    color:#3fd3fe;
  }
  .footer{
    height: 77px;
    line-height: 77px;
    text-align: right;
    padding: 0 80px;
    background-color: #fff;
  }
  .mainContainer{
    flex:1;
    background-color: #fff;
    padding: 23px 29px 0 29px;
    display: flex;
    justify-content:center;
  }
</style>
<style>
 .hiring_container .el-input__inner {
   width: 350px;
 }
 .hiring_container{
   height: 96%;
 }
 .hiring_container .el-form-item__label {
   padding: 0 10px 0 0;
 }
 .hiring_container .edui-default .edui-editor {
    border:1px solid #cce4ff !important;
  }
 .hiring_container .edui-default .edui-editor-toolbarboxouter {
    border-bottom:none !important;
  }
  .hiring_container .edui-default .edui-editor-toolbarboxinner {
    background-color:#cce4ff !important;
  }
 .hiring_container .edui-default .edui-toolbar {
   height:23px !important;
 }
 .hiring_container .edui-default .edui-editor-bottomContainer td {
   border-top:none !important;
 }
 .el-button--primary {
    color: #fff;
    background-color: yellowgreen !important;
    border-color: yellowgreen !important;
}
.el-textarea__inner{
  min-height: 200px!important;
}
</style>
