<template>
  <div class="app-container calendar-list-container topic">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input clearable class="filter-item" style="width: 200px;" placeholder="请输入专题标题" v-model="listQuery.title">
      </el-input>
      <el-input clearable class="filter-item" style="width: 200px;" placeholder="请输入专题子标题" v-model="listQuery.subtitle">
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
      <el-table-column align="center" label="专题标题" prop="title">
      </el-table-column>

      <el-table-column align="center" label="专题子标题" min-width="200" prop="subtitle">
      </el-table-column>

      <el-table-column align="center" property="picUrl" label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.picUrl" width="80"/>
        </template>
      </el-table-column>

      <el-table-column align="center" label="专题详情" prop="content">
        <template slot-scope="scope">
          <el-dialog title="专题详情" :visible.sync="contentDialogVisible">
            <div v-html="contentDetail"></div>
          </el-dialog>
          <el-button type="primary" size="mini" @click="showContent(scope.row.content)">查看</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="底价" prop="price">
      </el-table-column>

      <el-table-column align="center" label="阅读数量" prop="readCount">
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="changeGoods(scope.row)">设置商品</el-button>
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
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibilityHeight="100"></back-to-top>
    </el-tooltip>

    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="dataForm" status-icon label-position="left" label-width="100px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item label="专题标题" prop="title">
          <el-input v-model="dataForm.title"></el-input>
        </el-form-item>
        <el-form-item label="专题子标题" prop="subtitle">
          <el-input v-model="dataForm.subtitle"></el-input>
        </el-form-item>
        <el-form-item label="专题图片" prop="picUrl">
          <el-upload class="avatar-uploader" :action="uploadPath" list-type="picture-card" :show-file-list="false"
                     accept=".jpg,.jpeg,.png,.gif" :on-success="uploadPicUrl">
            <img v-if="dataForm.picUrl" :src="dataForm.picUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item style="width: 700px;" label="专题内容">
          <editor :init="editorInit" v-model="dataForm.content"></editor>
        </el-form-item>
        <el-form-item label="商品低价" prop="price">
          <el-input v-model="dataForm.price"></el-input>
        </el-form-item>
        <el-form-item label="阅读量" prop="readCount">
          <el-input v-model="dataForm.readCount"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确定</el-button>
        <el-button v-else type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>

    <!-- 修改商品 -->
    <!--<div title="设置商品" class="setting" v-if="this.dialogGoods===true" :visible.sync="dialogGoods" @close="cancel" :close-on-click-modal='false'>-->
    <!--<div class="content" >-->
    <!--<el-autocomplete class="inline-input" popper-class='gamesuggestion' v-model="adddata.name" :fetch-suggestions="querySearch"-->
    <!--placeholder="请输入商品名称或id" @select="handleSelect">-->
    <!--<template slot-scope="props">-->
    <!--<div v-if='!props.item.nonesuggestion' class="proinfo flex">-->
    <!--<div class="pic">-->
    <!--<img :src="props.item.picUrl" alt="">-->
    <!--</div>-->
    <!--<div class="prointroduce">-->
    <!--<div class="proId">{{props.item.id}}</div>-->
    <!--<div class="proname wordhide">{{props.item.name}}</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div v-if='props.item.nonesuggestion' class="nonesuggestion">-->
    <!--{{props.item.nonesuggestion}}-->
    <!--</div>-->
    <!--</template>-->
    <!--</el-autocomplete>-->
    <!--<div class="flex goodlist">-->
    <!--<div class="goodwarp flex" v-for="(item,index) in editGood" :key="index">-->
    <!--<div class="goodbox flex">-->
    <!--<div>-->
    <!--<img :src="item.picUrl" alt="">-->
    <!--</div>-->
    <!--<div class="goodnames">{{item.name}}</div>-->
    <!--</div>-->
    <!--<div class="rightinfo">-->
    <!--<div class="delattrs" @click="delGoods(index)"><i class="el-icon-close delicon"></i></div>-->
    <!--</div>-->
    <!--</div>-->

    <!--</div>-->
    <!--</div>-->
    <!--<div slot="footer" class="dialog-footer" style="margin-top: 10px">-->
    <!--<el-button @click="cancel">取消</el-button>-->
    <!--<el-button type="primary" @click="addgoods">确定</el-button>-->
    <!--</div>-->
    <!--</div>-->
    <el-dialog title="设置商品" :visible.sync="dialogGoods" @close="cancel" :close-on-click-modal='false'>
      <div class="content">
        <el-autocomplete class="inline-input" popper-class='gamesuggestion' v-model="adddata.name"
                         :fetch-suggestions="querySearch"
                         placeholder="请输入商品名称或id" @select="handleSelect">
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
                <img :src="item.picUrl" alt="" @click="showButton(item,index)">
              </div>
              <div class="goodnames" @click="showButton(item,index)">{{item.name}}</div>
            </div>
            <div class="rightinfo">
              <div class="delattrs" @click="delGoods(index)"><i class="el-icon-close delicon"></i></div>
              <el-dialog title="专题排序操作" :visible.sync="buttonHiddenAndDisplay" @close="hiddenButton" append-to-body>
                <el-button type="primary" size="mini" @click="handleTop(operation)">置顶</el-button>
                <el-button type="primary" size="mini" @click="handleUp(operation)">上移</el-button>
                <el-button type="primary" size="mini" @click="handleDown(operation)">下移</el-button>
              </el-dialog>

            </div>
          </div>

        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="addgoods">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<style lang="scss">
  .setting {
    margin-top: -169px;
    z-index: auto;
    position: absolute;
    background-color: white;
  }

  .el-dialog {
    width: 800px;
  }

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

  .fixed-width .el-button--mini {
    width: auto;
  }

  .topic .el-dialog {
    margin-top: 8vh !important;
  }

  .topic .goodlist {
    margin-top: 10px;
    padding: 0 15px;
    flex-wrap: wrap;
    justify-content: space-between;

    .goodwarp {
      margin-top: 10px;
      width: 42%;
      flex: none;
      justify-content: space-between;
      align-items: center;
      padding: 0 5px;
      background-color: #eee;
      border-radius: 8px;
    }

    img {
      width: 60px;
      height: 60px;
    }

    .goodnames {
      margin-left: 20px;
      line-height: 60px;
    }

    .rightinfo {
      width: 40px;
      height: 40px;
      line-height: 40px;
      background-color: #eee;
      border-radius: 4px;
      text-align: center;
    }

    .delicon {
      color: red;

      &:hover {
        cursor: pointer;
      }
    }
  }

</style>

<script>
  import {
    listTopic,
    createTopic,
    updateTopic,
    deleteTopic,
    getGoodsInfo,
    getGoodsInfoV1_5_6
  } from '@/api/topic'
  import {
    listGoods,
    sort,
    sortV1_5_6
  } from '@/api/goods'
  import {
    createStorage,
    uploadPath
  } from '@/api/storage'
  import BackToTop from '@/components/BackToTop'
  import Editor from '@tinymce/tinymce-vue'

  export default {
    name: 'Topic',
    components: {
      BackToTop,
      Editor
    },
    data() {
      return {
        uploadPath,
        list: undefined,
        total: undefined,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          title: undefined,
          subtitle: undefined,
          sort: 'add_time',
          order: 'desc'
        },
        dataForm: {
          id: undefined,
          titile: undefined,
          subtitle: undefined,
          picUrl: undefined,
          content: '',
          price: undefined,
          readCount: undefined,
          goods: []
        },
        contentDetail: '',
        contentDialogVisible: false,
        buttonHiddenAndDisplay: false,
        operation: undefined,
        goodsIdArr: [],
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '创建'
        },
        rules: {
          title: [{
            required: true,
            message: '专题标题不能为空',
            trigger: 'blur'
          }],
          subtitle: [{
            required: true,
            message: '专题子标题不能为空',
            trigger: 'blur'
          }],
          content: [{
            required: true,
            message: '专题内容不能为空',
            trigger: 'blur'
          }]
        },
        downloadLoading: false,
        editorInit: {
          language: 'zh_CN',
          plugins: [
            'advlist anchor autolink autoresize autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools importcss insertdatetime legacyoutput link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace tabfocus table template textcolor textpattern visualblocks visualchars wordcount'
          ],
          toolbar: [
            'bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript ',
            'hr bullist numlist link image charmap preview anchor pagebreak fullscreen media table emoticons forecolor backcolor'
          ],
          images_upload_handler: function(blobInfo, success, failure) {
            const formData = new FormData()
            formData.append('file', blobInfo.blob())
            createStorage(formData).then(res => {
              success(res.data.data.url)
            }).catch(() => {
              failure('上传失败，请重新上传')
            })
          }
        },
        dialogGoods: false,
        ceshi: 10,
        changeData: {},
        editGood: [],
        allgoods: [],
        adddata: {
          name: '',
          id: ''
        }

      }
    },
    created() {
      this.getList()
      this.getgoods()
    },
    methods: {
      getList() {
        this.listLoading = true
        listTopic(this.listQuery).then(response => {
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
          titile: undefined,
          subtitle: undefined,
          picUrl: undefined,
          content: '',
          price: undefined,
          readCount: undefined,
          goods: []
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
      uploadPicUrl: function(response) {
        this.dataForm.picUrl = response.data.url
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            createTopic(this.dataForm).then(response => {
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
      showContent(content) {
        this.contentDetail = content
        this.contentDialogVisible = true
      },
      showButton(item) {
        this.operation = item
        this.buttonHiddenAndDisplay = true
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
            updateTopic(this.dataForm).then(() => {
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
        deleteTopic(row).then(response => {
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
          const tHeader = ['专题ID', '专题标题', '专题子标题', '专题内容', '专题图片', '商品低价', '阅读量', '专题商品']
          const filterVal = ['id', 'title', 'subtitle', 'content', 'picUrl', 'price', 'readCount', 'goods']
          excel.export_json_to_excel2(tHeader, this.list, filterVal, '专题信息')
          this.downloadLoading = false
        })
      },
      getgoods() {
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
      changeGoods(row) {
        this.goodsIdArr = row.goods
        if (this.dialogGoods === false) {
          if (row.goods.length) {
            getGoodsInfoV1_5_6({
              // getGoodsInfo({
              idList: row.goods
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
      cancel() {
        this.dialogGoods = false
        this.resetgoods()
      },
      hiddenButton() {
        this.buttonHiddenAndDisplay = false
      },
      handleSelect(val) {
        this.editGood.push({
          id: val.id,
          name: val.name,
          picUrl: val.picUrl
        })
      },
      querySearch(queryString, cb) {
        // if (this.checks != queryString) {
        //   this.copyexchange[this.index].productId = null
        // }
        var prodata = this.allgoods
        var results = queryString ? prodata.filter(this.createFilter(queryString)) : prodata
        // 调用 callback 返回建议列表的数据
        if (results.length === 0) {
          results.push({
            nonesuggestion: '无搜索结果',
            data: queryString
          })
        }
        cb(results)
      },
      createFilter(queryString) {
        return item => {
          return (
            item.id.toString().indexOf(queryString.toLowerCase()) !== -1 ||
            item.name.toLowerCase().indexOf(queryString.toLowerCase()) !== -1
          )
        }
      },
      delGoods(index) {
        // this.buttonHiddenAndDisplay = false
        this.$confirm('确认删除此商品?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.editGood.splice(index, 1)
        }).catch(() => {

        })
      },
      addgoods() {
        var arr = []
        this.editGood.forEach(item => {
          arr.push(item.id)
        })
        this.dataForm.goods = arr
        updateTopic(this.dataForm).then(res => {
          this.dialogGoods = false
          this.getList()
          this.resetgoods()
        })
      },
      resetgoods() {
        this.editGood = []
        this.resetForm()
      },
      handleTop(row) {
        this.handleTopParams = {
          orderId: row.id,
          move: 0,
          top: true,
          relatedGoodsIds: this.goodsIdArr
        }
        sortV1_5_6(this.handleTopParams).then(response => {
          this.$notify({
            title: '成功',
            message: '置顶成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
          this.buttonHiddenAndDisplay = false
          this.dialogGoods = false
        })
      },
      handleUp(row) {
        this.handleTopParams = {
          orderId: row.id,
          move: 1,
          top: false,
          relatedGoodsIds: this.goodsIdArr
        }
        sortV1_5_6(this.handleTopParams).then(response => {
          this.$notify({
            title: '成功',
            message: '上移成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
          this.buttonHiddenAndDisplay = false
          this.dialogGoods = false
        })
      },
      handleDown(row) {
        this.handleTopParams = {
          orderId: row.id,
          move: -1,
          top: false,
          relatedGoodsIds: this.goodsIdArr
        }
        sortV1_5_6(this.handleTopParams).then(response => {
          this.$notify({
            title: '成功',
            message: '下移成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
          this.buttonHiddenAndDisplay = false
          this.dialogGoods = false
        })
      }
    }
  }

</script>
