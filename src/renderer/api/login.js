import request from '@/utils/request'

// 登录
export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

// 注册
export function register(params) {
  return request({
    url: '/user/register',
    method: 'post',
    data: params
  })
}

// 获取用户信息
export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

// 退出
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
