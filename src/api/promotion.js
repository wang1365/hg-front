import request from '@/utils/request'

export function addPromotion(data) {
  return request({
    url: '/web/area/addPromotion',
    method: 'post',
    data: data
  })
}

export function getPromotionList(param) {
  return request({
    url: '/web/area/getPromotionList',
    method: 'getPromotionList',
    param: param
  })
}

export function updatePromotion(data) {
  return request({
    url: '/web/area/updatePromotion',
    method: 'post',
    data: data
  })
}

export function deletePromotion(id) {
  return request({
    url: '/web/area/updatePromotion',
    method: 'post',
    param: { id }
  })
}
