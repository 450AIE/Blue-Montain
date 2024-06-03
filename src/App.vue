<script setup>
import floatWindow from '@/component/FloatWindow/index.vue'
import globalConfig from '../global.config.js'

</script>

<template>
<div id="app" :class="{'dark-theme':globalConfig.isDark}">
<!--  <el-config-provider :locale="en">-->
  <router-view></router-view>
  <float-window v-if="globalConfig.isFloatingWindowShow"></float-window>
<!--  </el-config-provider>-->
</div>
</template>

<style scoped>

</style>
