<template>
  <div class="main" >
    <el-row>
      <el-button type="success" icon="el-icon-plus" size="small" class="right-btn blue-btn" >新增</el-button>
    </el-row>
    <el-row class="table">
      <el-table :data="items" border stripe highlight-current-row>
        <el-table-column prop="id" label="ID" width="100" />
        <el-table-column prop="name" label="片区名称" width="220" />
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
</style>
