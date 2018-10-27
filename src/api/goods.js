import request from '@/utils/request'

export function addGoods(data) {
  return request({
    url: '/web/goods/addGoods',
    method: 'post',
    data: data
  })
}

export function updateGoods(data) {
  return request({
    url: '/web/goods/updateGoods',
    method: 'post',
    data: data
  })
}

export function getAllGoods(params) {
  return request({
    url: '/web/goods/getGoodsList',
    method: 'get',
    params: params
  })
}

export function deleteGoods(id) {
  return request({
    url: '/web/goods/deleteGoods',
    method: 'post',
    params: { id }
  })
}

export function addGoodsCategory(data) {
  return request({
    url: '/web/goods/addGoodsCategory',
    method: 'post',
    data: data
  })
}

export function updateGoodsCategory(data) {
  return request({
    url: '/web/goods/updateGoodsCategory',
    method: 'post',
    data: data
  })
}

export function getGoodsCategoryList(params) {
  return request({
    url: '/web/goods/getGoodsCategoryList',
    method: 'get',
    params: params
  })
}

export function deleteGoodsCategory(id) {
  return request({
    url: '/web/goods/deleteGoodsCategory',
    method: 'post',
    params: { id }
  })
}
