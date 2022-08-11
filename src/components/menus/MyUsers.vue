<template>
  <div>
    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column label="账号"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.loginName }}</span>
      </template>
      </el-table-column>
      <el-table-column
          label="姓名"
          width="180">
        <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.trueName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="性别"
                       width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.userSex==0?'女':'男' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色"
                       width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{getRole(scope.row.roleId)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              type="info"
              size="mini"
              @click="getDetail(scope.row.id)">查看</el-button>
          <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    <el-button
        size="mini"
        @click="handleAdd">新增</el-button>
  </div>

</template>
<script>
import {DeleteUserApi, getUnCheckedGoodsApi, getUserDetailApi, getUsers} from "../../utils/api";

export default {
  name: 'MyUser',
  data() {
    return {
      // 用户列表数据
      tableData: [],
      current:0,
      pageSize:3,
      total:0
    }
  },
  methods:{
    getDetail(uid){
      // console.log("ok")
          getUserDetailApi({'id':uid}).then(res=>{
            // console.log('test')
            // console.log(res.data)
            const user=res.data
            this.$router.push({
                  path:'/home/userInfo',
                  query:{
                    'user':user
                  }
            })
          })
      // this.$router.push('/home/userInfo/'+uid,uid)
    },
    handleEdit(index, row) {
      const uid=row.id
      getUserDetailApi({'id':uid}).then(res=>{
        // console.log('test')
        // console.log(res.data)
        const user=res.data
        this.$router.push({
          path:'/home/editUser',
          query:{
            'user':user
          }
        })
      })
      console.log(index, row);
    },
    handleDelete(index, row) {
      // console.log(row);
      const id=row.id
      console.log(id)
      DeleteUserApi({'id':id}).then(res=>{
        console.log(res)
        this.$message({
          message: '用户删除成功',
          type: 'success'
        });
      })

    },
    handleAdd(){
      this.$router.push('/home/addUser')

    },
    getRole(rdata){
      const role=''
      if(rdata==-1){
        return '超级管理员'
      }else if(rdata==0){
        return '普通管理员'
      }else if(rdata==1){
        return '普通用户'
      }
      else{
        return '权限未知'
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      getUsers({'current':this.current,'pageSize':this.pageSize}).
      then(res=>{
        if(res.code ===200){
          const datas=res.data
          console.log(datas)
          this.current=datas.current
          this.total=datas.total
          this.tableData=datas.records
        }
      })
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      getUsers({'current':this.current,'pageSize':this.pageSize}).
      then(res=>{
        if(res.code ===200){
          const datas=res.data
          console.log(datas)
          this.current=datas.current
          this.total=datas.total
          this.tableData=datas.records
        }
      })
    }

  },
  created() {
    getUsers({'current' : this.current,'pageSize':this.pageSize}).then(res =>{
      console.log(res)
      if(res.code ===200){
          let datas=res.data
          this.current=datas.current
          this.total=datas.total
          this.tableData=datas.records
      }
    },
    );
  }
}
</script>

<style lang="less" scoped></style>
