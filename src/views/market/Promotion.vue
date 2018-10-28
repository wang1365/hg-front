<template>
  <div class="main">
    <PromotionEdit ref="dialog"/>

    <el-row>
      <el-button type="success" icon="el-icon-plus" size="small" class="right-btn blue-btn" @click="showModel('add')">新增</el-button>
    </el-row>

    <el-row class="table">
      <el-table :data="items" stripe highlight-current-row>
        <el-table-column prop="id" align="center" label="ID" />
        <el-table-column prop="name" align="center" label="品牌名称" />
        <el-table-column prop="desc" align="center" label="描述" />
        <el-table-column align="center" label="操作" width="200px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="showModel('modify', scope.row)">修改</el-button>
            <el-button size="mini" type="warning" @click="onDeleteBtnClick(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import * as api from '@/api/promotion'
import PromotionEdit from './PromotionEdit'

export default {
  name: 'Promotion',
  components: {
    PromotionEdit
  },
  data() {
    return {
      items: [],
      formVisible: false,
      form: {
        name: null,
        startTime: null,
        endTime: null,
        limitTimes: 0,
        ruleType: null,
        includeAllCat: null,
        includeAllBrand: null,
        includeAllHg: null,
        firstReduction: { value: null },
        fullReduction: [], // { fullValue: null, reduceValue: null }
        randomReduction: { minValue: null, maxValue: null },
        discount: { value: null }
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      },
      action: 'add'
    }
  },
  created() {
    this.refresh()
  },
  methods: {
    showModel(action, data) {
      this.$refs['dialog'].show(action, data)
    },
    handleView(index, row) {
      console.log(index, row)
    },
    refresh() {
      api.getPromotionList().then(response => {
        this.items = response.data.data
      })
    },
    onDeleteBtnClick(id) {
      this.$confirm('是否确认要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deletePromotion(id)
          .then(res => {
            if (res.data.success) {
              this.$message({ message: '删除成功', type: 'success' })
              this.refresh()
            } else {
              this.$message({ message: res.data.message, type: 'error' })
            }
          })
          .catch(err => {
            this.$message({ type: 'error', message: '删除失败：' + err })
          })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' })
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
    margin: 5px;
    float: right;
  }
  .image {
    width: 100%;
    display: block;
  }

  /*.image:hover {*/
  /*width: 100%;*/
  /*}*/

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>
