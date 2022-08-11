<template>
<!--  <h2>请输入您要添加的类别名称</h2>-->
<!--  <el-input v-model="name" placeholder="请输入内容"></el-input>-->
  <el-form :inline="true"  class="demo-form-inline">
    <el-form-item label="请输入新商品类别的名称">
      <el-input v-model="GName" placeholder="名称"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">新建</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import {addGoodTypeApi} from "../../utils/api";

export default {
  name:'AddGoodType',
  data(){
    return{
      parentGrade:this.$route.query.parentGrade,
      parentId:this.$route.query.parentId,
      GName:''
    }
  },
  methods:{
    onSubmit(){
      console.log(this.parentGrade)
      console.log(this.parentId)
      addGoodTypeApi({name:this.GName,grade:this.parentGrade,parentId:this.parentId}).then(res=>{
        this.$message({
          message: '添加类别成功！',
          type: 'success'
        });
        this.$router.push('/home/goodsType')
      })
    }
  }

}
</script>
<style lang="less" scoped>
</style>
