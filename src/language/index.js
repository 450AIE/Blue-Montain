import zh from './zh.js'
import en from './en.js'
import { createI18n } from 'vue-i18n'
import globalConfig from '../../global.config.js'

const i18n = createI18n({
  // 要增加本地存储的功能
  //右边一定要写成字符串，不然默认英语
  locale:globalConfig.value.Language,
  messages:{
    zh,
    en
  },
  legacy:false,

})

export default i18n
