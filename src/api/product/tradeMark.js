//这个模块主要获取的是品牌管理的数据的模块

import request from '@/utils/request.js'


//获取品牌列表的接口
// /admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList=(page,limit)=>request({url:`/admin/product/baseTrademark/${page}/${limit}`,method:'get'});
// 添加品牌  /admin/product/baseTrademark/save  post

//修改品牌   /admin/product/baseTrademark/update put

export const reqAddOrUpdateTradeMark=(tradeMark)=>{
    if(tradeMark.id){
        return request({url:'/admin/product/baseTrademark/update',method:'put',data:tradeMark})
    }else{
        return request({url:'/admin/product/baseTrademark/save',method:'post',data:tradeMark})
    }
}
//删除品牌的接口/admin/product/baseTrademark/remove/{id}  delete
export const reqDeleteTradeMark=(id)=>request({url:`/admin/product/baseTrademark/remove/${id}`,method:"delete"})