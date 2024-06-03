<script setup>
const props = defineProps({
  galgame:{
    type:Object,
    required:true
  }
})
</script>

<template>
<div class="container">
  <div class="pic">
    <img v-img-lazy="props.galgame.cover" alt="">
  </div >
  <div class="detail">
    <ul>
      <li><h1>{{props.galgame.name}}</h1></li>
      <li>{{props.galgame.score}}</li>
      <li>{{'评论'}}</li>
    </ul>
  </div>
</div>
</template>

<style scoped>
.container {
  display: flex;
  height: 166px;
  border: 1px solid lightgray;
}
.container .pic {
  flex: 2;
}
.pic img {
  width: 100%;
  height: 100%;
  padding: 10px;
}
.detail {
  flex:3;
  display: flex;
  flex-direction: column;
}
.detail ul li {
  flex:1;
}
</style>
