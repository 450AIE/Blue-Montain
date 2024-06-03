<script setup>
//这个只是框架，里面渲染几个卡片交给card组件v-for
const props = defineProps({
  title:{
    type:String,
    required:true
  },
  hsize:{
    type:Number,
    required:true,
    default:1
  },
  justify:{
    type:String,
      required:false,
  default:'space-around'
  },
})

</script>

<template>
    <div class="item">
      <h1 v-show="hsize===1">{{props.title}}</h1>
      <h2 v-show="hsize===2">{{props.title}}</h2>
      <h3 v-show="hsize===3">{{props.title}}</h3>
      <h4 v-show="hsize===4">{{props.title}}</h4>
      <h5 v-show="hsize===5">{{props.title}}</h5>
      <div class="content" :style="{justifyContent:justify}">
<!--        放一个个el卡片-->
        <slot>
        </slot>
      </div>
    </div>
</template>

<style scoped>
.item h1,
.item h2,
.item h3,
.item h4,
.item h5 {
  padding-bottom: 20px;
  border-bottom: 1px solid lightgray;
}
.content {
  display: flex;
  flex-wrap: wrap;
}
</style>
