<script setup>
const props = defineProps({
  list:{
    type:Array,
    required:true
  }
})
</script>

<template>
  <div class="block text-center banner w" m="t-4">
    <el-carousel trigger="click" height="300px" indicator-position="none">
      <el-carousel-item v-for="item in props.list" :key="item.book_id">
<!--        <h3 class="small justify-center" text="2xl">{{ item.cover }}</h3>-->
        <img v-img-lazy="item.cover" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<style scoped>
.banner {
  position: relative;
  height: 300px;
}
img {
  width: 100%;
  height: 300px;
}
</style>
