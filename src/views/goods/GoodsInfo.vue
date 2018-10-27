<template>
  <div class="main">
    <el-dialog :visible.sync="formVisible" title="新增">
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="form.name" placeholder="填写商品名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="条形码" prop="barCode">
              <el-input v-model="form.barCode"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item label="分类" prop="catId">
              <GoodsCategoryOptions v-model="form.catId"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="品牌" prop="brandId">
              <GoodsBrandOptions v-model="form.brandId"/>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item label="采购价(元)" prop="purchasePrice">
              <el-input-number v-model="form.purchasePrice" :min="0" :max="1000" :precision="2" controls-position="right"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="零售价(元)" prop="salePrice">
              <el-input-number v-model="form.salePrice" :min="0" :max="1000" :precision="2" controls-position="right"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item label="净重" prop="weight">
              <el-input-number v-model="form.weight" :min="0" :max="1000" :precision="2" controls-position="right"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位" prop="unit">
              <el-input v-model="form.unit"/>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row :span="24">
          <el-col :span="8">
            <el-form-item label="保质天数" prop="expireDays">
              <el-input-number v-model="form.expireDays" controls-position="right"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="描述" prop="desc">
              <el-input v-model="form.desc" type="textarea"/>
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
        <el-table-column prop="name" align="center" label="名称" />
        <el-table-column prop="brandName" align="center" label="品牌" />
        <el-table-column prop="catName" align="center" label="分类" />
        <el-table-column prop="barCode" align="center" label="条形码" />
        <el-table-column prop="purchasePrice" align="center" label="采购价" />
        <el-table-column prop="salePrice" align="center" label="销售价" />
        <el-table-column prop="unit" align="center" label="单位" />
        <el-table-column prop="weight" align="center" label="净含量" />
        <el-table-column prop="expireDays" align="center" label="保质期天数" />
        <el-table-column prop="isValid" align="center" label="是否生效" >
          <template slot-scope="scope">{{ scope.row.valid ? '是' : '否' }}</template>
        </el-table-column>
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
import GoodsBrandOptions from './brand/GoodsBrandOptions'
import GoodsCategoryOptions from './category/GoodsCategoryOptions'

export default {
  name: 'Goods',
  components: {
    GoodsBrandOptions, GoodsCategoryOptions
  },
  data() {
    return {
      selectedBrand: null,
      brandOptionsVisible: false,
      items: [],
      formVisible: false,
      form: {
        name: null,
        catId: null,
        brandId: null,
        barCode: null,
        purchasePrice: null,
        salePrice: null,
        weight: null,
        expireDays: null,
        desc: null,
        isValid: null
      },
      rules: {
        name: [
          { required: true, message: '商品名称不能为空', trigger: 'blur' }
        ],
        barCode: [
          { required: true, message: '条形码不能为空', trigger: 'blur' }
        ],
        brandId: [
          { required: true, message: '请选择品牌', trigger: 'blur' }
        ],
        catId: [
          { required: true, message: '请选择分类', trigger: 'blur' }
        ],
        purchasePrice: [
          { required: true, message: '采购价格不能为空', trigger: 'blur' }
        ],
        salePrice: [
          { required: true, message: '销售价格不能为空', trigger: 'blur' }
        ],
        unit: [
          { required: true, message: '单位不能为空', trigger: 'blur' }
        ],
        weight: [
          { required: true, message: '净重不能为空', trigger: 'blur' }
        ],
        expireDays: [
          { required: true, message: '保质天数不能为空', trigger: 'blur' }
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
      api.getGoodsList().then(res => {
        this.items = res.data.data
      })
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (!valid) {
          return false
        }

        const restInvoke = this.action === 'modify' ? api.updateGoods : api.addGoods
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
