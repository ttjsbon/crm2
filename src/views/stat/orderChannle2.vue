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

    <ve-line :visible.sync="dataShow" :extend="chartExtend" :data="chartData" :settings="chartSettings" :colors="colors"></ve-line>
    <ve-line :visible.sync="amountShow" :extend="chartExtend" :data="chartData2" :settings="chartSettings2" :colors="colors"></ve-line>
    <ve-line :visible.sync="parseShow" :extend="chartExtend" :data="chartData3" :settings="chartSettings3" :colors="colors"></ve-line>
  </div>
</template>

<script>
  // import { statOrder } from '@/api/stat'
	import { statOrderV1_3_0 } from '@/api/stat'
  import VeLine from 'v-charts/lib/line'
  import DatePicker from 'vue2-datepicker'
  import VeHistogram from 'v-charts/lib/histogram'

  export default {
    components: { VeHistogram, VeLine, DatePicker },
    data() {
			this.colors = ['#29B9EF', '#2CF5B5', 'red']
      return {
        dataShow: false,
        amountShow: false,
        parseShow: false,
        searchStatus: '',
        query: {
          status: 1,
          timePeriod: [null],
					channleName: '测试渠道2'
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
				chartData4: {},
        chartSettings: {
          labelMap: {
            'orders': '订单量',
            'customers': '成交量'
          }
        },
        chartSettings2: {
          labelMap: {
            'amount': '订单总额'
          }},
        chartSettings3: {
          labelMap: {
            'orders': '成交量',
            'customers': '审核通过'
          }},
				chartSettings4: {
				  labelMap: {
				    'orders': '成交量',
				    'customers': '审核通过',
						'amount': '订单总额',
				  }},
        chartExtend: {
          xAxis: { boundaryGap: true }
        }
      }
    },
    created() {
      this.data()
    },
    methods: {
      data() {
        // statOrder(this.query).then(response => {
        //   if (this.searchStatus === 4) {
        //     this.chartData2 = response.data.data
        //     this.dataShow = false
        //     this.parseShow = false
        //     this.amountShow = true
        //   } else {
        //     if (this.searchStatus === 2) {
        //       this.chartSettings = this.chartSettings3
        //       this.parseShow = true
        //       this.dataShow = false
        //       this.amountShow = false
        //       this.chartData3 = response.data.data
        //     } else {
        //       this.parseShow = false
        //       this.dataShow = true
        //       this.amountShow = false
        //       this.chartData = response.data.data
        //     }
        //   }
        // })
				statOrderV1_3_0(this.query).then(response => {
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
				    } else if(this.searchStatus === 1){
							this.chartSettings = this.chartSettings4
							this.parseShow = false
							this.dataShow = false
							this.amountShow = false
							this.chartData4 = response.data.data
						}else {
							this.chartSettings = this.chartSettings
				      this.parseShow = false
				      this.dataShow = true
				      this.amountShow = false
				      this.chartData = response.data.data
				    }
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

