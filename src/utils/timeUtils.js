export const getThePublishTimeChinese = (time)=>{
  const date = new Date(time*1000)
  return `${date.getFullYear()}年 ${date.getMonth() + 1}月 ${date.getDate()}日
   ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}
export const getThePublishTimeEnglish =(time)=>{
  const date = new Date(time*1000)
  return `${date.getFullYear()}Year ${date.getMonth() + 1}Month ${date.getDate()}Day
   ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

export const getThePublishTime =(time)=>{
  const date = new Date(time*1000)
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}
   ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}
