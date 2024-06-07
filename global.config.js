import {ref} from 'vue'

const globalData = ref({
  isFloatingWindowShow:true,
  isDark:false,
  // 先读取本地有无记录，无则默认中文
  Language:localStorage.getItem('language') || 'zh',
  // 用来判断导航栏上选择的哪一个页面
  headerActiveIndex:1
})


export default globalData
