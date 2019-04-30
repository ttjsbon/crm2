<template>
  <div class="app-container calendar-list-container">
    <div id="select">
      选择时间段：
      <date-picker v-model="timePeriod" range :shortcuts="shortcuts" style="width: 220px;" @change="selectDate"></date-picker>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      订单状态：
      <el-select :default-active="$route.path" @change="chickAuth" v-model="searchStatus" filterable placeholder="请输入/请选择" class="h-m-select">
        <el-option v-for="item in statues" :key="item.value" :label="item.label" v-model="item.value">
        </el-option>
      </el-select>
    </div>

    <ve-line :extend="chartExtend" :data="chartData" :settings="chartSettings"></ve-line>
  </div>
</template>

<script>
import { statOrder } from '@/api/stat'
import VeLine from 'v-charts/lib/line'
import DatePicker from 'vue2-datepicker'

export default {
  components: { VeLine, DatePicker },
  data() {
    return {
      searchStatus: '',
      query: {
        status: 2,
        timePeriod: [null]
      },
      statues: [{
        value: '0',
        label: '全部'
      },
      {
        value: '1',
        label: '已成交'
      }, {
        value: '2',
        label: '审核通过'
      }, {
        value: '3',
        label: '审核拒绝'
      }],
      timePeriod: [null],
      lang: {
        days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        pickers: ['next 7 days', 'next 30 days', 'previous 7 days', 'previous 30 days'],
        placeholder: {
          date: 'Select Date',
          dateRange: 'Select Date Range'
        }
      },
      shortcuts: [
        {
          text: 'Today',
          onClick: () => {
            this.timePeriod = [new Date(), new Date()]
          }
        }
      ],
      chartData: {},
      chartSettings: {},
      chartExtend: {}
    }
  },
  created() {
    this.data()
  },
  methods: {
    data() {
      statOrder(this.query).then(response => {
        this.chartData = response.data.data
        this.chartSettings = {
          labelMap: {
            'orders': '订单量',
            'customers': '下单用户',
            'amount': '订单总额',
            'pcr': '客单价'
          }
        }
        this.chartExtend = {
          xAxis: { boundaryGap: true }
        }
      })
    },
    chickAuth() {
      this.query.status = this.searchStatus
      this.data()
    },
    selectDate() {
      if (this.timePeriod[0] == null) {
        this.timePeriod = [null]
      }
      this.query.timePeriod = this.timePeriod
      this.data()
    }
  }

}
</script>
