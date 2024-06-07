<script setup>

import LayoutNav from '@/views/Layout/component/LayoutNav.vue'
import LayoutFooter from '@/views/Layout/component/LayoutFooter.vue'
import LayoutHeader from '@/views/Layout/component/LayoutHeader.vue'
</script>

<template>
  <layout-nav></layout-nav>
  <layout-header></layout-header>
  <router-view></router-view>
  <layout-footer></layout-footer>
</template>

<style scoped>

</style>
