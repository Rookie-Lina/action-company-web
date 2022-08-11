import {getRequest, loginRequest, postRequest, uploadFileRequest} from "./request";
import da from "element-ui/src/locale/lang/da";
import {parse} from "qs";

export const loginApi  =(params,data)=>  {
    return loginRequest('/user/login',params,data)
}
export const getUsers  =(params,data)=>  {
    return getRequest('/user/info',params,data)
}
export const getUserDetailApi  =(params,data)=>  {
    return getRequest('/user/getUserById',params,data)
}
export const DeleteUserApi  =(params,data)=>  {
    return getRequest('/user/deleteUserById',params,data)
}
export const UpdateUserApi =(params,data)=>{
    return postRequest('/user/updateUserInfo',params,data)
}
export const AddUserApi =(params,data)=>{
    return postRequest('/user/addUser',params,data)
}
// 文件上传
export const uploadFileReq = data => {
    return uploadFileRequest('/file/upload', data)
}
export const getUnCheckedGoodsApi= (params,data) =>{
    return getRequest("/goods/uncheckedList",params,data)
}
export const goodPassApi= (params,data) =>{
    return postRequest("/goods/pass",params,data)
}
export const goodUnPassApi= (params,data) =>{
    return getRequest("/goods/unpass",params,data)
}
export const goodsTypeListApi= (params,data) =>{
        return getRequest("/goods-type/goodsTypeListPage",params,data)
}
export const goodsTypeDeleteApi= (params,data) =>{
    return getRequest("/goods-type/delete",params,data)
}
export const addGoodTypeApi   =   (params,data)=>{
    return postRequest("/goods-type/one",params,data)
}
export const editGoodTypeApi   =   (params,data)=>{
    return postRequest("/goods-type/update",params,data)
}
//查询订单信息
export const getOrdersApi   =   (params,data)=>{
    return getRequest("/order/pageOrder",params,data)
}
//发货
export const StartDeliverApi   =   (params,data)=>{
    return postRequest("/order/StartDeliver",params,data)
}
//确认送达
export const hasDeliverApi   =   (params,data)=>{
    return postRequest("/order/deliver",params,data)
}





