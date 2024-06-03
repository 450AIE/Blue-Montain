import { defineStore } from 'pinia'
import {ref} from 'vue'
import {
  delGalgameCommentAPI,
  getGalgameCommentedListAPI,
  getGalgamelistAPI, publishGalgameCommentAPI,
  updateGalgameCommentAPI
} from '@/api/galgame.js'
import { searchKindOfGalAPI } from '@/api/searchGalgame.js'
import { useUserStore } from '@/store/user.js'
import { ElMessage } from 'element-plus'
export const useGalgameListStore = defineStore('galgameList',()=>{
  const galgameList = ref([])
  const kindGalList = ref([])
  const commentedList = ref([])
  const AllcommentList = ref([])
  const getKindGalList = async(label)=>{
    const res = await searchKindOfGalAPI(label)
    kindGalList.value=res.data
  }
  const getGalgameList = async ()=>{
    const res = await getGalgamelistAPI()
    console.log(res)
    galgameList.value=res.data
  }
  const getPreNrank = (n)=>{
    const NewArr = JSON.parse(JSON.stringify(galgameList.value))
    NewArr.sort((cur,nex)=>{
      return nex.score-cur.score
    })
    console.log(NewArr)
    console.log(NewArr.slice(0,n))
    return NewArr.slice(0,n)
  }
  const getGalgameCommentedList = async ()=>{
    const list = []
    // 每本书
    for(let i =1;i<=50;++i){
      const res = await getGalgameCommentedListAPI(String(i))
      if(res.data){
        //每本书的每个评论
        for(let j = 0;j<res.data.length;++j){
          const userStore = useUserStore()
          const userID = res.data[j].user_id
          if(userID===userStore.userInfo.id){
            console.log('push成功',res.data[j])
            const gal = galgameList.value.find(item=>item.book_id===Number(res.data[j].book_id))
            list.push({...res.data[j],cover:gal.cover})
          }
        }
      }
    }
    commentedList.value  = JSON.parse(JSON.stringify(list))
    console.log('commentedList.value为：',commentedList.value)
  }
  const getAllComment = async ()=>{
    const list = []
    for(let i =1;i<=50;++i) {
      const res = await getGalgameCommentedListAPI(String(i))
      if(res.data){
        for(let j = 0;j<res.data.length;++j){
          list.push(res.data[j])
        }
      }
    }
    AllcommentList.value=JSON.parse(JSON.stringify(list))
    console.log('AllcommentList为',AllcommentList.value)
  }
  const delGalgameComment = async (comment_id) =>{
    await delGalgameCommentAPI(comment_id)
    ElMessage.success('删除评论成功')
    await getGalgameCommentedList()
  }
  const updateGalgameComment = async(comment_id,content)=>{
    await updateGalgameCommentAPI(comment_id,content)
    ElMessage.success('修改评论成功')
    await getGalgameCommentedList()
  }
  const publishGalgameComment = async (book_id,content)=>{
    await publishGalgameCommentAPI(book_id,content)
    ElMessage.success('发布评论成功')
  }
  //没有返回null，有则返回值拷贝
  const findGalInfoLocallyByID =(id)=>{
    const gal = galgameList.value.find(item=>item.book_id===id)
    if(gal) return JSON.parse(JSON.stringify(gal))
    else return null
  }
  return {
    galgameList,
    getGalgameList,
    getPreNrank,
    getKindGalList,
    kindGalList,
    getGalgameCommentedList,
    commentedList,
    delGalgameComment,
    updateGalgameComment,
    publishGalgameComment,
    findGalInfoLocallyByID,
    getAllComment,
    AllcommentList
  }
},{
  persist:true
})
