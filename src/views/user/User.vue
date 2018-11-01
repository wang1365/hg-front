<template>
  <div class="main">
    <UserDetail ref="dialog" @success="refresh"/>
    <el-row class="table">
      <el-table :data="items" stripe highlight-current-row>
        <el-table-column prop="id" align="center" label="ID" width="60px"/>
        <el-table-column prop="nickName" align="center" label="用户昵称" />
        <el-table-column align="center" label="用户类型" width="80px">
          <template slot-scope="scope">{{ scope.row.type === 1 ? '微信' : '支付宝' }}</template>
        </el-table-column>
        <el-table-column prop="platformCode" align="center" label="平台ID" min-width="200px"/>
        <el-table-column prop="telephone" align="center" label="手机号码" />
        <el-table-column align="center" label="信用是否符合要求" >
          <template slot-scope="scope">{{ scope.row.creditAudited ? '是' : '否' }}</template>
        </el-table-column>
        <el-table-column prop="creditLevel" align="center" label="不良信用等级" />
        <el-table-column align="center" label="注册时间" min-width="110px">
          <template slot-scope="scope">{{ scope.row.registerTime | formatDatetime }}</template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="showModel(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-row>
    <el-row>
      <el-col :md="{offset:10}" :lg="{offset:13}">
        <div class="block">
          <el-pagination
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="100"
            :total="400"
            background
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"/>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :md="{offset:10}" :lg="{offset:13}">
        <div class="block">
          <el-pagination
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="100"
            :total="400"
            background
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as api from '@/api/user'
import UserDetail from './UserDetail'

export default {
  name: 'User',
  components: {
    UserDetail
  },
  data() {
    return {
      items: [],
      formVisible: false,
      action: 'add',

      currentPage: 0
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
    refresh() {
      api.getUserList().then(response => {
        this.items = response.data.data
      })
    },
    handleSizeChange() {

    },
    handleCurrentChange() {

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
