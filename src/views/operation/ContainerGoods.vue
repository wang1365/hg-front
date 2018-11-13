<template>
  <div class="main">
    <el-row/>
    <el-row class="table">
      <el-table :data="items" size="small" border stripe highlight-current-row>
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="areaName" label="片区" />
        <el-table-column prop="vmCode" label="售货柜编码" />
        <el-table-column prop="vmName" label="点位名称" />
        <el-table-column label="商品名称" />
        <el-table-column label="电子标签" />
        <el-table-column label="商品条码" />
        <el-table-column label="商品状态" />
        <el-table-column label="分类" />
        <el-table-column label="品牌" />
      </el-table>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ContainerGoods',
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
