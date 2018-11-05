<template>
  <el-dialog :visible.sync="visible" :title="title" left @open="open()">
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form ref="form" :model="vm" :rules="rules" align="left" label-width="110px">
          <el-form-item label="售货柜名称：" prop="name">
            <el-input :disabled="disabled" v-model="vm.name" />
          </el-form-item>
          <el-form-item label="是否启用：" prop="enabled">
            <el-select :disabled="disabled" v-model="vm.enabled" value-key="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="所属片区：" prop="areaName">
            <AreaOption :area="{id: vm.areaId, name: vm.areaName }" :disabled="disabled" @change="hangleAreaChange" />
          </el-form-item>
          <el-form-item label="负责人：" prop="headName">
            <el-input :disabled="disabled" v-model="vm.headName" />
          </el-form-item>
          <el-form-item label="配送人：" prop="distributionName">
            <el-input :disabled="disabled" v-model="vm.distributionName" />
          </el-form-item>
          <el-form-item label="详细地址：" prop="address">
            <el-input :disabled="disabled" v-model="vm.address" />
          </el-form-item>
          <el-form-item label="经/纬度：">
            <el-col :span="12"><el-input v-model="vm.longitude" disabled /></el-col>
            <el-col :span="12"><el-input v-model="vm.latitude" disabled /></el-col>
          </el-form-item>
          <el-form-item label="描述：">
            <el-input :disabled="disabled" v-model="vm.comment" :rows="2" type="textarea" />
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <div id="map" />
      </el-col>
    </el-row>
    <div slot="footer" :style="{display: disabled ? 'none' : ''}" class="dialog-footer">
      <el-button @click="visible=false">取消</el-button>
      <el-button slot="footer" class="dialog-footer" type="success" size="small" @click="onSave('form')">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import vue from 'vue'
import BMap from 'BMap'
import * as api from '@/api/vm'
import AreaOption from './AreaOption'

export default {
  name: 'VendingMachineDialog',
  components: {
    BMap, AreaOption
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
      vm: {},
      rules: {
        name: [{ required: true, message: '请输入片区名称', trigger: 'blur' }],
        enabled: [{ required: true, message: '请选择是否启用', trigger: 'blur' }],
        companyName: [{ required: true, message: '请选择所属机构', trigger: 'blur' }]
      },
      orgs: [],
      mnode: ''
    }
  },
  mounted() {
  },
  methods: {
    open() {
      const that = this
      vue.nextTick(_ => {
        that.map = new BMap.Map('map')
        that.map.enableScrollWheelZoom()
        that.mapGeocoder = new BMap.Geocoder()
        const point = new BMap.Point(that.vm.longitude || 116.404, that.vm.latitude || 39.915)
        that.map.centerAndZoom(point, 14)
        if (!that.disabled) {
          that.map.addEventListener('click', that.mapClickHandler)
        }
      })
    },
    show(vm, mode) {
      this.mode = mode
      this.visible = true
      this.title = (mode === 'create') ? '新增片区' : ((mode === 'show') ? '详情' : '编辑售货柜')
      this.disabled = (mode === 'show')
      if (mode === 'show' || mode === 'edit') {
        this.vm = vm
      }
    },
    mapClickHandler(option) {
      this.vm.longitude = option.point.lng
      this.vm.latitude = option.point.lat
      const that = this
      this.mapGeocoder.getLocation(option.point, (rs) => {
        that.vm.address = rs.address
      })
    },
    hangleAreaChange(area) {
      this.vm.areaId = area.id
      this.vm.areaName = area.name
    },
    onSave(form) {
      this.$refs[form].validate((valid) => {
        if (!valid) {
          return false
        }
        if (this.mode === 'edit') {
          api.updateVm(this.vm).then((response) => {
            this.$message({ message: `修改成功`, type: 'success' })
            this.visible = false
            this.$emit('change')
          })
        }
      })
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
