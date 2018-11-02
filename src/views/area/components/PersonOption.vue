<template>
  <div>
    <el-button style="width:100%" @click="selectPerson()">{{ head ? head : '单击选择负责人' }}</el-button>
    <el-dialog :visible.sync="visible" append-to-body title="选择负责人">
      <el-radio-group v-model="headName">
        <el-radio v-for="item in items" :label="item.name" :key="item.id" border @change="handleChange(item.id, item.name)">{{ item.name }}</el-radio>
      </el-radio-group>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" size="small" @click="updatePersonModel(true)">确定</el-button>
        <el-button size="small" @click="updatePersonModel(false)">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getPersonListByCompany } from '@/api/person'

export default {
  name: 'PersonOption',
  props: {
    companyName: {
      type: String,
      default: ''
    },
    head: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false,
      items: [],
      headId: null,
      headName: this.head
    }
  },
  methods: {
    handleChange(id, name) {
      this.headId = id
      this.headName = name
    },
    selectPerson() {
      this.visible = true
      getPersonListByCompany(this.companyName).then((response) => {
        this.items = response.data.data
      })
    },
    updatePersonModel(update) {
      this.visible = false
      if (update) {
        this.$emit('change', { id: this.headId, name: this.headName })
      }
    }
  }
}
</script>

<style scoped>

</style>
