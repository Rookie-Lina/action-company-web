<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名">
      <el-input v-model="user.userName"></el-input>
    </el-form-item>
    <el-form-item label="真实姓名">
      <el-input v-model="user.trueName"></el-input>
    </el-form-item>
    <el-form-item label="手机号">
      <el-input v-model="user.userPhone"></el-input>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="user.userEmail"></el-input>
    </el-form-item>
    <el-form-item label="生日">
      <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="user.birthday" style="width: 100%;"></el-date-picker>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import {UpdateUserApi} from "../../utils/api";

export default {
  name:'MyEditUser',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        this.user.loginPwd=this.ruleForm.pass
        callback()
      }
    };
    return {
      user:this.$route.query.user,
      ruleForm: {
        pass: '',
        checkPass: '',
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      },

    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message.success('修改成功')
          UpdateUserApi({},this.user).then(res=>{
            console.log(res)
            this.$router.push({
              path:'/home/userInfo',
              query:{
                'user':this.user
              }
            })
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
