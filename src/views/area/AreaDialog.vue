<template>
  <el-dialog :visible.sync="visible" :title="title" center>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form ref="form" :model="area" :rules="rules" align="left" label-width="100px">
          <el-form-item label="片区名称：" prop="name">
            <el-input v-model="area.name" />
          </el-form-item>
          <el-form-item label="是否启用：" prop="enabled">
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="所属机构：" prop="chargeOrg">
            <el-select v-model="area.chargeOrg" placeholder="请选择">
              <el-option v-for="item in goodsList" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="负责人：" prop="chargeOwner">
            <el-input v-model="area.chargeOwner" />
          </el-form-item>
          <el-form-item label="详细地址：" prop="address">
            <el-input v-model="area.address" />
          </el-form-item>
          <el-form-item label="经/纬度：">
            <el-col :span="12"><el-input v-model="area.longitude" /></el-col>
            <el-col :span="12"><el-input v-model="area.latitude" /></el-col>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input v-model="area.description" :rows="2" type="textarea" />
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
  name: 'ReportForm',
  props: {
  },
  data() {
    return {
      visible: false,
      token: null,
      options: [{
        value: 0,
        label: '禁用'
      }, {
        value: 1,
        label: '启用'
      }],
      area: {
        reportDate: null,
        goodsId: null,
        origin: null,
        title: null,
        description: null
      },
      rules: {
        name: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        enabled: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        chargeOrg: [{ required: true, message: '请选择检测日期', trigger: 'blur' }]
      },
      goodsList: [],
      fileList: []
    }
  },
  watch: {
    dialogVisible(newVal) {
      this.flag = this.dialogVisible
    }
  },
  created() {
    this.form = {
      createTime: null,
      reportDate: null,
      goodsId: null,
      origin: null,
      title: null,
      description: null
    }
  },
  mounted() {
  },
  methods: {
    show(area, action) {
      this.visible = true
      this.title = '新增片区'
    }
  }
}
</script>

<style scoped>

</style>
