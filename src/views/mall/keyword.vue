<template>
  <div class="app-container calendar-list-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input clearable class="filter-item" style="width: 200px;" placeholder="请输入关键字" v-model="listQuery.keyword">
      </el-input>
      <el-input clearable class="filter-item" style="width: 200px;" placeholder="请输入跳转链接" v-model="listQuery.url">
      </el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload"
                 :loading="downloadLoading">导出
      </el-button>
    </div>

    <!-- 查询结果 -->
    <el-table size="small" :data="list" v-loading="listLoading" element-loading-text="正在查询中。。。" border fit
              highlight-current-row>

      <el-table-column align="center" width="150px" label="关键词ID" prop="id" sortable>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="关键词" prop="keyword">
      </el-table-column>

      <el-table-column align="center" min-width="300px" label="跳转链接" prop="url">
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="是否推荐" prop="isHot">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isHot ? 'success' : 'error' ">{{scope.row.isHot ? '是' : '否'}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="是否默认" prop="isDefault">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isDefault ? 'success' : 'error' ">{{scope.row.isDefault ? '是' : '否'}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="250" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.page"
                     :page-sizes="[10,20,30,50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="dataForm" status-icon label-position="left" label-width="100px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item label="关键词" prop="keyword">
          <el-input v-model="dataForm.keyword"></el-input>
        </el-form-item>
        <el-form-item label="跳转链接" prop="url">
          <el-input v-model="dataForm.url" placeholder="如需关键词跳转指定商品,填写商品ID即可"
                    @focus="changeInfoId(dataForm)"></el-input>
        </el-form-item>
        <el-form-item label="是否推荐" prop="isHot">
          <el-select v-model="dataForm.isHot" placeholder="请选择">
            <el-option label="推荐" :value="true">
            </el-option>
            <el-option label="普通" :value="false">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否默认" prop="isDefault">
          <el-select v-model="dataForm.isDefault" placeholder="请选择">
            <el-option label="默认" :value="true">
            </el-option>
            <el-option label="非默认" :value="false">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确定</el-button>
        <el-button v-else type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="设置商品ID" :visible.sync="dialogGoods" @close="cancelGoods" :close-on-click-modal='false'>
      <div class="content">
        <el-autocomplete class="inline-input" popper-class='gamesuggestion' v-model="adddata.name"
                         :fetch-suggestions="querySearchGoods" placeholder="请输入商品名称或id" @select="handleSelectGoods">
          <template slot-scope="props">
            <div v-if='!props.item.nonesuggestion' class="proinfo flex">
              <div class="pic">
                <img :src="props.item.picUrl" alt="">
              </div>
              <div class="prointroduce">
                <div class="proId">{{props.item.id}}</div>
                <div class="proname wordhide">{{props.item.name}}</div>
              </div>
            </div>
            <div v-if='props.item.nonesuggestion' class="nonesuggestion">{{props.item.nonesuggestion}}</div>
          </template>
        </el-autocomplete>
        <div class="flex goodlist">
          <div class="goodwarp flex" v-for="(item,index) in editGood" :key="index">
            <div class="goodbox flex">
              <div class="pic">
                <img :src="item.picUrl" alt="" width="60" height="60">
              </div>
              <div class="goodnames">{{item.name}}</div>
            </div>
            <div class="rightinfo">
              <div class="delattrs" @click="delGoods(index)"><i class="el-icon-close delicon"></i></div>
            </div>
          </div>

        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelGoods">取消</el-button>
        <el-button type="primary" @click="addGoods">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import { listKeyword, createKeyword, updateKeyword, deleteKeyword } from '@/api/keyword'
  import { getGoodsInfo } from '@/api/topic'
  import { listGoods } from '@/api/goods'

  export default {
    name: 'Keyword',
    data() {
      return {
        list: undefined,
        total: undefined,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          keyword: undefined,
          url: undefined,
          sort: 'add_time',
          order: 'desc'
        },
        dataForm: {
          id: undefined,
          keyword: undefined,
          url: undefined,
          isHot: undefined,
          isDefault: undefined
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '创建'
        },
        rules: {
          keyword: [{ required: true, message: '关键词不能为空', trigger: 'blur' }]
        },
        downloadLoading: false,
        dialogGoods: false,
        adddata: {
          name: '',
          id: ''
        },
        editGood: []
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        listKeyword(this.listQuery).then(response => {
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
      resetForm() {
        this.dataForm = {
          id: undefined,
          keyword: undefined,
          url: undefined,
          isHot: undefined,
          isDefault: undefined
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
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            createKeyword(this.dataForm).then(response => {
              this.list.unshift(response.data.data)
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      handleUpdate(row) {
        this.dataForm = Object.assign({}, row)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            updateKeyword(this.dataForm).then(() => {
              for (const v of this.list) {
                if (v.id === this.dataForm.id) {
                  const index = this.list.indexOf(v)
                  this.list.splice(index, 1, this.dataForm)
                  break
                }
              }
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      handleDelete(row) {
        deleteKeyword(row).then(response => {
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
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['关键词ID', '关键词', '跳转链接', '是否推荐', '是否默认']
          const filterVal = ['id', 'keyword', 'url', 'isHot', 'isDefault']
          excel.export_json_to_excel2(tHeader, this.list, filterVal, '关键词设置')
          this.downloadLoading = false
        })
      },
      changeInfoId(row) {
        // 要返回id，name，pic
        this.editGood = []
        this.getGoods()
        this.goodsBox(row)
      },
      getGoods() {
        var listQuery = {
          page: 1,
          limit: 1000,
          goodsSn: undefined,
          name: undefined,
          sort: 'add_time',
          order: 'desc'
        }
        listGoods(listQuery).then(response => {
          this.allgoods = response.data.data.items
        })
      },
      delGoods(index) {
        this.$confirm('确认删除此商品?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.editGood.splice(index, 1)
        }).catch(() => {

        })
      },
      goodsBox(row) {
        var targetId = row.targetId
        if (this.dialogGoods === false) {
          if (targetId != null) {
            getGoodsInfo({
              idList: [row.goodId]
            }).then(res => {
              this.editGood = res.data.data
              this.dialogGoods = true
              this.dataForm = Object.assign({}, row)
            })
          } else {
            this.dialogGoods = true
            this.dataForm = Object.assign({}, row)
          }
        }
      },
      addGoods() {
        var arr = null
        this.editGood.forEach(item => {
          arr = item.id
        })
        if (arr == null) {
          arr = ''
        }
        console.log(arr)
        this.dataForm.url = arr
        this.dialogGoods = false
      },
      cancelGoods() {
        this.dialogGoods = false
      },
      handleSelectGoods(val) {
        this.editGood = []
        this.editGood[0] = ({
          id: val.id,
          name: val.name,
          picUrl: val.picUrl
        })
      },
      querySearchGoods(queryString, cb) {
        var prodata = this.allgoods
        var results = queryString ? prodata.filter(this.createFilterGoods(queryString)) : prodata
        if (results.length === 0) {
          results.push({
            nonesuggestion: '无搜索结果',
            data: queryString
          })
        }
        cb(results)
      },
      createFilterGoods(queryString) {
        return item => {
          return (
            item.id.toString().indexOf(queryString.toLowerCase()) !== -1 ||
            String(item.name).toLowerCase().indexOf(queryString.toLowerCase()) !== -1
          )
        }
      }
    }
  }
</script>
