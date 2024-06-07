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
  },
  wRate:{
    type:Number,
    required:false,
    default:0.85
  },
  hRate:{
    type:Number,
    required:false,
    default:0.7
  }
})
</script>

<template>
  <el-card :style="{width:props.width+'px',height:props.height+'px',maxWidth:props.maxWidth+'px' }">
    <template #default>
      <div class="div-cover" :style="{width:props.width*props.wRate+'px',height:props.height*props.hRate+'px'}">
        <img v-img-lazy="props.galgame.cover"
         alt=""
         class="cover"
        >
      </div>
      <h4 class="title">{{props.galgame.name}}</h4>
      <span>{{props.galgame.publish_time}}</span>
      <p class="score">{{$t('components.galCardColumn.averageScore')}}: <span>{{props.galgame.score}}</span></p>
    </template>
  </el-card>
</template>

<style scoped>
.score span {
  font-weight: 700;
  color: #e2231a;
}
.score {
  text-align: center;
}
.title {
  margin-top: 10px;
  text-align: center;
}
.div-cover {
  height: 50%;
  width: 100%;
}
.cover {
  height: 100%;
  width: 100%;
}
</style>
