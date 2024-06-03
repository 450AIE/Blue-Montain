import request from '@/utils/request.js'

//获取全部，显示用splice切出几个就可以了
export const getGalgamelistAPI = ()=>  request({url:'/api/book/list'})

export const getGalgameCommentedListAPI = (book_id)=>request({url:`api/comment/${book_id}`})

export const delGalgameCommentAPI = (comment_id)=>request({url:`api/comment/${comment_id}`,method:'DELETE'})

export const updateGalgameCommentAPI = (comment_id,content)=>request({url:`api/comment/${comment_id}`,method:'PUT',data:{content}})

export const publishGalgameCommentAPI = (book_id,content) =>request({url:`/api/comment/${book_id}`,method:'POST',data:{content}})

