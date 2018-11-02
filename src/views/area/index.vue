<template>
  <div class="main" >
    <AreaDialog ref="areaDialog" @change="handleAreaChange" />
    <el-row>
      <el-button type="primary" icon="el-icon-plus" size="small" class="right-btn" @click="addArea">新增</el-button>
    </el-row>
    <el-row class="table">
      <el-table :data="items" border stripe highlight-current-row>
        <el-table-column prop="id" align="center" label="ID" />
        <el-table-column prop="name" align="center" label="片区名称" />
        <el-table-column prop="enabled" align="center" label="启用与否" >
          <template slot-scope="scope">{{ scope.row.enabled ? '已启用' : '已禁用' }}</template>
        </el-table-column>
        <el-table-column prop="companyName" align="center" label="所属机构" />
        <el-table-column prop="headName" align="center" label="负责人姓名" />
        <el-table-column prop="headPhone" align="center" label="负责人手机号码" />
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="showArea(scope.row)">详情</el-button>
            <el-button size="mini" type="primary" @click="editArea(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import { getAreaList } from '@/api/area'
import AreaDialog from './AreaDialog'

export default {
  name: 'Area',
  components: {
    AreaDialog
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
      getAreaList().then(response => {
        this.items = response.data.data
      })
    },
    handleAreaChange() {
      this.refresh()
    },
    showAreaDialog(data, action) {
      this.$refs['areaDialog'].show(data, action)
    },
    addArea() {
      this.showAreaDialog(null, 'create')
    },
    showArea(area) {
      this.showAreaDialog(area, 'show')
    },
    editArea(area) {
      this.showAreaDialog(Object.assign({}, area), 'edit')
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
