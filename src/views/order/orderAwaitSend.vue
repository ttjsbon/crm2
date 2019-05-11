<template>
  <div class="app-container calendar-list-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input clearable class="filter-item" style="width: 200px;" placeholder="请输入用户ID" v-model="listQuery.userId">
      </el-input>
      <el-input clearable class="filter-item" style="width: 200px;" placeholder="请输入订单编号" v-model="listQuery.orderSn">
      </el-input>
      <el-input clearable class="filter-item" style="width: 200px;" placeholder="请输入姓名" v-model="listQuery.name">
      </el-input>
      <el-input clearable class="filter-item" style="width: 200px;" placeholder="请输入手机号" v-model="listQuery.mobile">
      </el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload" :loading="downloadLoading">导出</el-button>
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
          <el-button type="primary" size="mini" @click="handleShip(scope.row)">发货</el-button>
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
          <el-table size="small" :data="orderDetail.pay" border fit highlight-current-row>
            <el-table-column  align="center" :label="'需支付时间'" width="160px">
              <template slot-scope="scope" >
                <span>  {{ scope.row.createTime.substring(0, 10)}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" :label="'支付时间'" width="160px">
              <template slot-scope="scope" >
                <span>  {{ scope.row.updateTime?scope.row.updateTime.substring(0, 10):'无'}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" :label="'支付订单'" width="195px">
              <template slot-scope="scope" >
                <span>  {{ scope.row.payOrderId?scope.row.payOrderId:'无'}}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" :label="'支付状态'" width="160px">
              <template slot-scope="scope" >
                <span>  {{ scope.row.payOrderId ? '已支付': '未支付'}}</span>
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
        <el-form-item label="采购价格" prop="purchasingPrice">
          <el-input v-model="shipForm.purchasingPrice" placeholder="请输入采购价格"></el-input>
        </el-form-item>
        <el-form-item label="渠道名称" prop="channleName">
          <el-select v-model="shipForm.channleName" @change="onLevelChange">
            <el-option v-for="item in channleAllAdmin" :value="item.channleName" :label="item.channleName" :key="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="设备id">
          <el-button type="primary" @click="addId">添加</el-button>
          <el-input style='margin-top:10px;' class='addinput' v-for='(item,index) in shipForm.deviceId' v-model="shipForm.deviceId[index]"
            :key="index" placeholder="请输入设备ID"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="shipDialogVisible = false">取消</el-button>
        <!-- <el-button type="primary" @click="confirmShip">确定</el-button> -->
        <el-button type="primary" @click="confirmShipV1_3">确定</el-button>

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
    listOrder,
    shipOrder,
    detailOrder,
    channleAllAdmin,
    shipOrderV1_3
  } from '@/api/order'
  import {
    parseTime
  } from '@/utils/index'
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
    name: 'Order',
    data() {
      return {
        channleAllAdmin: null,
        list: undefined,
        total: undefined,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          id: undefined,
          name: undefined,
          orderStatusArray: [301],
          sort: 'add_time',
          order: 'desc',
          overdue: 1,
          mobile: undefined
        },
        statusMap,
        orderDialogVisible: false,
        orderDetail: {
          order: {},
          user: {},
          orderGoods: []
        },
        shipForm: {
          orderId: undefined,
          shipChannel: undefined,
          shipSn: undefined,
          purchasingPrice: undefined,
          channleName: undefined,
          deviceId: []
        },
        shipDialogVisible: false,
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
        this.listLoading = true
        listOrder(this.listQuery).then(response => {
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
        detailOrder(row.id).then(response => {
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

        this.shipForm.purchasingPrice = row.purchasingPrice
        this.shipForm.channleName = row.channleName

        this.shipDialogVisible = true
        this.$nextTick(() => {
          this.$refs['shipForm'].clearValidate()
        })
        // 获取渠道名称
        channleAllAdmin().then(response => {
          this.listLoading = true
          this.channleAllAdmin = response.data.data.items
          this.listLoading = false
        }).catch(() => {
          this.item = []
          this.listLoading = false
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
      onLevelChange: function(value) {

        if (value === 'L1') {
          this.pid = undefined
        }
      },
      confirmShipV1_3() {
        this.shipForm.deviceId = this.shipForm.deviceId.filter(item => {
          return item !== ''
        })
        this.$refs['shipForm'].validate((valid) => {
          if (valid) {
            shipOrderV1_3(this.shipForm).then(response => {
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
      }
    }
  }

</script>
