import request from '@/utils/request'

export function getUserList(param) {
  return request({
    url: '/web/user/getUserList',
    method: 'get',
    params: param
  })
}
