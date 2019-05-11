<template>
  <div class="app-container calendar-list-container">
    <div id="select">
      选择时间段：
      <!--<date-picker v-model="timePeriod" range :shortcuts="shortcuts" style="width: 220px;" @change="selectDate"></date-picker>-->
      <date-picker v-model="timePeriod" range :shortcuts="shortcuts" style="width: 220px;" @change="selectDate"></date-picker>
      <!--<date-picker v-model="startM" lang="en" type="month" format="YYYY-MM"  @change="selectStart"></date-picker>-->
      <!--<date-picker v-model="endM" lang="en" type="month" format="YYYY-MM"  @change="selectStart"></date-picker>-->
    </div>

    <ve-line :extend="chartExtend" :data="chartData" :settings="chartSettings"></ve-line>
  </div>
</template>

<script>
  // import { statAmount } from '@/api/stat'
	import { statAmountV1_3_0 } from '@/api/stat' 
  import VeLine from 'v-charts/lib/line'
  import DatePicker from 'vue2-datepicker'

  export default {
    components: { VeLine, DatePicker },
    data() {
      return {
        searchStatus: '',
        query: {
          status: 0,
          selectDate: [null],
					channleName: 'B'
        },
        timePeriod: [null],
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
              this.timePeriod = [new Date(), new Date()]
            }
          }
        ],
        chartData: {},
        chartSettings: {
          labelMap: {
            'orders': '应收租金',
            'customers': '实收租金'
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
      data() {
        // statAmount(this.query).then(response => {
        //   this.chartData = response.data.data
        // })
				statAmountV1_3_0(this.query).then(response => {
				  this.chartData = response.data.data
				})
      },
      selectDate() {
        if (this.timePeriod[0] == null) {
          this.timePeriod = [null]
        }
        this.query.selectDate = this.timePeriod
        this.data()
      },
      selectStart() {
        if (this.startM == null || this.endM == null) {
          var dat = new Date()
          dat.setMonth(dat.getMonth() + 1)
          this.timePeriod = [dat, dat]
        } else {
          var date = new Date(this.startM)
          date.setMonth(date.getMonth() + 1)
          this.timePeriod[0] = date
          var date1 = new Date(this.endM)
          date1.setMonth(date1.getMonth() + 1)
          this.timePeriod[1] = date1
          this.query.selectDate = this.timePeriod
          this.data()
        }
      }
    }

  }
</script>
