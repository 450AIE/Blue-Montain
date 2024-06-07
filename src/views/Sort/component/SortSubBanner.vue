<script setup>
import {ref,onMounted} from 'vue'
const props = defineProps({
  list:{
    type:Array,
    required:true
  }
})

const nowPage = ref(1)
const totalPage = ref(Math.ceil(props.list.length/4))
const showingWindow = ref(null)
const windowBox = ref(null)
const prePage = ()=>{
  // console.log('这是parseInt',parseInt(showingWindow.value.style.top))
  // console.log('这是number“',Number(showingWindow.value.style.top))
  //如果默认top:0，那么parseInt((showingWindow.value.style.top)取出的会是NaN
  //此时就需要手动设置
  if(!parseInt((showingWindow.value.style.top))){
    console.log('还会进入吗')
    nowPage.value++
    showingWindow.value.style.top='-588px'
  }else{
    //当第一次设置后，parseInt就会取出整数部分，就会执行这部分了
    nowPage.value++
    if(nowPage.value>totalPage.value){
      nowPage.value=1
      showingWindow.value.style.top='0'
    }else{
      showingWindow.value.style.top =  (parseInt(showingWindow.value.style.top)-588)+'px'
    }
  }
}
const nextPage = ()=>{
  //只有第一次和top:0的时候才会进入这里
  if(!parseInt((showingWindow.value.style.top))){
    console.log('还会进入吗')
    nowPage.value=nowPage.value=totalPage.value
    showingWindow.value.style.top=(-588*(totalPage.value-1))+'px'
  }else{
    //当第一次设置后，parseInt就会取出整数部分，就会执行这部分了
    nowPage.value--
    if(nowPage.value===0){
      nowPage.value=totalPage.value
      showingWindow.value.style.top=(588*(totalPage.value-1))+'px'
    }else{
      showingWindow.value.style.top =  (parseInt(showingWindow.value.style.top)+588)+'px'
    }
  }
}
onMounted(()=>{
  window.addEventListener('scroll',()=>{
    const scroll = document.documentElement.scrollTop
    if(parseInt(scroll)>900){
      windowBox.value.style.position='fixed'
      windowBox.value.style.left='50px'
      windowBox.value.style.top='200px'
      // showingWindow.value.style.top = (50+showingWindow.value.getBoundingClientRect().top)+'px'
    }else{
      windowBox.value.style.position='absolute'
      windowBox.value.style.left='-200px'
      windowBox.value.style.top='50px'
    }
  })
})


</script>

<template>
<div class="out" ref="windowBox">
  <div class="showing-window" ref="showingWindow">
    <div class="img" v-for="(item,index) in props.list" :key="index">
      <img :src="item.cover" alt="">
    </div>
</div>
  <div class="up-arrow" @click="prePage"></div>
  <div class="down-arrow" @click="nextPage"></div>
</div>
</template>

<style scoped>
.showing-window {
  transition: all 0.6s ease;
  width: 100%;
  height: 100%;
  top: 0;
  position: relative;
}
.out {
  width: 150px;
  height: 600px;
  position: absolute;
  left: -200px;
  top: 50px;
  border:3px solid lightcoral;
  overflow: hidden;
  transition: all 0.4s ease;
}
.img {
  height: 137px;
  margin: 10px;
}
.img img {
  height: 100%;
  width: 100%;
}
.down-arrow {
  content: "";
  position: absolute;
  left: 50%;
  width: 40px;
  height: 20px;
  bottom: -10px;
  background-color: rgba(0,0,0,0.3);
  transform: translateX(-50%);
  cursor: pointer;
}
.up-arrow {
  content: "";
  position: absolute;
  left: 50%;
  top: -10px;
  width: 40px;
  height: 20px;
  background-color: rgba(0,0,0,0.3);
  transform: translateX(-50%);
  cursor: pointer;
}
</style>
