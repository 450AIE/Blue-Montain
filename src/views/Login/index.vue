<script setup>
import {ref} from 'vue'
import { useUserStore } from '@/store/user.js'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()
const formdata = ref({
  username:'',
  password:''
})
const rules = {
  username:[
    {required:true,message:'请输入用户名，亲',trigger:blur}
  ],
  password:[
    {required:true,message:'请输入密码，亲',trigger:blur}
  ]
}
const onSubmit = async ()=>{
  await userStore.getUserLogin({username:formdata.value.username,password:formdata.value.password})
  await userStore.getUserInfo()
  ElMessage.success('登陆成功')
  setTimeout(()=>router.push('/'),1000)
}
(async function(){
  await userStore.getNewAccessToken()
}());
</script>

<template>
  <el-row >
    <el-col :span="12" class="left">
    </el-col>
    <el-col :span="8" :offset="2">
      <div class="formTab">
      <el-tabs  l="activeName" class="demo-tabs" @tab-click="handleClick" >
        <el-tab-pane label="登陆" name="first">
          <el-form :model="formdata" label-width="auto" :rules="rules">
            <el-form-item label="用户名" class="el-form-item" prop="username">
              <el-input
                v-model="formdata.username"
                placeholder="默认账户用户名为AMD"
              />
            </el-form-item>
            <el-form-item label="密码" class="el-form-item" prop="password">
              <el-input
                v-model="formdata.password"
                type="password"
                placeholder="默认账户密码为RX7900XTX"
              ></el-input>
            </el-form-item>
            <el-button type="primary" @click="onSubmit" class="btn">登陆</el-button>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="second">

        </el-tab-pane>
      </el-tabs>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped>
.left {
  height: 100vh;
  background: url('https://pic1.zhimg.com/v2-d260e3baf2a6ef38f552184e7c387cf9_r.jpg') no-repeat;
  background-size: 100% 100%;
}
.formTab {
  margin-top:175px;
}
.btn {
  width: 100%;
  height: 40px;
}
.el-form-item {
  margin-bottom: 40px;
}
.el-form-item:nth-child(1) {
  margin-top: 40px;
}
</style>
