<template>
  <div class="main">
    <el-dialog :visible.sync="formVisible" title="新增">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="form.name" placeholder="填写分类名称"/>
        </el-form-item>
        <el-form-item label="描述" prop="imageUrl">
          <el-input v-model="form.desc" type="textarea" placeholder="填写商品分类描述"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" size="small" @click="onSubmit('form')">保存</el-button>
        <el-button size="small" @click="formVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <el-row>
      <el-button type="success" icon="el-icon-plus" size="small" class="right-btn blue-btn" @click="showModel('add')">新增</el-button>
    </el-row>

    <el-row class="table">
      <el-table :data="items" stripe highlight-current-row>
        <el-table-column prop="id" align="center" label="ID" />
        <el-table-column prop="name" align="center" label="名称" />
        <el-table-column prop="desc" align="center" label="描述" />
        <el-table-column align="center" label="操作" >
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
import * as api from '@/api/goods'

export default {
  name: 'GoodsCategory',
  components: {
  },
  data() {
    return {
      items: [],
      formVisible: false,
      form: {
        name: null,
        desc: null
      },
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
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
      this.action = action
      this.formVisible = true
      if (action === 'modify') {
        this.form = Object.assign({}, data)
      }
    },
    hideModel() {
      this.formVisible = false
    },
    handleView(index, row) {
      console.log(index, row)
    },
    refresh() {
      api.getGoodsCategoryList().then(response => {
        this.items = response.data.data
      })
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (!valid) {
          return false
        }

        const restInvoke = this.action === 'modify' ? api.updateGoodsCategory : api.addGoodsCategory
        const msgPrefix = this.action === 'modify' ? '修改' : '添加'
        restInvoke(this.form).then((response) => {
          this.$message({ message: `${msgPrefix}商品成功`, type: 'success' })
          this.refresh()
          this.hideModel()
        }).catch(err => {
          this.$message({ message: `${msgPrefix}失败：${err}`, type: 'error' })
        })
      })
    },
    onDeleteBtnClick(id) {
      this.$confirm('是否确认要删除该商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deleteGoodsCategory(id)
          .then(response => {
            this.$message({ type: 'success', message: '删除成功!' })
            this.refresh()
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

<style scoped>
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
