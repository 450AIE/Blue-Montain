<script setup>
setTimeout(()=>{
  location.href='/home'
},1500)
</script>

<template>
<div class="container">
  <h1 class="sentence1">抱<br>歉<br>未<br>找<br>到<br>该<br>页<br>面<br></h1>
  <h1 class="sentence2">但<br>是<br>村<br>正<br>会<br>将<br>你<br>带<br>到<br>应<br>去<br>的<br>地<br>方</h1>
  <img src="https://tse1-mm.cn.bing.net/th/id/OIP-C.4my2SpDLlX-QvTmJvdjsIwHaEK?rs=1&pid=ImgDetMain" alt="">
</div>
</template>

<style scoped>
@keyframes graduallyShow {

}
.container {
  position: relative;
  height: 100vh;
  width: 100vw;
}
.container img {
  height: 100%;
  width: 100%;
  opacity: 0.4;
}
.sentence1 {
  position: absolute;
  left: 30%;
}
.sentence2 {
  position: absolute;
  left: 20%;
}
</style>
