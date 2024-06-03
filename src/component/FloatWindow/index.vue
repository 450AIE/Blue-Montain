<script setup>
import {onMounted,ref} from 'vue'
import * as echarts from 'echarts'

const container = ref(null)
onMounted(()=>{
  const floatWindow = echarts.init(container.value)
  const option = {
    title: {
      text: '玩家平均游玩喜好'
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: '纯爱', max: 10000 },
        { name: 'NTR', max: 10000 },
        { name: '治愈', max: 10000 },
        { name: '清新', max: 10000 },
        { name: '后宫', max: 10000 },
        { name: '战争', max: 10000 }
      ]
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: [9100, 1000, 9000, 6500, 9400, 4000],
          },
        ]
      }
    ]
  };
  floatWindow.setOption(option)
})
const moveTheEcharts = (e=>{
  const oldDivLeft = container.value.getBoundingClientRect().left
  const oldDivTop  = container.value.getBoundingClientRect().top
  const oldMouseLeft = e.pageX
  const oldMouseTop = e.pageY
  let changeX = 0
  let changeY = 0
  // 给window加监听，不然鼠标超出盒子后就得不到e了，这个时间只能在盒子内生效
  const echartsMoveWithMouseMove = e=>{
    changeX = e.pageX - oldMouseLeft
    changeY = e.pageY - oldMouseTop
    container.value.style.left=(oldDivLeft+changeX)+'px'
    container.value.style.top=(oldDivTop+changeY)+'px'
  }
  window.addEventListener('mousemove',echartsMoveWithMouseMove)
  window.addEventListener('mouseup',()=>{
    window.removeEventListener('mousemove',echartsMoveWithMouseMove)
  })
})
</script>

<template>
<div class="container" ref="container" @mousedown="moveTheEcharts"></div>
</template>

<style scoped>
.container {
  position: absolute;
  height: 300px;
  width: 250px;
  top: 30%;
  z-index: 999;
}
</style>
