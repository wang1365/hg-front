<template>
  <div>
    <el-button style="width:100%" @click="selectCompany()">{{ name ? name : '选择所属机构' }}</el-button>
    <el-dialog :visible.sync="visible" append-to-body title="选择机构">
      <el-radio-group v-model="companyName">
        <el-radio v-for="item in items" :label="item.name" :key="item.id" border>{{ item.name }}</el-radio>
      </el-radio-group>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" size="small" @click="updateCompanyModel(true)">确定</el-button>
        <el-button size="small" @click="updateCompanyModel(false)">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAllCompany } from '@/api/company'

export default {
  name: 'CompanyOption',
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false,
      items: [],
      companyName: this.name
    }
  },
  methods: {
    selectCompany() {
      this.visible = true
      this.companyName = this.name
      getAllCompany().then((response) => {
        this.items = response.data.data
      })
    },
    updateCompanyModel(update) {
      this.visible = false
      if (update) {
        this.$emit('company-change', this.companyName)
      }
    }
  }
}
</script>

<style scoped>

</style>
