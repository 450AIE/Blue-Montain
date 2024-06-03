import { useIntersectionObserver } from '@vueuse/core'

export const directivesPlugin = {
  install(app){
    app.directive('img-lazy',{
      mounted(el,binding){
        useIntersectionObserver(el,([{isIntersecting}])=>{
          if(isIntersecting){
            el.src=binding.value
          }
        })
      },
      updated(el,binding){
        useIntersectionObserver(el,([{isIntersecting}])=>{
          if(isIntersecting){
            el.src=binding.value
          }
        })
      }
    })
  }
}
