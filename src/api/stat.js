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

export function statOrderV1_3_0(query) {
  return request({
    url: '/stat/v1.3.0/order',
    method: 'get',
    params: query
  })
}

export function statAmountV1_3_0(query) {
  return request({
    url: '/stat/v1.3.0/amount',
    method: 'get',
    params: query
  })
}