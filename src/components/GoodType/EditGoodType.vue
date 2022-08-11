<template>
  <el-form :inline="true"  class="demo-form-inline">
    <el-form-item label="名称">
      <el-input v-model="GName" placeholder="请输入名称"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">更改 </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import {editGoodTypeApi} from "../../utils/api";

export default {
  name:'EditGoodType',
  data() {
    return {
      GName: '',
      GId:this.$route.query.goodId
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
      editGoodTypeApi({'name':this.GName,'id':this.GId}).then(res=>{
        this.$message.success(
            {
              message:'修改成功',
              type:"success"
        })
        this.$router.push('/home/goodsType')
      })
    }
  }
}
</script>
