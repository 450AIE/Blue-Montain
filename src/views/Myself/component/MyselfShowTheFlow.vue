<script setup>
import {onMounted,ref,watch} from 'vue'
import * as echarts from 'echarts'
import BasicCard from '@/component/basicCard.vue'
import globalData from '../../../../global.config.js'

let TendencyEcharts
const tendency = ref(null)
const data = ref([])

if(globalData.value.Language==='zh') data.value=['周一', '周二', '周三', '周四', '周五', '周六', '周日']
else data.value=['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']

watch(
  ()=>globalData.value.Language,
  (newValue)=>{
  if(newValue==='zh') data.value=['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  else data.value=['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
  const option = {
    xAxis: {
      data: data.value
    },
  }
  TendencyEcharts.setOption(option)
},{
  deep:true,
})
onMounted(()=>{
  TendencyEcharts = echarts.init(tendency.value)
  const option = {
    xAxis: {
      type: 'category',
      data: data.value
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  };
  TendencyEcharts.setOption(option)
})

</script>

<template>
<div class="out">
  <div class="basic-info">
    <basic-card :message="$t('myself.administerMode.showTheFlow.userNum')" num="89">
      <img src="@/assets/yonghu1.png" alt="" class="icon">
    </basic-card>
    <basic-card :message="$t('myself.administerMode.showTheFlow.messageNum')" num="298">
      <img src="@/assets/taolun.png" alt="" class="icon">
    </basic-card>
    <basic-card :message="$t('myself.administerMode.showTheFlow.transactionSum')" num="2.3">
      <img src="@/assets/qian.png" alt="" class="icon">
    </basic-card>
  </div>
  <div class="tendency" ref="tendency"></div>
  <span class="flow">{{$t('myself.administerMode.showTheFlow.weekFlow')}}</span>
</div>
</template>

<style scoped>
.out {
  width: 100%;
  height: 100%;
}
.basic-info {
  display: flex;
  justify-content: space-around;
}
.icon {
  position: absolute;
  height: 50px;
  width: 50px;
}
.tendency {
  width: 100%;
  height: 400px;
}
.flow {
  position: absolute;
  top: 160px;
  left: 700px;
}
</style>
