import request from '@/utils/request'

export function couponConfigList(query) {
  return request({
    url: '/coupon/v1.3.0/couponConfig/list',
    method: 'get',
    params: query
  })
}

export function createAd(data) {
  return request({
    url: '/ad/create',
    method: 'post',
    data
  })
}

export function readAd(data) {
  return request({
    url: '/ad/read',
    method: 'get',
    data
  })
}

export function updateAd(data) {
  return request({
    url: '/ad/v1.2/update',
    method: 'post',
    data
  })
}

export function deleteAd(data) {
  return request({
    url: '/ad/delete',
    method: 'post',
    data
  })
}

export function updateGoodAndTopic(data) {
  return request({
    url: '/ad/v1.2/updateGoodAndTopic',
    method: 'post',
    data
  })
}
