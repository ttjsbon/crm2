<template>
  <div class="app-container calendar-list-container">
    <div id="select">
			<el-button type="primary" size="mini" @click="changeType" style="margin-right: 0.625rem;">日／月</el-button>
      <span v-show="dataShow">选择日时间段：</span>
      <date-picker v-show="dataShow" v-model="timePeriod" range :shortcuts="shortcuts" style="width: 220px;" @change="selectDate"></date-picker>
			<span v-show="monthShow">选择月时间段：</span>
      <date-picker v-show="monthShow" v-model="startM" lang="en" type="month" format="YYYY-MM"  @change="selectStart"></date-picker>
      <date-picker v-show="monthShow" v-model="endM" lang="en" type="month" format="YYYY-MM"  @change="selectStart"></date-picker>
		</div>
    <ve-line :extend="chartExtend" :data="chartData" :settings="chartSettings"></ve-line>
  </div>
</template>

<script>
	import { statAmountV1_3_0,statMonthAmountV1_3_0 } from '@/api/stat'
  import VeLine from 'v-charts/lib/line'
  import DatePicker from 'vue2-datepicker'

  export default {
    components: { VeLine, DatePicker },
    data() {
      return {
				dataShow:true,
				monthShow:false,
        searchStatus: '',
        query: {
          status: 0,
          selectDate: [null],
					channleName: '机合科技'
        },
        timePeriod: [null],
				timePeriod_month: [null],
        startM: null,
        endM: null,
        lang: {
          days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          placeholder: {
            date: 'Select Date',
            dateRange: 'Select Date Range'
          }
        },
        shortcuts: [
          {
            text: 'Today',
            onClick: () => {
						this.timePeriod = [new Date(),new Date()]
					}
				
          }
        ],
        chartData: {},
        chartSettings: {
					metrics: ['orders'],
          labelMap: {
            'orders': '应收租金',
            // 'customers': '实收租金'
          }},
        chartExtend: {
          xAxis: { boundaryGap: true }
        },
        CustomFormat: 'yyyy-MM',
        Format: 'Custom',
        ShowUpDown: true
      }
    },
    created() {
      this.data()
    },
     methods: {
			changeType() {
				this.dataShow=!this.dataShow
				this.monthShow=!this.monthShow
			},
      data() {
			if (this.timePeriod.length === 2) {
				if(this.query.selectDate[0] && this.query.selectDate[0].getTime()>1000000000000){
					var dat = new Date(new Date(this.query.selectDate[0]).getTime()+3600*24*1000)
					this.query.selectDate[0] = dat
					var dat1 = new Date(new Date(this.query.selectDate[1]).getTime()+3600*24*1000)
					this.query.selectDate[1] = dat1				
				}
				else{
					this.query.selectDate=[]
					this.query.selectDate.push(null)
				}

			}
			statAmountV1_3_0(this.query).then(response => {
				this.chartData = response.data.data
			})
      },
			dataMonth(){
				statMonthAmountV1_3_0(this.query).then(response => {
					this.chartData = response.data.data
				})
			},
      selectDate() {
        this.query.selectDate[0] = this.timePeriod[0]
		    this.query.selectDate[1] = this.timePeriod[1]
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
          this.query.selectDate = this.timePeriod_month
          this.dataMonth()
        }
      }
    }

  }
</script>
