<template>
  <el-dialog :visible.sync="visible" :title="title" center @open="open()">
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form ref="form" :model="area" :rules="rules" align="left" label-width="100px">
          <el-form-item label="片区名称：" prop="name">
            <el-input :disabled="disabled" v-model="area.name" />
          </el-form-item>
          <el-form-item label="是否启用：" prop="enabled">
            <el-select :disabled="disabled" v-model="area.enabled" value-key="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="所属机构：" prop="companyName">
            <CompanyOption :company="{id: area.companyId, name: area.companyName }" @change="handleCompanyChange" />
          </el-form-item>
          <el-form-item label="负责人：" prop="headName">
            <PersonOption :company-name="area.companyName" :head="area.headName" @change="handleHeadChange" />
          </el-form-item>
          <el-form-item label="详细地址：" prop="address">
            <el-input :disabled="disabled" v-model="area.address" />
          </el-form-item>
          <el-form-item label="经/纬度：">
            <el-col :span="12"><el-input v-model="area.longitude" disabled /></el-col>
            <el-col :span="12"><el-input v-model="area.latitude" disabled /></el-col>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input :disabled="disabled" v-model="area.comment" :rows="2" type="textarea" />
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <div id="map" />
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible=false">取消</el-button>
      <el-button slot="footer" class="dialog-footer" type="success" size="small" @click="onSave('form')">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import vue from 'vue'
import BMap from 'BMap'
import * as api from '@/api/area'
import CompanyOption from './components/CompanyOption'
import PersonOption from './components/PersonOption'

export default {
  name: 'AreaDialog',
  components: {
    BMap, CompanyOption, PersonOption
  },
  props: {
  },
  data() {
    return {
      map: null,
      mapGeocoder: null,
      visible: false,
      disabled: false,
      title: '',
      options: [
        { value: false, label: '禁用' },
        { value: true, label: '启用' }
      ],
      area: {},
      emptyArea: {
        name: null,
        enabled: null,
        companyId: null,
        companyName: null,
        headId: null,
        headName: null,
        headPhone: null,
        address: null,
        longitude: null,
        latitude: null,
        comment: null
      },
      rules: {
        name: [{ required: true, message: '请输入片区名称', trigger: 'blur' }],
        enabled: [{ required: true, message: '请选择是否启用', trigger: 'blur' }],
        companyName: [{ required: true, message: '请选择所属机构', trigger: 'blur' }]
      },
      orgs: [],
      action: ''
    }
  },
  created() {
    this.area = this.emptyArea
  },
  mounted() {
  },
  methods: {
    open() {
      const that = this
      vue.nextTick(_ => {
        that.map = new BMap.Map('map')
        that.mapGeocoder = new BMap.Geocoder()
        const point = new BMap.Point(that.area.longitude || 116.404, that.area.latitude || 39.915)
        that.map.centerAndZoom(point, 14)
        that.map.addEventListener('click', that.mapClickHandler)
      })
    },
    show(area, action) {
      this.action = action
      this.visible = true
      this.title = (action === 'create') ? '新增片区' : ((action === 'show') ? '详情' : '编辑片区')
      this.disabled = (action === 'show')
      if (action === 'show' || action === 'edit') {
        this.area = area
      } else {
        this.area = this.emptyArea
      }
    },
    mapClickHandler(option) {
      this.area.longitude = option.point.lng
      this.area.latitude = option.point.lat
      const that = this
      this.mapGeocoder.getLocation(option.point, (rs) => {
        that.area.address = rs.address
      })
    },
    onSave(form) {
      this.$refs[form].validate((valid) => {
        if (!valid) {
          return false
        }
        if (this.action === 'edit') {
          api.updateArea(this.area).then((response) => {
            this.$message({ message: `修改成功`, type: 'success' })
            this.visible = false
          })
        } else if (this.action === 'create') {
          api.addArea(this.area).then((response) => {
            this.$message({ message: '新增片区成功', type: 'success' })
            this.visible = false
          })
        }
      })
    },
    handleCompanyChange(value) {
      this.area.companyId = value.id
      this.area.companyName = value.name
    },
    handleHeadChange(value) {
      this.area.headName = value.name
      this.area.headId = value.id
    }
  }
}
</script>

<style scoped>
  #map {
    height: 100%;
    width: 50%;
    position: absolute;
    border: 1px solid rgb(160, 160, 160);
  }
</style>
