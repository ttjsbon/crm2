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

export function statDataAmount(query) {
  return request({
    url: '/stat/v1.3.0/statDataAmount',
    method: 'get',
    params: query
  })
}

export function statMonthOrder(query) {
  return request({
    url: '/stat/v1.3.0/statMonthOrder',
    method: 'get',
    params: query
  })
}

export function statMonthOrderByChannle(query) {
  return request({
    url: '/stat/v1.3.0/statMonthOrderByChannle',
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

export function statMonthAmountV1_3_0(query) {
  return request({
    url: '/stat/v1.3.0/amountMonth',
    method: 'get',
    params: query
  })
}

export function statMerchantsAmountV1_3_0(query) {
  return request({
    url: '/stat/v1.3.0/MerchantsAmount',
    method: 'get',
    params: query
  })
}

export function statMonthMerchantsAmountV1_3_0(query) {
  return request({
    url: '/stat/v1.3.0/statMonthMerchantsAmountV1_3_0',
    method: 'get',
    params: query
  })
}

export function statotherAmountV1_3_0(query) {
  return request({
    url: '/stat/v1.3.0/otherAmount',
    method: 'get',
    params: query
  })
}

export function statotherAmountMonthV1_3_0(query) {
  return request({
    url: '/stat/v1.3.0/otherAmountMonth',
    method: 'get',
    params: query
  })
}