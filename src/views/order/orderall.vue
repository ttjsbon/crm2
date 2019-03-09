<template>
  <div class="app-container calendar-list-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input clearable class="filter-item" style="width: 140px;" placeholder="请输入用户ID" v-model="listQuery.userId">
      </el-input>
      <el-input clearable class="filter-item" style="width: 180px;" placeholder="请输入订单编号" v-model="listQuery.orderSn">
      </el-input>
      <el-input clearable class="filter-item" style="width: 140px;" placeholder="请输入姓名" v-model="listQuery.name">
      </el-input>

      <el-input clearable class="filter-item" style="width: 140px;" placeholder="请输入手机号" v-model="listQuery.mobile">
      </el-input>
      <el-select multiple style="width: 150px" class="filter-item" placeholder="请选择订单状态" v-model="listQuery.orderStatusArray">
        <el-option v-for="(key, value) in statusMap" :key="key" :label="key" :value="value">
        </el-option>
      </el-select>
      <date-picker v-model="listQuery.timePeriod" range :shortcuts="shortcuts" style="width: 220px;" ></date-picker>
      <el-button class="filter-item" type="primary" icon="el-icon-search"  @click="handleFilter">查找</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-download"  @click="handleDownload" :loading="downloadLoading">导出</el-button>
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

      <el-table-column align="center" label="物流单号" prop="shipSn">
      </el-table-column>

      <el-table-column align="center" label="物流渠道" prop="shipChannel">
      </el-table-column>

      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleDetail(scope.row)">详情</el-button>
          <el-button type="primary" size="mini" @click="handleCheck(scope.row)" v-if="scope.row.orderStatus==201">审核</el-button>
          <el-button type="primary" size="mini" @click="handleFree(scope.row)" v-if="scope.row.orderStatus==101">豁免押金</el-button>
          <el-button type="primary" size="mini" @click="handleShip(scope.row)" v-if="scope.row.orderStatus==301">发货</el-button>
          <el-button type="primary" size="mini" @click="handleRefund(scope.row)" v-if="scope.row.orderStatus==302">退款</el-button>
          <el-button type="primary" size="mini" @click="handleReturn(scope.row)" v-if="scope.row.orderStatus==600">确认归还</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page"
        :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>


    <!-- 订单详情对话框 -->
    <el-dialog title="订单详情" width="900" :visible.sync="orderDialogVisible" @close='closeDetail'>

      <el-form :data="orderDetail" label-position="left">
        <el-form-item label="认证信息" class="bigitem">
          <span>（姓名）{{ orderDetail.user.cardName }}</span>
          <span>（住址）{{ orderDetail.user.homeAddress }}</span>
          <span>（工作地址）{{ orderDetail.user.workAddress }}</span>
          <span>（身份证）{{ orderDetail.user.idCardNo }}</span>
          <span>（手机号）{{ orderDetail.user.mobile }}</span>
          <span>（紧急联系人）{{ orderDetail.order.emergencyName }}</span>
          <span>（联系人关系）{{ orderDetail.order.emergencyRelation }}</span>
          <span>（联系人手机）{{ orderDetail.order.emergencyPhone }}</span>
        </el-form-item>
        <el-form-item label="身份证照" class="bigitem">
          <img class="detailIdimg" v-if='userdata' :src="userdata.idCardFrontImage" alt="">
          <img class="detailIdimg" v-if='userdata' :src="userdata.idCardBackImage" alt="">
        </el-form-item>

        <el-form-item label="订单编号" class="bigitem">
          <span>{{ orderDetail.order.orderSn }}</span>
        </el-form-item>
        <div class="flex itemtogether">
          <el-form-item label="订单状态">
            <template slot-scope="scope">
              <el-tag>{{orderDetail.order.orderStatus | orderStatusFilter}}</el-tag>
            </template>
          </el-form-item>
          <el-form-item label="下单用户">
            <span>{{ orderDetail.order.mobile }}</span>
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
            <span>{{ orderDetail.order.actualPrice }}</span>
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
            <el-table-column align="center" label="商品名称" prop="goodsName" />
            <el-table-column align="center" label="商品编号" prop="goodsSn" />
            <el-table-column align="center" label="货品规格" prop="specifications" />
            <el-table-column align="center" label="货品价格" prop="price" />
            <el-table-column align="center" label="货品数量" prop="number" />
            <el-table-column align="center" label="货品图片" prop="picUrl">
              <template slot-scope="scope">
                <img :src="scope.row.picUrl" width="40" />
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="费用信息">
          <span>
            (实际费用){{ orderDetail.order.actualPrice }}元 =
            (商品总价){{ orderDetail.order.goodsPrice }}元 +
            (快递费用){{ orderDetail.order.freightPrice }}元 -
            (优惠减免){{ orderDetail.order.couponPrice }}元 -
            (积分减免){{ orderDetail.order.integralPrice }}元
          </span>
        </el-form-item>

        <el-form-item label="支付信息">
          <span>（支付渠道）支付宝</span>
          <!--<span v-if="orderDetail.pay&&orderDetail.pay.updateTime">（支付时间）{{ orderDetail.pay.updateTime }}</span>-->
          <!--<span v-if="orderDetail.pay&&orderDetail.pay.outTradeOrderId ">（支付订单）{{ orderDetail.pay.outTradeOrderId }}</span>-->
          <!--<span v-if="!(orderDetail.pay&&orderDetail.pay.updateTime)">（支付时间）暂无</span>-->
          <!--<span v-if="!(orderDetail.pay&&orderDetail.pay.outTradeOrderId)">（支付订单）暂无</span>-->
          <el-table size="small" :data="orderDetail.pay" border fit highlight-current-row>
            <!--<el-table-column align="center" label="支付时间" prop="updateTime" />-->
            <!--<el-table-column align="center" label="支付订单" prop="outTradeOrderId" />-->

            <el-table-column  align="center" :label="'支付时间'" width="200px">
              <template slot-scope="scope" >
                <span>  {{ scope.row.updateTime.substring(0, 10)}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" :label="'支付订单'" width="200px">
              <template slot-scope="scope" >
                <span>  {{ scope.row.outTradeOrderId}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" :label="'支付状态'" width="200px">
              <template slot-scope="scope" >
                <span>  {{ scope.row.outTradeOrderId ? '已支付': '未支付'}}</span>
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
          <span  v-if='orderDetail.order.backShipChannel'>（快递单号）{{ orderDetail.order.backShipChannel }}</span>
          <span v-if='!orderDetail.order.backTime'>（归还时间）暂无</span>
          <span v-if='!orderDetail.order.backShipSn'>（快递公司）暂无</span>
          <span  v-if='!orderDetail.order.backShipChannel'>（快递单号）暂无</span>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 发货对话框 -->
    <el-dialog title="发货" :visible.sync="shipDialogVisible" @close='resetId' :close-on-click-modal='false'>
      <el-form ref="shipForm" :model="shipForm" status-icon label-position="left" label-width="100px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="快递公司" prop="shipChannel">
          <el-input v-model="shipForm.shipChannel" placeholder="请输入快递公司"></el-input>
        </el-form-item>
        <el-form-item label="快递编号" prop="shipSn">
          <el-input v-model="shipForm.shipSn" placeholder="请输入快递编号"></el-input>
        </el-form-item>
        <el-form-item label="设备id">
          <el-button type="primary" @click="addId">添加</el-button>
          <el-input style='margin-top:10px;' class='addinput' v-for='(item,index) in shipForm.deviceId' v-model="shipForm.deviceId[index]"
            :key="index" placeholder="请输入设备ID"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="shipDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmShip">确定</el-button>
      </div>
    </el-dialog>

    <!-- 退款对话框 -->
    <el-dialog title="退款" :visible.sync="refundDialogVisible">
      <el-form ref="refundForm" :model="refundForm" status-icon label-position="left" label-width="100px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="退款金额" prop="refundMoney">
          <el-input v-model="refundForm.refundMoney" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="refundDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmRefund">确定</el-button>
      </div>
    </el-dialog>

    <!-- 审核对话框 -->
    <el-dialog title="审核" :visible.sync="checkDialogVisible">
      <el-form ref="checkForm" :model="checkForm" status-icon label-position="left" label-width="100px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="是否通过" prop="refundMoney">
          <el-radio-group v-model="checkpass">
            <el-radio label="true">通过</el-radio>
            <el-radio label="false">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="refundMoney">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="checkForm.remark">
          </el-input>
        </el-form-item>
        <el-form-item label="信用分数" prop="refundMoney" v-if='showCheckData&&showCheckData.creditScore'>
          <div v-html='showCheckData.creditScore'>
            <!-- {{showCheckData}} -->
          </div>
        </el-form-item>
        <el-form-item label="信用分数" prop="refundMoney" v-if='!(showCheckData&&showCheckData.creditScore)'>
          ''
        </el-form-item>
        <el-form-item label="反欺诈分数" prop="refundMoney" v-if='showCheckData&&showCheckData.score'>
          {{showCheckData.score}}
        </el-form-item>
        <el-form-item label="反欺诈分数" prop="refundMoney" v-if='!(showCheckData&&showCheckData.score)'>
          ''
        </el-form-item>
        <el-form-item label="风控建议" prop="refundMoney" v-if='showCheckData&&showCheckData.decision'>
          {{showCheckData.decision}}
        </el-form-item>
        <el-form-item label="风控建议" prop="refundMoney" v-if='!(showCheckData&&showCheckData.decision)'>
          ''
        </el-form-item>
        <el-form-item label="风控详情" prop="refundMoney" v-if='showCheckData&&showCheckData.result'>
          <div v-html='showCheckData.result'>
            <!-- {{showCheckData}} -->
          </div>
        </el-form-item>
        <el-form-item label="风控详情" prop="refundMoney" v-if='!(showCheckData&&showCheckData.result)'>
          ''
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="checkDialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmCheck">确定</el-button>
      </div>
    </el-dialog>

    <!-- 豁免金额对话框 -->
    <el-dialog title="豁免" :visible.sync="freeDialogVisible">
      <el-form ref="freeForm" :model="freeForm" status-icon label-position="left" label-width="100px" style='width: 400px; margin-left:50px;'>
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
    listOrder2,
    shipOrder,
    refundOrder,
    detailOrder2,
    auditOrder,
    freeDepositOrder,
    returnConfirmOrder,
    getCheckInfo
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
          orderStatusArray: [],
          sort: 'add_time',
          order: 'desc',
          overdue: 1,
          name: undefined,
          mobile: undefined,
          timePeriod: [null]
        },
        statusMap,
        orderDialogVisible: false,
        orderDetail: {
          order: {},
          user: {},
          orderGoods: [],
          attach: {}
        },
        shipForm: {
          orderId: undefined,
          shipChannel: undefined,
          shipSn: undefined,
          deviceId: []
        },
        shipDialogVisible: false,
        refundForm: {
          orderId: undefined,
          refundMoney: undefined
        },
        refundDialogVisible: false,
        checkForm: {
          orderId: null,
          isPass: undefined,
          remark: ''
        },
        checkpass: undefined,
        checkDialogVisible: false,
        freeForm: {
          orderId: undefined,
          freeDeposit: undefined
        },
        freeDialogVisible: false,

        downloadLoading: false,
        showCheckData: null,
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
        this.listLoading = true
        listOrder2(this.listQuery).then(response => {
          this.list = response.data.data.items
          this.total = response.data.data.total
          this.listLoading = false
        }).catch(() => {
          this.list = []
          this.total = 0
          this.listLoading = false
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
        detailOrder2(row.id).then(response => {
          this.orderDetail = response.data.data
          this.orderDetail.order.addTime = parseTime(this.orderDetail.order.addTime)
          if (this.orderDetail.order.beginTime) {
            this.orderDetail.order.beginTime = parseTime(this.orderDetail.order.beginTime)
          }
          if (this.orderDetail.order.endTime) {
            this.orderDetail.order.endTime = parseTime(this.orderDetail.order.endTime)
          }
          this.userdata = JSON.parse(this.orderDetail.user.feature)
        })
        this.orderDialogVisible = true
      },
      closeDetail() {
        this.userdata = null
      },
      handleShip(row) {
        this.shipForm.orderId = row.id
        this.shipForm.shipChannel = row.shipChannel
        this.shipForm.shipSn = row.shipSn

        this.shipDialogVisible = true
        this.$nextTick(() => {
          this.$refs['shipForm'].clearValidate()
        })
      },
      confirmShip() {
        this.shipForm.deviceId = this.shipForm.deviceId.filter(item => {
          return item !== ''
        })
        this.$refs['shipForm'].validate((valid) => {
          if (valid) {
            shipOrder(this.shipForm).then(response => {
              this.shipDialogVisible = false
              this.$notify({
                title: '成功',
                message: '确认发货成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
            })
          }
        })
      },
      handleRefund(row) {
        this.refundForm.orderId = row.id
        this.refundForm.refundMoney = row.actualPrice

        this.refundDialogVisible = true
        this.$nextTick(() => {
          this.$refs['refundForm'].clearValidate()
        })
      },
      confirmRefund() {
        this.$refs['refundForm'].validate((valid) => {
          if (valid) {
            refundOrder(this.refundForm).then(response => {
              this.refundDialogVisible = false
              this.$notify({
                title: '成功',
                message: '确认退款成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
            })
          }
        })
      },
      handleCheck(row) {
        getCheckInfo(row.id, row.userId).then(res => {
          this.showCheckData = res.data.data
          this.changeJson(this.showCheckData, 'result')
          this.changeJson(this.showCheckData, 'creditScore')
        })
        this.checkForm.orderId = row.id
        this.checkDialogVisible = true
      },
      confirmCheck() {
        if (!this.checkpass) {
          return
        } else {
          this.checkForm.isPass = this.checkpass === 'true'
          this.$refs['checkForm'].validate((valid) => {
            if (valid) {
              auditOrder(this.checkForm).then(response => {
                this.checkDialogVisible = false
                this.$notify({
                  title: '成功',
                  message: '已审核',
                  type: 'success',
                  duration: 2000
                })
                this.checkpass = null
                this.checkForm = {
                  orderId: null,
                  isPass: undefined,
                  remark: ''
                }
                this.showCheckData = null
                this.getList()
              })
            }
          })
        }
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
      handleReturn(row) {
        this.$confirm('确认已成功归还?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'primary'
        }).then(() => {
          returnConfirmOrder(row.id).then(response => {
            this.checkDialogVisible = false
            this.$notify({
              title: '成功',
              message: '已确认归还',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['订单ID', '订单编号', '用户ID', '订单状态', '是否删除', '收货人', '收货联系电话', '收货地址']
          const filterVal = ['id', 'orderSn', 'userId', 'orderStatus', 'isDelete', 'consignee', 'mobile', 'address']
          excel.export_json_to_excel2(tHeader, this.list, filterVal, '订单信息')
          this.downloadLoading = false
        })
      },
      addId() {
        if (this.shipForm.deviceId.length === 4) {
          this.$message.warning('已达到最大数量')
        } else {
          this.shipForm.deviceId.push('')
          this.$nextTick()
        }
      },
      resetId() {
        this.shipForm.deviceId = []
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
