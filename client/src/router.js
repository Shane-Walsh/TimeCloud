/* eslint-disable */ 
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Signup from './views/Signup.vue'
import Login from './views/Login.vue'
import Workspace from './views/Workspace.vue'
import Folder from './views/Folder.vue'
import FolderDetail from './views/FolderDetail.vue'

Vue.use(Router)

const login = {
  path: '/login',
  name: 'login',
  component: Login,
  meta: { title: 'Login - enamel' }
}
const workspace = {
  path: '/w',
  name: 'workspace',
  component: Workspace,
  meta: { title: 'Workspace - enamel', requiresAuth: true },
  children: [
    {
      path: 'folder/:id',
      component: Folder,
      props: true,
      children: [
        {
          path: '',
          name: 'folder',
          component: FolderDetail
        },
        // {
        //   path: 'task/:taskId',
        //   name: 'task',
        //   component: Task,
        //   props: true
        // }
      ]
    }
  ]
}

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { title: 'TimeCloud' }
    },
    {
      path: '/signup/:id',
      name: 'signup',
      component: Signup,
      meta: { title: 'Signup - TimeCloud' }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { title: 'Login - TimeCloud' }
     }
  ]
}) 
  router.beforeEach((to, from, next) => {
    const auth = localStorage.getItem('user-id')
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if(!auth) {
        next(login)
      }
    } else if (to.matched.some(record => record.meta.redirect)) {
      if(auth) {
        next(workspace)
      }
    }
    next()
  })
  router.afterEach((to, from) => {
    document.title = to.meta.title
  })
  export default router