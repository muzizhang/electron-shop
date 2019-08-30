import request from '@/utils/request'

// 修改密码
export function editPassword(params) {
  return request({
    url: '/users/editPassword',
    method: 'post',
    data: params
  })
}

// 获取用户
export function getUserList() {
  return request({
    url: '/users/userList',
    method: 'get'
  })
}

// 是否禁用用户
export function userDisable(params) {
  return request({
    url: '/users/userIsDisable',
    method: 'get',
    params: params
  })
}

// 修改用户信息
export function userDetail(params) {
  return request({
    url: '/users/userDetail',
    method: 'patch',
    data: params
  })
}

// 获取当前用户信息
export function currentUser(username) {
  return request({
    url: '/users/currentUser',
    method: 'get',
    params: username
  })
}
