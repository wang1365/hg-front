<template>
  <div class="main" >
    <el-row>
      <el-button type="success" icon="el-icon-plus" size="small" class="right-btn blue-btn" >新增</el-button>
    </el-row>
    <el-row class="table">
      <el-table :data="items" border stripe highlight-current-row>
        <el-table-column prop="id" label="ID" align="center" />
        <el-table-column prop="code" label="售货柜编号" align="center" />
        <el-table-column prop="deviceMode" label="设备型号" align="center" />
        <el-table-column prop="enabled" label="启用与否" align="center">
          <template slot-scope="scope">{{ scope.row.enabled ? '已启用' : '已禁用' }}</template>
        </el-table-column>
        <el-table-column prop="run" label="运行状态" align="center">
          <template slot-scope="scope">{{ scope.row.run ? '在线' : '离线' }}</template>
        </el-table-column>
        <el-table-column prop="areaName" label="所属片区" align="center" />
        <el-table-column prop="headName" label="负责人" align="center" />
        <el-table-column prop="distributionName" label="配送人员" align="center" />
        <el-table-column label="操作" align="center" >
          <template slot-scope="scope">
            <el-button size="mini" type="warning" @click="showArea(scope.row)">详情</el-button>
            <el-button size="mini" type="primary" @click="editArea(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import { getVms } from '@/api/vm'

export default {
  name: 'Vm',
  components: {
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
      getVms().then(response => {
        this.items = response.data.data
      })
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
</style>
