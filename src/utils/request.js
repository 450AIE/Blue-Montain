import axios from 'axios'
import { useUserStore } from '@/store/user.js'
import { ElMessage } from 'element-plus'

const request = axios.create({
  baseURL:'http://localhost:5173',
  timeout:5000
})
request.interceptors.request.use((config)=>{
  const userStore = useUserStore()
  if(userStore.userInfo.token){
    config.headers.Authorization=userStore.userInfo.token
  }
  return config
})
request.interceptors.response.use((res)=>{
//   2xx状态码
//   if(res.data.status>=10005){
//     ElMessage.warning('AccessToken过期或错误，正在发送RefreshToken请求新的AccessToken')
//     const userStore = useUserStore();
//     (async function(){
//       await userStore.getNewAccessToken()
//     }());
//     ElMessage.success('成功获取到AccessToken')
//   }
  return res.data
},(err)=>{
  // ElMessage.warning(err.response.data.info)
  ElMessage.warning(err)
  console.log(err)
  return Promise.reject(err)
})

export default request
