<template>
    <div class="container">
      <div class="title">
        <i class="iconfont icon-listpress"></i>
        <span class="title_text">文章管理</span>
      </div>
      <div class="mainContainer">
          <el-form :inline="true" :model="searchParams" class="demo-form-inline">
            <el-form-item label="文章标题:">
                <el-input v-model="searchParams.title" placeholder="请输入标题或关键字" style="width:305px"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="margin-left:88px" @click="search">查询</el-button>
            </el-form-item>
            </el-form>
        <div class="table">
              <el-table :data="tableData" style="width: 100%" max-height="500">
                <el-table-column align="center"
                  label="文章标题"
                  prop="title">
                </el-table-column>
                <el-table-column align="center"
                  label="作者"
                  prop="source">
                </el-table-column>
                <el-table-column align="center"
                  label="发布时间"
                  prop="date">
                </el-table-column>
                <el-table-column align="center"
                  label="发布状态"
                  prop="isDraft"
                 :formatter="format">
                </el-table-column>
                <el-table-column align="center" label="预览">
                  <template slot-scope="scope">
                    <span style="color:#0082ff" class="preview" @click="handlePreview(scope.$index, scope.row)">预览文章</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                  <template slot-scope="scope">
                    <i class="iconfont icon-chehui" v-if="scope.row.isDraft == 1"  @click="handleRecall(scope.$index, scope.row)"></i>
                    <i class="iconfont icon-fasong"  v-else @click="handleSend(scope.$index, scope.row)"></i>
                    <i class="iconfont icon-bianji" :class="{disabled:scope.row.isDraft == 1}" @click="handleEdit(scope.$index, scope.row)"></i>
                    <i class="iconfont icon-shanchu" :class="{disabled:scope.row.isDraft == 1}" @click="handleDelete(scope.$index, scope.row)"></i>
                  </template>
                </el-table-column>
              </el-table>
        </div>  
      </div>
       <div class="footer">
          <el-pagination
          background
          layout="prev, pager, next"
          :total="totalCount"
          :page-size="pageSize"
          @current-change="changePage">
          </el-pagination>
        </div>
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <span>需要注意的是内容是默认不居中的</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>  
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      // 查询数据
      searchParams:{
        title:'',
        isDraft:''
      },
      // 下拉列表
       options: [
         {
          value: '',
          label: '全部'
        }, 
          {
          value: '1',
          label: '已发布'
          },
         {
          value: '0',
          label: '未发布'
        }
       ],
      //  表格数据
      tableData: [],
      totalCount:1,
      pageIndex:1,
      pageSize:10,
      centerDialogVisible:false
    }
  },
  mounted(){
    this.getNewsList();
  },
  methods:{
    getNewsList(){
      this.searchParams.pageIndex = this.pageIndex;
      this.axios.post('/article/getList',this.searchParams)
            .then(res => {
                this.tableData = res.data.data.list;
                this.totalCount = res.data.data.count;
                })
            .catch(err => {
                this.$Message.error(err);
            });  
    },
    changePage(currentPage){
      this.pageIndex = currentPage;
      this.getNewsList();
    },
    search() {
      this.pageIndex = 1;
      this.getNewsList();
    },
    format(row, column) {
				return row.isDraft == '0' ? '未发布':'已发布'
    },
    handlePreview(index, row) {
      if(!this.$store.state.article){
        this.$store.commit('setArticle',row)
      }
      this.$router.push('/changeArticle')
      this.$store.state.previewArticle = false
      this.$store.state.isPreBack = true
    },
    handleRecall(index, row) {
      this.axios.get('/article/changeState/'+row.id )
          .then(res => {
            // console.log(res.data)
               this.$message({
                showClose: true,
                message: row.isDraft==0? '发布成功':'下架成功',
                type: 'success'
              });
              this.getNewsList();
              })
          .catch(err => {
              this.$message.error('保存失败');
          }); 
    },
    handleSend(index, row) {
       this.axios.get('/article/changeState/'+row.id)
          .then(res => {
            // console.log(res.data)
               this.$message({
                showClose: true,
                message: row.isDraft==0? '发布成功':'下架成功',
                type: 'success'
              });
              this.getNewsList();
              })
          .catch(err => {
              this.$message.error('保存失败');
          }); 
    },
    handleEdit(index, row) {
        if(row.isDraft == 1) return;
        // if(!this.$store.state.article){
          this.$store.commit('setArticle',row)
        // }
        this.$router.push('/changeArticle')
    },
    handleDelete(index, row) {
      if(row.isDraft == 1) return;
      this.axios.get('/article/del/'+row.id)
          .then(res => {
              this.$message({
                showClose: true,
                message: '删除成功',
                type: 'success'
              });
              this.getNewsList();
              })
          .catch(err => {
             this.$message.error('保存失败');
          }); 
    } 
  }
}
</script>

<style scoped>
/* @import "../src/assets/css/common.css"; */
   .container {
    padding: 0px 43px 20px;
    height: 100%;
    min-height: 100%;
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
  .icon-listpress{
    color:#3fd3fe;
  }
  .icon-chehui:hover,.icon-bianji:hover,.icon-shanchu:hover,.preview:hover{
    cursor: pointer;
  }
  .icon-chehui,.icon-bianji{
    margin-right:15px;
    color:#555
  }
  .icon-chehui,.icon-fasong{
    font-size:22px;
    color:#555;
    position: relative;
    top:2px;
  }
  .icon-shanchu{
    color:#f00;
  }
  .disabled{
    color:#c5c5c5
  }
  .footer{
    height: 77px;
    line-height: 77px;
    text-align: right;
    padding: 0 30px;
    background-color: #fff;
  }
  .mainContainer{
    flex:1;
    background-color: #fff;
    padding: 23px 29px 0 29px;
  }
</style>
 <style>
.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev,.el-pager, .el-pager li{
      vertical-align: middle;
}
.el-input__inner {
    width: 218px;
}
/* .el-button{
  background-color:transparent;
  border:none;
  margin-left:0px;
} */
</style>
