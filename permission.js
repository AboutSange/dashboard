/**
 * permission
 * author: houjiazong <houjiazong@gmail.com>
 * date: 2018/08/07
 */
import * as R from 'ramda'
import router from './router'
import store from './store'
import { hasPermission } from '@/utils/auth'

// 获取scope beforeEach
const scopePermission = require.context('../scope', false, /.\/permission.js/)
let scopeBeforeEach
scopePermission.keys().forEach(name => {
  const obj = scopePermission(name)
  scopeBeforeEach = obj.beforeEach
})

router.beforeEach(async (to, from, next) => {
  const { authPage = false, auth = true } = to.meta
  // 无token情况
  // 是否为需要认证的页面，是则跳转至登录进行认证，否则next
  const hasToken = !!store.getters.auth.token
  if (!hasToken) {
    if (auth) {
      return next('/auth/login')
    }
    return next()
  }
  // 有token情况
  // 如果是登录相关(authPage)页面，则跳转回首页
  // 不需要认证的页面直接next
  if (authPage) {
    return next('/')
  }
  if (!auth) {
    return next()
  }
  // 需要认证页面
  if (!hasToken) return next('/auth/login')
  const hasRoles = !R.isEmpty(store.getters.userInfo.roles) && !R.isNil(store.getters.userInfo.roles)
  const hasPermission = !R.isEmpty(store.getters.permission) && !R.isNil(store.getters.permission)
  const hasScopeResource = !R.isEmpty(store.getters.scopeResource) && !R.isNil(store.getters.scopeResource)
  const hasCapability = !R.isEmpty(store.getters.capability) && !R.isNil(store.getters.capability)
  try {
    !hasRoles && await store.dispatch('auth/getInfo')
    !hasCapability && await store.dispatch('auth/getCapabilities')
    !hasPermission && await store.dispatch('auth/getPermission')
    !hasScopeResource && await store.dispatch('auth/getScopeResource')
  } catch (error) {
    throw error
  } finally {
    next()
  }
})

// 检测权限，无权限导向403
router.beforeEach((to, from, next) => {
  const { meta = {} } = to.matched[0]
  if (meta.permission) {
    const isPermission = hasPermission({ key: meta.permission })
    if (!isPermission) return next('/403')
  }
  if (meta.hidden) {
    const isHidden = meta.hidden()
    if (isHidden) return next('/403')
  }
  next()
})

scopeBeforeEach && router.beforeEach(scopeBeforeEach)
