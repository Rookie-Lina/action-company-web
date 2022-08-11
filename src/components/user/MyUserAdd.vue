<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="头像" prop="goodsImg">
      <el-input v-if="false" v-model="user.userPhoto"/>
      <el-upload
          ref="upload"
          class="upload-demo"
          action=""
          accept=".png,.jpg,.bmp"
          :limit="1"
          :multiple="false"
          :auto-upload="false"
          :on-change="changeImg"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-form-item>
    <el-form-item label="账号" >
      <el-input v-model="user.loginName"></el-input>
    </el-form-item>
    <el-form-item label="昵称" >
      <el-input v-model="user.userName"></el-input>
    </el-form-item>
    <el-form-item label="真实姓名">
      <el-input v-model="user.trueName"></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="user.userSex">
        <el-radio  :label="1">男</el-radio>
        <el-radio  :label="0">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="角色 ">
      <el-radio-group v-model="user.roleId">
        <el-radio :label="0"></el-radio>
        <el-radio :label="1"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="手机号">
      <el-input v-model="user.userPhoto"></el-input>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="user.userEmail"></el-input>
    </el-form-item>
    <el-form-item label="生日">
      <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期"style="width: 100%;" v-model="user.birthday"></el-date-picker>
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
import {AddUserApi, uploadFileReq} from "../../utils/api";

export default {
  name:'MyUserAdd',
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
      user:{
        id: 1,
        loginName: '',
        loginPwd: '',
        userSex: 0,
        userName: '',
        trueName: '',
        birthday: '',
        userPhoto: '',
        userEmail: '',
        userScore: '',
        roleId: '',
        userPhone: '',
        saleScore: ''
      },
      files: [],
      formData: '',
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
          this.uploadFile()
          this.$message.success('添加用户成功')

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    uploadFile() {
      // console.log('files', this.files)
      this.files.forEach(f => this.formData.append('file', f.raw))
      // console.log(this.formData)
      uploadFileReq(this.formData).then(res => {
        // console.log(this.user)
        // console.log('a')
        // console.log(res.code)
        // console.log('b')
        // console.log(res.data)
        if (res.code === 200) {
          console.log(res)
          this.user.userPhoto = res.message
          // console.log(this.user.userPhoto)
          AddUserApi({},this.user).then(res=>{
            console.log(res)
            this.$router.push('/home')
          })
        }
      })
    },
    changeImg(file, fileList) {
      console.log(file, fileList)
      this.files = fileList
    },

  },
  created() {
    this.formData=new FormData();
  }
}
</script>
