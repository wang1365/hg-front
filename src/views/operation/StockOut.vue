<template>
  <div class="main">
    <el-row/>
    <el-row class="table">
      <el-table :data="items" size="small" border stripe highlight-current-row>
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="areaName" label="片区" />
        <el-table-column prop="vmCode" label="售货柜编码" />
        <el-table-column prop="vmName" label="点位名称" />
        <el-table-column label="盘存状态" />
        <el-table-column label="审核状态" />
        <el-table-column label="智能方案" />
        <el-table-column label="种类" />
        <el-table-column label="总数" />
        <el-table-column label="金额" />
        <el-table-column label="创建时间" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text">商品详情</el-button>
            <el-button size="mini" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'StockOut',
  components: {
  },
  data() {
    return {
      items: []
    }
  },
  methods: {
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
