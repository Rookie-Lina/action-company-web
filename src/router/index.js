import Vue from 'vue'
import VueRouter from "vue-router";
import MyLogin from "@/components/MyLogin";
import MyHome from "@/components/MyHome";

import myUsers from "@/components/menus/MyUsers";
import myOrders from "@/components/menus/MyOrders";
import MyUserDetail from "@/components/user/MyUserDetail";
import MyEditUser from "../components/user/MyEditUser";
import MyUserAdd from "../components/user/MyUserAdd";
import myCheck from "../components/menus/MyCheck";
import MyCheck from "../components/menus/MyCheck";
import myGoodsType from "../components/menus/MyGoodsType";
import checkTime from "../components/Check/CheckTime.vue";
import addGoodsType from "../components/GoodType/AddGoodsType";
import editGoodType from "../components/GoodType/EditGoodType";
Vue.use(VueRouter)

const router = new VueRouter({
    routes:[
        //登录的路由规则
        {path:'/login' , component:MyLogin},
        {path:'/',redirect:'/login'},
        {path:'/home',component:MyHome,
            redirect:'/home/users',
        children: [
            {path:'users',component:myUsers},
            {path:'checks',component:MyCheck},
            {path:'goodsType',component:myGoodsType},
            {path:'addGoodType',component:addGoodsType,props:true},
            {path:'editGoodType',component:editGoodType,props:true},
            {path:'orders',component:myOrders},
            //用户详情页的路由规则
            {path:'userInfo',component:MyUserDetail,props:true},
            {path:'editUser',component:MyEditUser,props:true},
            {path:'addUser',component:MyUserAdd},
            {path:'setRaiseTime',component:checkTime,props:true}
        ]}
    ]
})
router.beforeEach(function (to,from,next){
    //如果是登录页直接放行
    if(to.path=='/'||to.path=='/login'){
        next()
    }
    else {
        const token=localStorage.getItem('token')
        if(token){
            next()
        }
        else {
            next("/login")
        }

    }
})
export default router

