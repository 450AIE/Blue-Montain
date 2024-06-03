<script setup>

import Banner from '@/component/banner.vue'
import { useGalgameListStore } from '@/store/galgame.js'
import GalItem from '@/component/galItem.vue'
import GalCard from '@/component/galCardColumn.vue'
const galgameListStore = useGalgameListStore()
galgameListStore.getGalgameList()
</script>

<template>
<section class="w">
  <banner :list="galgameListStore.galgameList"></banner>
  <gal-item :title="$t('home.treasureGal')">
<!--    只显示前4个-->
      <gal-card :galgame="item" v-for="item in galgameListStore.galgameList.filter((i,idx)=>idx<4)" :key="item.book_id"></gal-card>
  </gal-item>
</section>
</template>

<style scoped>

</style>
