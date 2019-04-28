import request from '@/utils/request'

export function couponBannerList(query) {
  return request({
    url: '/coupon/v1.3.0/couponBanner/list',
    method: 'get',
    params: query
  })
}

export function addCouponBanner(data) {
  return request({
    url: '/coupon/v1.3.0/couponBanner/add',
    method: 'post',
    data
  })
}

export function updateCouponBanner(data) {
  return request({
    url: '/coupon/v1.3.0/couponBanner/update',
    method: 'post',
    data
  })
}

export function delCouponBanner(data) {
  return request({
    url: '/coupon/v1.3.0/couponBanner/del',
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

export function activityBannerList(query) {
  return request({
    url: '/coupon/v1.3.0/activityBanner/list',
    method: 'get',
    params: query
  })
}

export function addActivityBanner(data) {
  return request({
    url: '/coupon/v1.3.0/activityBanner/add',
    method: 'post',
    data
  })
}

export function updateActivityBanner(data) {
  return request({
    url: '/coupon/v1.3.0/activityBanner/update',
    method: 'post',
    data
  })
}

export function delActivityBanner(data) {
  return request({
    url: '/coupon/v1.3.0/activityBanner/del',
    method: 'post',
    data
  })
}

export function couponConfigList(query) {
  return request({
    url: '/coupon/v1.3.0/couponConfig/list',
    method: 'get',
    params: query
  })
}

export function addCouponConfig(data) {
  return request({
    url: '/coupon/v1.3.0/couponConfig/add',
    method: 'post',
    data
  })
}

export function updateCouponConfig(data) {
  return request({
    url: '/coupon/v1.3.0/couponConfig/update',
    method: 'post',
    data
  })
}

export function delCouponConfig(data) {
  return request({
    url: '/coupon/v1.3.0/couponConfig/del',
    method: 'post',
    data
  })
}

export function delUserCoupon(data) {
  return request({
    url: '/coupon/v1.3.0/userCoupon/del',
    method: 'post',
    data
  })
}

export function userCouponList(query) {
  return request({
    url: '/coupon/v1.3.0/userCoupon/list',
    method: 'get',
    params: query
  })
}

export function userCouponDetail(id) {
  return request({
    url: '/coupon/v1.3.0/userCoupon/detail',
    method: 'get',
    params: {
      id
    }
  })
}
