<template>
  <el-dialog :visible.sync="visible" title="申请入库" left>
    <el-form ref="form" :rules="rules" align="left" label-width="120px">
      <el-form-item label="目标片区：" prop="areaName">
        <el-col :span="15">
          <area-option :area="area" :disabled="false" @change="handleAreaChange" />
        </el-col>
      </el-form-item>
      <el-form-item label="目标售货柜：" prop="vmName">
        <el-col :span="15">
          <machine-option :area="area" :container="machine" :disabled="containerDisabled" @change="changeContainer" />
        </el-col>
      </el-form-item>
    </el-form>
    <el-button :disabled="btnDisabled" class="addBtn" @click="addGoods">新增</el-button>
    <el-table :data="items" border stripe highlight-current-row>
      <el-table-column prop="name" align="center" label="商品">
        <template slot-scope="scope">
          <el-autocomplete v-model="scope.row.name" :fetch-suggestions="searchGoods" clearable class="inline-input" placeholder="输入商品名称进行搜索" @select="selectGoods($event, scope)" />
        </template>
      </el-table-column>
      <el-table-column prop="barCode" align="center" label="商品条码" />
      <el-table-column prop="number" align="center" label="数量">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.number" :min="1" size="mini" controls-position="right" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="removeGoods(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible=false">取消</el-button>
      <el-button slot="footer" class="dialog-footer" type="success" size="small" @click="applyGoodsInbound">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getGoodsList, inbound } from '@/api/goods'
import AreaOption from '@/views/components/AreaOption'
import MachineOption from '@/views/components/MachineOption'

export default {
  name: 'StockInDialog',
  components: {
    AreaOption, MachineOption
  },
  data() {
    return {
      items: [],
      visible: false,
      btnDisabled: true,
      containerDisabled: true,
      area: {},
      machine: {},
      rules: {
        areaName: [{ required: true, message: '请选择片区!', trigger: 'blur' }],
        vmName: [{ required: true, message: '请选择售货柜!', trigger: 'blur' }]
      },
      goods: []
    }
  },
  mounted() {},
  methods: {
    show() {
      this.visible = true
    },
    handleAreaChange(area) {
      this.area = area
      this.containerDisabled = false
    },
    changeContainer(machine) {
      this.machine = machine
      this.btnDisabled = false
      this.items.push(this.createNewGoods())
      getGoodsList().then(response => {
        this.goods = response.data.data.map(good => {
          good.value = good.name
          return good
        })
      })
    },
    createNewGoods() {
      return { id: -1, name: '', barCode: '', number: 1 }
    },
    searchGoods(str, cb) {
      const results = str ? this.goods.filter((state) => {
        return state.value.includes(str)
      }) : this.goods
      cb(results)
    },
    addGoods() {
      this.items.push(this.createNewGoods())
    },
    selectGoods(event, scope) {
      this.items[scope.$index].id = event.id
      this.items[scope.$index].barCode = event.barCode
    },
    removeGoods(index) {
      this.items.splice(index, 1)
    },
    applyGoodsInbound() {
      // validate
      const validItems = this.items.filter(item => item.id !== -1)
      if (validItems.length === 0) {
        this.$message({ message: '请至少选择一种商品!', type: 'error' })
        return false
      }
      inbound({
        areaId: this.area.id,
        containerId: this.machine.id,
        containerCode: this.machine.code,
        goods: this.items.reduce((map, obj) => {
          map[obj.id] = obj.number
          return map
        }, {})
      }).then((response) => {
        this.$message({ message: `商品入库申请成功`, type: 'success' })
        this.visible = false
        this.$emit('change')
      })
    }
  }
}
</script>

<style scoped>
  .addBtn {
    float: right;
    margin: 0 10px 10px 0;
  }
</style>
