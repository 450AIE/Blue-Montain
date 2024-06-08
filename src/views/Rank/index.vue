<script setup>

import {ref,onMounted} from 'vue'
import * as echarts from 'echarts'
import { useGalgameListStore } from '@/store/galgame.js'
import RankPre from '@/views/Rank/component/RankPre.vue'
import GalItem from '@/component/galItem.vue'
import GalCard from '@/component/galCardColumn.vue'
import LayoutFixed from '@/views/Layout/component/LayoutFixed.vue'
import bus from '@/utils/bus.js'

const galitem = ref(null)
const galitemHeigh = ref(0)
const galgameListStore = useGalgameListStore()
const preThree = ref([])
// // 取出分数最高的前三名
preThree.value = galgameListStore.getPreNrank(3)
const chart = ref(null)



onMounted(()=>{
  const myChart = echarts.init(chart.value);
  const option = {
    title: {
      text: '排行榜前50种类',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 10, name: '战争' },
          { value: 3, name: '后宫' },
          { value: 12, name: '纯爱' },
          { value: 12, name: '悬疑' },
          { value: 13, name: '轮回' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  myChart.setOption(option)
  galitemHeigh.value = galitem.value.$el.getBoundingClientRect().top+document.documentElement.scrollTop
})
</script>

<template>
  <layout-fixed :show-height="galitemHeigh"></layout-fixed>
<section class="w">
  <div class="pre-three">
    <div class="rank">
      <rank-pre :galgame="gal" v-for="gal in preThree" :key="gal.book_id"></rank-pre>
    </div>
    <div ref="chart" class="chart"></div>
  </div>
  <gal-item :title="$t('rank.moreGal')" ref="galitem">
    <gal-card :galgame="item" v-for="item in galgameListStore.galgameList" :key="item.book_id" class="one-gal"></gal-card>
  </gal-item>
</section>
</template>

<style scoped>
.one-gal {
  margin-bottom: 10px;
}
.pre-three {
  display: flex;
  height: 500px;
  align-items: center;
}
.pre-three .rank {
  flex: 3;
}
.pre-three .chart {
  flex:2;
  height: 100%;
  width: 100%;
  border:1px solid lightgray;
}
</style>
