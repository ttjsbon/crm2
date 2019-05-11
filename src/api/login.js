import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/admin/info',
    method: 'get',
    params: {
      token
    }
  })
}

export function getUserPri(adminName) {
  return request({
    url: '/login/adminPrivilegesMenu',
    // url: '/login/selectMens'
    method: 'post',
    params: {
      adminName: adminName
    }
  })
}
