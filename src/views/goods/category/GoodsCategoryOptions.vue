<template>
  <div>
    <el-button @click="visible = true">{{ category ? category.name : '选择商品分类' }}</el-button>
    <el-dialog :visible.sync="visible" append-to-body title="选择分类">
      <el-table :data="items" stripe highlight-current-row @current-change="onCurrentChange">
        <el-table-column label="选择" width="70px">
          <template slot-scope="scope">
            <el-radio v-model="radioIndex" :label="scope.$index" class="radio">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="id" center label="ID" />
        <el-table-column prop="name" center label="分类名称" />
        <el-table-column prop="comment" center label="描述" />
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" size="small" @click="onSubmit">确 定</el-button>
        <el-button size="small" @click="visible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '@/api/goods'

export default {
  name: 'GoodsCategory',
  components: {
  },
  model: {
    prop: 'categoryId',
    event: 'categoryChangeEvent'
  },
  props: {
  },
  data() {
    return {
      visible: false,
      category: null,
      items: [],
      currentRow: null,
      radioIndex: null
    }
  },
  created() {
  },
  mounted() {
    api.getGoodsCategoryList().then(res => {
      this.items = res.data.data
    })
  },
  methods: {
    onCurrentChange(val) {
      this.currentRow = val
    },
    onSubmit() {
      this.category = this.items[this.radioIndex]
      this.$emit('categoryChangeEvent', this.items[this.radioIndex].id)
      this.hide()
    },
    show() {
      this.visible = true
    },
    hide() {
      this.visible = false
    }
  }
}
</script>

<style scoped>

</style>
