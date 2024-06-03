<script setup>
import {ref} from 'vue'
import { useUserStore } from '@/store/user.js'
import GalItem from '@/component/galItem.vue'
import GalCardColumn from '@/component/galCardColumn.vue'
import { useGalgameListStore } from '@/store/galgame.js'
import MyselfShowInfo from '@/views/Myself/component/MyselfShowInfo.vue'
import MyselfChangeUserInfo from '@/views/Myself/component/MyselfChangeUserInfo.vue'
import MyselfComment from '@/views/Myself/component/MyselfComment.vue'
import MyselfPublishComment from '@/views/Myself/component/MyselfPublishComment.vue'
import MyselfAdministerDelComment from '@/views/Myself/component/MyselfAdministerLookComment.vue'
import MyselfAdministerLookComment from '@/views/Myself/component/MyselfAdministerLookComment.vue'
import MyselfShowTheFlow from '@/views/Myself/component/MyselfShowTheFlow.vue'

const activeIndex = ref('1-1')
// const userStore = useUserStore()
// const galStore = useGalgameListStore()
// const curPage = ref(0)
// const nextPage = ref(1)
// const shitfPage = (val)=>{
//   console.log(val)
//   nextPage.value=val
//   curPage.value=val-1
// }
const userStore = useUserStore()
</script>

<template>
  <div class="w">
    <el-row :gutter="20">
      <el-col :span="6">
          <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo setting"
            default-active="2"
            text-color="#fff"
            @select="(idx)=>activeIndex=idx"
          >
            <el-sub-menu index="1">
              <template #title>
                <el-icon><location /></el-icon>
                <span>{{$t('myself.userInfo.userInfo')}}</span>
              </template>
                <el-menu-item index="1-1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{$t('myself.userInfo.lookUserInfo.lookUserInfo')}}</el-menu-item>
                <el-menu-item index="1-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{$t('myself.userInfo.changeUserInfo.changeUserInfo')}}</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <el-icon><location /></el-icon>
                <span>{{$t('myself.myComment.myComment')}}</span>
              </template>
               <el-menu-item index="2-1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ $t('myself.myComment.changeComment.changeComment') }}</el-menu-item>
               <el-menu-item index="2-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ $t('myself.myComment.publishComment.publishComment') }}</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="3" :disabled="!userStore.isAdminister">
              <template #title>
                <el-icon><location /></el-icon>
                <span>{{$t('myself.administerMode.administerMode')}}</span>
              </template>
              <el-menu-item-group>
                <template #title>
                  <el-icon><location /></el-icon>
                  <span>&nbsp;{{$t('myself.administerMode.operationList')}}</span>
                </template>
                <el-menu-item index="3-1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{$t('myself.administerMode.administerDelComment.administerDelComment')}}</el-menu-item>
                <el-menu-item index="3-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{$t('myself.administerMode.showTheFlow.showTheFlow')}}</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
        </el-col>
<!--      这里可以根据左侧选项来设置展示不同的内容，压缩路由-->
      <el-col :span="18" class="info">
            <MyselfShowInfo v-if="activeIndex==='1-1'"></MyselfShowInfo>
            <MyselfChangeUserInfo v-else-if="activeIndex==='1-2'"></MyselfChangeUserInfo>
            <MyselfComment v-else-if="activeIndex==='2-1'"></MyselfComment>
            <MyselfPublishComment v-else-if="activeIndex==='2-2'"></MyselfPublishComment>
            <MyselfAdministerDelComment v-else-if="activeIndex==='3-1'"></MyselfAdministerDelComment>
            <MyselfShowTheFlow v-else-if="activeIndex==='3-2'"></MyselfShowTheFlow>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.setting {
  height: 500px;
  margin-bottom: 40px;
  margin-top: 40px;
}
.info {
  height: 500px;
  margin-bottom: 40px;
  margin-top: 40px;
  background-color: lightgray;
}
.el-submenu /deep/ .el-submenu__title {
  height: 50px;
  line-height: 50px ;
}
</style>
