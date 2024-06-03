<script setup>
import {ref,onMounted} from 'vue'
import GalCardColumn from '@/component/galCardColumn.vue'
import { useGalgameListStore } from '@/store/galgame.js'

const formData = ref({
  galID:1,
  content:''
})
const nowGal = ref({})
const galStore = useGalgameListStore()
galStore.getGalgameCommentedList()
onMounted(()=>nowGal.value=galStore.galgameList[0])
const formElement = ref(null)
const changeGalShow = (val)=>{
  nowGal.value=galStore.findGalInfoLocallyByID(val)
  console.log(nowGal.value)
}
const rules = {
  galID:[
    {required:true,message:'请选择一个评论对象',trigger:blur}
  ],
  content:[
    {required:true,message:'请输入评论内容',trigger:blur}
  ]
}
const publish = async ()=>{
  // formElement.value.validate(async (flag)=>{
  //   console.log('这是校验',flag)
  //   if(flag){
      await galStore.publishGalgameComment(formData.value.galID,formData.value.content)
  //   }
  // })
  formData.value = {}
}
</script>

<template>
<div class="container">
  <div class="now-gal">
    <h3>{{$t('myself.myComment.publishComment.choosedGal')}}</h3>
    <gal-card-column class="now-gal" :galgame="nowGal"></gal-card-column>
  </div>
  <div class="column"></div>
  <div class="content">
    <h3>{{$t('myself.myComment.publishComment.pleaseEnterComment')}}</h3>
    <el-form
      ref="formElement"
      :rules="rules"
      class="form"
      :model="formData"
      label-position="right"
      label-width="120"
    >
    <el-form-item label="galgame ID" prop="galID">
      <el-input-number
        min="1"
        max="50"
        v-model="formData.galID"
        @change="changeGalShow"
        name="galID"
      ></el-input-number>
    </el-form-item>
      <el-form-item :label="$t('myself.myComment.publishComment.comment')" prop="content">
        <el-input
          show-word-limit="show-word-limit"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 8 }"
          maxlength="100"
          resize="none"
          name="content"
          v-model="formData.content"
          class="inp-comment"
        ></el-input>
      </el-form-item>
      <el-button class="btn" @click="publish">{{$t('myself.userInfo.changeUserInfo.submit')}}</el-button>
    </el-form>
  </div>
</div>
</template>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: lightcoral;
}
.now-gal {
  position: absolute;
  margin-left: 10px;
  margin-top: 10px;
}
.content {
  position: absolute;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  left: 45%;
  height: 80%;
  width: 50%;
}
.column {
  position: absolute;
  height: 93%;
  left: 40%;
  width: 3px;
  top: 10px;
  background-color:orange;
}
.content h3 {
  flex: 1;
}
.content .form {
  flex: 7;
  width: 100%;
}
.inp-comment {
  width: 250px;
}
.btn {
  position: absolute;
  bottom: -60px;
  width: 100%;
  height: 50px;
}
</style>
