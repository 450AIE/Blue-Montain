<script setup>

import CommentPreLook from '@/component/Comment/CommentPreLook.vue'
import { useGalgameListStore } from '@/store/galgame.js'
import { ref } from 'vue'
const galStore = useGalgameListStore()
galStore.getGalgameCommentedList()
const curPage = ref(0)
const nextPage = ref(1)
const shitfPage = (val)=>{
  console.log(val)
  nextPage.value=val
  curPage.value=val-1
}
</script>

<template>
  <div class="out">
  <div class="gal-comment-group">
    <comment-pre-look
      :comment-info="c"
      v-for="c in galStore.commentedList.filter((item,idx)=>idx>=curPage*2&&idx<nextPage*2)"
      :key="c.post_id"
      class="one-gal"
    >
    </comment-pre-look>
  </div>
  <div class="example-pagination-block page">
    <el-pagination
      background layout="prev, pager, next"
      :page-count="Math.ceil(galStore.commentedList.length/2)"
      @next-click="(val)=>shitfPage(val)"
      @prev-click="(val)=>shitfPage(val)"
      @change="(val)=>shitfPage(val)"
    />
  </div>
  </div>
</template>

<style scoped>
.page {
  position: absolute;
  left: 40%;
  bottom: 3%;
}
.out {
  position: relative;
  height: 100%;
  width: 100%;
}
.one-gal:nth-child(1) {
  margin-bottom: 20px;
}
</style>
