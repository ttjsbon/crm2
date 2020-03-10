<template>
  <div class="app-container calendar-list-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input clearable class="filter-item" style="width: 140px;" placeholder="请输入用户ID" v-model="listQuery.userId"></el-input>
      <el-input clearable class="filter-item" style="width: 180px;" placeholder="请输入订单编号" v-model="listQuery.orderSn"></el-input>
      <el-input clearable class="filter-item" style="width: 140px;" placeholder="请输入姓名" v-model="listQuery.name"></el-input>
      <el-input clearable class="filter-item" style="width: 140px;" placeholder="请输入手机号" v-model="listQuery.mobile"></el-input>
      <el-select multiple style="width: 150px" class="filter-item" placeholder="请选择订单状态"
                 v-model="listQuery.orderStatusArray">
        <el-option v-for="(key, value) in statusMap" :key="key" :label="key" :value="value"></el-option>
      </el-select>
      <date-picker v-model="listQuery.timePeriod" range :shortcuts="shortcuts" style="width: 220px;"></date-picker>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload" :loading="downloadLoading">导出</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table size="small" :data="list" row-key="id" lazy v-loading="listLoading" element-loading-text="正在查询中。。。" border
              fit :tree-props="{children: 'children', hasChildren: 'hasChildren'}" highlight-current-row>
      <el-table-column align="center" min-width="130" label="订单编号" prop="orderNo"></el-table-column>
      <el-table-column align="center" label="用户ID" prop="userId"></el-table-column>
      <el-table-column align="center" label="用户姓名" prop="receiptName"></el-table-column>
      <el-table-column align="center" label="手机号码" prop="receiptPhone"></el-table-column>
      <el-table-column align="center" label="订单状态" prop="channelStatus">
        <template slot-scope="scope">
          <el-tag>{{scope.row.channelStatus | orderStatusFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="押金金额" prop="allDeposit"></el-table-column>
      <el-table-column align="center" label="分期金额" prop="rentPrice"></el-table-column>
      <el-table-column align="center" label="期数(日/月)" prop="rentTime"></el-table-column>
      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page"
        :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <!-- 订单详情对话框 -->
    <el-dialog title="订单详情" width="900" :visible.sync="orderDialogVisible" @close='closeDetail'>
      <el-form :data="orderDetail" label-position="left">
        <el-form-item label="认证信息" class="bigitem">
          <span>（姓名）{{ orderDetail.order && orderDetail.order.receiptName ? orderDetail.order.receiptName : '' }}</span>
          <span>（住址）{{  orderDetail.order && orderDetail.order.receiptAddress ? orderDetail.order.receiptAddress : ''  }}</span>
          <span>（身份证）{{  orderDetail.order && orderDetail.order.idCardNo ? orderDetail.order.idCardNo : ''  }}</span>
          <span>（手机号）{{  orderDetail.order && orderDetail.order.receiptPhone ? orderDetail.order.receiptPhone : ''  }}</span>
        </el-form-item>
        <el-form-item label="订单类型" class="bigitem">
<!--          <span>{{ orderDetail.order.orderType }}</span>-->
        </el-form-item>
        <el-form-item label="订单编号" class="bigitem">
          <span>{{ orderDetail.order.orderNo }}</span>
        </el-form-item>
        <el-form-item label="设备序列号" class="bigitem">
          <span>{{ orderDetail.order && orderDetail.order.deviceIds != null && orderDetail.order.deviceIds !== [] && orderDetail.order.deviceIds.length > 0  ? orderDetail.order.deviceIds : '暂无'}}</span>
        </el-form-item>
        <div class="flex itemtogether">
          <el-form-item label="订单状态">
            <template slot-scope="scope">
              <el-tag>{{orderDetail.order.channelStatus | orderStatusFilter}}</el-tag>
            </template>
          </el-form-item>
          <el-form-item label="下单用户">
            <span>{{ orderDetail.order.phone }}</span>
          </el-form-item>
          <el-form-item label="下单时间" class="bigitem">
            <span>  {{ orderDetail.order.channelCreateTime | dateformat('YYYY-MM-DD HH:mm:ss')}}</span>
          </el-form-item>
        </div>
        <div class="flex itemtogether">
          <el-form-item label="分期期数">
            <template slot-scope="scope">
              <span>{{orderDetail.order.rentTime}}</span>
            </template>
          </el-form-item>
          <el-form-item label="每期租金">
            <span>{{ orderDetail.order.rentPrice }}</span>
          </el-form-item>
          <el-form-item label="全部租金">
            <span>{{ orderDetail.order.totalRentPrice }}</span>
          </el-form-item>
        </div>
        <div class="flex itemtogether">
          <el-form-item label="总押金">
            <template slot-scope="scope">
              <span>{{orderDetail.order.allDeposit}}</span>
            </template>
          </el-form-item>
          <el-form-item label="信用免押金">
            <span>{{ orderDetail.order.creditDeposit }}</span>
          </el-form-item>
          <el-form-item label="预授权冻结金额">
            <span>{{ orderDetail.order.freezeDeposit }}</span>
          </el-form-item>
        </div>
        <div class="flex itemtogether">
          <el-form-item label="结算押金">
            <template slot-scope="scope">
              <span>{{orderDetail.order.assignStrongNotaryDeposit}}</span>
            </template>
          </el-form-item>
          <el-form-item label="结算押金">
            <span>{{ orderDetail.order.settlementDeposit }}</span>
          </el-form-item>
          <el-form-item >
            <span></span>
          </el-form-item>
        </div>
<!--        <div class="flex itemtogether">-->
<!--          <el-form-item label="增值服务总额">-->
<!--            <template slot-scope="scope">-->
<!--              <span>{{orderDetail.attach && orderDetail.attach.actualPrice ? orderDetail.attach.actualPrice : ''}}</span>-->
<!--            </template>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="增值服务分期金额">-->
<!--            <span>{{ orderDetail.attach && orderDetail.attach.periodPrice ? orderDetail.attach.periodPrice : ''}}</span>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="增值服务期数">-->
<!--            <span>{{ orderDetail.attach && orderDetail.attach.periods ? orderDetail.attach.periods : ''}}</span>-->
<!--          </el-form-item>-->
<!--        </div>-->
        <div class="flex itemtogether">
          <el-form-item label="租赁开始时间" class="bigitem">
            <span>  {{ orderDetail.order.startTime | dateformat('YYYY-MM-DD HH:mm:ss')}}</span>
          </el-form-item>
          <el-form-item label="租赁结束时间" class="bigitem">
            <span>  {{ orderDetail.order.endTime | dateformat('YYYY-MM-DD HH:mm:ss')}}</span>
          </el-form-item>
        </div>
        <el-form-item label="收货信息">
          <span>（收货人）{{ orderDetail.order.receiptName }}</span>
          <span>（手机号）{{ orderDetail.order.receiptPhone }}</span>
          <span>（地址）{{ orderDetail.order.receiptAddress }}</span>
        </el-form-item>
<!--        <el-form-item label="商品信息">-->
<!--          <el-table size="small" :data="orderDetail.orderGoods" border fit highlight-current-row>-->
<!--            <el-table-column align="center" label="商品名称" prop="goodsName"/>-->
<!--            <el-table-column align="center" label="商品编号" prop="goodsSn"/>-->
<!--            <el-table-column align="center" label="货品规格" prop="specifications"/>-->
<!--            <el-table-column align="center" label="货品价格" prop="price"/>-->
<!--            <el-table-column align="center" label="货品数量" prop="number"/>-->
<!--            <el-table-column align="center" label="货品图片" prop="picUrl">-->
<!--              <template slot-scope="scope">-->
<!--                <img :src="scope.row.picUrl" width="40"/>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--          </el-table>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="费用信息">-->
<!--          <span>-->
<!--            (应收金额){{ orderDetail.order.actualPrice }}元 =-->
<!--            (商品总租金){{ orderDetail.order.orderPrice }}元 +-->
<!--            (快递费用){{ orderDetail.order.freightPrice }}元 - -->
<!--            (优惠减免){{ orderDetail.order.couponPrice }}元 - -->
<!--            (积分减免){{ orderDetail.order.integralPrice }}元-->
<!--          </span>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="支付信息">-->
<!--          <span> (支付渠道) {{this.orderDetail.pay && this.orderDetail.pay[0] && this.orderDetail.pay[0].body != null ? this.orderDetail.pay[0].body : '暂无'}}</span>-->
<!--          <el-table size="small" :data="orderDetail.pay" border fit highlight-current-row>-->
<!--            <el-table-column align="center" :label="'需支付时间'" width="160px">-->
<!--              <template slot-scope="scope">-->
<!--                <span>  {{ scope.row.createTime.substring(0, 10)}}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column align="center" :label="'支付时间'" width="160px">-->
<!--              <template slot-scope="scope">-->
<!--                <span>  {{ scope.row.updateTime?scope.row.updateTime.substring(0, 10):'无'}}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column align="center" :label="'支付订单'" width="195px">-->
<!--              <template slot-scope="scope">-->
<!--                <span>  {{ scope.row.payOrderId?scope.row.payOrderId:'无'}}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column align="center" :label="'支付状态'" width="160px">-->
<!--              <template slot-scope="scope">-->
<!--                <span>  {{ scope.row.payOrderId ? '已支付': '未支付'}}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            &lt;!&ndash;支付金额&ndash;&gt;-->
<!--            <el-table-column align="center" :label="'支付金额'" width="160px">-->
<!--              <template slot-scope="scope">-->
<!--                <span>  {{ scope.row.amount ? scope.row.amount : 0.00}}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column align="center" :label="'是否退款'" width="160px">-->
<!--              <template slot-scope="scope">-->
<!--                <span>  {{ scope.row.status =='4' ? '已退款': '未退款'}}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column align="center" :label="'退款时间'" width="160px">-->
<!--              <template slot-scope="scope">-->
<!--                <span>  {{ scope.row.status =='4' ? scope.row.paySuccTime.substring(0, 10):'无'}}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--          </el-table>-->
<!--        </el-form-item>-->

<!--        <el-form-item label="赔偿支付信息">-->
<!--          <span>（支付渠）京东</span>-->
<!--          <el-table size="small" :data="orderDetail.compensation" border fit highlight-current-row>-->
<!--            <el-table-column align="center" :label="'支付时间'" width="230%">-->
<!--              <template slot-scope="scope">-->
<!--                <span>  {{ scope.row.updateTime?scope.row.updateTime.substring(0, 10):'暂无'}}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column align="center" :label="'支付订单'" width="235%">-->
<!--              <template slot-scope="scope">-->
<!--                <span>  {{ scope.row.outTradeOrderId?scope.row.outTradeOrderId:'暂无'}}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column align="center" :label="'支付金额'" width="225%">-->
<!--              <template slot-scope="scope">-->
<!--                <span>  {{ scope.row.amount?scope.row.amount:'暂无'}}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column align="center" :label="'支付状态'" width="225%">-->
<!--              <template slot-scope="scope">-->
<!--                <span>  {{ scope.row.outTradeOrderId?'已支付':'未支付'}}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--          </el-table>-->
<!--        </el-form-item>-->

<!--        <el-form-item label="买断支付信息">-->
<!--          <span>（支付渠道）{{this.orderDetail.BuyoutPayInfo && this.orderDetail.BuyoutPayInfo[0] && this.orderDetail.BuyoutPayInfo[0].body != null ? this.orderDetail.BuyoutPayInfo[0].body : '暂无'}}</span>-->
<!--          <el-table size="small" :data="orderDetail.BuyoutPayInfo" border fit highlight-current-row>-->
<!--            <el-table-column align="center" :label="'支付时间'" width="230%">-->
<!--              <template slot-scope="scope">-->
<!--                <span>  {{ scope.row.updateTime?scope.row.updateTime.substring(0, 10):'暂无'}}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column align="center" :label="'支付订单'" width="235%">-->
<!--              <template slot-scope="scope">-->
<!--                <span>  {{ scope.row.outTradeOrderId?scope.row.outTradeOrderId:'暂无'}}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column align="center" :label="'支付金额'" width="225%">-->
<!--              <template slot-scope="scope">-->
<!--                <span>  {{ scope.row.amount?scope.row.amount:'暂无'}}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column align="center" :label="'支付状态'" width="225%">-->
<!--              <template slot-scope="scope">-->
<!--                <span>  {{ scope.row.outTradeOrderId?'已支付':'未支付'}}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column align="center" :label="'买断状态'" width="225%">-->
<!--              <template slot-scope="scope">-->
<!--                <span>  {{ scope.row.outTradeOrderId?'已买断':'未买断'}}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--          </el-table>-->
<!--        </el-form-item>-->

<!--        <el-form-item label="快递信息">-->
<!--          <span>（快递公司）{{ orderDetail.order.shipChannel }}</span>-->
<!--          <span>（快递单号）{{ orderDetail.order.shipSn }}</span>-->
<!--          <span>（发货时间）{{ orderDetail.order.shipTime }}</span>-->
<!--        </el-form-item>-->
        <el-form-item label="收货信息">
          <span>  {{ orderDetail.order.startTime | dateformat('YYYY-MM-DD HH:mm:ss')}}</span>
        </el-form-item>

      </el-form>
    </el-dialog>
  </div>
</template>

<style>
  .itemtogether .el-form-item__content {
    display: inline-block;
  }

  .itemtogether {
    flex-wrap: wrap;
  }

  .itemtogether .el-form-item {
    min-width: 150px;
    flex: 1;
  }

  .itemtogether .bigitem {
    min-width: 230px;
  }

</style>

<script>
  import {
    list, detail
  } from '@/api/jd_order'
  import { parseTime } from '@/utils/index'
  import DatePicker from 'vue2-datepicker'
  const statusMap = {
    0: '待支付',
    1: '支付成功',
    2: '已提交取消申请',
    3: '商家已发货',
    4: '已签收/租用中',
    5: '已取消',
    6: '用户拒收',
    7: '租赁结束',
    8: '已买断',
    9: '已逾期',
    10: '还货中',
    11: '已续租',
    12: '已违约',
    43: '续租订单生效'
  }

  export default {
    components: { DatePicker },
    name: 'Order',
    data() {
      return {
        timePeriod: '',
        payTimePeriod: '',
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
              this.listQuery.timePeriod = [new Date(), new Date()]
            }
          }
        ],
        payshortcuts: [
          {
            text: 'Today',
            onClick: () => {
              this.listQuery.payTimePeriod = [new Date(), new Date()]
            }
          }
        ],
        list: undefined,
        total: undefined,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          id: undefined,
          orderStatusArray: [],
          sort: 'channel_create_time',
          order: 'asc',
          overdue: 1,
          name: undefined,
          mobile: undefined,
          timePeriod: [null],
          payTimePeriod: [null],
          sequence: undefined,
          payOrderId: undefined
        },
        timeper: {},
        statusMap,
        orderDialogVisible: false,
        orderDetail: {
          order: {},
          user: {},
          orderGoods: [],
          attach: {},
          pay: []
        },
        downloadLoading: false,
        userdata: null
      }
    },
    filters: {
      orderStatusFilter(status) {
        return statusMap[status]
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.timeper = JSON.parse(JSON.stringify(this.listQuery))
        if (this.listQuery.timePeriod.length === 2) {
          if (this.listQuery.timePeriod[0] && this.listQuery.timePeriod[0].getTime() > 1000000000000) {
            this.listLoading = true
            this.timeper.timePeriod[0] = new Date(new Date(this.listQuery.timePeriod[0]).getTime() + 3600 * 24 * 1000)
            this.timeper.timePeriod[1] = new Date(new Date(this.listQuery.timePeriod[1]).getTime() + 3600 * 24 * 1000)
          } else {
            this.listQuery.timePeriod = []
            this.listQuery.timePeriod.push(null)
          }
        }
        if (this.listQuery.payTimePeriod.length === 2) {
          if (this.listQuery.payTimePeriod[0] && this.listQuery.payTimePeriod[0].getTime() > 1000000000000) {
            this.listLoading = true
            this.timeper.payTimePeriod[0] = new Date(new Date(this.listQuery.payTimePeriod[0]).getTime() + 3600 * 24 * 1000)
            this.timeper.payTimePeriod[1] = new Date(new Date(this.listQuery.payTimePeriod[1]).getTime() + 3600 * 24 * 1000)
          } else {
            this.listQuery.payTimePeriod = []
            this.listQuery.payTimePeriod.push(null)
          }
        }
        list(this.timeper).then(response => {
          this.list = response.data.data.items
          this.total = response.data.data.total
          this.listLoading = false
        }).catch(() => {
          this.list = []
          this.total = 0
          this.listLoading = false
        })
      },
      addRemarkV1_4_0_1() {
        addRemarkV1_4_0(this.orderDetail.order.remark, this.orderDetail.order.orderSn).then(response => {
          this.flags = response.data.data.flag
          this.$notify({
            title: '成功',
            message: this.flags === true ? '保存成功' : '保存失败',
            type: this.flags === true ? 'success' : 'error',
            duration: 2000
          })
          this.orderDialogVisible = false
          this.getList()
        }).catch(() => {
          this.flags = false
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleDetail(row) {
        detail(row.id).then(response => {
          this.orderDetail = response.data.data
          this.orderDetail.order.addTime = parseTime(this.orderDetail.order.addTime)
          if (this.orderDetail.order.beginTime) {
            this.orderDetail.order.beginTime = parseTime(this.orderDetail.order.beginTime)
          }
          if (this.orderDetail.order.endTime) {
            this.orderDetail.order.endTime = parseTime(this.orderDetail.order.endTime)
          }
          // 订单渠道判断
          this.userdata = JSON.parse(this.orderDetail.user.feature)
        })
      console.info(this.orderDetail)
        this.orderDialogVisible = true
      },
      closeDetail() {
        this.userdata = null
      },
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['订单ID', '订单编号', '用户ID', '订单状态', '是否删除', '收货人', '收货联系电话', '收货地址', '租期到期时间']
          const filterVal = ['id', 'orderSn', 'userId', 'orderStatus', 'isDelete', 'consignee', 'mobile', 'address', 'endTimes']
          excel.export_json_to_excel2(tHeader, this.list, filterVal, '订单信息')
          this.downloadLoading = false
        })
      },
      changeJson(val, result) {
        if (val && val[result]) {
          const Str = JSON.stringify(val[result]).replace(/{/g, '{<br>').replace(/,/g, ',<br>').replace(/\\/g, '')
          val[result] = Str
        }
      },
      dateFormat(row, column) {
        const daterc = row[column.property]
        if (daterc != null) {
          const dateMat = new Date(parseInt(daterc.replace('/Date(', '').replace(')/', ''), 14))
          const year = dateMat.getFullYear()
          const month = dateMat.getMonth() + 1
          const day = dateMat.getDate()
          const hh = dateMat.getHours()
          const mm = dateMat.getMinutes()
          const ss = dateMat.getSeconds()
          const timeFormat = year + '-' + month + '-' + day + ' ' + hh + ':' + mm + ':' + ss
          return timeFormat
        }
      }
    }
  }

</script>
