import request from '@/utils/request'

export function getFake(params) {
  return request({
    url: '/web/fake/getFake',
    method: 'get',
    params: params
  })
}

export function updateFake(data) {
  return request({
    url: '/web/fake/updateFake',
    method: 'post',
    data: data
  })
}

export function addArea(area) {
  return request({
    url: '/web/area/addArea',
    method: 'post',
    data: area
  })
}
