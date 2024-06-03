<script setup>
import {ref} from 'vue'
import { useUserStore } from '@/store/user.js'
import { ChatLineRound, User } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
// 没有设定默认字段的v-model会报错还是挂载？
const formData = ref({})
const formElement = ref(null)
const inp = ref(null)
const inpImg = ref(null)
const changeImgShow = async ()=>{
  inpImg.value.src = 'https://so1.360tres.com/t0116e2e5d2ffb32c68.jpg'
  inpImg.value.classList.add('full')
}
const rules = {
  nickname:[
    {required:true,message:'请输入用户名',trigger:blur},
  ],
  gender:[
    {required:true,message:'请选择性别',trigger:blur},
  ],
  introduction:[
    {required:true,message:'请输入自我介绍',trigger:blur}
  ]
}
const reset = ()=> (formData.value={})
const submit = ()=>{
  formElement.value.validate(async(flag)=>{
    console.log(flag)
    if(flag){
     const isExist = await userStore.changeUserInfo(formData.value)
      if(isExist){
        ElMessage.success('修改用户信息成功')
        reset()
      }
    }
  })
}
</script>

<template>

<div class="out">
  <div class="img">
    <h4>{{$t('myself.userInfo.changeUserInfo.changeUserAvatar')}}</h4>
    <div class="inp-frame">
      <img src="@/assets/plus-icon.png" alt="" ref="inpImg">
      <input type="file" name="avatar" @change="changeImgShow" ref="inp">
    </div>
  </div>
  <div class="detail">
    <div>
    <el-form
      size="large"
      :model="formData"
      class="form"
      :rules="rules"
      ref="formElement"
    >
<!--      报错？还是挂载属性？-->
      <el-form-item :label="$t('myself.userInfo.changeUserInfo.username')" prop="nickname">
        <el-input :prefix-icon="User" v-model="formData.nickname" />
      </el-form-item>
      <el-form-item :label="$t('myself.userInfo.lookUserInfo.gender')" prop="gender">
        <el-radio-group v-model="formData.gender" >
          <el-radio value="男" size="large">{{$t('myself.userInfo.changeUserInfo.man')}}</el-radio>
          <el-radio value="女" size="large">{{$t('myself.userInfo.changeUserInfo.woman')}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item  :label="$t('myself.userInfo.lookUserInfo.introduction')" prop="introduction">
        <el-input :prefix-icon="ChatLineRound" v-model="formData.introduction" />
      </el-form-item>
      <div class="btn-group">
        <el-button class="btn-submit" @click="submit">{{$t('myself.userInfo.changeUserInfo.submit')}}</el-button>
        <el-button class="btn-reset" @click="reset">{{$t('myself.userInfo.changeUserInfo.reset')}}</el-button>
      </div>
    </el-form>
    </div>
  </div>
</div>
</template>

<style scoped>
.out {
  display: flex;
  height: 100%;
  width: 100%;
}
.img {
  flex:2;
  position: relative;
  background-color: lightblue;
}
.img h4 {
  position: absolute;
  top: 15%;
  left: 39%;
}
.detail {
  flex: 3;
  /*background-color: lightcoral;*/
}
.inp-frame {
  position: absolute;
  top: 30%;
  left: 20%;
  height: 200px;
  width: 200px;
  border:3px solid lightgray;
}
.inp-frame input {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
}
.inp-frame img {
  position: absolute;
  width: 25%;
  top: 35%;
  left: 38%;
  height: 25%;
  z-index: 2;
}
.inp-frame .full {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.form {
  position: absolute;
  height: 250px;
  width:300px;
  top: 20%;
  left: 20%;
}
.detail>div {
  position: absolute;
  height: 500px;
  width: 537px;
}
.btn-submit {
  position: absolute;
  left: 10%;
  height: 40px;
  width: 80px;
  font-size: 16px;
}
.btn-reset {
  position: absolute;
  right: 10%;
  height: 40px;
  width: 80px;
  font-size: 16px;
}
.btn-group {
  position: absolute;
  width: 100%;
}
</style>
