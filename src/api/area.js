import request from '@/utils/request'

export function getAreaList(params) {
  return request({
    url: '/web/area/getAreaList',
    method: 'get',
    params: params
  })
}

export function updateArea(data) {
  return request({
    url: '/web/area/updateArea',
    method: 'post',
    data: data
  })
}
