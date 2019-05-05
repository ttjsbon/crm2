import request from '@/utils/request'

export function statUser(query) {
  return request({
    url: '/stat/v1.2.1/user',
    method: 'get',
    params: query
  })
}

export function statOrder(query) {
  return request({
    url: '/stat/v1.2.1//order',
    method: 'get',
    params: query
  })
}

export function statAmount(query) {
  return request({
    url: '/stat/v1.2.1//amount',
    method: 'get',
    params: query
  })
}

export function statGoods(query) {
  return request({
    url: '/stat/goods',
    method: 'get',
    params: query
  })
}
