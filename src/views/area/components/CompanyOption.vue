<template>
  <div>
    <el-button style="width:100%" @click="selectCompany()">{{ company && company.name ? company.name : '单击选择所属机构' }}</el-button>
    <el-dialog :visible.sync="visible" append-to-body title="选择机构">
      <el-radio-group v-model="companyName">
        <el-radio v-for="item in items" :label="item.name" :key="item.id" border @change="handleChange(item.id, item.name)">{{ item.name }}</el-radio>
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
    company: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      visible: false,
      items: [],
      companyId: this.company.id,
      companyName: this.company.name
    }
  },
  methods: {
    handleChange(id, name) {
      this.companyId = id
      this.companyName = name
    },
    selectCompany() {
      this.visible = true
      this.companyName = this.company.name
      getAllCompany().then((response) => {
        this.items = response.data.data
      })
    },
    updateCompanyModel(update) {
      this.visible = false
      if (update) {
        this.$emit('change', { id: this.companyId, name: this.companyName })
      }
    }
  }
}
</script>

<style scoped>

</style>
