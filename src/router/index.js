import Vue from 'vue'
import Router from 'vue-router'
// 导入组件
import Home from '../components/home.vue'
import Index from '../view/index/index.vue'
import Category from '../view/category/category.vue' // 引入品类组件
import Cart from '../view/cart/cart.vue' // 引入购物车组件
import My from '../view/my/my.vue'
import Order from '../view/my/order.vue'
import OrderAll from '../view/my/orderall.vue'
Vue.use(Router)

export default new Router({
  routes: [
    // 首页路径
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'index',
          name: 'index',
          component: Index
        },
        {
          path: 'category',
          name: 'category',
          component: Category
        },
        {
          path: 'cart',
          name: 'cart',
          component: Cart
        },
        {
          path: 'my',
          name: 'my',
          component: My
        }
      ]
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
      children: [
        {
          path: 'orderall',
          name: 'orderall',
          component: OrderAll
        }
      ]
    }
  ]
})
