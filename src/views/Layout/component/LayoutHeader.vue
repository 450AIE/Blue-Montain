<script setup>
import {ref} from 'vue'
import { useRouter } from 'vue-router'
import { useGalgameListStore } from '@/store/galgame.js'
const searchInp = ref('')
const galStore = useGalgameListStore()
const router = useRouter()
const search = async()=>{
  galStore.getKindGalList(searchInp.value)
  // 传递kind，便于显示搜索的类型
  router.push({
    path:'/sort',
    query:{kind:searchInp.value}
  })
}
</script>

<template>
<header>
  <ul class="sort">
    <li><h1><router-link to="/home">{{$t('header.title')}}</router-link></h1></li>
    <li><router-link to="/home">{{$t('header.home')}}</router-link></li>
    <li><router-link to="/rank">{{$t('header.rank')}}</router-link></li>
    <li><router-link to="/sort">{{$t('header.sort')}}</router-link></li>
    <li><router-link to="/myself">{{$t('header.myself')}}</router-link></li>
    <li>
      <el-input
        v-model="searchInp"
        style="width: 300px"
        :placeholder="$t('header.kindOfSearchGal')"
        clearable
        @keyup.enter="search"
      />
    </li>
  </ul>
</header>
</template>

<style scoped>
header {
  height: 132px;
  background-color: white;
  display: flex;
  align-items: center;
}
.sort {
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
}
.sort li {
  margin-left: 100px;
  font-size: 25px;
}
.sort li:nth-child(1) a{
  background: url('https://pic3.zhimg.com/v2-91bc367414ca9016b4fce38c9c962f09_r.jpg') no-repeat center/contain;
}
</style>
