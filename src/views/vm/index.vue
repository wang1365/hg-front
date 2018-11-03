<template>
  <div class="main" >
    <el-row>
      <el-button type="primary" icon="el-icon-plus" size="small" class="right-btn" >新增</el-button>
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
            <el-button size="mini" type="text" @click="showQrCode(scope.row.code)">二维码</el-button>
            <el-popover :value="scope.row.enableVisible" placement="top" width="160">
              <i class="el-icon-warning" style="color:#e6a23c"/>
              <span>确认{{ scope.row.enabled ? '禁用' : '启用' }}售货柜{{ scope.row.code }}?</span>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" plain class="mini" @click="scope.row.enableVisible=false">取消</el-button>
                <el-button type="primary" size="mini" class="mini" @click="enable(scope.row, true)">确定</el-button>
              </div>
              <el-button slot="reference" type="text" @click="scope.row.enableVisible=true">{{ scope.row.enabled ? "禁用" : "启用" }}</el-button>
            </el-popover>
            <el-dropdown>
              <el-button size="mini" type="text">操作<i class="el-icon-arrow-down el-icon--right" /></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>编辑</el-dropdown-item>
                <el-dropdown-item>售货柜详情</el-dropdown-item>
                <el-dropdown-item>库存商品详情</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <qr-code-dialog ref="qrcode" />

  </div>
</template>

<script>
import * as api from '@/api/vm'
import QrCodeDialog from './components/QrCodeDialog'

export default {
  name: 'Vm',
  components: {
    QrCodeDialog
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
      api.getVms().then(response => {
        this.items = response.data.data.map(item => {
          item.enableVisible = false
          return item
        })
      })
    },
    showQrCode(machineCode) {
      this.$refs['qrcode'].show(machineCode)
    },
    enable(machine, ok) {
      machine.enableVisible = false
      if (ok) {
        api.enableVendingMachine(machine.id, !machine.enabled).then(response => {
          if (response.data) {
            machine.enabled = !machine.enabled
          }
        })
      }
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
