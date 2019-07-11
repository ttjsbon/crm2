<template>
  <div class="app-container calendar-list-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input clearable class="filter-item" style="width: 180px;" placeholder="请输入用户ID" v-model="listQuery.userId">
      </el-input>
      <el-input clearable class="filter-item" style="width: 200px;" placeholder="请输入订单编号" v-model="listQuery.orderSn">
      </el-input>
      <el-input clearable class="filter-item" style="width: 180px;" placeholder="请输入姓名" v-model="listQuery.name">
      </el-input>
      <el-input clearable class="filter-item" style="width: 200px;" placeholder="请输入手机号" v-model="listQuery.mobile">
      </el-input>
      <el-input clearable class="filter-item" style="width: 200px;" placeholder="请输入设备序列号" v-model="listQuery.sequence">
      </el-input>
      <el-select multiple style="width: 150px" class="filter-item" placeholder="请选择订单状态"
                 v-model="listQuery.orderStatusArray">
        <el-option v-for="(key, value) in statusMap" :key="key" :label="key" :value="value">
        </el-option>
      </el-select>
      <date-picker v-model="listQuery.timePeriod" range :shortcuts="shortcuts" style="width: 220px;"></date-picker>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload"
                 :loading="downloadLoading">导出
      </el-button>
    </div>

    <!-- 查询结果 -->
    <el-table size="small" :data="list" v-loading="listLoading" element-loading-text="正在查询中。。。" border fit
              highlight-current-row>

      <el-table-column align="center" min-width="100" label="订单编号" prop="orderSn">
      </el-table-column>

      <el-table-column align="center" label="用户ID" prop="userId">
      </el-table-column>

      <el-table-column align="center" label="用户姓名" prop="consignee">
      </el-table-column>

      <el-table-column align="center" label="手机号码" prop="mobile">
      </el-table-column>

      <el-table-column align="center" label="订单状态" prop="orderStatus">
        <template slot-scope="scope">
          <el-tag>{{scope.row.orderStatus | orderStatusFilter}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="押金金额" prop="actualDeposit">
      </el-table-column>

      <el-table-column align="center" label="分期金额" prop="periodPrice">
      </el-table-column>

      <el-table-column align="center" label="期数" prop="periods">
      </el-table-column>

      <el-table-column align="center" label="支付时间" prop="payTime">
      </el-table-column>

      <!--<el-table-column align="center" label="物流单号" prop="shipSn">-->
      <!--</el-table-column>-->

      <!--<el-table-column align="center" label="物流渠道" prop="shipChannel">-->
      <!--</el-table-column>-->

      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleDetail(scope.row)">详情</el-button>
          <el-button type="primary" size="mini" @click="handleFree(scope.row)">豁免押金</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.page"
                     :page-sizes="[10,20,30,50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>


    <!-- 订单详情对话框 -->
    <el-dialog title="订单详情" width="900" :visible.sync="orderDialogVisible" @close='closeDetail'>

      <el-form :data="orderDetail" label-position="left">
        <el-form-item label="认证信息" class="bigitem">
          <span>（姓名）{{ orderDetail.user && orderDetail.user.cardName ? orderDetail.user.cardName : '' }}</span>
          <span>（住址）{{  orderDetail.user && orderDetail.user.homeAddress ? orderDetail.user.homeAddress : ''  }}</span>
          <span>（工作地址）{{  orderDetail.user && orderDetail.user.workAddress ? orderDetail.user.workAddress : ''  }}</span>
          <span>（身份证）{{  orderDetail.user && orderDetail.user.idCardNo ? orderDetail.user.idCardNo : ''  }}</span>
          <span>（手机号）{{  orderDetail.user && orderDetail.user.mobile ? orderDetail.user.mobile : ''  }}</span>
          <span>（紧急联系人）{{ orderDetail.order.emergencyName }}</span>
          <span>（联系人关系）{{ orderDetail.order.emergencyRelation }}</span>
          <span>（联系人手机）{{ orderDetail.order.emergencyPhone }}</span>
        </el-form-item>
        <el-form-item label="身份证照" class="bigitem">
          <img class="detailIdimg" v-if='userdata' :src="userdata.idCardFrontImage" alt="">
          <img class="detailIdimg" v-if='userdata' :src="userdata.idCardBackImage" alt="">
        </el-form-item>

        <el-form-item label="订单渠道" class="bigitem">
          <span>{{ orderDetail.order && orderDetail.order.orderChannel ? orderDetail.order.orderChannel === 'aliapplet' ? '支付宝小程序' : '微信小程序' : '暂无' }}</span>
        </el-form-item>
        <el-form-item label="订单编号" class="bigitem">
          <span>{{ orderDetail.order.orderSn }}</span>
        </el-form-item>
        <el-form-item label="设备序列号" class="bigitem">
          <span>{{ orderDetail.order && orderDetail.order.deviceIds != null && orderDetail.order.deviceIds !== [] && orderDetail.order.deviceIds.length > 0  ? orderDetail.order.deviceIds : '暂无'}}</span>
        </el-form-item>
        <div class="flex itemtogether">
          <el-form-item label="订单状态">
            <template slot-scope="scope">
              <el-tag>{{orderDetail.order.orderStatus | orderStatusFilter}}</el-tag>
            </template>
          </el-form-item>
          <el-form-item label="下单用户">
            <span>{{ orderDetail.user.mobile }}</span>
          </el-form-item>
          <el-form-item label="下单时间" class="bigitem">
            <span>{{ orderDetail.order.addTime }}</span>
          </el-form-item>
        </div>

        <div class="flex itemtogether">

          <el-form-item label="分期期数">
            <template slot-scope="scope">
              <span>{{orderDetail.order.periods}}</span>
            </template>
          </el-form-item>
          <el-form-item label="每期租金">
            <span>{{ orderDetail.order.periodPrice }}</span>
          </el-form-item>
          <el-form-item label="全部租金">
            <span>{{ orderDetail.order.orderPrice }}</span>
          </el-form-item>
        </div>

        <!--        <div class="flex itemtogether">

                  <el-form-item label="增值服务总额">
                    <template slot-scope="scope">
                      <span>{{orderDetail.attach.actualPrice}}</span>
                    </template>
                  </el-form-item>
                  <el-form-item label="增值服务分期金额">
                    <span>{{ orderDetail.attach.periodPrice }}</span>
                  </el-form-item>
                  <el-form-item label="增值服务期数">
                    <span>{{ orderDetail.attach.periods }}</span>
                  </el-form-item>
                </div> -->

        <div class="flex itemtogether">

          <el-form-item label="增值服务总额">
            <template slot-scope="scope">
              <span>{{orderDetail.attach && orderDetail.attach.actualPrice ? orderDetail.attach.actualPrice : ''}}</span>
            </template>
          </el-form-item>
          <el-form-item label="增值服务分期金额">
            <span>{{ orderDetail.attach && orderDetail.attach.periodPrice ? orderDetail.attach.periodPrice : ''}}</span>
          </el-form-item>
          <el-form-item label="增值服务期数">
            <span>{{ orderDetail.attach && orderDetail.attach.periods ? orderDetail.attach.periods : ''}}</span>
          </el-form-item>
        </div>

        <div class="flex itemtogether">

          <el-form-item label="豁免押金">
            <template slot-scope="scope">
              <span>{{orderDetail.order.freeDeposit}}</span>
            </template>
          </el-form-item>
          <el-form-item label="实际押金">
            <span>{{ orderDetail.order.actualDeposit }}</span>
          </el-form-item>
          <el-form-item>
            <span></span>
          </el-form-item>
        </div>

        <div class="flex itemtogether">
          <el-form-item label="租赁开始时间" class="bigitem">
            <span>{{ orderDetail.order.beginTime }}</span>
          </el-form-item>
          <el-form-item label="租赁结束时间" class="bigitem">
            <template slot-scope="scope">
              <span>{{orderDetail.order.endTime}}</span>
            </template>
          </el-form-item>
        </div>

        <el-form-item label="收货信息">
          <span>（收货人）{{ orderDetail.order.consignee }}</span>
          <span>（手机号）{{ orderDetail.order.mobile }}</span>
          <span>（地址）{{ orderDetail.order.address }}</span>
        </el-form-item>
        <el-form-item label="商品信息">
          <el-table size="small" :data="orderDetail.orderGoods" border fit highlight-current-row>
            <el-table-column align="center" label="商品名称" prop="goodsName"/>
            <el-table-column align="center" label="商品编号" prop="goodsSn"/>
            <el-table-column align="center" label="货品规格" prop="specifications"/>
            <el-table-column align="center" label="货品价格" prop="price"/>
            <el-table-column align="center" label="货品数量" prop="number"/>
            <el-table-column align="center" label="货品图片" prop="picUrl">
              <template slot-scope="scope">
                <img :src="scope.row.picUrl" width="40"/>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="费用信息">
          <span>
            (应收金额){{ orderDetail.order.actualPrice }}元 =
            (商品总租金){{ orderDetail.order.orderPrice }}元 +
            (快递费用){{ orderDetail.order.freightPrice }}元 -
            (优惠减免){{ orderDetail.order.couponPrice }}元 -
            (积分减免){{ orderDetail.order.integralPrice }}元
          </span>
        </el-form-item>
        <el-form-item label="支付信息">
          <span> (支付渠道) {{this.orderDetail.pay && this.orderDetail.pay[0] && this.orderDetail.pay[0].body != null ? this.orderDetail.pay[0].body : '暂无'}}</span>
          <el-table size="small" :data="orderDetail.pay" border fit highlight-current-row>
            <el-table-column align="center" :label="'需支付时间'" width="160px">
              <template slot-scope="scope">
                <span>  {{ scope.row.createTime.substring(0, 10)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" :label="'支付时间'" width="160px">
              <template slot-scope="scope">
                <span>  {{ scope.row.updateTime?scope.row.updateTime.substring(0, 10):'无'}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" :label="'支付订单'" width="195px">
              <template slot-scope="scope">
                <span>  {{ scope.row.payOrderId?scope.row.payOrderId:'无'}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" :label="'支付状态'" width="160px">
              <template slot-scope="scope">
                <span>  {{ scope.row.payOrderId ? '已支付': '未支付'}}</span>
              </template>
            </el-table-column>
            <!--支付金额-->
            <el-table-column align="center" :label="'支付金额'" width="160px">
              <template slot-scope="scope">
                <span>  {{ scope.row.amount ? scope.row.amount : 0.00}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" :label="'是否退款'" width="160px">
              <template slot-scope="scope">
                <span>  {{ scope.row.status =='4' ? '已退款': '未退款'}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" :label="'退款时间'" width="160px">
              <template slot-scope="scope">
                <span>  {{ scope.row.status =='4' ? scope.row.paySuccTime.substring(0, 10):'无'}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>

        <el-form-item label="赔偿支付信息" style="width: 800px">
          <span>（支付渠道）{{this.compensationPayChannel && this.compensationPayChannel != null ? this.compensationPayChannel : '暂无'}}</span>
          <el-table size="small" :data="orderDetail.compensation" border fit highlight-current-row>
            <el-table-column align="center" :label="'支付时间'" width="170px">
              <template slot-scope="scope">
                <span>  {{ scope.row.updateTime?scope.row.updateTime.substring(0, 10):'暂无'}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" :label="'支付订单'" width="170px">
              <template slot-scope="scope">
                <span>  {{ scope.row.outTradeOrderId?scope.row.outTradeOrderId:'暂无'}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" :label="'支付金额'" width="170px">
              <template slot-scope="scope">
                <span>  {{ scope.row.amount?scope.row.amount:'暂无'}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" :label="'支付状态'" width="170px">
              <template slot-scope="scope">
                <span>  {{ scope.row.outTradeOrderId?'已支付':'未支付'}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>

        <el-form-item label="快递信息">
          <span>（快递公司）{{ orderDetail.order.shipChannel }}</span>
          <span>（快递单号）{{ orderDetail.order.shipSn }}</span>
          <span>（发货时间）{{ orderDetail.order.shipTime }}</span>
        </el-form-item>
        <el-form-item label="收货信息">
          <span>（确认收货时间）{{ orderDetail.order.confirmTime }}</span>
        </el-form-item>
        <el-form-item label="归还信息">
          <span v-if='orderDetail.order.backTime'>（归还时间）{{ orderDetail.order.backTime }}</span>
          <span v-if='orderDetail.order.backShipSn'>（快递公司）{{ orderDetail.order.backShipSn }}</span>
          <span v-if='orderDetail.order.backShipChannel'>（快递单号）{{ orderDetail.order.backShipChannel }}</span>
          <span v-if='!orderDetail.order.backTime'>（归还时间）暂无</span>
          <span v-if='!orderDetail.order.backShipSn'>（快递公司）暂无</span>
          <span v-if='!orderDetail.order.backShipChannel'>（快递单号）暂无</span>
        </el-form-item>

        <!--备注信息-->
        <el-form-item label="备注信息">
          <el-input clearable class="filter-item" style="width: 500px; margin-left: 10px" placeholder="请输入备注信息"
                    v-model="orderDetail.order.remark">
          </el-input>
          <el-button type="primary" size="mini"
                     @click="addRemarkV1_4_0_1">保存信息
          </el-button>
        </el-form-item>

      </el-form>
    </el-dialog>

    <!-- 豁免金额对话框 -->
    <el-dialog title="豁免" :visible.sync="freeDialogVisible">
      <el-form ref="freeForm" :model="freeForm" status-icon label-position="left" label-width="100px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item label="豁免金额" prop="freeDeposit">
          <el-input v-model="freeForm.freeDeposit"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="freeDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmFree">确定</el-button>
      </div>
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
    freeDepositOrder,
    detailOrder4,
    addRemarkV1_4_0,
    listOrder4,
    listOrderV1_5_0,
    detailOrderV1_5_3,
    listNewOrderV1_5_5
  } from '@/api/order'
  import {
    parseTime
  } from '@/utils/index'
  import DatePicker from 'vue2-datepicker'

  const statusMap = {
    101: '已下单',
    102: '已取消',
    201: '已付款',
    202: '退款中',
    203: '已退款',
    204: '申请退款',
    301: '审核通过',
    302: '审核拒绝',
    401: '已发货',
    501: '租赁中',
    600: '归还中',
    900: '已完成'
  }

  export default {
    components: { DatePicker },
    name: 'Order',
    data() {
      return {
        timePeriod: '',
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
        list: undefined,
        total: undefined,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          id: undefined,
          name: undefined,
          orderStatusArray: [],
          sort: 'add_time',
          order: 'desc',
          overdue: 1,
          mobile: undefined,
          timePeriod: [null],
          payTimePeriod: [null],
          sequence: undefined
        },
        timeper: {},
        statusMap,
        orderDialogVisible: false,
        orderDetail: {
          order: {},
          user: {},
          orderGoods: [],
          attach: {}
        },
        freeForm: {
          orderId: undefined,
          freeDeposit: undefined
        },
        freeDialogVisible: false,
        downloadLoading: false,
        userdata: null,
        compensationPayChannel: null
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

        // listOrderV1_5_0(this.timeper).then(response => {
        listNewOrderV1_5_5(this.timeper).then(response => {
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
        // detailOrder4(row.id).then(response => {
        detailOrderV1_5_3(row.id).then(response => {
          this.orderDetail = response.data.data
          this.orderDetail.order.addTime = parseTime(this.orderDetail.order.addTime)
          if (this.orderDetail.order.beginTime) {
            this.orderDetail.order.beginTime = parseTime(this.orderDetail.order.beginTime)
          }
          if (this.orderDetail.order.endTime) {
            this.orderDetail.order.endTime = parseTime(this.orderDetail.order.endTime)
          }
          this.compensationPayChannel = null
          if (this.orderDetail.compensation != null) {
            if (this.orderDetail.compensation[0].payChannel === 1) {
              this.compensationPayChannel = '支付宝'
            } else if (this.orderDetail.compensation[0].payChannel === 2) {
              this.compensationPayChannel = '微信'
            } else if (this.orderDetail.compensation[0].payChannel === 3) {
              this.compensationPayChannel = '支付宝手机网站'
            } else if (this.orderDetail.compensation[0].payChannel === 4) {
              this.compensationPayChannel = '微信h5支付'
            } else if (this.orderDetail.compensation[0].length <= 0) {
              this.compensationPayChannel = null
            }
          } else {
            this.compensationPayChannel = null
          }
          this.userdata = JSON.parse(this.orderDetail.user.feature)
        })

        this.orderDialogVisible = true
      },
      closeDetail() {
        this.userdata = null
      },
      handleFree(row) {
        this.freeForm.orderId = row.id
        this.freeDialogVisible = true
      },
      confirmFree() {
        if (!this.freeForm.freeDeposit || !/^[0-9]*$/.test(this.freeForm.freeDeposit)) {
          this.$message.error('请输入正确金额')
          return
        } else {
          this.$refs['freeForm'].validate((valid) => {
            if (valid) {
              freeDepositOrder(this.freeForm).then(response => {
                this.freeDialogVisible = false
                this.$notify({
                  title: '成功',
                  message: '豁免成功',
                  type: 'success',
                  duration: 2000
                })
                this.freeForm = {
                  orderId: undefined,
                  freeDeposit: undefined
                }
                this.getList()
              })
            }
          })
        }
      },
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['订单ID', '订单编号', '用户ID', '订单状态', '是否删除', '收货人', '收货联系电话', '收货地址']
          const filterVal = ['id', 'orderSn', 'userId', 'orderStatus', 'isDelete', 'consignee', 'mobile', 'address']
          excel.export_json_to_excel2(tHeader, this.list, filterVal, '订单信息')
          this.downloadLoading = false
        })
      }
    }
  }

</script>
