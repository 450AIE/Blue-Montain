<script setup>
import {ref} from 'vue'
import { useRouter } from 'vue-router'
import { useGalgameListStore } from '@/store/galgame.js'
import globalData from '../../../../global.config.js'
import bus from '@/utils/bus.js'
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
// 获取根据路由跳转后判断跳转后的路由路径来分配底边bar更简单


const bottomBar = ref(null)
const home = ref(null)
const rank = ref(null)
const sort = ref(null)
const myself = ref(null)

const bottomBarMove = (e)=>{
  bottomBar.value.style.left = (e.target.getBoundingClientRect().left+document.documentElement.scrollLeft) + 'px'
  let width = 0
  globalData.value.headerActiveIndex = e.target.dataset.id
  if(globalData.value.Language==='en'){
    if(globalData.value.headerActiveIndex==='1') width=73
    else if(globalData.value.headerActiveIndex==='2') width=60
    else if(globalData.value.headerActiveIndex==='3') width=50
    else width=79
  }else if(globalData.value.Language==='zh'){
    width=50
  }
  bottomBar.value.style.width = width +'px'
}


const changeTheBarBottom = ()=>{
    if(globalData.value.headerActiveIndex==='1'){
      home.value?.$.vnode.el?.click()
    }else if(globalData.value.headerActiveIndex==='2'){
      rank.value?.$.vnode.el?.click()
    }else if(globalData.value.headerActiveIndex==='3'){
      sort.value?.$.vnode.el?.click()
    }else{
      myself.value?.$.vnode.el?.click()
    }
 }
bus.on('changeLanguage',changeTheBarBottom)

const redoBottomBar = ()=>{
  home.value?.$.vnode.el?.click()
}
</script>

<template>
<header>
  <ul class="sort">
    <li><h1><router-link to="/home" @click="redoBottomBar">{{$t('header.title')}}</router-link></h1></li>
    <li><router-link to="/home"  @click="bottomBarMove" data-id="1" ref="home">{{$t('header.home')}}</router-link></li>
    <li><router-link to="/rank"  @click="bottomBarMove" data-id="2" ref="rank">{{$t('header.rank')}}</router-link></li>
    <li><router-link to="/sort"  @click="bottomBarMove" data-id="3" ref="sort">{{$t('header.sort')}}</router-link></li>
    <li><router-link to="/myself"  @click="bottomBarMove" data-id="4" ref="myself">{{$t('header.myself')}}</router-link></li>
    <li>
      <el-input
        v-model="searchInp"
        style="width: 300px"
        :placeholder="$t('header.kindOfSearchGal')"
        clearable
        class="search-inp"
        @keyup.enter="search"
      />
    </li>
  </ul>
  <div class="bottom-bar" ref="bottomBar"></div>
</header>
</template>

<style scoped>
header {
  width: 1640px;
  height: 132px;
  background-color: white;
}
.sort li:nth-child(n+2) {
  margin-top: 50px;
}
.search-inp {
  position: absolute;
  right: 200px;
}
.sort {
  width: 100%;
  position: relative;
  border-bottom: 2px solid whitesmoke;
}
.sort li {
  float: left;
  padding: 0 50px;
  font-size: 25px;
}
.sort li:nth-child(1) a{
  background: url('https://pic3.zhimg.com/v2-91bc367414ca9016b4fce38c9c962f09_r.jpg') no-repeat center/contain;
}

.bottom-bar {
  position: absolute;
  height: 2px;
  width: 80px;
  background-color: orange;
  top: 140px;
  left: 505px;
  transition: all 0.4s ease;
}
/*
header {
  position: relative;
  height: 132px;
  background-color: white;
  display: flex;
  align-items: center;
}
.sort {
  display: flex;
  width: 100%;
  position: relative;
  justify-content: space-around;
  align-items: center;
  border-bottom: 2px solid whitesmoke;
}
.sort li {
  margin-left: 100px;
  font-size: 25px;
}
.sort li:nth-child(1) a{
  background: url('https://pic3.zhimg.com/v2-91bc367414ca9016b4fce38c9c962f09_r.jpg') no-repeat center/contain;
}*/
</style>
