import request from '@/utils/request.js'

//登陆API
export const getUserLoginAPI = ({username='AMD',password='RX7900XTX'})=>request({url:'/api/user/token',params:{username,password}})

export const getNewAccessTokenAPI = (refresh_token)=> request({url:'/api/user/token/refresh',params:{refresh_token}})

export const changeUserInfoAPI = (info)=> {
  const data = {}
  if(info?.nickname){
    data.nickname=info.nickname
  }
  if(info?.gender){
    data.gender = info.gender
  }
  if(info?.introduction){
    data.introduction = info.introduction
  }
  console.log({ ...data })
  const todata = {...data}
  return request({
    url: '/api/user/info', method: 'PUT',
    data:  todata
  })
}

export const getUserInfoAPI=(user_id='11')=>request({url:`/api/user/info/${user_id}`})
