import request from '@/utils/request'

export function getVms(params) {
  return request({
    url: '/web/vm/getVms',
    method: 'get',
    params: params
  })
}

export function enableVendingMachine(machineId, enabled) {
  return request({
    url: `/web/vm/${machineId}/enable`,
    method: 'post',
    params: { enabled }
  })
}

export function updateVm(data) {
  return request({
    url: '/web/vm/updateVm',
    method: 'post',
    data: data
  })
}

export function addVm(vm) {
  return request({
    url: '/web/vm/addVm',
    method: 'post',
    data: vm
  })
}
