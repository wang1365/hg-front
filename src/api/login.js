import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username: username,
    password: password
  }
  return request({
    url: '/web/auth',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

