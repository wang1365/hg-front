<template>
  <el-dialog :visible.sync="visible" title="二维码" left>
    <p class="title">手机扫一扫</p>
    <div id="qrcode" width="20%"/>
  </el-dialog>
</template>

<script>
import QRCode from 'qrcodejs2'

export default {
  name: 'QrCodeDialog',
  components: {
    QRCode
  },
  props: {},
  data() {
    return {
      visible: false,
      qrCode: null
    }
  },
  created() {},
  mounted() {},
  methods: {
    show(machineCode) {
      this.visible = true
      this.$nextTick(() => {
        if (this.qrCode === null) {
          this.qrCode = new QRCode('qrcode', {
            width: 180,
            height: 180,
            text: machineCode,
            // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
            background: '#f0f',
            foreground: '#ff0'
          })
        } else {
          this.qrCode.clear()
          this.qrCode.makeCode(machineCode)
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
