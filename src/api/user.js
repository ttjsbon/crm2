import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/user/v1.2/list',
    method: 'get',
    params: query
  })
}

export function createUser(data) {
  return request({
    url: '/user/create',
    method: 'post',
    data
  })
}

export function readUser(data) {
  return request({
    url: '/user/detail',
    method: 'get',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

export function getUserList(data) {
  return request({
    url: '/user/getList',
    method: 'post',
    data
  })
}
