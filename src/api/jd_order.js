import request from '@/utils/request'

export function list(query) {
  return request({
    url: '/jdOrder/list',
    method: 'get',
    params: query
  })
}

export function detail(id) {
  return request({
    url: '/jdOrder/detail',
    method: 'get',
    params: {
      id
    }
  })
}

