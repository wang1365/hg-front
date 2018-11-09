import request from '@/utils/request'

export function getContainers(params) {
  return request({
    url: '/web/container/getContainers',
    method: 'get',
    params: params
  })
}

export function getContainersByAreaId(areaId) {
  return request({
    url: '/web/container/getContainersByAreaId',
    method: 'get',
    params: { areaId }
  })
}

export function enableContainer(containerId, enabled) {
  return request({
    url: `/web/container/${containerId}/enable`,
    method: 'post',
    params: { enabled }
  })
}

export function updateContainer(data) {
  return request({
    url: '/web/container/updateContainer',
    method: 'post',
    data: data
  })
}

export function addContainer(Container) {
  return request({
    url: '/web/container/addContainer',
    method: 'post',
    data: Container
  })
}
