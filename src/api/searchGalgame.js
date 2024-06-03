import request from '@/utils/request.js'
//输入书籍标签
export const searchKindOfGalAPI = (label)=>request({url:'/api/book/label',params:{label}})
