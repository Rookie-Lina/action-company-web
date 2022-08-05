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

