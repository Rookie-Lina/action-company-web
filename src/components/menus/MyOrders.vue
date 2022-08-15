<template>
  <div>
    <el-row>
      <el-button @click="changePage(1,-1)">未付款</el-button>
      <el-button @click="changePage(2,0)" type="primary" >待发货</el-button>
      <el-button @click="changePage(3,1)" type="success" >配送中</el-button>
      <el-button @click="changePage(4,2)" type="info" >已送达</el-button>
      <el-button @click="changePage(5,3)" type="warning" >已确认收货</el-button>
      <el-button @click="changePage(6,4)" type="danger" >退款中</el-button>
    </el-row>
<!--    未付款的订单-->
    <div v-if="nowPage==1">
      <h2>未付款的订单</h2>
      <el-table
                :data="result"
                style="width: 100%">
        <el-table-column
            prop="id"
            label="订单id"
            width="180">
        </el-table-column>
        <el-table-column
            prop="goodsName"
            label="商品名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="createTime"
            label="下单时间"
            width="200">
        </el-table-column>
        <el-table-column
            prop="orderRemarks"
            label="订单备注"
            width="180">
        </el-table-column>
      </el-table>
    </div>
<!--    待发货的订单-->
    <div v-if="nowPage==2">
      <h2>待发货的订单</h2>
      <el-table
          :data="result"
          style="width: 100%">
        <el-table-column
            prop="id"
            label="订单id"
            width="180">
        </el-table-column>
        <el-table-column
            prop="goodsName"
            label="商品名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="createTime"
            label="下单时间"
            width="200  ">
        </el-table-column>
        <el-table-column
            prop="orderRemarks"
            label="订单备注"
            width="180">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button type="primary" round @click="deliverGood(scope.row)">发货</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
<!--    配送中的订单-->
    <div v-if="nowPage==3">
      <h2>配送中的订单</h2>
      <el-table
        :data="result"
        style="width: 100%">
      <el-table-column
          prop="id"
          label="订单id"
          width="180">
      </el-table-column>
      <el-table-column
          prop="goodsName"
          label="商品名称"
          width="180">
      </el-table-column>
      <el-table-column
          prop="createTime"
          label="下单时间"
          width="200  ">
      </el-table-column>
      <el-table-column
          prop="orderRemarks"
          label="订单备注"
          width="180">
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button type="primary" round @click="deliverFinish(scope.row)">已送达</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
<!--    已送达的订单-->
    <div v-if="nowPage==4">
      <h2>已送达的订单</h2>
      <el-table
          :data="result"
          style="width: 100%">
        <el-table-column
            prop="id"
            label="订单id"
            width="180">
        </el-table-column>
        <el-table-column
            prop="goodsName"
            label="商品名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="createTime"
            label="下单时间"
            width="200  ">
        </el-table-column>
        <el-table-column
            prop="orderRemarks"
            label="订单备注"
            width="180">
        </el-table-column>
      </el-table>

    </div>
<!--    确认收货的订单-->
    <div v-if="nowPage==5">
      <h2>确认收货的订单</h2>
      <el-table
          :data="result"
          style="width: 100%">
        <el-table-column
            prop="id"
            label="订单id"
            width="180">
        </el-table-column>
        <el-table-column
            prop="goodsName"
            label="商品名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="createTime"
            label="下单时间"
            width="200  ">
        </el-table-column>
        <el-table-column
            prop="orderRemarks"
            label="订单备注"
            width="180">
        </el-table-column>
      </el-table>
    </div>
<!--    退款中的订单-->
<!--    <div v-if="nowPage==6">-->
<!--      <h2>退款中的订单</h2>-->
<!--      <el-table-->
<!--                :data="result"-->
<!--                style="width: 100%">-->
<!--        <el-table-column-->
<!--            prop="id"-->
<!--            label="订单id"-->
<!--            width="180">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="goodsName"-->
<!--            label="商品名称"-->
<!--            width="180">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="createTime"-->
<!--            label="下单时间"-->
<!--            width="200  ">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="orderRemarks"-->
<!--            label="订单备注"-->
<!--            width="180">-->
<!--        </el-table-column>-->
<!--      </el-table>-->
<!--    </div>-->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="current"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div>

</template>

<script>
import {getOrdersApi, hasDeliverApi, StartDeliverApi} from "../../utils/api";

export default {
  name: 'MyOrders',
  data(){
    return{
      result:[],
      current:0,
      pageSize:1,
      total:0,
      nowPage:1,

    }
  },
  methods:{
    changePage(p,t){
      this.nowPage=p
      console.log('p'+p)
      console.log('t'+t)
      getOrdersApi({current:this.current,pageSize:this.pageSize,type:t}).then(res=>{
        console.log(res.data)
        this.result=res.data.datas
        this.current=res.data.current
        this.total=res.data.total
        this.pageSize=res.data.pageSize
      })

    },
    deliverGood(data){
      console.log(data)
      StartDeliverApi({id:data.id}).then(res=>{
        this.$message.success("发货成功")
        this.nowPage=2
        getOrdersApi({current:this.current,pageSize:this.pageSize,type:0}).then(res=>{
          console.log(res.data)
          this.result=res.data.datas
          this.current=res.data.current
          this.total=res.data.total
          this.pageSize=res.data.pageSize
        })

      })
    },
    deliverFinish(data){
      console.log(data)
      hasDeliverApi({orderId:data.id}).then(res=>{
        this.$message.success("已经确认送达")
        this.nowPage=4
        getOrdersApi({current:this.current,pageSize:this.pageSize,type:2}).then(res=>{
          console.log(res.data)
          this.result=res.data.datas
          this.current=res.data.current
          this.total=res.data.total
          this.pageSize=res.data.pageSize
        })

      })
    },
    handleCurrentChange(){
      getOrdersApi({current:this.current,pageSize:this.pageSize,type:this.nowPage-2}).then(res=>{
        console.log(res.data)
        this.result=res.data.datas
        this.current=res.data.current
        this.total=res.data.total
        this.pageSize=res.data.pageSize
      })
    },
    handleSizeChange(){
      getOrdersApi({current:this.current,pageSize:this.pageSize,type:this.nowPage-2}).then(res=>{
        console.log(res.data)
        this.result=res.data.datas
        this.current=res.data.current
        this.total=res.data.total
        this.pageSize=res.data.pageSize
      })
    }
  },
  created() {
    //默认展示未付款页面
    getOrdersApi({current:this.current,pageSize:this.pageSize,type:-1}).then(res=>{
      console.log(res.data)
      this.result=res.data.datas
      this.current=res.data.current
      this.total=res.data.total
      this.pageSize=res.data.pageSize
    })
  },
}
</script>
<style lang="less" scoped>
</style>
