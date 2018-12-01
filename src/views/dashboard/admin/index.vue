<template>
  <div class="dashboard-editor-container">

    <panel-group @handleSetLineChartData="handleSetLineChartData"/>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData"/>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart/>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'

import * as api from '@/api/fake'

export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard
  },
  data() {
    return {
      rawData: {
        saleAmount: {
          items: [],
          compareItems: []
        },
        saleCount: {
          items: [],
          compareItems: []
        },
        userCount: {
          items: [],
          compareItems: []
        },
        weight: {
          items: [],
          compareItems: []
        }
      },
      lineChartData: {
        items: [],
        compareItems: []
      }
    }
  },
  mounted() {
    this.lineChartData = this.rawData.saleAmount
    this.refreshData()
  },
  methods: {
    handleSetLineChartData(type) {
      console.log('handleSetLineChartData', type)
      this.lineChartData = this.rawData[type]
    },
    refreshData() {
      api.getFakeDailyReport().then(res => {
        const d1 = res.data.data[0]
        const d2 = res.data.data[1]
        console.log('line data from server', res.data.data)
        this.rawData.saleAmount.items = []
        this.rawData.saleCount.items = []
        this.rawData.userCount.items = []
        this.rawData.weight.items = []
        this.rawData.saleAmount.compareItems = []
        this.rawData.saleCount.compareItems = []
        this.rawData.userCount.compareItems = []
        this.rawData.weight.compareItems = []
        d1.forEach((fake) => {
          this.rawData.saleAmount.items.push(fake.saleAmount)
          // this.rawData.saleAmount.compareItems.push(fake.saleAmount)
          this.rawData.saleCount.items.push(fake.saleCount)
          this.rawData.userCount.items.push(fake.userCount)
          this.rawData.weight.items.push(fake.saleWeight)
        })
        d2.forEach((fake) => {
          this.rawData.saleAmount.compareItems.push(fake.saleAmount)
          this.rawData.saleCount.compareItems.push(fake.saleCount)
          this.rawData.userCount.compareItems.push(fake.userCount)
          this.rawData.weight.compareItems.push(fake.saleWeight)
        })
        console.log('new data', this.rawData)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
