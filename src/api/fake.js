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

export function getFakeDayByDay(day) {
  return request({
    url: '/web/fake/getFakeDayByDay',
    method: 'get',
    params: { day }
  })
}

export function getFakeDailyReport(params) {
  return request({
    url: '/web/fake/getFakeDailyReport',
    method: 'get',
    params: params
  })
}

export function getFakeDayList(params) {
  return request({
    url: '/web/fake/getFakeDayList',
    method: 'get',
    params: params
  })
}

export function addFakeDay(data) {
  return request({
    url: '/web/fake/addFakeDay',
    method: 'post',
    data: data
  })
}

export function updateFakeDay(data) {
  return request({
    url: '/web/fake/updateFakeDay',
    method: 'post',
    data: data
  })
}
