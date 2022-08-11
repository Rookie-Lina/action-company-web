<template>
  <div class="block">
    <el-table
        :data="mydata"
        style="width: 100%">
      <el-table-column label="名称"
                       width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.goodsName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="起拍价"
                       width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.startingPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品描述"
                       width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.goodsInfo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片"
                       width="180">
        <template slot-scope="scope">

          <el-image :src="$img+scope.row.goodsImg" style="width: 120px;height: 100px"></el-image>
        </template>
      </el-table-column>
      <el-table-column width="400">
        <template slot-scope="scope">
          <el-button type="success" round @click="goPass(scope.row)">通过</el-button>
          <el-button type="danger" round @click="unPass(scope.row)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="current"
        :page-size="5"
        layout="prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
import {getUnCheckedGoodsApi, goodPassApi, goodUnPassApi} from "../../utils/api";
import da from "element-ui/src/locale/lang/da";

export default {
  name: 'MyChecks',
  data(){
    return{
      mydata:'',
      current:1,
      pageSize:5,
      total:0,
      raiseTime:'',
      dialogTableVisible: false,
      dialogFormVisible: false

    }
  },
  created() {
    getUnCheckedGoodsApi({'current':this.current,'pageSize':this.pageSize}).
    then(res=>{
      this.mydata=res.data.records
      this.total=res.data.total
    })
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      getUnCheckedGoodsApi({'current':this.current,'pageSize':this.pageSize}).
      then(res=>{
        this.mydata=res.data.records
        this.total=res.data.total
      })
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      getUnCheckedGoodsApi({'current':this.current,'pageSize':this.pageSize}).
      then(res=>{
        console.log('a'+res)
        this.mydata=res.data.records
        this.total=res.data.total
      })
    },
    goPass(data){
      console.log(data)
      this.$router.push({path:'/home/setRaiseTime',
        query:{
        'gid':data.id
        }})
    },
    unPass(data){
      goodUnPassApi({'id':data.id}).then(res=>{
        this.$message({
          message: '拒绝成功',
          type: 'success'
        });
        location.reload()
      })
    }
  },
}
</script>
<style lang="less" scoped>
</style>
