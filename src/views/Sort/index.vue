<script setup>
import { useGalgameListStore } from '@/store/galgame.js'
import { useRoute } from 'vue-router'
import GalCardRow from '@/component/galCardRow.vue'
import GalItem from '@/component/galItem.vue'
import { searchKindOfGalAPI } from '@/api/searchGalgame.js'
import {ref} from 'vue'
import GalCardColumn from '@/component/galCardColumn.vue'

const route = useRoute()
const galStore = useGalgameListStore()
const suspenseGalList = ref([])
const loveGalList = ref([])
const loopGalList = ref([])
const getSuspenseGalList = async()=>{
  const res = await searchKindOfGalAPI('悬疑')
  suspenseGalList.value=res.data
}
const getLoveGalList = async()=>{
  const res = await searchKindOfGalAPI('爱情')
  loveGalList.value=res.data
}
const getLoopGalList = async()=>{
  const res = await searchKindOfGalAPI('轮回')
  loopGalList.value=res.data
}
getSuspenseGalList()
getLoveGalList()
getLoopGalList()
// 实验用户获取信息
// const userStore = useUserStore()
// userStore.getUserInfo({})
</script>

<template>
  <section class="w">
  <el-breadcrumb separator=">">
    <el-breadcrumb-item :to="{ path: '/sort' }">分类</el-breadcrumb-item>
    <el-breadcrumb-item>{{route.query.kind?route.query.kind:'全部'}}</el-breadcrumb-item>
  </el-breadcrumb>
<!--    搜索框查询的分类进入这里-->
    <div v-if="route.query.kind">
      <gal-card-row :galgame="gal" v-for="gal in galStore.kindGalList" :key="gal.book_id" width="1200" class="galcard"></gal-card-row>
    </div>
<!--    没有查询默认进入这里-->
    <div v-else>
      <gal-item :title="$t('sort.suspenseGal')">
        <gal-card-column :galgame="gal" v-for="gal in suspenseGalList" :key="gal.book_id" class="galcard"></gal-card-column>
      </gal-item>
      <gal-item :title="$t('sort.infiniteLoopGal')">
        <gal-card-column :galgame="gal" v-for="gal in loopGalList" :key="gal.book_id" class="galcard"></gal-card-column>
      </gal-item>
      <gal-item :title="$t('sort.loveGal')">
        <gal-card-column :galgame="gal" v-for="gal in loveGalList" :key="gal.book_id" class="galcard"></gal-card-column>
      </gal-item>
    </div>
  </section>
</template>

<style scoped>
.galcard {
  margin-top: 10px;
}
</style>
