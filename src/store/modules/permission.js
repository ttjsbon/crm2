import { asyncRouterMap, constantRouterMap } from '@/router'
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    // return true
    return false
  }
}
function hasPermission_new(privs, route) {
  if (route.path === `/${privs}` || route.path === privs) {
    return true
  } else {
    return false
  }
}

function getName(route_all) {
  const arr_name = []
  route_all.forEach(route => {
    arr_name.push(`/${route.menu}`)
    if (route.subList && route.subList.length) {
      route.subList.forEach(val => {
        arr_name.push(`/${val.menu}`)
      })
    }
  })
  //console.log(arr_name)
  return arr_name
}// 拿到name
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
// function filterAsyncRouter(asyncRouterMap, roles) {
//   const accessedRouters = asyncRouterMap.filter(route => {
//     if (hasPermission(roles, route)) {
//       if (route.children && route.children.length) {
//         route.children = filterAsyncRouter(route.children, roles)
//       }
//       return true
//     }
//     return false
//   })
//   return accessedRouters
// }
function filterAsyncRouter_new(asyncRouterMap, privs, child, parentNode) {
  //console.log(asyncRouterMap)
  const accessedRouters = asyncRouterMap.filter(route => {
    if (child) {
      //console.log(route)
      if (privs.includes(route.path)) {
        if (route.children && route.children.length) {
          route.children = filterAsyncRouter_new(route.children, privs, false, route.path)
        }
        return true
      } else {
        return false
      }
    } else {
      if (privs.includes(`${parentNode}/${route.path}`)) {
        return true
      } else {
        return false
      }
    }
  })
  //console.log(accessedRouters)
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        // const { roles } = data
        let accessedRouters
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    },
    GenerateRoutes_new({ commit }, data) {
      return new Promise(resolve => {
        // const pathAll=["/user", "/user/user", "/user/address", "/user/collect", "/user/footprint", "/user/history", "/mall", "/mall/region", "/mall/brand", "/mall/category", "/mall/issue", "/mall/keyword", "/order", "/order/orderall", "/order/orderNew", "/order/orderAwaitCheck", "/order/orderAwaitRefund", "/order/orderAwaitSend", "/order/orderReceived", "/order/orderRenting", "/order/orderOverdue", "/order/orderReturning", "/goods", "/goods/list", "/goods/create", "/goods/edit", "/goods/comment", "/promotion", "/promotion/ad", "/promotion/topic", "/sys", "/sys/admin", "/sys/os", "/stat", "/stat/user", "/stat/order", "/stat/amount", "/stat/goods", "*"]
        const { privs } = data
        // let accessedRouters = filterAsyncRouter_new(asyncRouterMap, privs_test.data)
        const pathUser = getName(privs)
        //console.log(pathUser)
        const accessedRouters = filterAsyncRouter_new(asyncRouterMap, pathUser, true)
        // if (roles.indexOf('admin') >= 0) {
        //   accessedRouters = asyncRouterMap
        // } else {
        //   accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        // }
        // accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
