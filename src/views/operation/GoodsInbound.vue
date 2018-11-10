<template>
  <div class="main">
    <el-row>
      <el-button type="primary" icon="el-icon-plus" size="small" class="right-btn" @click="openInboundDialog">申请入库</el-button>
    </el-row>
    <el-row class="table">
      <el-table :data="items" size="small" border stripe highlight-current-row>
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="areaName" label="片区" />
        <el-table-column prop="vmCode" label="售货柜编码" />
        <el-table-column prop="vmName" label="点位名称" />
        <el-table-column label="盘存状态" />
        <el-table-column label="审核状态" />
        <el-table-column label="智能方案" />
        <el-table-column label="计划/实际种类" />
        <el-table-column label="计划/实际总数" />
        <el-table-column label="计划/实际金额" />
        <el-table-column label="创建时间" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text">商品详情</el-button>
            <el-button size="mini" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <goods-inbound-dialog ref="inboundDialog" @change="applyInbound" />
  </div>
</template>

<script>
import GoodsInboundDialog from './components/GoodsInboundDialog'

export default {
  name: 'GoodsInbound',
  components: {
    GoodsInboundDialog
  },
  data() {
    return {
      items: []
    }
  },
  methods: {
    openInboundDialog() {
      this.$refs['inboundDialog'].show()
    },
    applyInbound() {
      console.log('success')
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
