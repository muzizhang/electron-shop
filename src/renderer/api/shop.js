import request from '@/utils/request'

// 创建商铺
export function createShop(params) {
  return request({
    url: '/users/shop',
    method: 'post',
    data: params
  })
}
// 商铺列表
export function getShopList() {
  return request({
    url: '/users/shopList',
    method: 'get'
  })
}
