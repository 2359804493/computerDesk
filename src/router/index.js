import Vue from 'vue'
import Router from 'vue-router'
import desk from '@/components/desk'
import music from '@/components/music'
import manager from '@/components/manager'
import baidu from '@/components/baidu'
import article from '@/components/article'
import photo from '@/components/photo'

import myblogEditor from '@/components/myblogEditor'
import imgEditor from '@/components/imgEditor'
import welcome from '@/components/welcome'  
import wordEditor from '@/components/wordEditor'
import writeArticle from '@/components/writeArticle'
import articleDetail from '@/components/articleDetail'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'desk',
      component: desk
    },
    {
      path: '/music',
      name: 'music',
      component: music
    },
    {
      path: '/article',
      name: 'article',
      component: article,
      children: [
        // { path: '/article', redirect: '/writeArticle' },
        { path: '/writeArticle', component: writeArticle },
        { path: '/articleDetail', component: articleDetail }
      ]
    },
    {
      path: '/baidu',
      name: 'baidu',
      component: baidu
    },
    {
      path: '/manager',
      name: 'manager',
      component: manager,
      children: [
        { path: '/manager', redirect: '/welcome' },
        { path: '/welcome', component: welcome },
        { path: '/myblogEditor', name: 'myblogEditor', component: myblogEditor },
        { path: '/wordEditor', name: 'wordEditor', component: wordEditor },
        { path: '/imgEditor', name: 'imgEditor', component: imgEditor }
      ]
    },
    {
      path: '/photo',
      name: 'photo',
      component: photo
    }
  ]
})
