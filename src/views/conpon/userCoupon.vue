<template>
  <div class="app-container calendar-list-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input clearable class="filter-item" style="width: 200px;" placeholder="请输入用户ID" v-model="listQuery.userId">
      </el-input>
      <el-input clearable class="filter-item" style="width: 200px;" placeholder="请输入用户姓名" v-model="listQuery.cardName">
      </el-input>
      <el-input clearable class="filter-item" style="width: 200px;" placeholder="请输入用户手机号" v-model="listQuery.mobile">
      </el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload" :loading="downloadLoading">导出</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table size="small" :data="list" v-loading="listLoading" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" label="ID" prop="id" sortable>
      </el-table-column>
      <el-table-column align="center" label="用户id" prop="userId">
      </el-table-column>
      <el-table-column align="center" label="用户姓名" prop="cardName">
      </el-table-column>
      <el-table-column align="center" label="手机号" prop="mobile">
      </el-table-column>
      <el-table-column align="center" label="领券时间" prop="addTime">
        <template slot-scope="scope">
          <el-text >{{ scope.row.addTime | formatDate }}</el-text>
        </template>
      </el-table-column>
      <el-table-column align="center" label="优惠券类型" prop="type">
        <template slot-scope="scope">
          <el-tag >{{ scope.row.type===1 ? '新人优惠券' : scope.row.type===2 ? '针对商品' : '针对类别' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleDetail(scope.row)">详情</el-button>
          <el-button type="danger" size="mini"  @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page"
                     :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!-- 订单详情对话框 -->
    <el-dialog title="优惠券详情" width="900" :visible.sync="orderDialogVisible" @close='closeDetail'>
      <el-form :data="orderDetail" label-position="left">
        <div class="flex itemtogether">
          <el-form-item label="用户id：">
              <span>{{orderDetail.userId}}</span>
          </el-form-item>
          <el-form-item label="姓名：">
            <span>{{ orderDetail.cardName }}</span>
          </el-form-item>
          <el-form-item label="手机号：">
            <span>{{ orderDetail.mobile }}</span>
          </el-form-item>
        </div>

        <div class="flex itemtogether">
          <el-form-item label="指定id：">
            <span>{{orderDetail.targetId}}</span>
          </el-form-item>
          <el-form-item label="指定类型：">
            <span>{{ orderDetail.targetType===1 ? '商品id' : '专题id' }}</span>
          </el-form-item>
          <el-form-item label="">
            <span></span>
          </el-form-item>
        </div>

        <div class="flex itemtogether">
          <el-form-item label="过期时间：">
            <span>{{ orderDetail.expireDate | formatDate }}</span>
          </el-form-item>
          <el-form-item label="领取时间：">
            <span>{{ orderDetail.addTime | formatDate }}</span>
          </el-form-item>
          <el-form-item label="备注：">
            <span>{{ orderDetail.content ? orderDetail.content : '无' }}</span>
          </el-form-item>
        </div>
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
  import { userCouponList, delUserCoupon, userCouponDetail } from '@/api/coupon'
  import BackToTop from '@/components/BackToTop'
  import Editor from '@tinymce/tinymce-vue'
  export default {
    filters: {
      formatDate: function(value) {
        var date = new Date(value)
        var y = date.getFullYear()
        var MM = date.getMonth() + 1
        MM = MM < 10 ? ('0' + MM) : MM
        var d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        var h = date.getHours()
        h = h < 10 ? ('0' + h) : h
        var m = date.getMinutes()
        m = m < 10 ? ('0' + m) : m
        var s = date.getSeconds()
        s = s < 10 ? ('0' + s) : s
        return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
      }
    },
    name: 'Ad',
    components: {
      BackToTop,
      Editor
    },
    data() {
      return {
        orderDetail: {},
        orderDialogVisible: false,
        dialogGoods: false,
        dialogTopic: false,
        list: undefined,
        total: undefined,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          remarks: undefined,
          sort: 'add_time',
          order: 'desc'
        },
        dataForm: {
          id: undefined,
          url: undefined,
          pic: undefined,
          remarks: undefined,
          type: undefined,
          targetId: undefined,
          targetType: undefined
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '创建'
        },
        rules: {
          remarks: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
          pic: [{ required: true, message: '图片不能为空', trigger: 'blur' }]
        },
        downloadLoading: false,
        adddata: {
          name: '',
          id: ''
        },
        editGood: [],
        allgoods: [],
        editTopic: [],
        allTopic: []
      }
    },
    created() {
      this.getList()
      this.getGoods()
      this.getTopic()
    },
    methods: {
      getList() {
        this.listLoading = true
        userCouponList(this.listQuery).then(response => {
          this.list = response.data.data.items
          console.log(this.list);
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
      resetForm() {
        this.dataForm = {
          id: undefined,
          name: undefined,
          content: undefined,
          url: undefined,
          link: undefined,
          position: 1,
          topicId: undefined,
          goodId: undefined,
          enabled: true
        }
      },
      handleCreate() {
        this.resetForm()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['广告ID', '广告标题', '广告内容', '广告图片', '广告位置', '活动链接', '是否启用']
          const filterVal = ['id', 'name', 'content', 'url', 'postion', 'link', 'enabled']
          excel.export_json_to_excel2(tHeader, this.list, filterVal, '广告信息')
          this.downloadLoading = false
        })
      },
      handleDelete(row) {
        delUserCoupon(row).then(response => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
        })
      },
      handleDetail(row) {
        userCouponDetail(row.id).then(response => {
          this.orderDetail = response.data.data
        })
        this.orderDialogVisible = true
      },
      closeDetail() {
        this.userdata = null
      }
    }
  }
</script>
