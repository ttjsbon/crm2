import request from '@/utils/request'

export function listOrder(query) {
  return request({
    url: '/order/list',
    method: 'get',
    params: query
  })
}

export function detailOrder(id) {
  return request({
    url: '/order/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export function shipOrder(data) {
  return request({
    url: '/order/ship',
    method: 'post',
    data
  })
}

export function refundOrder(data) {
  return request({
    url: '/order/refund',
    method: 'post',
    data
  })
}

export function auditOrder(data) {
  return request({
    url: '/order/audit',
    method: 'get',
    params: {
      orderId: data.orderId,
      isPass: data.isPass,
      remark: data.remark
    }
  })
}

export function freeDepositOrder(data) {
  return request({
    url: '/order/freeDeposit',
    method: 'get',
    params: {
      orderId: data.orderId,
      freeDeposit: data.freeDeposit
    }
  })
}

export function returnConfirmOrder(orderId) {
  return request({
    url: '/order/confirm',
    method: 'get',
    params: {
      orderId
    }
  })
}

export function payAndThaw(orderId, amount) {
  return request({
    url: '/order/payAndThaw',
    method: 'get',
    params: {
      orderId: orderId,
      amount: amount
    }
  })
}

export function thaw(orderId) {
  return request({
    url: '/order/thaw',
    method: 'get',
    params: {
      orderId
    }
  })
}

export function getCheckInfo(orderId, userId) {
  return request({
    url: '/order/auditInfo',
    method: 'get',
    params: {
      orderId,
      userId
    }
  })
}
