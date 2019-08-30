import request from '@/utils/request'

// 商品分类列表
export function getCategoryList() {
  return request({
    url: '/users/category',
    method: 'get'
  })
}

// 创建商品
export function createGood(params) {
  return request({
    url: '/users/createGood',
    method: 'post',
    data: params
  })
}

// 商品列表
export function getGoodList() {
  return request({
    url: '/users/goodList',
    method: 'get'
  })
}

// 商品是否上架
export function goodRacking(params) {
  return request({
    url: '/users/good/racking',
    method: 'post',
    data: params
  })
}

// 删除商品
export function deleteGood(id) {
  return request({
    url: '/users/good/' + id,
    method: 'delete'
  })
}
