<script setup>
import { useUserStore } from '@/store/user.js'
import { useRouter } from 'vue-router'
import { Moon, Sunny } from '@element-plus/icons-vue'
import globalConfig from '../../../../global.config.js'
import { useI18n } from 'vue-i18n'
import bus from '@/utils/bus.js'

const router = useRouter()
const userStore = useUserStore()
const QuitLogin =()=>{
  userStore.userInfo.value={}
  router.replace('/login')
}


const changeLanguage = (val)=> {
  localStorage.setItem('language', val)
  locale.value=val
  bus.emit('changeLanguage',null)
}


const {locale} = useI18n()
</script>

<template>
  <div class="top-nav">
    <div class="w">
    <ul v-if="userStore.userInfo.token">
<!--          如果用户登录了，就显示对应用户名和图标-->
      <li>
        <i class="iconfont icon-yonghu"></i>{{userStore.userInfo.nickname}}
      </li>
      <li v-if="!userStore.isAdminister">
        <el-popconfirm :title="$t('nav.isDecideOpen')" :confirm-button-text="$t('nav.Open')" :cancel-button-text="$t('nav.cancel')" @confirm="userStore.isAdminister=true" width="200">
          <template #reference>
            {{ $t('nav.openAdministerMode') }}
          </template>
        </el-popconfirm>
      </li>
      <li v-else>
        <el-popconfirm :title="$t('nav.isDecideClose')" :confirm-button-text="$t('nav.Close')" :cancel-button-text="$t('nav.cancel')" @confirm="userStore.isAdminister=false" width="200">
          <template #reference>
            {{ $t('nav.closeAdministerMode') }}
          </template>
        </el-popconfirm>
      </li>
      <li>
          <el-popconfirm :title="$t('nav.isDecideQuitLogin')" :confirm-button-text="$t('nav.Close')" :cancel-button-text="$t('nav.cancel')" @confirm="QuitLogin" width="200">
            <template #reference>
              {{ $t('nav.quitLogin') }}
            </template>
          </el-popconfirm>
      </li>
      <li>
        <el-switch
          v-model="globalConfig.isDark"
          style="--el-switch-on-color: #2c2c2c; --el-switch-off-color: #f2f2f2"
          :active-action-icon="Moon"
          :inactive-action-icon="Sunny"
        />
      </li>
<!--      语言选择-->
      <li>
        <el-select v-model="globalConfig.Language"
         :placeholder="globalConfig.Language
          ==='zh'?'中文':'英文'"
         @change="changeLanguage"
          style="width: 80px">
          <el-option
            key="1"
            label="英文"
            :value="'en'"
          />
          <el-option
            key="1"
            label="中文"
            :value="'zh'"
          />
        </el-select>
      </li>
    </ul>
    <ul v-else>
<!--          没有登陆，就显示请登录-->
      <li>
        <router-link to="/login" class="please-login">请登录</router-link>
      </li>
    </ul>
    </div>
  </div>
</template>
<style scoped>
.top-nav {
  width: 1640px;
  background-color: #333333;
}
.top-nav ul {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 53px;
}
.top-nav ul li {
  margin-left: 20px;
  color: #cdcdcd;
}
.please-login {
  color: #cdcdcd;
}
</style>
