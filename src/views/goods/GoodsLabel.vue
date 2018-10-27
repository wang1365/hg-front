<template>
  <div class="main">
    <el-dialog :visible.sync="formVisible" title="新增">
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
        <el-row :span="24">
          <el-col :span="10">
            <el-form-item label="条形码" prop="barCode">
              <el-input v-model="form.barCode">
                <el-button slot="append" icon="el-icon-search" @click="onSearchBarCode"/>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="10">
            <el-form-item label="商品名称" prop="name" >
              <el-input v-model="goods.name" readonly placeholder="根据条形码自动生成" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="商品分类" prop="catName" >
              <el-input v-model="goods.catName" readonly placeholder="根据条形码自动生成"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :span="24">
          <el-col :span="10">
            <el-form-item label="商品品牌" prop="brandName">
              <el-input v-model="goods.brandName" readonly placeholder="根据条形码自动生成"/>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="保质天数" prop="expireDays">
              <el-input-number v-model="form.expireDays" controls-position="right"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :span="24">
          <el-col :span="10">
            <el-form-item label="电子标签" prop="labelCode">
              <el-input v-model="form.labelCode" type="textarea"/>
            </el-form-item>
          </el-col>
        </el-row>
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
        <el-table-column prop="name" align="center" label="商品名称" />
        <el-table-column prop="status" align="center" label="标签状态" />
        <el-table-column prop="labelCode" align="center" label="电子标签" />
        <el-table-column prop="barCode" align="center" label="条形码" />
        <el-table-column prop="brandName" align="center" lchuangiabel="品牌" />
        <el-table-column prop="catName" align="center" label="分类" />
        <el-table-column prop="expireDays" align="center" label="保质期天数" />
        <el-table-column prop="createTime" align="center" label="创建时间" />
        <el-table-column align="center" label="操作" min-width="150px">
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
  name: 'GoodsLabel',
  components: {
  },
  data() {
    return {
      selectedBrand: null,
      brandOptionsVisible: false,
      items: [],
      formVisible: false,
      form: {
        barCode: null,
        labelCode: null,
        productDate: null,
        expireDays: null
      },
      goods: {
        name: null,
        catName: null,
        brandName: null
      },
      rules: {
        barCode: [
          { required: true, message: '条形码不能为空', trigger: 'blur' }
        ],
        labelCode: [
          { required: true, message: '标签码不能为空', trigger: 'blur' }
        ],
        productDate: [
          { required: true, message: '生产日期不能为空', trigger: 'blur' }
        ],
        expireDays: [
          { required: true, message: '保质天数不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '商品名称不能为空', trigger: 'blur' }
        ],
        catName: [
          { required: true, message: '商品分类不能为空', trigger: 'blur' }
        ],
        brandName: [
          { required: true, message: '商品品牌不能为空', trigger: 'blur' }
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
      api.getGoodsLabelList().then(res => {
        this.items = res.data.data
      })
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (!valid) {
          return false
        }

        const restInvoke = this.action === 'modify' ? api.updateGoodsLabel : api.addGoodsLabel
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
        api.deleteGoods(id)
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
    },
    onSearchBarCode() {
      if (!this.form.barCode) {
        return
      }
      api.getGoodsByBarCode(this.form.barCode).then(res => {
        if (res.data.data) {
          this.goods = res.data.data
        } else {
          this.$message({ type: 'warning', message: `找不到条形码"${this.form.barCode}"对应的商品` })
        }
      }).catch(() => this.$message({ type: 'error', message: '服务器内部错误' }))
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
