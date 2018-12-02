<template>
  <div style="margin:15px">
    <el-row>
      <el-form :inline="true">
        <el-form-item size="mini" label="总销售额" prop="totalSaleAmount">
          <el-input v-model.number="fake.totalSaleAmount" type="number" placeholder=""/>
        </el-form-item>
        <el-form-item size="mini" label="总销售数量" prop="totalSaleCount">
          <el-input v-model.number="fake.totalSaleCount" type="number" placeholder=""/>
        </el-form-item>
        <el-form-item size="mini" label="总用户数" prop="userCount">
          <el-input v-model.number="fake.userCount" type="number" placeholder=""/>
        </el-form-item>
        <el-form-item size="mini" label="总销量（重量）" prop="totalWeight">
          <el-input v-model.number="fake.totalWeight" type="number" placeholder=""/>
        </el-form-item>
        <el-button type="success" size="small" @click="onSubmit('fake')">保 存</el-button>
      </el-form>
      <hr>
      <el-dialog :visible.sync="showUpdate">
        <el-form :model="fakeDay" :inline="true">
          <el-form-item size="mini" label="日期" prop="totalSaleAmount">
            <el-date-picker
              v-model="fakeDay.day"
              type="date"
              placeholder="选择日期"/>
          </el-form-item>
          <el-form-item size="mini" label="日销售额" prop="saleAmount">
            <el-input v-model.number="fakeDay.saleAmount" type="number" placeholder=""/>
          </el-form-item>
          <el-form-item size="mini" label="日销售数量" prop="saleCount">
            <el-input v-model.number="fakeDay.saleCount" type="number" placeholder=""/>
          </el-form-item>
          <el-form-item size="mini" label="日新增用户数" prop="userCount">
            <el-input v-model.number="fakeDay.userCount" type="number" placeholder=""/>
          </el-form-item>
          <el-form-item size="mini" label="日销量（重量）" prop="saleWeight">
            <el-input v-model.number="fakeDay.saleWeight" type="number" placeholder=""/>
          </el-form-item>
          <el-button type="success" size="small" @click="onUpdate('fakeDay')">保 存</el-button>
        </el-form>
      </el-dialog>
    </el-row>

    <el-dialog :visible.sync="showAdd">
      <el-form :inline="true" :model="fakeDay">
        <el-form-item :model="fakeDay" size="mini" label="日期" prop="totalSaleAmount">
          <el-date-picker
            v-model="fakeDay.day"
            type="date"
            placeholder="选择日期"/>
        </el-form-item>
        <el-form-item size="mini" label="日销售额" prop="saleAmount">
          <el-input v-model.number="fakeDay.saleAmount" type="number" placeholder=""/>
        </el-form-item>
        <el-form-item size="mini" label="日销售数量" prop="saleCount">
          <el-input v-model.number="fakeDay.saleCount" type="number" placeholder=""/>
        </el-form-item>
        <el-form-item size="mini" label="日新增用户数" prop="userCount">
          <el-input v-model.number="fakeDay.userCount" type="number" placeholder=""/>
        </el-form-item>
        <el-form-item size="mini" label="日销量（重量）" prop="saleWeight">
          <el-input v-model.number="fakeDay.saleWeight" type="number" placeholder=""/>
        </el-form-item>
        <el-button type="success" size="small" @click="onAdd('addForm')">保 存</el-button>
      </el-form>
    </el-dialog>

    <el-table :data="items" size="small" border stripe highlight-current-row>
      <el-table-column align="center" prop="id" label="ID" sortable width="60" />
      <el-table-column align="center" label="日期" >
        <template slot-scope="scope">{{ scope.row.day|formatDate }}</template>
      </el-table-column>
      <el-table-column align="center" prop="saleAmount" label="日销售额" />
      <el-table-column align="center" prop="saleCount" label="日销售数量" />
      <el-table-column align="center" prop="userCount" label="日新增用户数" />
      <el-table-column align="center" prop="saleWeight" label="日销量（重量）" />
      <el-table-column align="center" label="操作" width="240px">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="clickAdd">新增</el-button>
          <el-button size="mini" type="success" @click="clickUpdate(scope.row)">修改</el-button>
          <el-button size="mini" type="warning" @click="onDeleteBtnClick(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as api from '@/api/fake'

export default {
  name: 'Order',
  components: {
  },
  data() {
    return {
      items: [],
      showUpdate: false,
      showAdd: false,
      fake: {
        id: 1,
        totalSaleAmount: null,
        totalSaleCount: null,
        userCount: null,
        totalWeight: null
      },
      fakeDay: {
        id: null,
        day: null,
        saleAmount: null,
        saleCount: null,
        userCount: null,
        saleWeight: null
      }
    }
  },
  computed: {

  },
  created() {
    api.getFake().then(res => {
      this.fake = res.data.data
    })
    this.refreshList()
  },
  methods: {
    refreshList() {
      api.getFakeDayList().then(res => {
        this.items = res.data.data
      })
    },
    handleView(index, row) {
      console.log(index, row)
    },
    showModal(action, data) {
      this.$refs['formDialog'].show(action, data)
    },
    updateOrderList() {
      api.getAllOrder().then(response => {
        this.items = response.data.data
      })
    },
    onImageClick(path) {
      this.selectedImage = path
      this.imageDialogVisible = true
    },
    goOrderDetail(orderId) {
      this.$router.push('/qrcode/index')
    },
    getTotalPrice(item) {
      if (item.price === null || item.quantity === null) {
        return ''
      }
      return (item.price / 100) * item.quantity
    },
    onSubmit(form) {
      if (form === 'fake') {
        api.updateFake(this.fake).then(res => {
          this.$message({ type: 'success', message: '保存成功!' })
        })
      }
      if (form === 'fakeDay') {
        const rest = this.fake.id ? api.updateFakeDay : api.addFakeDay
        rest(this.fakeDay).then(res => {
          this.$message({ type: 'success', message: '保存成功!' })
        })
      }
      if (form === 'addForm') {
        const rest = api.addFakeDay
        rest(this.fakeDay).then(res => {
          this.$message({ type: 'success', message: '保存成功!' })
        })
      }
    },
    clickAdd() {
      this.showAdd = true
      this.fakeDay = {
        id: null,
        day: null,
        saleAmount: null,
        saleCount: null,
        userCount: null,
        saleWeight: null
      }
    },
    clickUpdate(fakeDay) {
      this.showUpdate = true
      this.fakeDay = fakeDay
    },
    onDeleteBtnClick(id) {
      api.deleteFakeDay(id).then(res => {
        this.$message({ type: 'success', message: '删除成功!' })
        this.refreshList()
      })
    },
    onAdd() {
      api.addFakeDay(this.fakeDay).then(res => {
        this.$message({ type: 'success', message: '更新成功!' })
        this.showAdd = false
        this.refreshList()
      })
    },
    onUpdate(fakeDay) {
      api.updateFakeDay(this.fakeDay).then(res => {
        this.$message({ type: 'success', message: '更新成功!' })
        this.showUpdate = false
        this.refreshList()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .main {
    padding: 20px
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .time {
    font-size: 13px;
    color: #999;
  }
  .card {
    width: 300px;
    height: 370px;
    margin-bottom: 10px;
    background-color: #d3dce6;
  }
  .card:hover {
    width: 330px;
  }
  .bottom {
    bottom: 15px;
    line-height: 12px;
  }
  .button {
    /*padding: 0;*/
    float: right;
  }
  .image {
    width: 100%;
    display: block;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>
