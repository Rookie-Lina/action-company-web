<template>
  <el-descriptions title="用户信息" direction="vertical" :column="4" border>
<!--    <el-descriptions-item label="用户头像">{{ user.userPhoto }}</el-descriptions-item>-->
    <el-descriptions-item label="用户真实姓名">{{ user.trueName }}</el-descriptions-item>
    <el-descriptions-item label="用户昵称">{{ user.userName }}</el-descriptions-item>
    <el-descriptions-item label="手机号">{{ user.userPhone }}</el-descriptions-item>
    <el-descriptions-item label="账号">{{ user.loginName }}</el-descriptions-item>
    <el-descriptions-item label="用户邮箱">{{ user.userEmail }}</el-descriptions-item>
  </el-descriptions>
</template>

<script>
import {getUserDetailApi} from "../../utils/api";

export default {
  name: 'MyUserDetail',
  data(){

    return{
      user:this.$route.query.user,
    }
  },
  methods:{

  }
}
</script>

<style lang="less" scoped></style>
