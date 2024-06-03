import { defineStore } from 'pinia'
import {ref} from 'vue'
import { changeUserInfoAPI, getNewAccessTokenAPI, getUserInfoAPI, getUserLoginAPI } from '@/api/user.js'
import { ElMessage } from 'element-plus'

export const useUserStore = defineStore('user',()=>{
  const userInfo = ref({})
  const isAdminister = ref(false)
  const otherUserInfo = ref({})
  // const userInfo = {nickname:'TH'}
  const getUserLogin = async ({username,password})=>{
    console.log('username',username,'password',password)
    const res = await getUserLoginAPI({username,password})
    userInfo.value=res.data
    console.log('这是请求用户信息',res)
    userInfo.value.nickname=username || 'AMD'
    userInfo.value.password = password || 'RX7900XTX'
    userInfo.value.token=`Bearer ${userInfo.value.token}`
    userInfo.value.refresh_token = `Bearer ${userInfo.value.refresh_token}`
  }
  const getNewAccessToken = async()=>{
    const res = await getNewAccessTokenAPI(userInfo.value.refresh_token)
    console.log('获取新的AccessToken：',res)
    userInfo.value.token = res.token
  }
  const getUserInfo = async (user_id='11')=>{
    const res = await getUserInfoAPI(user_id)
    userInfo.value = {...userInfo.value,...res.data,}
  }
  const changeUserInfo = async (info)=>{
    console.log('传递的用户修改信息',info)
    const res =  await changeUserInfoAPI(info)
    if(res.status===10002){
      console.log(res)
      ElMessage.warning('该用户不存在')
      return false
    }
    //怎么才可以覆盖别的字段而不让token消失呢？
    //试一试展开运算符，看看放前面和后面是覆盖相同字段的值的情况吗？
    //直接再获取一边即可，因为不会返回修改后的信息
    console.log(res)
    await getUserInfo()
  }
  const getOtherUserInfo = async (user_id)=>{
    const res = await getUserInfoAPI(user_id)
    if(res.status===10002){
      ElMessage.warning('该用户不存在')
    }
    otherUserInfo.value = res.data
  }
  return {
    userInfo,
    getUserInfo,
    getUserLogin,
    getNewAccessToken,
    changeUserInfo,
    isAdminister,
    getOtherUserInfo,
    otherUserInfo
  }
},{
  persist:true
})
