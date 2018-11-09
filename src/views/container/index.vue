<template>
  <div class="main" >
    <el-row>
      <el-button type="primary" icon="el-icon-plus" size="small" class="right-btn">新增</el-button>
    </el-row>
    <el-row class="table">
      <el-table :data="items" border stripe highlight-current-row>
        <el-table-column prop="id" label="ID" align="center" />
        <el-table-column prop="name" label="售货柜名称" align="center" />
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
                <el-dropdown-item @click.native="editCommandHandler(scope.row)">编辑</el-dropdown-item>
                <el-dropdown-item @click.native="showCommandHandler(scope.row)">售货柜详情</el-dropdown-item>
                <el-dropdown-item @click.native="showGoodsHandler">库存商品详情</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <qr-code-dialog ref="qrcode" />
    <container-dialog ref="container" @change="handleContainerChange" />

  </div>
</template>

<script>
import * as api from '@/api/container'
import QrCodeDialog from './components/QrCodeDialog'
import ContainerDialog from './components/ContainerDialog'

export default {
  name: 'Container',
  components: {
    QrCodeDialog, ContainerDialog
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
      api.getContainers().then(response => {
        this.items = response.data.data.map(item => {
          item.enableVisible = false
          return item
        })
      })
    },
    showQrCode(containerCode) {
      this.$refs['qrcode'].show(containerCode)
    },
    enable(container, ok) {
      container.enableVisible = false
      if (ok) {
        api.enableContainer(container.id, !container.enabled).then(response => {
          if (response.data) {
            container.enabled = !container.enabled
          }
        })
      }
    },
    showGoodsHandler(container) {
      console.log(container)
    },
    editCommandHandler(container) {
      this.showContainerDialog(Object.assign({}, container), 'edit')
    },
    showCommandHandler(container) {
      this.showContainerDialog(container, 'show')
    },
    showContainerDialog(container, mode) {
      this.$refs['container'].show(container, mode)
    },
    handleContainerChange() {
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
