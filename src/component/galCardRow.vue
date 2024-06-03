<script setup>
const props = defineProps({
  galgame:{
    type:Object,
    required:true
  },
  width:{
    type:Number,
    required:false,
    default:290
  },
  height:{
    type:Number,
    required:false,
    default:430
  },
})
</script>

<template>
  <el-card :style="{width:width+'px',height:height+'px'}" >
    <template #default>
      <div class="out">
      <div class="left" :style="{width:width+'px',height:height+'px'}">
        <img v-img-lazy="props.galgame.cover" alt="" class="cover">
      </div>
      <div class="right">
        <h4>{{props.galgame.name}}</h4>
        <span>{{props.galgame.publish_time}}</span>
        <p>{{props.galgame.score}}</p>
      </div>
      </div>
    </template>
  </el-card>
</template>

<style scoped>
.out {
  display: flex;
  justify-content: space-around;
}
.out .left {
  flex:2;
}
.out .left img {
  width: 100%;
  height: 100%;
  /*max-width: 480px;
  max-height: 390px;*/
  object-fit: cover;
}
.out .right {
  flex:3;
}
</style>
