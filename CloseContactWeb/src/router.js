

import Vue from 'vue'
import Router from 'vue-router'
import store from "@/store/store";
import {getToken} from "@/utils/auth";
import App from "@/App";
Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
    routes: [

      {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
        path: '',
        component: () => import('./layouts/main/Main.vue'),
        children: [
      // =============================================================================
      // Theme Routes
      // =============================================================================
          {
            path: '/',
            name: 'home',
            component: () => import('./views/Home.vue'),
            rule: 'admin'
          },
          {
            path: '/search',
            name: 'search',
            component: () => import('./views/app/Search.vue'),
          },
          {
            path: '/map',
            name: 'map',
            component: () => import('./views/app/BaiduMap.vue'),
          },
          {
            path: '/contactInfo/contactList',
            name: 'contactList',
            component: () => import('./views/app/ContactList.vue')
          },
          {
            path: '/userInfo/userList',
            name: 'userList',
            component: () => import('./views/app/UserList.vue')
          }
        ],
      },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
      {
        path: '',
        component: () => import('@/layouts/full-page/FullPage.vue'),
        children: [
      // =============================================================================
      // PAGES
      // =============================================================================
          {
            path: '/pages/login',
            name: 'pageLogin',
            component: () => import('@/views/pages/Login.vue')
          },
          {
            path: '/pages/error-404',
            name: 'pageError404',
            component: () => import('@/views/pages/Error404.vue')
          },
        ]
      },
      // Redirect to 404 page, if no match found
      {
        path: '*',
        redirect: '/pages/error-404'
      }
    ],
})
const whiteList = ["/pages/login",
  "/pages/forgot-password",
  "/pages/error-404",
  "/pages/error-505",
  "/pages/register",
  "/callback",
  "/pages/comingsoon"] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar

  // set page title
  // document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/pages/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
    } else {
      const hasGetUserInfo = store.getters.hasUserInfo
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo')
          next()
        } catch (error) {
          // remove token and go to login page to re-login
          Vue.prototype.$vs.notify({
            time: 2500,
            title: 'error',
            text: error.message,
            iconPack: 'feather',
            position: 'top-center',
            icon: 'icon-alert-circle',
            color: 'danger',
          });
          await store.dispatch('user/resetToken')
          next(`/pages/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/pages/login?redirect=${to.path}`)
    }
  }
})


router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})

const createRouter = () => new Router({
  // mode: 'hash', // require service support
  scrollBehavior: () => ({ x:0, y: 0 }),
  routes: router
})

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
