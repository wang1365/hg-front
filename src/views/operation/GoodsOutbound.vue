<template>
  <div class="main">
    <el-row>
      <el-button type="primary" title="模拟微信小程序" icon="el-icon-plus" size="small" class="right-btn" @click="openOutboundDialog">申请出库</el-button>
    </el-row>
    <el-row class="table">
      <el-table :data="items" size="small" border stripe highlight-current-row>
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="areaName" label="片区" />
        <el-table-column prop="containerCode" label="售货柜编码" />
        <el-table-column prop="containerName" label="点位名称" />
        <el-table-column prop="status" label="盘存状态" />
        <el-table-column label="审核状态" />
        <el-table-column label="智能方案" />
        <el-table-column prop="species" label="种类" />
        <el-table-column prop="amount" label="总数" />
        <el-table-column label="金额" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="showOutboundDetail(scope.row)">商品详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <goods-in-out-bound-dialog ref="outboundDialog" @change="applyGoodsOutbound" />
  </div>
</template>

<script>
import { getGoodsOutboundList } from '@/api/goods'
import GoodsInOutBoundDialog from './components/GoodsInOutBoundDialog'

export default {
  name: 'GoodsOutbound',
  components: {
    GoodsInOutBoundDialog
  },
  data() {
    return {
      items: []
    }
  },
  created() {
    this.refresh()
  },
  methods: {
    refresh() {
      getGoodsOutboundList().then(response => {
        this.items = response.data.data
      })
    },
    openOutboundDialog() {
      this.$refs['outboundDialog'].show('outbound')
    },
    showOutboundDetail(row) {
      console.log(row)
    },
    applyGoodsOutbound() {
      this.refresh()
    }
  }
}
</script>

<style scoped>
  .main {
    padding: 30px;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .mini {
    padding: 4px 10px;
  }
</style>
