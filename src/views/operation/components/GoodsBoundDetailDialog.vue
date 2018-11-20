<template>
  <el-dialog :visible.sync="visible" title="详情" left>
    <el-table :data="items" border stripe highlight-current-row>
      <el-table-column prop="goodsId" align="center" label="商品ID" />
      <el-table-column prop="goodsBarCode" align="center" label="商品条码" />
      <el-table-column prop="goodsName" align="center" label="商品名称" />
      <el-table-column prop="amount" align="center" label="商品数量" />
    </el-table>
  </el-dialog>
</template>

<script>
import { getGoodsInboundDetail, getGoodsOutboundDetail } from '@/api/goods'

export default {
  name: 'GoodsBoundDetailDetail',
  components: {
  },
  props: {
  },
  data() {
    return {
      visible: false,
      mnode: '',
      items: []
    }
  },
  mounted() {
  },
  methods: {
    show(id, mode) {
      const that = this
      this.mode = mode
      this.visible = true
      const restGoodsDetail = this.mode === 'inbound' ? getGoodsInboundDetail : getGoodsOutboundDetail
      restGoodsDetail({ id: id }).then(response => {
        that.items = response.data.data
      })
    }
  }
}
</script>

<style scoped>
</style>
