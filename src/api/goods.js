import request from '@/utils/request'

export function listGoods(query) {
  return request({
    url: '/goods/list',
    method: 'post',
    params: query
  })
}

export function deleteGoods(data) {
  return request({
    url: '/goods/delete',
    method: 'post',
    data
  })
}

export function publishGoods(data) {
  return request({
    url: '/goods/create',
    method: 'post',
    data
  })
}

export function detailGoods(id) {
  return request({
    url: '/goods/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export function editGoods(data) {
  return request({
    url: '/goods/update',
    method: 'post',
    data
  })
}

export function sort(data) {
  return request({
    url: '/goods/v1.2/sort',
    method: 'post',
    data
  })
}

export function listCatAndBrand() {
  return request({
    url: '/goods/catAndBrand',
    method: 'get'
  })
}

export function getfinanceProduct() {
  return request({
    url: '/financeProduct/get',
    method: 'get'
  })
}

export function getfinanceAttach() {
  return request({
    url: '/financeProductAttach/get',
    method: 'get'
  })
}

export function editOnSale(data) {
  return request({
    url: `/goods/onSale?goodsId=${data.goodsId}&onSale=${data.onSale}`,
    method: 'get'
  })
}

export function publishGoodsV1_4_0(data) {
  return request({
    url: '/goods/v1.4.0/create',
    method: 'post',
    data
  })
}

export function editGoodsV1_4_0(data) {
  return request({
    url: '/goods/v1.4.0/update',
    method: 'post',
    data
  })
}

export function detailGoodsV1_4_0(id) {
  return request({
    url: '/goods/v1.4.0/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export function sortV1_5_6(data) {
  return request({
    url: '/goods/v1.5.6/sort',
    method: 'post',
    data
  })
}

export function editGoodsV2_1_1(data) {
  return request({
    url: '/goods/v2.1.1/update',
    method: 'post',
    data
  })
}

export function publishGoodsV2_1_1(data) {
  return request({
    url: '/goods/v2.1.1/create',
    method: 'post',
    data
  })
}
