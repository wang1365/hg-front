<template>
  <el-dialog :visible.sync="visible" :title="title">
    <el-form ref="form" :model="form" :rules="formRules" label-width="120px" size="mini">
      <el-row>
        <el-col :span="12">
          <el-form-item label="促销活动名称" prop="name">
            <el-input v-model="form.name" placeholder="填写促销活动名称"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :span="24">
        <el-col :span="10">
          <el-form-item label="开始时间" prop="startTime">
            <el-date-picker v-model="form.startTime" type="datetime" placeholder="开始时间" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="结束时间" prop="startTime">
            <el-date-picker v-model="form.endTime" type="datetime" placeholder="结束时间" />
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="限制数量" prop="limitTimes">
            <el-input-number v-model="form.limitTimes" :min="0" :precision="0" placeholder="限制数量"/>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-tag type="warning">0表示不限制使用次数</el-tag>
        </el-col>
      </el-row>
      <el-row :span="24">
        <el-col :span="8">
          <el-form-item label="优惠类型" prop="ruleType">
            <el-select v-model="form.ruleType" placeholder="优惠类型">
              <el-option v-for="item in ruleTypes" :key="item.type" :label="item.name" :value="item.type"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-if="form.ruleType === 1" :span="8">
          <el-form-item label="优惠金额" prop="firstReductionValue">
            <el-input v-model="form.firstReduction.reduceValue" placeholder="优惠金额"/>
          </el-form-item>
        </el-col>
        <el-col v-if="form.ruleType === 2" :span="2" :offset="1">
          <el-button type="success" size="mini" icon="el-icon-plus" plain @click="onNewFullReduction">新增满减</el-button>
        </el-col>
      </el-row>
      <template v-if="form.ruleType === 2">
        <template v-for="(item, i) in form.fullReductions" >
          <el-row :span="24" :key="item">
            <el-col :span="1" :offset="3">
              <el-tag type="info">{{ i+1 }}</el-tag>
            </el-col>
            <el-col :span="8" >
              <el-form-item label="订单金额满" label-width="90px" prop="ruleType">
                <el-input v-model="item.fullValue" placeholder="订单金额"/>
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="-1">
              <el-form-item label="立减" label-width="50px" prop="firstReductionValue">
                <el-input v-model="item.reduceValue" placeholder="优惠金额"/>
              </el-form-item>
            </el-col>
            <el-col v-if="form.fullReductions.length>1" :span="1" :offset="1">
              <el-button type="danger" size="mini" icon="el-icon-minus" plain circle @click="form.fullReductions.splice(i, 1)"/>
            </el-col>
          </el-row>
        </template>
      </template>

      <el-row v-if="form.ruleType === 3">
        <el-col :span="7" :offset="2">
          <el-form-item label="随机范围" prop="minValue">
            <el-input v-model="form.randomReduction.minValue"/>
          </el-form-item>
        </el-col>
        <el-col :span="4" >
          <el-form-item label="-" label-width="20px" prop="maxValue">
            <el-input v-model="form.randomReduction.maxValue"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="form.ruleType === 4">
        <el-col :span="16" :offset="3">
          <el-form-item :label="formatDiscount(form.discount.rate)" label-width="60px" prop="discountRate">
            <el-slider v-model="form.discount.rate" :min="0" :max="1" :step="0.01" :format-tooltip="formatDiscount" input-size="mini" show-input/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="success" size="small" @click="onSubmit('form')">保存</el-button>
      <el-button size="small" @click="visible = false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addPromotion, updatePromotion } from '@/api/promotion'

export default {
  name: 'PromotionEdit',
  props: {
  },
  data() {
    return {
      visible: false,
      action: 'add',
      ruleTypes: [{ type: 1, name: '首次立减' }, { type: 2, name: '商品满减' }, { type: 3, name: '随机立减' }, { type: 4, name: '优惠折扣' }],
      form: {
        name: null,
        startTime: null,
        endTime: null,
        limitTimes: 0,
        ruleType: null,
        includeAllCat: null,
        includeAllBrand: null,
        includeAllHg: null,
        firstReduction: { reduceValue: null },
        fullReductions: [{ fullValue: null, reduceValue: null }], // { fullValue: null, reduceValue: null }
        randomReduction: { minValue: 0.01, maxValue: 1 },
        discount: { rate: 1.0 }
      },
      formRules: {
        name: [
          { required: true, message: '促销活动名称不能为空', trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: '开始时间不能为空', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '结束时间不能为空', trigger: 'blur' }
        ],
        limitTimes: [
          { required: true, message: '限制次数不能为空', trigger: 'blur' }
        ],
        ruleType: [
          { required: true, message: '优惠类型不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    title() {
      return this.action === 'modify' ? '修改促销活动' : '新增促销活动'
    }
  },
  watch: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    show(action, promotion) {
      this.action = action
      if (action === 'modify') {
        this.form = Object.assign({}, promotion)
      }
      this.visible = true
    },
    hide() {
      this.visible = false
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (!valid) {
          return false
        }

        const restInvoke = this.action === 'modify' ? updatePromotion : addPromotion
        const msgPrefix = this.action === 'modify' ? '修改' : '添加'
        restInvoke(this.form).then((response) => {
          this.$message({ message: `${msgPrefix}促销活动成功`, type: 'success' })
          this.$emit('success')
          this.hide()
        }).catch(err => {
          this.$message({ message: `${msgPrefix}失败：${err}`, type: 'error' })
        })
      })
    },
    onNewFullReduction() {
      this.form.fullReductions.push({ fullValue: null, reduceValue: null })
    },
    formatDiscount(value) {
      if (value === 0.0) {
        return '免费'
      } else if (value === 1.0) {
        return '全价'
      }
      const newV = Number(value * 10).toFixed(1)
      return `${newV}折`
    }
  }
}
</script>

<style scoped>
</style>
