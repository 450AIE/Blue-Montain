<script setup>
import {ref} from 'vue'
import bus from '@/utils/bus.js'
import globalData from '../../../../global.config.js'
const props = defineProps({
  // 这个是设置页面往下滑动多少时显示导航栏
  showHeight:{
    type:Number,
    required:true,
    default:0
  },
})
const fixedNav = ref(null)
window.addEventListener('scroll',()=>{
  const nowDown = document.documentElement.scrollTop
  if(nowDown>=props.showHeight) fixedNav.value.style.top='0px'
  else fixedNav.value.style.top='-80px'
})
const barBottom = ref(null)
const changeBarBottom = ()=>{
  if(globalData.value.Language==='zh'){
    barBottom.value.style.left='700px'
  }else{
    barBottom.value.style.left='750px'
  }
}

bus.on('changeLanguage',changeBarBottom)

</script>

<template>
  <div class="out" ref="fixedNav">
    <div class="bottom-bar" ref="barBottom"></div>
    <ul>
      <li><router-link to="/home"><h1 class="title">{{$t('header.title')}}</h1></router-link></li>
      <li><router-link to="/home">{{$t('header.home')}}</router-link></li>
      <li><router-link to="/rank">{{$t('header.rank')}}</router-link></li>
      <li><router-link to="/sort">{{$t('header.sort')}}</router-link></li>
      <li><router-link to="/myself">{{$t('header.myself')}}</router-link></li>
    </ul>
  </div>
</template>

<style scoped>
.bottom-bar {
  position: absolute;
  width: 80px;
  height: 2px;
  top: 60px;
  background-color: orange;
  left: 750px;
}
.title {
  margin: 0;
}
.out ul li:nth-child(n+2) {
  padding: 0 80px;
  font-size: 24px;
}
.out ul li {
  float: left;
}
.out ul {
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  line-height: 80px;
}
.out {
  position: fixed;
  top: -80px;
  width: 1640px;
  height: 80px;
  border-bottom: 2px solid whitesmoke;
  z-index: 100;
  transition: all 0.6s ease;
  background-color: white;
}
</style>
