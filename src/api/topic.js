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
    url: '/topic/v1.2/readById',
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

export function getGoodsInfoV1_5_6(data) {
  return request({
    url: '/goods/v1.5.6/getList',
    method: 'post',
    data
  })
}

export function getTopicList(data) {
  return request({
    url: '/topic/getList',
    method: 'post',
    data
  })
}

export function listTopic2(data) {
  return request({
    url: '/topic/listTopic',
    method: 'get'
  })
}
