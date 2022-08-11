<template>
  <div>
<!--    <span class="demonstration">请选择开始拍卖的时间</span>-->
    <el-date-picker
        v-model="time"
        type="datetime"
        placeholder="选择日期时间">
    </el-date-picker>
    <el-button type="success" @click="submit">提交</el-button>
  </div>
</template>
<script>
import {goodPassApi} from "../../utils/api";
export default {
  name: 'MyCheckTime',
  data(){
    return{
      gid:this.$route.query.gid,
      time:'',
      goodsTimeVo:{
        id:'',
        raiseTime:''
      }
    }
  },
  methods:{
    submit(){
      this.goodsTimeVo.id=this.gid
      this.goodsTimeVo.raiseTime=this.time
      goodPassApi({},this.goodsTimeVo).then(res => {
        this.$message({
          message: '审核通过',
          type: 'success'
        });
        this.$router.push('/home/checks')
        // location.reload()
      })
    }

  }
}
</script>
<style lang="less" scoped></style>
