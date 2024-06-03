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
  maxWidth:{
    type:Number,
    required:false,
  }
})
</script>

<template>
  <el-card :style="{width:width+'px',height:height+'px',maxWidth:maxWidth+'px'||'100%' }">
    <template #default>
      <div class="div-cover" >
        <img v-img-lazy="props.galgame.cover"
         alt=""
         class="cover"
        >
      </div>
      <h4>{{props.galgame.name}}</h4>
      <span>{{props.galgame.publish_time}}</span>
      <p>{{props.galgame.score}}</p>
    </template>
  </el-card>
</template>

<style scoped>
.div-cover {
  height: 50%;
  width: 100%;
}
.cover {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>
