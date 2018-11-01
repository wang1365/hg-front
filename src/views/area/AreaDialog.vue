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
          <el-form-item label="所属机构：" prop="chargeOrg">
            <CompanyOption :name="area.chargeOrg" @company-change="handleCompanyChange" />
          </el-form-item>
          <el-form-item label="负责人：" prop="chargeOwner">
            <el-input :disabled="disabled" v-model="area.chargeOwner" />
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
      <el-button @click="visible = false">取消</el-button>
      <el-button slot="footer" class="dialog-footer" type="success" size="small" @click="onSave('form')">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import vue from 'vue'
import BMap from 'BMap'
import { updateArea } from '@/api/area'
import CompanyOption from './CompanyOption'

export default {
  name: 'AreaDialog',
  components: {
    BMap, CompanyOption
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
        chargeOrg: null,
        chargeOwner: null,
        address: null,
        longitude: null,
        latitude: null,
        comment: null
      },
      rules: {
        name: [{ required: true, message: '请输入片区名称', trigger: 'blur' }],
        enabled: [{ required: true, message: '请选择是否启用', trigger: 'blur' }],
        chargeOrg: [{ required: true, message: '请选择所属机构', trigger: 'blur' }]
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
        updateArea(this.area).then((response) => {
          this.$message({ message: `修改成功`, type: 'success' })
          this.visible = false
        })
      })
    },
    handleCompanyChange(value) {
      this.area.chargeOrg = value
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
