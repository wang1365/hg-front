<template>
  <div>
    <el-button style="width:100%" @click="selectPerson()">{{ owner ? owner : '单击选择负责人' }}</el-button>
    <el-dialog :visible.sync="visible" append-to-body title="选择负责人">
      <el-radio-group v-model="ownerName">
        <el-radio v-for="item in items" :label="item.name" :key="item.id" border>{{ item.name }}</el-radio>
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
    owner: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false,
      items: [],
      ownerName: this.owner
    }
  },
  methods: {
    selectPerson() {
      this.visible = true
      // this.companyName = this.name
      getPersonListByCompany(this.companyName).then((response) => {
        this.items = response.data.data
        console.log(this.items)
      })
    },
    updatePersonModel(update) {
      this.visible = false
      if (update) {
        this.$emit('person-change', this.ownerName)
      }
    }
  }
}
</script>

<style scoped>

</style>
