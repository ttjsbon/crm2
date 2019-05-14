<template>
  <div class="app-container calendar-list-container">
    <div id="select">
      选择时间段：
      <date-picker v-model="timePeriod" range :shortcuts="shortcuts" style="width: 220px;" @change="selectDate"></date-picker>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      认证状态：
      <el-select :default-active="$route.path" @change="chickAuth" v-model="searchAuth" filterable placeholder="请输入/请选择" class="h-m-select">
        <el-option v-for="item in auths" :key="item.value" :label="item.label" v-model="item.value">
        </el-option>
      </el-select>
    </div>

    <!--<ve-histogram :extend="chartExtend" :data="chartData" :settings="chartSettings"></ve-histogram>-->
    <ve-line :extend="chartExtend" :data="chartData" :settings="chartSettings"></ve-line>
  </div>
</template>

<script>
  import { statUser } from '@/api/stat'
  import VeHistogram from 'v-charts/lib/histogram'
  import VeLine from 'v-charts/lib/line'
  import DatePicker from 'vue2-datepicker'

  export default {
    components: { VeLine, VeHistogram, DatePicker },
    data() {
      return {
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
        chartExtend: {},
        query: {
          dayNum: 30,
          auth: 2,
          timePeriod: [null]
        },
        // days: [
        //   {
        //     value: '1',
        //     label: '当天'
        //   }, {
        //     value: '3',
        //     label: '最近3天'
        //   }, {
        //     value: '7',
        //     label: '最近7天'
        //   }, {
        //     value: '30',
        //     label: '最近30天'
        //   }
        // ],
        auths: [{
          value: '2',
          label: '全部'
        },
          {
            value: '0',
            label: '未认证'
          }, {
            value: '1',
            label: '已认证'
          }],
        searchDay: '',
        searchAuth: ''
      }
    },
    created() {
      this.data(30, 2)
    },
    methods: {
      data() {
			if (this.timePeriod.length === 2) {
					if(this.query.timePeriod[0] && this.query.timePeriod[0].getTime()>1000000000000){
						var dat = new Date(new Date(this.query.timePeriod[0]).getTime()+3600*24*1000)
						this.query.timePeriod[0] = dat
						var dat1 = new Date(new Date(this.query.timePeriod[1]).getTime()+3600*24*1000)
						this.query.timePeriod[1] = dat1				
					}
					else{
						this.query.timePeriod=[]
						this.query.timePeriod.push(null)
					}
			
      }
        statUser(this.query).then(response => {
          this.chartData = response.data.data
          this.chartSettings = {
            labelMap: {
              'users': '用户增长数'
            }
          }
          this.chartExtend = {
            xAxis: { boundaryGap: true },
            // series: {
            //   label: { show: true, position: 'top' }
            // }
          }
        })
      },
      // chickDay() {
      //   this.query.dayNum = this.searchDay
      //   this.data()
      // },
      chickAuth() {
        this.query.auth = this.searchAuth
        this.query.timePeriod[0] = this.timePeriod[0]
		    this.query.timePeriod[1] = this.timePeriod[1]
        this.data()
      },
      selectDate() {
        // if (this.timePeriod[0] == null) {
        //   this.timePeriod = [null]
        // }
        // this.query.timePeriod = this.timePeriod
        // this.data()
				this.query.timePeriod[0] = this.timePeriod[0]
		    this.query.timePeriod[1] = this.timePeriod[1]
        this.data()
      }
    }

  }
</script>
<style scoped>
  .h-m-select{
    margin-top: 10px ;
  }
</style>
