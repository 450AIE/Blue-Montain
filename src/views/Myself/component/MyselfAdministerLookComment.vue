<script setup>

import {ref} from 'vue'
import { useGalgameListStore } from '@/store/galgame.js'
import { getThePublishTime } from '@/utils/timeUtils.js'

const imitateComment = ref([])
const getComment = async ()=>{
  const galStore = useGalgameListStore()
  await galStore.getAllComment()
  imitateComment.value=JSON.parse(JSON.stringify(galStore.AllcommentList))
  for(let i=0;i<imitateComment.value.length;++i){
    imitateComment.value[i].publish_time=getThePublishTime(imitateComment.value[i].publish_time)
  }
}
getComment()
const deleteRow = (idx)=>{
  imitateComment.value.splice(idx,1)
}
</script>

<template>
<div class="out">
  <el-table :data="imitateComment" style="width: 100%" max-height="500">
    <el-table-column  prop="publish_time" :label="$t('myself.administerMode.administerDelComment.publishTime')" width="160" />
    <el-table-column prop="nickname" :label="$t('myself.administerMode.administerDelComment.username')" width="200" />
    <el-table-column prop="content" :label="$t('myself.administerMode.administerDelComment.content')" width="800" />
    <el-table-column fixed="right" :label="$t('myself.administerMode.administerDelComment.publishTime')" width="200">
      <template #default="scope">
        <el-button
          link
          type="primary"
          size="small"
          @click.prevent="deleteRow(scope.$index)"
        >
          {{$t('myself.myComment.changeComment.delete')}}
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<style scoped>
.out {
  height: 100%;
  width: 100%;
}
</style>
