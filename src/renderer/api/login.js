import request from '@/utils/request'
// 注册
export function register(params) {
  return request({
    url: '/users/register',
    method: 'post',
    data: {
      username: params.userName,
      pwd: params.pwd
    }
  })
}
// 登录
export function login(username, pwd) {
  return request({
    url: '/users/login',
    method: 'post',
    data: {
      username,
      pwd
    }
  })
}

// 获取用户信息
export function getInfo(username) {
  return request({
    url: '/users/info',
    method: 'get',
    params: { username: username }
  })
}

// 退出
export function logout(username) {
  return request({
    url: '/users/logout',
    method: 'post',
    data: {
      username
    }
  })
}
