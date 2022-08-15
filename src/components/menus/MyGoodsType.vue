<template>
  <div class="block">
    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column
          prop="typeName"
          label="类别名称"
          width="180">
      </el-table-column>
      <el-table-column
          prop="grade"
          label="级别"
          width="180">
      </el-table-column>
      <el-table-column
          prop="firstId"
          label="一级菜单id">
      </el-table-column>
      <el-table-column
          prop="secondId"
          label="二级菜单id">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
              v-if="scope.row.grade<3"
              size="mini"
              type="primary"
              @click="handleAddSub(scope.row)">新建子分类</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="current"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div></template>

<script>
import {goodsTypeDeleteApi, goodsTypeListApi} from "../../utils/api";
import da from "element-ui/src/locale/lang/da";

export default {
  name: 'MyGoodsType',
  data(){
    return{
      // 用户列表数据
      tableData: [],
      current:0,
      pageSize:5,
      total:0,
      //添加子分类时用的临时容器
      temp:{
        parentGrade:'',
        parentId:''
      }
    }
  },
  methods:{
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      goodsTypeListApi({'current':this.current,'pageSize':this.pageSize}).then(res=>{
        console.log(res.data)
        this.current=res.data.current
        this.total=res.data.total
        this.tableData=res.data.records
      })
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      goodsTypeListApi({'current':this.current,'pageSize':this.pageSize}).then(res=>{
        console.log(res.data)
        this.current=res.data.current
        this.total=res.data.total
        this.tableData=res.data.records
      })
    },
    handleEdit(data){
      console.log(data)
      this.$router.push({
        path:'/home/editGoodType',
        query:{'goodId':data.id}
      },)
    },
    handleDelete(data){
      console.log(data)
      goodsTypeDeleteApi({'id':data.id}).then(res=>{
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.$router.push('/home/checks')
      })
    },
    handleAddSub(data){
      console.log(data)
      this.$router.push({
        path:'/home/addGoodType',
        query:{
          'parentGrade':data.grade,
          "parentId":data.id
        }
      })
    }
  },
  created() {
    goodsTypeListApi({'current':this.current,'pageSize':this.pageSize}).then(res=>{
      console.log(res.data)
      this.current=res.data.current
      this.total=res.data.total
      this.tableData=res.data.records
    })
  },

}
</script>

<style lang="less" scoped>
</style>
