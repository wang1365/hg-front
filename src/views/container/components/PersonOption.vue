<template>
  <div>
    <el-button :disabled="disabled" style="width:100%" @click="selectPerson()">
      {{ person && person.name ? person.name : (person.type === 'head' ? '单击选择负责人' : '单击选择配送人') }}</el-button>
    <el-dialog :visible.sync="visible" append-to-body title="选择职员">
      <el-table :data="items" border stripe highlight-current-row>
        <el-table-column width="30">
          <template slot-scope="scope">
            <el-radio v-model="radio" :label="scope.$index" @change="changePerson">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="id" align="center" label="ID" />
        <el-table-column prop="name" align="center" label="姓名" />
        <el-table-column prop="company" align="center" label="所属机构" />
        <el-table-column prop="mobileNo" align="center" label="手机号码" />
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" size="small" @click="updatePersonSelection(true)">确定</el-button>
        <el-button size="small" @click="updatePersonSelection(false)">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getPersonListByType } from '@/api/person'

export default {
  name: 'PersonOption',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    person: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      visible: false,
      items: [],
      radio: null,
      personId: this.person.id,
      personName: this.person.name
    }
  },
  methods: {
    selectPerson() {
      this.visible = true
      this.personName = this.person.name
      getPersonListByType(this.person.type).then((response) => {
        this.items = response.data.data
        this.radio = this.items.findIndex(item => item.id === this.person.id)
      })
    },
    changePerson() {
      this.personId = this.items[this.radio].id
      this.personName = this.items[this.radio].name
    },
    updatePersonSelection(changed) {
      this.visible = false
      if (changed) {
        this.$emit('change', { id: this.personId, name: this.personName })
      }
    }
  }
}
</script>

<style scoped>

</style>
