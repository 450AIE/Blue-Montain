<script setup>

import GalCardColumn from '@/component/galCardColumn.vue'
import GalItem from '@/component/galItem.vue'
import { useUserStore } from '@/store/user.js'
import { useGalgameListStore } from '@/store/galgame.js'
import { ref } from 'vue'

const userStore = useUserStore()
const galStore = useGalgameListStore()
const curPage = ref(0)
const nextPage = ref(1)
const searchedUserID = ref(11)
const getOtherUserInfo = async (userID)=>{
  await userStore.getOtherUserInfo(userID)
}
const shitfPage = (val)=>{
  console.log(val)
  nextPage.value=val
  curPage.value=val-1
}

</script>

<template>
  <div class="out">
    <el-input-number
      min="1"
      class="inp-number"
      v-model="searchedUserID"
      @change="getOtherUserInfo"
      name="searchedUserID"
    ></el-input-number>
    <div class="user-info">
      <div class="img">
        <img v-img-lazy="userStore.otherUserInfo?.avatar" alt="">
      </div>
      <div>
        <h1>{{userStore.otherUserInfo.nickname}}</h1>
      </div>
      <ul class="detail">
        <li>ID:&nbsp;&nbsp;{{userStore.otherUserInfo.id}}</li>
        <li>{{ $t('myself.userInfo.lookUserInfo.gender') }}:&nbsp;&nbsp;{{userStore.otherUserInfo.gender}}</li>
        <li class="introduction">{{ $t('myself.userInfo.lookUserInfo.introduction') }}:&nbsp;&nbsp;{{userStore.otherUserInfo.introduction}}</li>
      </ul>
    </div>
    <div class="played-gal">
      <gal-item :title="$t('myself.userInfo.lookUserInfo.playedGal')" :hsize="3" justify="normal">
        <gal-card-column
          width="288"
          height="200"
          h-rate="0.65"
          :galgame="gal" v-for="gal in galStore.galgameList.filter((item,idx)=>idx>=curPage*3&&idx<nextPage*3)"
          :key="gal.book_id"
          class="one-gal"
        ></gal-card-column>
      </gal-item>
      <div class="example-pagination-block page">
        <el-pagination
          background layout="prev, pager, next"
          :page-count="Math.ceil(galStore.galgameList.length/3)"
          @next-click="(val)=>shitfPage(val)"
          @prev-click="(val)=>shitfPage(val)"
          @change="(val)=>shitfPage(val)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.out {
  position: relative;
  width: 100%;
  height: 100%;
}
.img {
  float: left;
  height: 150px;
  width: 150px;
  padding: 25px;
}
.img img {
  height: 100%;
  width: 100%;
  border-radius: 75px;
}
.user-info div:nth-child(2) {
  margin-top: 35px;
  float: left;
}
.detail {
  float: left;
  margin-left: 30px;
  margin-top: 20px;
}
.detail li {
  margin: 10px 0 10px 0;
}
.played-gal {
  position: absolute;
  bottom: 0;
  height: 350px;
}
.one-gal {
  margin-right: 10px;
}
.page {
  margin-top: 20px;
  margin-left: 175px;
}
.introduction {
  width: 550px;
}
.inp-number {
  position: absolute;
  right: 20%;
}
</style>
