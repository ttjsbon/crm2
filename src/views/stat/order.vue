<template>
  <div class="app-container calendar-list-container">
    <div id="select">
      选择时间段：
      <el-button type="primary" size="mini" @click="changeType" style="margin-right: 0.625rem;">日／月</el-button>
      <span v-show="dataShow1">选择日时间段：</span>
      <date-picker v-show="dataShow1" v-model="timePeriod" range :shortcuts="shortcuts" style="width: 220px;"
                   @change="selectDate"></date-picker>
      <span v-show="monthShow">选择月时间段：</span>
      <date-picker v-show="monthShow" v-model="startM" lang="en" type="month" format="YYYY-MM"
                   @change="selectStart"></date-picker>
      <date-picker v-show="monthShow" v-model="endM" lang="en" type="month" format="YYYY-MM"
                   @change="selectStart"></date-picker>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      订单状态：
      <el-select :default-active="$route.path" @change="chickAuth" v-model="searchStatus" filterable
                 placeholder="请输入/请选择" class="h-m-select">
        <el-option v-for="item in statues" :key="item.value" :label="item.label" v-model="item.value">
        </el-option>
      </el-select>
    </div>

    <ve-line :visible.sync="dataShow" :extend="chartExtend" :data="chartData" :settings="chartSettings"
             :colors="colors"></ve-line>
    <ve-line :visible.sync="amountShow" :extend="chartExtend" :data="chartData2" :settings="chartSettings2"
             :colors="colors"></ve-line>
    <ve-line :visible.sync="parseShow" :extend="chartExtend" :data="chartData3" :settings="chartSettings3"
             :colors="colors"></ve-line>
  </div>
</template>

<script>
  import {statOrder, statMonthOrder} from '@/api/stat'
  import VeLine from 'v-charts/lib/line'
  import DatePicker from 'vue2-datepicker'
  import VeHistogram from 'v-charts/lib/histogram'

  export default {
    components: {VeHistogram, VeLine, DatePicker},
    data() {
      this.colors = ['#29B9EF', '#2CF5B5', 'red']
      return {
        dataShow1: true,
        monthShow: false,
        timePeriod_month: [null],
        startM: null,
        endM: null,
        dataShow: false,
        amountShow: false,
        parseShow: false,
        searchStatus: '',
        query: {
          status: 0,
          timePeriod: [null],
        },
        statues: [{
          value: '1',
          label: '全部'
        }, {
          value: '2',
          label: '审核通过'
        }, {
          value: '4',
          label: '订单总额'
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
        chartData2: {},
        chartData3: {},
        chartSettings: {
          labelMap: {
            'orders': '订单量',
            'customers': '成交量',
            'jdOrders': '京东订单量'
          }
        },
        chartSettings2: {
          labelMap: {
            'amount': '订单总额'
          }
        },
        chartSettings3: {
          labelMap: {
            'orders': '成交量',
            'customers': '审核通过'
          }
        },
        chartSettings4: {
          labelMap: {
            'orders': '成交量',
            'customers': '审核通过',
            'amount': '订单总额'
          }
        },
        chartExtend: {
          xAxis: {boundaryGap: true}
        }
      }
    },
    created() {
      this.data()
    },
    methods: {
      changeType() {
        this.dataShow1 = !this.dataShow1
        this.monthShow = !this.monthShow
      },
      data() {
        if (this.timePeriod.length === 2) {
          if (this.query.timePeriod[0] && this.query.timePeriod[0].getTime() > 1000000000000) {
            var dat = new Date(new Date(this.query.timePeriod[0]).getTime() + 3600 * 24 * 1000)
            this.query.timePeriod[0] = dat
            var dat1 = new Date(new Date(this.query.timePeriod[1]).getTime() + 3600 * 24 * 1000)
            this.query.timePeriod[1] = dat1
          }
          else {
            this.query.timePeriod = []
            this.query.timePeriod.push(null)
          }

        }
        statOrder(this.query).then(response => {

          if (this.searchStatus === 4) {
            this.chartData2 = response.data.data
            this.dataShow = false
            this.parseShow = false
            this.amountShow = true
          } else {
            if (this.searchStatus === 2) {
              this.chartSettings = this.chartSettings3
              this.parseShow = true
              this.dataShow = false
              this.amountShow = false
              this.chartData3 = response.data.data
            } else {
              this.parseShow = false
              this.dataShow = true
              this.amountShow = false
              this.chartData = response.data.data
            }
          }
        })
      },
      dataMonth() {
        statMonthOrder(this.query).then(response => {
          if (this.searchStatus === 4) {
            this.chartSettings = this.chartSettings2
            this.chartData2 = response.data.data
            this.dataShow = false
            this.parseShow = false
            this.amountShow = true
          } else {
            if (this.searchStatus === 2) {
              this.chartSettings = this.chartSettings3
              this.parseShow = true
              this.dataShow = false
              this.amountShow = false
              this.chartData3 = response.data.data
            } else if (this.searchStatus === 1) {
              this.chartSettings = this.chartSettings4
              this.parseShow = false
              this.dataShow = false
              this.amountShow = false
              this.chartData4 = response.data.data
            } else {
              this.chartSettings = this.chartSettings
              this.parseShow = false
              this.dataShow = false
              this.amountShow = false
              this.chartData = response.data.data
            }
          }
        })
      },
      chickAuth() {
        this.query.status = this.searchStatus
        if (this.dataShow1) {
          if (this.timePeriod_month.length > this.timePeriod.length) {
            if (this.timePeriod_month.length === 1) {
              this.query.timePeriod[0] = this.timePeriod_month[0]
            } else {
              this.query.timePeriod[0] = this.timePeriod_month[0]
              this.query.timePeriod[1] = this.timePeriod_month[1]
            }
          } else {
            if (this.timePeriod.length === 1) {
              this.query.timePeriod[0] = this.timePeriod[0]
            } else {
              this.query.timePeriod[0] = this.timePeriod[0]
              this.query.timePeriod[1] = this.timePeriod[1]
            }
          }

          this.data()
        } else {
          if (this.timePeriod_month.length < this.timePeriod.length) {
            if (this.timePeriod.length === 1) {
              this.query.timePeriod[0] = this.timePeriod[0]
            } else {
              this.query.timePeriod[0] = this.timePeriod[0]
              this.query.timePeriod[1] = this.timePeriod[1]
            }
          } else {
            if (this.timePeriod_month.length === 1) {
              this.query.timePeriod[0] = this.timePeriod_month[0]
            } else {
              this.query.timePeriod[0] = this.timePeriod_month[0]
              this.query.timePeriod[1] = this.timePeriod_month[1]
            }
          }
          this.dataMonth()
        }
      },
      selectDate() {
        this.query.timePeriod[0] = this.timePeriod[0]
        this.query.timePeriod[1] = this.timePeriod[1]
        this.data()
      },
      selectStart() {
        if (this.startM == null || this.endM == null) {
          var dat = new Date()
          dat.setMonth(dat.getMonth() + 1)
          this.timePeriod_month = [dat, dat]
        } else {
          var date = new Date(this.startM)
          date.setMonth(date.getMonth() + 1)
          this.timePeriod_month[0] = date
          var date1 = new Date(this.endM)
          date1.setMonth(date1.getMonth() + 1)
          this.timePeriod_month[1] = date1
          this.query.timePeriod = this.timePeriod_month
          this.dataMonth()
        }
      }
    }

  }

</script>

