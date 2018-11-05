<template>
  <div>
    <el-button :disabled="disabled" style="width:100%" @click="selectArea()">{{ area && area.name ? area.name : '单击选择片区' }}</el-button>
    <el-dialog :visible.sync="visible" append-to-body title="选择片区">
      <el-table :data="items" border stripe highlight-current-row>
        <el-table-column width="30">
          <template slot-scope="scope">
            <el-radio v-model="radio" :label="scope.$index" @change="changeArea">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="id" align="center" label="ID" />
        <el-table-column prop="name" align="center" label="片区名称" />
        <el-table-column prop="headName" align="center" label="负责人姓名" />
        <el-table-column prop="headPhone" align="center" label="负责人手机号码" />
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" size="small" @click="updateAreaSelection(true)">确定</el-button>
        <el-button size="small" @click="updateAreaSelection(false)">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAreaList } from '@/api/area'

export default {
  name: 'AreaOption',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    area: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      visible: false,
      items: [],
      radio: null,
      areaId: this.area.id,
      areaName: this.area.name
    }
  },
  methods: {
    selectArea() {
      this.visible = true
      this.areaName = this.area.name
      getAreaList().then((response) => {
        this.items = response.data.data
        this.radio = this.items.findIndex(item => item.id === this.area.id)
      })
    },
    changeArea() {
      this.areaId = this.items[this.radio].id
      this.areaName = this.items[this.radio].name
    },
    updateAreaSelection(changed) {
      this.visible = false
      if (changed) {
        this.$emit('change', { id: this.areaId, name: this.areaName })
      }
    }
  }
}
</script>

<style scoped>

</style>
