<template>
  <div class="main" >
    <AreaDialog ref="areaDialog" />
    <el-row>
      <el-button type="success" icon="el-icon-plus" size="small" class="right-btn blue-btn" @click="createArea">新增</el-button>
    </el-row>
    <el-row class="table">
      <el-table :data="items" border stripe highlight-current-row>
        <el-table-column prop="id" label="ID" width="100" />
        <el-table-column prop="name" label="片区名称" width="220" />
        <el-table-column prop="enabled" label="启用与否" width="220" />
        <el-table-column prop="chargeOrg" label="所属机构" />
        <el-table-column prop="chargeOwner" label="负责人姓名" width="220" />
        <el-table-column prop="ownerPhone" label="负责人手机号码" width="220" />
        <el-table-column label="操作" width="200" >
          <template slot-scope="scope">
            <el-button size="mini" type="warning" @click="showArea(scope.row)">详情</el-button>
            <el-button size="mini" type="warning" @click="editArea(scope.row)">编辑</el-button>
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
    getAreaList().then(response => {
      this.items = response.data.data
    })
  },
  methods: {
    showAreaDialog(data, action) {
      this.$refs['areaDialog'].show(data, action)
    },
    createArea() {
      this.showAreaDialog(null, 'create')
    },
    showArea(area) {
      this.showAreaDialog(area, 'show')
    },
    editArea(area) {
      this.showAreaDialog(area, 'edit')
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
