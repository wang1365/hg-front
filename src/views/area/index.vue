<template>
  <div class="main" >
    <AreaDialog ref="areaDialog" />
    <el-row>
      <el-button type="success" icon="el-icon-plus" size="small" class="right-btn blue-btn" @click="createArea">新增</el-button>
    </el-row>
    <el-row class="table">
      <el-table :data="items" size="small" border stripe highlight-current-row>
        <el-table-column prop="id" label="ID" width="100" />
        <el-table-column prop="name" label="片区名称" width="220" />
        <el-table-column prop="enabled" label="启用与否" width="220" />
        <el-table-column prop="chargeOrg" label="所属机构" />
        <el-table-column prop="chargeOwner" label="负责人姓名" width="220" />
        <el-table-column prop="phone" label="负责人手机号码" width="220" />
        <el-table-column label="操作" width="200" >
          <template slot-scope="scope">
            <el-button size="mini" type="warning" @click="showArea(scope.row.id)">详情</el-button>
            <el-button size="mini" type="warning" @click="editArea(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import AreaDialog from './AreaDialog'

export default {
  name: 'Area',
  components: {
    AreaDialog
  },
  methods: {
    showAreaDialog(data, action) {
      this.$refs['areaDialog'].show(data, action)
    },
    createArea() {
      this.showAreaDialog(null, 'create')
    },
    showArea(id) {
      // TODO data
      this.showAreaDialog(null, 'show')
    },
    editArea(id) {
      // TODO data
      this.showAreaDialog(null, 'edit')
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
