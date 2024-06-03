<script setup>

import { useGalgameListStore } from '@/store/galgame.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getThePublishTime } from '../../utils/timeUtils.js'


const props = defineProps({
  width:{
    type:Number,
    required:false
  },
  height:{
    type:Number,
    required:false
  },
  commentInfo:{
    type:Object,
    required:true
  }
})
const galStore = useGalgameListStore()
const update = ()=>{
  // 这里面显示修改内评论内容的表单信息
  ElMessageBox.prompt('请输入新的评论内容', '请输入内容', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern:
      /./,
    inputErrorMessage: '评论内容不可以为空哟',
  })
    .then(({ value }) => {
      galStore.updateGalgameComment(props.commentInfo.post_id,value)
    })
}
const del = async()=>{
  await ElMessageBox.confirm(
    '你确定要删除该评论吗?',
    '请再次确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async ()=>await galStore.delGalgameComment(props.commentInfo.post_id))
}
</script>

<template>
<div class="container" :style="{width:props.width+'px',height:props.height+'px'}">
  <div class="user-info">
    <div class="img">
      <img v-img-lazy="props.commentInfo.avatar" alt="">
    </div>
    <h4>{{props.commentInfo.nickname}}</h4>
    <span class="time">{{$t('myself.myComment.changeComment.publishTime')}}:&nbsp;{{getThePublishTime(commentInfo.publish_time)}}</span>
      <el-button type="primary" class="change" @click="update">{{ $t('myself.myComment.changeComment.change') }}</el-button>
      <el-button type="danger" class="del" @click="del">{{ $t('myself.myComment.changeComment.delete') }}</el-button>
  </div>
  <div class="comment-detail">
    <div class="cover">
      <img v-img-lazy="commentInfo.cover" alt="">
    </div>
    <div class="comment-content">
      <span>{{props.commentInfo.content}}</span>
      <span class="praise">{{ $t('myself.myComment.changeComment.priseCount') }}:{{props.commentInfo.praise_count}}</span>
    </div>
  </div>
</div>
</template>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 180px;
  background-color: lightcoral;
}
.user-info {
  width: 100%;
  height: 40%;
  background-color: lightblue;
}
.comment-detail {
  width: 100%;
  height: 60%;
}
.img {
  position: absolute;
  left: 1%;
  top: 5%;
  height: 50px;
  width: 50px;
}
.img img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}
.user-info h4 {
  position: absolute;
  left: 8%;
  top: 13%;
}
.comment-detail {
  display: flex;

  align-items: center;
}
.cover {
  height: 108px;
  flex: 3;
  background-color: lavenderblush;
  //overflow: hidden;
}
.cover img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  padding: 10px 20px 10px 20px;
}
.comment-content {
  flex: 7;
  height: 108px;
  background-color: lightcyan;
}
.comment-content span:nth-child(1) {
  position: absolute;
  left: 33%;
  top: 50%;
}
.praise {
  position: absolute;
  bottom: 10%;
  left: 31%;
  color: #a8abb2;
}
.time {
  position: absolute;
  left: 15%;
  top: 13%;
  color: #a8abb2;
}
.del {
  position: absolute;
  top: 8%;
  right:5%;
  width: 80px;
  height: 40px;
}
.change {
  position: absolute;
  top: 8%;
  width: 80px;
  height: 40px;
  right:20%;
}
</style>
