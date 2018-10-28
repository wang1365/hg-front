<template>
  <el-dialog :visible.sync="visible" :title="title" center>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form ref="form" :model="area" :rules="rules" align="left" label-width="100px">
          <el-form-item label="片区名称：" prop="name">
            <el-input :disabled="disabled" v-model="area.name" />
          </el-form-item>
          <el-form-item label="是否启用：" prop="enabled">
            <el-select :disabled="disabled" v-model="area.enabled" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.enabled" />
            </el-select>
          </el-form-item>
          <el-form-item label="所属机构：" prop="chargeOrg">
            <el-select :disabled="disabled" v-model="area.chargeOrg" placeholder="请选择">
              <el-option v-for="item in orgs" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="负责人：" prop="chargeOwner">
            <el-input :disabled="disabled" v-model="area.chargeOwner" />
          </el-form-item>
          <el-form-item label="详细地址：" prop="address">
            <el-input :disabled="disabled" v-model="area.address" />
          </el-form-item>
          <el-form-item label="经/纬度：">
            <el-col :span="12"><el-input :disabled="disabled" v-model="area.longitude" /></el-col>
            <el-col :span="12"><el-input :disabled="disabled" v-model="area.latitude" /></el-col>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input :disabled="disabled" v-model="area.comment" :rows="2" type="textarea" />
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div v-for="o in 4" :key="o" class="text item">
            {{ '列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button slot="footer" class="dialog-footer" type="success" size="small" @click="onSubmit('form')">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'AreaDialog',
  props: {
  },
  data() {
    return {
      visible: false,
      disabled: false,
      title: '',
      options: [
        { value: 0, label: '禁用' },
        { value: 1, label: '启用' }
      ],
      area: null,
      emptyArea: {
        name: null,
        enabled: null,
        chargeOrg: null,
        chargeOwner: null,
        address: null,
        longitude: null,
        latitude: null,
        comment: null
      },
      rules: {
        name: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        enabled: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        chargeOrg: [{ required: true, message: '请选择检测日期', trigger: 'blur' }]
      },
      orgs: []
    }
  },
  watch: {
  },
  created() {
    this.area = this.emptyArea
  },
  mounted() {
  },
  methods: {
    show(area, action) {
      this.visible = true
      this.title = (action === 'create') ? '新增片区' : ((action === 'show') ? '详情' : '编辑片区')
      this.disabled = (action === 'show')
      if (action === 'show' || action === 'edit') {
        this.area = area
        this.area.enabled = area.enabled ? '启用' : '禁用'
      } else {
        this.area = this.emptyArea
      }
    }
  }
}
</script>

<style scoped>

</style>
