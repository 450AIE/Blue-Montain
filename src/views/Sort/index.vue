<script setup>
import { useGalgameListStore } from '@/store/galgame.js'
import { useRoute } from 'vue-router'
import GalCardRow from '@/component/galCardRow.vue'
import GalItem from '@/component/galItem.vue'
import { searchKindOfGalAPI } from '@/api/searchGalgame.js'
import {ref,onMounted} from 'vue'
import GalCardColumn from '@/component/galCardColumn.vue'
import SortSubBanner from '@/views/Sort/component/SortSubBanner.vue'

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
  <section class="w relative">
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
      <gal-item :title="$t('sort.suspenseGal')"  id="suspense">
        <gal-card-column :galgame="gal" v-for="gal in suspenseGalList" :key="gal.book_id" class="galcard"></gal-card-column>
      </gal-item>
      <gal-item :title="$t('sort.infiniteLoopGal')" id="infinite" >
        <gal-card-column :galgame="gal" v-for="gal in loopGalList" :key="gal.book_id" class="galcard"></gal-card-column>
      </gal-item>
      <gal-item :title="$t('sort.loveGal')" id="love">
        <gal-card-column :galgame="gal" v-for="gal in loveGalList" :key="gal.book_id" class="galcard"></gal-card-column>
      </gal-item>
    </div>
    <div class="sub-nav" v-show="!route.query.kind">
      <ul>
        <li><a href="#suspense">{{$t('sort.suspenseGal')}}</a></li>
        <li><a href="#infinite">{{$t('sort.infiniteLoopGal')}}</a></li>
        <li><a href="#love">{{$t('sort.loveGal')}}</a></li>
      </ul>
    </div>
    <SortSubBanner :list="galStore.galgameList"></SortSubBanner>
  </section>
</template>

<style scoped>
.relative {
  position: relative;
}
.sub-nav ul li {
  flex:1;
  border-bottom: 1px solid lightgray;
  padding: 20px 10px 10px 10px;
  text-align: center;
}
.sub-nav ul li:nth-child(3) {
  border-bottom:0;
}
.sub-nav ul {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  width: 100%;
  height: 100%;
}
.sub-nav {
  position: absolute;
  top: 300px;
  right: -160px;
  height: 240px;
  width: 100px;
  background-color: whitesmoke;
  border:1px solid lightgray;
}
.galcard {
  margin-top: 10px;
}
</style>
