<template>
  <div class="main">
    <PromotionEdit ref="dialog" @success="refresh"/>
    <el-row>
      <el-button type="success" icon="el-icon-plus" size="small" class="right-btn blue-btn" @click="showModel('add')">新增</el-button>
    </el-row>
    <el-row class="table">
      <el-table :data="items" stripe highlight-current-row>
        <el-table-column prop="id" align="center" label="ID" />
        <el-table-column prop="name" align="center" label="促销活动名称" />
        <el-table-column prop="ruleName" align="center" label="促销类型" >
          <template slot-scope="scope">{{ getPromotionName(scope.row.ruleType) }}</template>
        </el-table-column>
        <el-table-column prop="startTime" align="center" label="开始时间" >
          <template slot-scope="scope">{{ scope.row.startTime | formatDatetime }}</template>
        </el-table-column>
        <el-table-column prop="endTime" align="center" label="结束时间" >
          <template slot-scope="scope">{{ scope.row.endTime | formatDatetime }}</template>
        </el-table-column>
        <el-table-column prop="audited" align="center" label="审核状态" >
          <template slot-scope="scope">{{ scope.row.audited ? '已审核' : '未审核' }}</template>
        </el-table-column>
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
      action: 'add'
    }
  },
  created() {

  },
  mounted() {
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
      console.log('promotion id', id)
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
    },
    getPromotionName(type) {
      return { 1: '首单立减', 2: '购物满减', 3: '随机立减', 4: '优惠折扣' }[type]
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
