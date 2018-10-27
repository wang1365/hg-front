import request from '@/utils/request'

/** 商品 */
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

/**  商品分类 */
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

/**  商品品牌 */
export function addGoodsBrand(data) {
  return request({
    url: '/web/goods/addGoodsBrand',
    method: 'post',
    data: data
  })
}

export function updateGoodsBrand(data) {
  return request({
    url: '/web/goods/updateGoodsBrand',
    method: 'post',
    data: data
  })
}

export function getGoodsBrandList(params) {
  return request({
    url: '/web/goods/getGoodsBrandList',
    method: 'get',
    params: params
  })
}

export function deleteGoodsBrand(id) {
  return request({
    url: '/web/goods/deleteGoodsBrand',
    method: 'post',
    params: { id }
  })
}

