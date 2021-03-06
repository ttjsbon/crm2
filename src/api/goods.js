import request from '@/utils/request'

export function listGoods(query) {
  return request({
    url: '/goods/list',
    method: 'get',
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
    url: '/goods/sort',
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
