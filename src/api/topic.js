import request from '@/utils/request'

export function listTopic(query) {
  return request({
    url: '/topic/list',
    method: 'get',
    params: query
  })
}

export function createTopic(data) {
  return request({
    url: '/topic/create',
    method: 'post',
    data
  })
}

export function readTopic(data) {
  return request({
    url: '/topic/read',
    method: 'get',
    data
  })
}

export function read(id) {
  return request({
    url: '/topic/readById',
    method: 'get',
    params: {
      id: id
    }
  })
}

export function updateTopic(data) {
  return request({
    url: '/topic/update',
    method: 'post',
    data
  })
}

export function deleteTopic(data) {
  return request({
    url: '/topic/delete',
    method: 'post',
    data
  })
}

export function getGoodsInfo(data) {
  return request({
    url: '/goods/getList',
    method: 'post',
    data
  })
}
