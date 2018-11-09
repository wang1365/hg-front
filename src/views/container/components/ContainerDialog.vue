<template>
  <el-dialog :visible.sync="visible" :title="title" left @open="open()">
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form ref="form" :model="container" :rules="rules" align="left" label-width="110px">
          <el-form-item label="售货柜名称：" prop="name">
            <el-input :disabled="disabled" v-model="container.name" />
          </el-form-item>
          <el-form-item label="是否启用：" prop="enabled">
            <el-select :disabled="disabled" v-model="container.enabled" value-key="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="所属片区：" prop="areaName">
            <area-option :area="{id: container.areaId, name: container.areaName}" :disabled="disabled" @change="handleAreaChange" />
          </el-form-item>
          <el-form-item label="负责人：" prop="headName">
            <person-option :person="{id: container.headId, name: container.headName, type: 4}" :disabled="disabled" @change="handleHeadChange" />
          </el-form-item>
          <el-form-item label="配送人：" prop="distributionName">
            <person-option :person="{id: container.distributionId, name: container.distributionName, type: 5}" :disabled="disabled" @change="handleDistributionChange" />
          </el-form-item>
          <el-form-item label="详细地址：" prop="address">
            <el-input :disabled="disabled" v-model="container.address" />
          </el-form-item>
          <el-form-item label="经/纬度：">
            <el-col :span="12"><el-input v-model="container.longitude" disabled /></el-col>
            <el-col :span="12"><el-input v-model="container.latitude" disabled /></el-col>
          </el-form-item>
          <el-form-item label="描述：">
            <el-input :disabled="disabled" v-model="container.comment" :rows="2" type="textarea" />
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
import * as api from '@/api/container'
import AreaOption from '@/views/components/AreaOption'
import PersonOption from './PersonOption'

export default {
  name: 'ContainerDialog',
  components: {
    BMap, AreaOption, PersonOption
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
      container: {},
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
        const point = new BMap.Point(that.container.longitude || 116.404, that.container.latitude || 39.915)
        that.map.centerAndZoom(point, 14)
        if (that.container.longitude && that.container.latitude) {
          const marker = new BMap.Marker(point)
          that.map.addOverlay(marker)
        }
        if (!that.disabled) {
          that.map.addEventListener('click', that.mapClickHandler)
        }
      })
    },
    show(container, mode) {
      this.mode = mode
      this.visible = true
      this.title = (mode === 'create') ? '新增片区' : ((mode === 'show') ? '详情' : '编辑售货柜')
      this.disabled = (mode === 'show')
      if (mode === 'show' || mode === 'edit') {
        this.container = container
      }
    },
    mapClickHandler(option) {
      this.container.longitude = option.point.lng
      this.container.latitude = option.point.lat
      const that = this
      this.mapGeocoder.getLocation(option.point, (rs) => {
        that.container.address = rs.address
      })
    },
    handleAreaChange(area) {
      this.container.areaId = area.id
      this.container.areaName = area.name
    },
    handleHeadChange(person) {
      this.container.headId = person.id
      this.container.headName = person.name
    },
    handleDistributionChange(person) {
      this.container.distributionId = person.id
      this.container.distributionName = person.name
    },
    onSave(form) {
      this.$refs[form].validate((valid) => {
        if (!valid) {
          return false
        }
        if (this.mode === 'edit') {
          api.updateContainer(this.container).then((response) => {
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
