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
          <machine-option :area="area" :vm="machine" :disabled="vmDisabled" @change="changeCurrentMachine" />
        </el-col>
      </el-form-item>
    </el-form>
    <el-button :disabled="btnDisabled" class="addBtn">新增</el-button>
    <el-table :data="items" border stripe highlight-current-row>
      <el-table-column prop="name" align="center" label="商品">
        <template slot-scope="scope">
          <el-autocomplete v-model="scope.row.name" :fetch-suggestions="searchGoods" clearable class="inline-input" placeholder="输入商品名称进行搜索" @select="selectGoods" />
        </template>
      </el-table-column>
      <el-table-column prop="barCode" align="center" label="商品条码" />
      <el-table-column prop="number" align="center" label="数量" />
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible=false">取消</el-button>
      <el-button slot="footer" class="dialog-footer" type="success" size="small" @click="applyStockIn">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getGoodsList } from '@/api/goods'
import AreaOption from '@/views/components/AreaOption'
import MachineOption from '@/views/components/MachineOption'

export default {
  name: 'StockInDialog',
  components: {
    AreaOption, MachineOption
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      items: [],
      btnDisabled: true,
      vmDisabled: true,
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
    applyStockIn(form) {
    },
    handleAreaChange(area) {
      this.area = area
      this.vmDisabled = false
    },
    changeCurrentMachine(machine) {
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
      return { name: '', barCode: '', number: 1 }
    },
    searchGoods(str, cb) {
      const results = str ? this.goods.filter((state) => {
        return state.value.includes(str)
      }) : this.goods
      cb(results)
    },
    selectGoods(item) {
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
