<template>
  <div class="app-container calendar-list-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input clearable class="filter-item" style="width: 200px;" placeholder="请输入描述内容" v-model="listQuery.remarks">
      </el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload" :loading="downloadLoading">导出</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table size="small" :data="list" v-loading="listLoading" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" label="ID" prop="id" sortable>
      </el-table-column>

      <el-table-column align="center" label="描述" prop="remarks">
      </el-table-column>

      <el-table-column align="center" label="图片" prop="pic">
        <template slot-scope="scope">
          <img :src="scope.row.pic" width="80" v-if="scope.row.pic"/>
        </template>
      </el-table-column>

      <el-table-column align="center" label="H5地址" prop="url">
      </el-table-column>
      <el-table-column align="center" label="原生/H5页面" prop="type">
      </el-table-column>

      <el-table-column align="center" label="商品/专题ID" prop="targetId">
      </el-table-column>

      <el-table-column align="center" label="商品/专题类型" prop="enabled">
        <template slot-scope="scope">
          <el-tag >{{ scope.row.enabled===1 ? '商品' : '专题' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini"  @click="handleDelete(scope.row)">删除</el-button>
          <el-button type="primary" size="mini" @click="changeGoods(scope.row)">设置商品</el-button>
          <el-button type="primary" size="mini" @click="changeTopic(scope.row)">设置专题</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page"
                     :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="dataForm" status-icon label-position="left" label-width="100px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="dataForm.remarks"></el-input>
        </el-form-item>
        <el-form-item label="H5地址" prop="url">
          <el-input v-model="dataForm.url"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="pic">
          <el-upload class="avatar-uploader" :action="uploadPath" list-type="picture-card" :show-file-list="false" accept=".jpg,.jpeg,.png,.gif" :on-success="uploadUrl">
            <img v-if="dataForm.pic" :src="dataForm.pic" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品/专题ID" prop="goodId">
          <el-input v-model="dataForm.goodId"></el-input>
        </el-form-item>
        <el-form-item label="商品/专题类型" prop="type">
          <el-select v-model="dataForm.targetType" placeholder="请选择">
            <el-option label="商品ID" :value="1">
            </el-option>
            <el-option label="专题ID" :value="2">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跳转类型" prop="type">
          <el-select v-model="dataForm.type" placeholder="请选择">
            <el-option label="原生" :value="1">
            </el-option>
            <el-option label="H5页面" :value="2">
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

    <el-dialog title="设置商品" :visible.sync="dialogGoods" @close="cancelGoods" :close-on-click-modal='false'>
      <div class="content">
        <el-autocomplete class="inline-input" popper-class='gamesuggestion' v-model="adddata.name" :fetch-suggestions="querySearchGoods"
                         placeholder="请输入商品名称或id" @select="handleSelectGoods">
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
            <div v-if='props.item.nonesuggestion' class="nonesuggestion">
              {{props.item.nonesuggestion}}
            </div>
          </template>
        </el-autocomplete>
        <div class="flex goodlist">
          <div class="goodwarp flex" v-for="(item,index) in editGood" :key="index">
            <div class="goodbox flex">
              <div>
                <img :src="item.picUrl" alt="" width="80px" height="80px">
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

    <el-dialog title="设置专题" :visible.sync="dialogTopic" @close="cancelTopic" :close-on-click-modal='false'>
      <div class="content">
        <el-autocomplete class="inline-input" popper-class='gamesuggestion' v-model="adddata.name" :fetch-suggestions="querySearchTopic"
                         placeholder="请输入专题名称或id" @select="handleSelectTopic">
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
            <div v-if='props.item.nonesuggestion' class="nonesuggestion">
              {{props.item.nonesuggestion}}
            </div>
          </template>
        </el-autocomplete>
        <div class="flex topiclist">
          <div class="goodwarp flex" v-for="(item,index) in editTopic" :key="index">
            <div class="topicbox flex">
              <div>
                <img :src="item.picUrl" alt="" width="150px" height="80px">
              </div>
              <div class="topictitles">{{item.title}}</div>
            </div>
            <div class="rightinfo">
              <div class="delattrs" @click="delTopic(index)"><i class="el-icon-close delicon"></i></div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelTopic">取消</el-button>
        <el-button type="primary" @click="addTopic">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>

<script>
  import { createAd, updateAd, deleteAd, updateGoodAndTopic } from '@/api/ad'
  import { couponConfigList } from '@/api/coupon'

  import {
    listTopic,
    read,
    getGoodsInfo
  } from '@/api/topic'
  import {
    listGoods
  } from '@/api/goods'
  import {
    uploadPath
  } from '@/api/storage'
  import BackToTop from '@/components/BackToTop'
  import Editor from '@tinymce/tinymce-vue'

  export default {
    name: 'Ad',
    components: {
      BackToTop,
      Editor
    },
    data() {
      return {
        uploadPath,
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
          name: undefined,
          content: undefined,
          url: undefined,
          link: undefined,
          position: 1,
          goodId: undefined,
          topicId: undefined,
          enabled: true
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '创建'
        },
        rules: {
          name: [{ required: true, message: '广告标题不能为空', trigger: 'blur' }],
          content: [{ required: true, message: '广告内容不能为空', trigger: 'blur' }],
          url: [{ required: true, message: '广告链接不能为空', trigger: 'blur' }]
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
        couponConfigList(this.listQuery).then(response => {
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
      uploadUrl: function(response) {
        this.dataForm.url = response.data.url
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            createAd(this.dataForm).then(response => {
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
            updateAd(this.dataForm).then(() => {
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
        deleteAd(row).then(response => {
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
          const tHeader = ['广告ID', '广告标题', '广告内容', '广告图片', '广告位置', '活动链接', '是否启用']
          const filterVal = ['id', 'name', 'content', 'url', 'postion', 'link', 'enabled']
          excel.export_json_to_excel2(tHeader, this.list, filterVal, '广告信息')
          this.downloadLoading = false
        })
      },
      changeGoods(row) {
        if (this.dialogGoods === false) {
          if (row.goodId != null) {
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
        } else if (this.dialogGoods === true) {
          this.dialogGoods = false
        }
      },
      cancelGoods() {
        this.dialogGoods = false
        this.resetGoods()
      },
      handleSelectGoods(val) {
        this.editGood[0] = ({
          id: val.id,
          name: val.name,
          picUrl: val.picUrl
        })
      },
      querySearchGoods(queryString, cb) {
        var prodata = this.allgoods
        var results = queryString ? prodata.filter(this.createFilterGoods(queryString)) : prodata
        if (results != null) {
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
            item.name.toLowerCase().indexOf(queryString.toLowerCase()) !== -1
          )
        }
      },
      addGoods() {
        var arr = []
        this.editGood.forEach(item => {
          arr.push(item.id)
        })
        this.dataForm.goodId = arr[0]
        updateGoodAndTopic(this.dataForm).then(res => {
          this.dialogGoods = false
          this.getList()
        })
      },
      resetGoods() {
        this.editGood = []
        this.resetForm()
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
      changeTopic(row) {
        if (this.dialogTopic === false) {
          if (row.topicId != null) {
            this.dataForm.topicId = row.topicId
            read(this.dataForm.topicId).then(res => {
              this.editTopic = [res.data.data]
              this.dialogTopic = true
              this.dataForm = Object.assign({}, row)
            })
          } else {
            this.dialogTopic = true
            this.dataForm = Object.assign({}, row)
          }
        } else if (this.dialogTopic === true) {
          this.dialogTopic = false
        }
      },
      cancelTopic() {
        this.dialogTopic = false
        this.resetTopic()
      },
      handleSelectTopic(val) {
        this.editTopic[0] = ({
          id: val.id,
          name: val.name,
          picUrl: val.picUrl
        })
      },
      querySearchTopic(queryString, cb) {
        var prodata = this.allTopic
        var results = queryString ? prodata.filter(this.createFilterTopic(queryString)) : prodata
        if (results != null) {
          results.push({
            nonesuggestion: '无搜索结果',
            data: queryString
          })
        }
        cb(results)
      },
      createFilterTopic(queryString) {
        return item => {
          return (
            item.id.toString().indexOf(queryString.toLowerCase()) !== -1 ||
            item.name.toLowerCase().indexOf(queryString.toLowerCase()) !== -1
          )
        }
      },
      addTopic() {
        var arr = []
        this.editTopic.forEach(item => {
          arr.push(item.id)
        })
        this.dataForm.topicId = arr[0]
        updateGoodAndTopic(this.dataForm).then(res => {
          this.dialogTopic = false
          this.getList()
        })
      },
      resetTopic() {
        this.editTopic = []
        this.resetForm()
      },
      getTopic() {
        var listQuery = {
          page: 1,
          limit: 1000,
          goodsSn: undefined,
          name: undefined,
          sort: 'add_time',
          order: 'desc'
        }
        listTopic(listQuery).then(response => {
          this.allTopic = response.data.data.items
        })
      },
      delTopic(index) {
        this.$confirm('确认删除此商品?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.editTopic.splice(index, 1)
        }).catch(() => {

        })
      }
    }
  }
</script>
