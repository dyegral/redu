import Vue from 'vue'
import VueRouter from 'vue-router'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueRouter)
Vue.prototype.axios = axios;
Vue.use(VueAxios, axios);


import App from './App.vue'
import Login from './components/login.vue'
import Register from './components/register.vue'
import Enter from './components/enter.vue'
import Index from './components/Index.vue'
import Content from './components/Content.vue'

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Enter,
      meta: {
        keepAlive: false // 不需要缓存
      }
    },
    {
      path: '/login',
      component: Login,
      meta: {
        keepAlive: false // 不需要缓存
      }
    },
    {
      path: '/register',
      component: Register,
      meta: {
        keepAlive: false // 不需要缓存
      }
    },
    {
      path: '/index',
      component: Index,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/content',
      component: Content,
      meta: {
        keepAlive: false // 不需要缓存
      }
    },
  ]
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
