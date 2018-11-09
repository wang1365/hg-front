<template>
  <div>
    <el-button :disabled="disabled" style="width:100%" @click="opencontainerDialog">{{ container && container.name ? container.name : '单击选择售货柜' }}</el-button>
    <el-dialog :visible.sync="visible" append-to-body title="选择售货柜">
      <el-table :data="items" border stripe highlight-current-row @current-change="selectCurrentMachineRow">
        <el-table-column width="30">
          <template slot-scope="scope">
            <el-radio v-model="radio" :label="scope.$index" @change="selectCurrentMachineRadio">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="id" align="center" label="ID" />
        <el-table-column prop="name" align="center" label="售货柜名称" />
        <el-table-column prop="code" align="center" label="售货柜编码" />
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" size="small" @click="saveCurrentMachine">确定</el-button>
        <el-button size="small" @click="visible=false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getContainersByAreaId } from '@/api/container'

export default {
  name: 'MachineOption',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    area: {
      type: Object,
      default: () => {}
    },
    container: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      visible: false,
      items: [],
      radio: null,
      containerId: null,
      containerName: null
    }
  },
  methods: {
    opencontainerDialog() {
      this.visible = true
      this.containerName = this.container.name
      getContainersByAreaId(this.area.id).then((response) => {
        this.items = response.data.data
        this.radio = this.items.findIndex(item => item.id === this.container.id)
      })
    },
    selectCurrentMachineRow(currentRow) {
      this.containerId = currentRow.id
      this.containerName = currentRow.name
      this.radio = this.items.findIndex(item => item.id === this.containerId)
    },
    selectCurrentMachineRadio() {
      this.containerId = this.items[this.radio].id
      this.containerName = this.items[this.radio].name
    },
    saveCurrentMachine() {
      this.visible = false
      this.$emit('change', { id: this.containerId, name: this.containerName })
    }
  }
}
</script>

<style scoped>

</style>
