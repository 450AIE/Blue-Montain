import {ref} from 'vue'

const globalData = ref({
  isFloatingWindowShow:false,
  isDark:false,
  // 先读取本地有无记录，无则默认中文
  Language:localStorage.getItem('language') || 'zh'
})

export default globalData
