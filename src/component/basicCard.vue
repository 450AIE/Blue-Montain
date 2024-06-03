<script setup>
const props = defineProps({
  message:{
    type:String,
    required:true,
  },
  num:{
    type:Number,
    required:false
  },
  width:{
    type:Number,
    required:false,
  },
  height:{
    type:Number,
    required:false,
    default:100
  },
})
</script>

<template>
<div class="out" :style="{height:props.height+'px',width:props.width+'px'}">
  <div class="img">
    <slot></slot>
  </div>
  <h3>{{props.message}}</h3>
  <p>{{props.num}}</p>
</div>
</template>

<style scoped>
.out {
  position: relative;
  background-color: white;
}
.img {
  position: absolute;
  left: 20px;
  top: 20px;
}
h3 {
  position: absolute;
  top: 10px;
  left: 100px;
}
p {
  position: absolute;
  font-size: 30px;
  left: 100px;
  bottom: 30px;
  color: #cec5c5;
}
</style>
