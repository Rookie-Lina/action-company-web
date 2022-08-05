import Vue from 'vue'
import VueRouter from "vue-router";
import MyLogin from "@/components/MyLogin";
import MyHome from "@/components/MyHome";

Vue.use(VueRouter)

const router = new VueRouter({
    routes:[
        //登录的路由规则
        {path:'/login' , component:MyLogin},
        {path:'/',redirect:'/login'},
        {path:'/home',component:MyHome}
    ]
})
export default router

