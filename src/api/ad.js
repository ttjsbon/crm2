import request from '@/utils/request'

export function listAd(query) {
  return request({
    url: '/ad/list',
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

export function createAdV1_5_4_1(data) {
  return request({
    url: '/ad/v1.5.4.1/create',
    method: 'post',
    data
  })
}

export function updateAdV1_5_4_1(data) {
  return request({
    url: '/ad/v1.5.4.1/update',
    method: 'post',
    data
  })
}
