import request from '@/utils/request'

export function listOrder(query) {
  return request({
    url: '/order/list',
    method: 'get',
    params: query
  })
}

export function listOrder2(query) {
  return request({
    url: '/order/v1.2/list',
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

export function detailOrder2(id) {
  return request({
    url: '/order/v1.2/detail',
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

export function auditRefund(data) {
  return request({
    url: '/order/v1.4.0/auditRefund',
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

export function enterTheAmountOfCompensation(orderId, amount) {
  return request({
    url: '/order/v1.2/enterTheAmountOfCompensation',
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
    url: '/order/v1.2/auditInfo',
    method: 'get',
    params: {
      orderId,
      userId
    }
  })
}

export function refund(orderId) {
  return request({
    url: '/order/v1.2/refund',
    method: 'get',
    params: {
      orderId
    }
  })
}

export function channleAllAdmin() {
  return request({
    url: '/channle/queryChannleAll',
    method: 'get'
  })
}

export function shipOrderV1_3(data) {
  return request({
    url: '/order/v1.3/ship',
    method: 'post',
    data
  })
}

export function listOrderV1_2_4(query) {
  return request({
    url: '/order/v1.2.4/list',
    method: 'get',
    params: query
  })
}

export function refundOrderAmount(id) {
  return request({
    url: '/order/v1.3.0/getRefundAmount',
    method: 'get',
    params: {
      id
    }
  })
}

export function refundOrderV1_3_0(id) {
  return request({
    url: '/order/v1.3.0/refundV1_3_0',
    method: 'get',
    params: {
      id
    }
  })
}

export function detailOrder3(id) {
  return request({
    url: '/order/v1.3/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export function listOrderV1_4_0(query) {
  return request({
    url: '/order/v1.4.0/list',
    method: 'get',
    params: query
  })
}

export function listCompensationV1_4_0(query) {
  return request({
    url: '/order/v1.4.0/listCompensation',
    method: 'get',
    params: query
  })
}

export function addRemarkV1_4_0(remark, orderId) {
  return request({
    url: '/order/v1.4.0/addRemark',
    method: 'get',
    params: {
      remark,
      orderId
    }
  })
}

export function detailOrder4(id) {
  return request({
    url: '/order/v1.4/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export function listOrder4(query) {
  return request({
    url: '/order/v1.4/list',
    method: 'get',
    params: query
  })
}

export function refundOrderV1_4_0(id) {
  return request({
    url: '/order/v1.4.0/refund',
    method: 'get',
    params: {
      id
    }
  })
}

export function listOrderV1_5_0(query) {
  return request({
    url: '/order/v1.5.0/list',
    method: 'get',
    params: query
  })
}

export function listCompensationV1_5_0(query) {
  return request({
    url: '/order/v1.5.0/listCompensation',
    method: 'get',
    params: query
  })
}

export function listAlsoNotMachineV1_5_0(query) {
  return request({
    url: '/order/v1.5.0/listAlsoNotMachine',
    method: 'get',
    params: query
  })
}

export function listOrderOverdueANDBadDebtsV1_5_0(query) {
  return request({
    url: '/order/v1.5.0/listOrderOverdueANDBadDebts',
    method: 'get',
    params: query
  })
}

export function detailOrderV1_5_3(id) {
  return request({
    url: '/order/v1.5.3/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export function listOrderV1_5_4_1(query) {
  return request({
    url: '/order/v1.5.4.1/list',
    method: 'get',
    params: query
  })
}

export function basicInfoReportV1_5_4(id) {
  return request({
    url: '/order/v1.5.4/basicInfoReport',
    method: 'get',
    params: {
      id
    }
  })
}

export function listOrderV1_5_4(query) {
  return request({
    url: '/order/v1.5.4/list',
    method: 'get',
    params: query
  })
}

export function listOrderReport(id) {
  return request({
    url: '/order/v1.5.4/getReportRemark',
    method: 'post',
    params: {
      id
    }
  })
}

export function addOrderReport(query) {
  return request({
    url: '/order/v1.5.4/addReportRemark',
    method: 'post',
    params: query
  })
}

export function refundFailure(query) {
  return request({
    url: '/order/v1.5.4.2/refundFailure',
    method: 'get',
    params: query
  })
}

export function listNewOrderV1_5_5(query) {
  return request({
    url: '/order/v1.5.5/newOrderlist',
    method: 'get',
    params: query
  })
}

export function orderStatusFlow(orderId) {
  return request({
    url: '/order/v1.5.5/orderStatusFlow',
    method: 'get',
    params: {
      orderId
    }
  })
}

export function listOrderV1_5_6(query) {
  return request({
    url: '/order/v1.5.6/list',
    method: 'get',
    params: query
  })
}
