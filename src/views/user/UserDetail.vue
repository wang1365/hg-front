<template>
  <el-dialog :visible.sync="visible" title="详情">
    <el-row>
      <el-col :offset="9">
        <img src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIwDsE0A0FKAmPsTnEVLicuRA9sUJmSurEwADM5qA5I4S1WnREiavYl5FeEL2IlK4R2qdAblpmM5qXg/132">
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="4">用户昵称:</el-col>
      <el-col :span="8">{{ user.nickName }}</el-col>
      <el-col :span="3" >用户类型:</el-col>
      <el-col :span="9">{{ user.type === 1 ? '微信' : '支付宝' }}</el-col>
    </el-row>
    <el-row >
      <el-col :span="4">手机号码:</el-col>
      <el-col :span="8">{{ user.phone ? user.phone : '-' }}</el-col>
      <el-col :span="3" >平台:</el-col>
      <el-col :span="9">{{ user.platformCode }}   </el-col>
    </el-row>
    <el-row >
      <el-col :span="4">信用是否符合要求:</el-col>
      <el-col :span="8">{{ user.creditAudited ? '是' : '否' }}</el-col>
      <el-col :span="3" >不良信用等级:</el-col>
      <el-col :span="9">{{ '命中' + user.creditLevel + '类名单' }}   </el-col>
    </el-row>
    <el-row >
      <el-col :span="4">注册时间:</el-col>
      <el-col :span="8">{{ user.registerTime | formatDatetime }}</el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  name: 'UserDetail',
  props: {
  },
  data() {
    return {
      visible: false,
      user: null
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    show(user) {
      this.user = user
      this.visible = true
    },
    hide() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
