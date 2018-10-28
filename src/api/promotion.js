import request from '@/utils/request'

export function addPromotion(data) {
  return request({
    url: '/web/promotion/addPromotion',
    method: 'post',
    data: data
  })
}

export function getPromotionList(param) {
  return request({
    url: '/web/promotion/getPromotionList',
    method: 'get',
    params: param
  })
}

export function updatePromotion(data) {
  return request({
    url: '/web/promotion/updatePromotion',
    method: 'post',
    data: data
  })
}

export function deletePromotion(params) {
  return request({
    url: '/web/promotion/deletePromotionByIdAndRuleType',
    method: 'post',
    params: params
  })
}
