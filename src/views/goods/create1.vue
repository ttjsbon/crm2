<template>
  <div class="app-container calendar-list-container">

    <el-card class="box-card">
      <h3>商品介绍</h3>
      <el-form :rules="rules" ref="goods" :model="goods" label-width="150px">
        <el-form-item label="商品编号" prop="goodsSn">
          <el-input v-model="goods.goodsSn" placeholder="输入商品编号，如：1000000"></el-input>
        </el-form-item>
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="goods.name" placeholder="输入商品名称，如：秋冬保暖加厚细羊毛被"></el-input>
        </el-form-item>
        <el-form-item label="租赁价格" prop="counterPrice">
          <el-input v-model="goods.counterPrice" placeholder="输入租赁价格，如：0.00">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="retailPrice">
          <el-input v-model="goods.retailPrice" placeholder="输入商品价格，如：0.00">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="是否新品" prop="isNew">
          <el-radio-group v-model="goods.isNew">
            <el-radio :label="true">新品</el-radio>
            <el-radio :label="false">非新品</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否热卖" prop="isHot">
          <el-radio-group v-model="goods.isHot">
            <el-radio :label="false">普通</el-radio>
            <el-radio :label="true">热卖</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否支持续租" prop="isRelet">
          <el-radio-group v-model="goods.isRelet">
            <el-radio :label="true">支持</el-radio>
            <el-radio :label="false">不支持</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否支持买断" prop="isBuyout">
          <el-radio-group v-model="goods.isBuyout">
            <el-radio :label="true">支持</el-radio>
            <el-radio :label="false">不支持</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="商品图片">
          <el-upload class="avatar-uploader" :action="uploadPath" list-type="picture-card" :show-file-list="false"
            accept=".jpg,.jpeg,.png,.gif" :on-success="uploadPicUrl">
            <img v-if="goods.picUrl" :src="goods.picUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="宣传画廊">
          <el-upload :action="uploadPath" :limit="5" multiple accept=".jpg,.jpeg,.png,.gif" list-type="picture-card"
            :on-exceed="uploadOverrun" :on-success="handleGalleryUrl" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="商品单位">
          <el-input v-model="goods.unit" placeholder="输入商品单位，如：件 / 个 / 盒"></el-input>
        </el-form-item>

        <el-form-item label="关键字">
          <el-tag :key="tag" v-for="tag in keywords" closable type="primary" @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input class="input-new-keyword" v-if="newKeywordVisible" v-model="newKeyword" ref="newKeywordInput" size="small"
            @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
          </el-input>
          <el-button v-else class="button-new-keyword" size="small" type="primary" @click="showInput">+ 增加</el-button>
        </el-form-item>

        <el-form-item label="所属类目">
          <el-cascader expand-trigger="hover" :options="categoryList" @change="handleCategoryChange"></el-cascader>
        </el-form-item>

        <el-form-item label="所属品牌商">
          <el-select v-model="goods.brandId">
            <el-option v-for="item in brandList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品简介">
          <el-input v-model="goods.brief" placeholder="输入商品简介"></el-input>
        </el-form-item>

        <el-form-item label="商品详细介绍">
          <editor :init="editorInit" v-model="goods.description"></editor>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <h3>商品规格</h3>
      <el-row type="flex" align="middle" :gutter="20" style="padding:20px 0;">
        <el-col :span="10">
          <el-radio-group v-model="multipleSpec" @change="specChanged">
            <el-radio-button :label="false">默认标准规格</el-radio-button>
            <el-radio-button :label="true">多规格支持</el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="10" v-if="multipleSpec">
          <el-button :plain="true" @click="handleSpecificationShow" type="primary">添加</el-button>
        </el-col>
      </el-row>

      <el-table :data="multipleSpec==true?copyspecifications:specifications">
        <el-table-column property="specification" label="规格名"></el-table-column>
        <el-table-column property="value" label="规格值">
          <template slot-scope="scope">
            <el-tag type="primary" v-if="!multipleSpec">
              {{scope.row.value}}
            </el-tag>
            <div v-else>
              <el-tag type="primary" v-for='(item, index) in scope.row.value' :key="index">
                {{item}}
              </el-tag>
            </div>

          </template>
        </el-table-column>
        <el-table-column property="picUrl" label="规格图片">
          <template slot-scope="scope">
            <img :src="scope.row.picUrl" width="40" v-if="scope.row.picUrl" />
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="250" class-name="small-padding fixed-width" v-if="multipleSpec">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="handleSpecificationDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="设置规格" :visible.sync="specVisiable">
        <el-form :rules="rules" ref="specForm" :model="specForm" status-icon label-position="left" label-width="100px"
          style='width: 400px; margin-left:50px;'>
          <el-form-item label="规格名" prop="specification">
            <el-input v-model="specForm.specification" placeholder="输入规格名，如：颜色"></el-input>
          </el-form-item>
          <el-form-item label="规格值">
            <div class="flex">
              <el-input v-model="specificationValue" placeholder="输入规格值，如：红色"></el-input>
              <div class="iconwarp" @click="addTag()">
                <i class="el-icon-plus"></i>
              </div>
            </div>

            <el-tag :key="index" v-for="(item, index) in specForm.value" closable :disable-transitions="false" @close="handleCloseTag(index)">
              {{item}}
            </el-tag>
          </el-form-item>
          <el-form-item label="规格图片" prop="picUrl">
            <el-upload class="avatar-uploader" :action='uploadPath' list-type="picture-card" :show-file-list="false"
              accept=".jpg,.jpeg,.png,.gif" :on-success="uploadSpecPicUrl">
              <img v-if="specForm.picUrl" :src="specForm.picUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="specVisiable = false">取消</el-button>
          <el-button type="primary" @click="handleSpecificationAdd">确定</el-button>
        </div>
      </el-dialog>
    </el-card>

    <el-card class="box-card">
      <h3>租赁信息</h3>
      <div class="flex tenancybox">
        <span class="tenancylabel">分期类型</span>
        <el-radio-group v-model="stagingType" @change="changetenancyType">
          <el-radio :label="1">按月</el-radio>
          <el-radio :label="2">按日</el-radio>
          <el-radio :label="3">按周</el-radio>
          <el-radio :label="4">按季</el-radio>
          <el-radio :label="5">按年</el-radio>
        </el-radio-group>
      </div>
      <div class="flex tenancybox">
        <span class="tenancylabel">租期</span>
        <el-checkbox-group v-model="leaseTerm" @change="changetenancy">
          <el-checkbox v-for="item in options" :key="item.periods" :label="item.periods" name="type">
            <div>{{item.periods}}期</div>
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="flex tenancybox">
        <span class="tenancylabel">意外保险</span>
        <el-switch v-model="isInsure"></el-switch>
      </div>
      <div v-if="isInsure" class="flex tenancybox">
        <span class="tenancylabel">一次性支付</span>
        <el-input placeholder="输入保险金额，如：0.00" v-model="once">
          <template slot="append">元</template>
        </el-input>
      </div>
      <div v-if="isInsure" class="flex tenancybox">
        <span class="tenancylabel">分期支付</span>
        <el-input placeholder="输入保险金额，如：0.00" v-model="installment">
          <template slot="append">元</template>
        </el-input>
      </div>

    </el-card>
    <el-card class="box-card">
      <h3>租期配置</h3>
      <el-button :plain="true" @click="handleAttributeShowLease" type="primary">添加</el-button>
      <el-table :data="attributesLease">
        <el-table-column property="type" label="租期类型（1-按月 2-按日 3-按周 4-按季 5-按年）">
        </el-table-column>
        <el-table-column property="num" label="期数">
        </el-table-column>
        <el-table-column property="value" label="价格">
        </el-table-column>
        <el-table-column align="center" label="操作" width="100" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <div class="flex">
              <el-button type="danger" size="mini" @click="handleAttributeDeleteLease(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="设置租期租金" :visible.sync="attributeVisiableLease">
        <el-form ref="attributeFormLease" :model="attributeFormLease" status-icon label-position="left" label-width="100px" style='width: 400px; margin-left:50px;'>
          <!--<el-form-item label="商品参数名称" prop="attribute">-->
            <!--<el-input v-model="attributeForm.attribute" placeholder="输入参数名，如：尺寸"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="商品参数值" prop="value">-->
            <!--<el-input v-model="attributeForm.value" placeholder="输入参数值，如：180*200cm"></el-input>-->
          <!--</el-form-item>-->
          <div class="flex tenancybox">
            <span class="tenancylabel">分期类型</span>
            <el-radio-group v-model="attributeFormLease.type" @change="changetenancyTypeLease">
              <el-radio :label="1">按月</el-radio>
              <el-radio :label="2">按日</el-radio>
              <el-radio :label="3">按周</el-radio>
              <el-radio :label="4">按季</el-radio>
              <el-radio :label="5">按年</el-radio>
            </el-radio-group>
          </div>
          <div class="flex tenancybox">
            <span class="tenancylabel">租期</span>
            <el-checkbox-group v-model="leaseTermLease" @change="changetenancyLease">
              <el-checkbox v-for="item in options" :key="item.periods" :label="item.periods" name="num">
                <div>{{item.periods}}期</div>
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="flex tenancybox">
            <span class="tenancylabel">设置分期价格</span>
            <el-input placeholder="输入金额，如：0.00" v-model="attributeFormLease.value">
            <!--<el-input placeholder="输入保险金额，如：0.00" v-model="installmentLease">-->
              <template slot="append">元</template>
            </el-input>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="attributeVisiableLease = false">取消</el-button>
          <el-button type="primary" @click="handleAttributeAddLease">确定</el-button>
        </div>
      </el-dialog>
    </el-card>
    <el-card class="box-card">
      <h3>货品信息</h3>
      <el-table :data="products">
        <el-table-column property="value" label="货品规格">
          <template slot-scope="scope">
            <el-tag :key="tag" v-for="tag in scope.row.specifications">
              {{tag}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column property="price" width="100" label="货品售价">
        </el-table-column>
        <el-table-column property="number" width="100" label="货品数量">
        </el-table-column>
        <el-table-column property="url" width="100" label="货品图片">
          <template slot-scope="scope">
            <img :src="scope.row.url" width="40" v-if="scope.row.url" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handlelease(scope.row)" style="width:auto">设置租期金额</el-button>
            <el-button type="primary" size="mini" @click="handleProductShow(scope.row)" style="width:auto">设置库存</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="设置货品" :visible.sync="productVisiable">
        <el-form ref="productForm" :model="productForm" status-icon label-position="left" label-width="100px" style='width: 400px; margin-left:50px;'>
          <el-form-item label="货品规格列" prop="specifications">
            <el-tag :key="tag" v-for="tag in productForm.specifications">
              {{tag}}
            </el-tag>
          </el-form-item>
          <el-form-item label="货品售价" prop="price">
            <el-input v-model="productForm.price" placeholder="输入货品售价">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="货品数量" prop="number">
            <el-input v-model="productForm.number" placeholder="输入货品数量，如10"></el-input>
          </el-form-item>
          <el-form-item label="货品图片" prop="url">
            <el-upload class="avatar-uploader" :action='uploadPath' list-type="picture-card" :show-file-list="false"
              accept=".jpg,.jpeg,.png,.gif" :on-success="uploadProductUrl">
              <img v-if="productForm.url" :src="productForm.url" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="productVisiable = false">取消</el-button>
          <el-button type="primary" @click="handleProductEdit">确定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="设置租期金额" :visible.sync="productLeaseVisi" @close="cancel()">
        <div class="mar-b">
          <el-tag :key="tag" v-for="tag in productForm.specifications">
            {{tag}}
          </el-tag>
        </div>
        <div v-if='productForm.productFinances'>
          <div v-for="item in productForm.productFinances" :key="item.periods" class="flex mar-b">
            <span class="rentlabel">{{item.periods}}期:</span>
            <el-input v-model="item.price" placeholder="输入租金">
              <template slot="append">元</template>
            </el-input>
          </div>
        </div>
        <div v-else>暂未选择租期！</div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel()">取消</el-button>
          <el-button type="primary" @click="handleLeaseEdit">确定</el-button>
        </div>
      </el-dialog>
    </el-card>

    <el-card class="box-card">
      <h3>商品参数</h3>
      <el-button :plain="true" @click="handleAttributeShow" type="primary">添加</el-button>
      <el-table :data="attributes">
        <el-table-column property="attribute" label="商品参数名称">
        </el-table-column>
        <el-table-column property="value" label="商品参数值">
        </el-table-column>
        <el-table-column align="center" label="操作" width="100" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <div class="flex">
              <div class="movewarp" @click="attributeUp(scope.$index)">
                <i class="el-icon-upload2"></i>
              </div>
              <div class="movewarp" @click="attributeDown(scope.$index)">
                <i class="el-icon-download"></i>
              </div>
              <el-button type="danger" size="mini" @click="handleAttributeDelete(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="设置商品参数" :visible.sync="attributeVisiable">
        <el-form ref="attributeForm" :model="attributeForm" status-icon label-position="left" label-width="100px" style='width: 400px; margin-left:50px;'>
          <el-form-item label="商品参数名称" prop="attribute">
            <el-input v-model="attributeForm.attribute" placeholder="输入参数名，如：尺寸"></el-input>
          </el-form-item>
          <el-form-item label="商品参数值" prop="value">
            <el-input v-model="attributeForm.value" placeholder="输入参数值，如：180*200cm"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="attributeVisiable = false">取消</el-button>
          <el-button type="primary" @click="handleAttributeAdd">确定</el-button>
        </div>
      </el-dialog>
    </el-card>

    <div class="op-container">
      <el-button @click="handleCancel">取消</el-button>
      <el-button @click="handlePublish" type="primary">保存商品信息</el-button>
    </div>

  </div>
</template>

<style lang='scss'>
  .el-card {
    margin-bottom: 10px;
  }

  .el-tag+.el-tag {
    margin-left: 10px;
  }

  .cell .el-tag {
    margin-right: 10px;
  }

  .input-new-keyword {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
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

  .iconwarp {
    width: 37.2px;
    border-radius: 4px;
    background: #eee;
    text-align: center;
    margin-left: 5px;
  }

  .iconwarp :hover {
    cursor: pointer;
  }

  .el-tag+.el-tag,
  .el-tag--medium {
    margin-left: 0;
    margin-right: 10px;
  }

  .tenancybox {
    margin: 22px 0;
    line-height: 36px;
  }

  .tenancybox .tenancylabel {
    font-size: 14px;
    font-weight: 700;
    color: #606266;
    margin: 0 20px;
    width: 100px;
    flex: none;
    text-align: right;
  }

  .tenancybox .el-radio {
    line-height: 36px;
  }

  .rentlabel {
    width: 70px;
    line-height: 36px;
  }

  .tenancybox .el-switch {
    height: 36px;
    line-height: 36px;
    margin-right: 20px;
  }

  .movewarp {
    width: 30px;
    line-height: 28px;
    margin-right: 10px;
    text-align: center;
    border-radius: 50%;
    border: 1px solid #eee;

    i {
      font-size: 16px;
    }

    &:hover {
      cursor: pointer;
      background-color: #409eff;

      i {
        color: #fff;
      }
    }
  }

</style>

<script>
  import {
    publishGoods,
    listCatAndBrand,
    getfinanceProduct,
    getfinanceAttach
  } from '@/api/goods'
  import {
    createStorage,
    uploadPath
  } from '@/api/storage'
  import Editor from '@tinymce/tinymce-vue'
  import {
    MessageBox
  } from 'element-ui'

  export default {
    name: 'GoodsCreate',
    components: {
      Editor
    },
    data() {
      return {
        specificationValue: '',
        uploadPath,
        newKeywordVisible: false,
        newKeyword: '',
        keywords: [],
        categoryList: [],
        brandList: [],
        goods: {
          picUrl: '',
          gallery: []
        },
        specVisiable: false,
        specForm: {
          specification: '',
          value: [],
          picUrl: ''
        },
        multipleSpec: false,
        specifications: [{
          specification: '规格',
          value: '标准',
          picUrl: ''
        }],
        productVisiable: false,
        productForm: {
          id: 0,
          specifications: [],
          price: 0.00,
          number: 0,
          url: ''
        },
        products: [{
          id: 0,
          specifications: ['标准'],
          price: 0.00,
          number: 0,
          url: '',
          productFinances: []
        }],
        financeSpecifications: [],
        attributeVisiable: false,
        attributeVisiableLease: false,
        attributeForm: {
          attribute: '',
          value: ''
        },
        attributeFormLease: {
          type: '',
          num: '',
          value: ''
        },
        attributes: [],
        attributesLease: [],
        copyspecifications: [],
        rules: {
          goodsSn: [{
            required: true,
            message: '商品编号不能为空',
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: '商品名称不能为空',
            trigger: 'blur'
          }]
        },
        editorInit: {
          language: 'zh_CN',
          plugins: [
            'advlist anchor autolink autoresize autosave emoticons fullscreen hr image imagetools importcss insertdatetime legacyoutput link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace tabfocus table template textcolor textpattern visualblocks visualchars wordcount'
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
        leaseTerm: [],
        leaseTermLease: [],
        stagingType: 1,
        stagingTypeLease: 1,
        productLeaseVisi: false,
        options: [{
          periods: 1,
          label: '1期'
        },
        {
          periods: 3,
          label: '3期'
        },
        {
          periods: 6,
          label: '6期'
        },
        {
          periods: 12,
          label: '12期'
        }
        ],
        checkedLease: [],
        isInsure: false,
        financeData: [],
        financeAttachData: [],
        mallGoodsFinances: [],
        installment: null,
        installmentLease: null,
        once: null,
        onceLease: null
      }
    },
    created() {
      this.init()
    },
    mounted() {
      this.multipleSpec = true
      this.specChanged(true)
    },
    methods: {
      init() {
        listCatAndBrand().then(response => {
          this.categoryList = response.data.data.categoryList
          this.brandList = response.data.data.brandList
        }).catch()
        getfinanceAttach().then(response => {
          this.financeAttachData = response.data.data
        })
        getfinanceProduct().then(response => {
          this.financeData = response.data.data
          this.changetenancyType(this.stagingType)
          this.changetenancyTypeLease(this.stagingTypeLease)
        })
      },
      handleCategoryChange(value) {
        this.goods.categoryId = value[value.length - 1]
      },
      handleCancel: function() {
        this.$router.push({
          path: '/goods/goods'
        })
      },
      handlePublish: function() {
        this.editAttach()
        this.goods.isOnSale = false
        this.mallGoodsFinances = this.isInsure ? this.mallGoodsFinances : []
        const finalGoods = {
          goods: this.goods,
          specifications: this.specifications,
          products: this.products,
          attributes: this.attributes,
          mallGoodsFinances: this.mallGoodsFinances,
          financeSpecifications: this.financeSpecifications
        }
        publishGoods(finalGoods).then(response => {
          if (response.data.errno === 0) {
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            this.$router.push({
              path: '/goods/list'
            })
          }
        }).catch(response => {
          MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
            confirmButtonText: '确定',
            type: 'error'
          })
        })
      },
      handleClose(tag) {
        this.keywords.splice(this.keywords.indexOf(tag), 1)
        this.goods.keywords = this.keywords.toString()
      },
      showInput() {
        this.newKeywordVisible = true
        this.$nextTick(_ => {
          this.$refs.newKeywordInput.$refs.input.focus()
        })
      },
      handleInputConfirm() {
        const newKeyword = this.newKeyword
        if (newKeyword) {
          this.keywords.push(newKeyword)
          this.goods.keywords = this.keywords.toString()
        }
        this.newKeywordVisible = false
        this.newKeyword = ''
      },
      uploadPicUrl: function(response) {
        this.goods.picUrl = response.data.url
      },
      uploadOverrun: function() {
        this.$message({
          type: 'error',
          message: '上传文件个数超出限制!最多上传5张图片!'
        })
      },
      handleGalleryUrl(response, file, fileList) {
        if (response.errno === 0) {
          this.goods.gallery.push(response.data.url)
        }
      },
      handleRemove: function(file, fileList) {
        for (var i = 0; i < this.goods.gallery.length; i++) {
          // 这里存在两种情况
          // 1. 如果所删除图片是刚刚上传的图片，那么图片地址是file.response.data.url
          //    此时的file.url虽然存在，但是是本机地址，而不是远程地址。
          // 2. 如果所删除图片是后台返回的已有图片，那么图片地址是file.url
          var url
          if (file.response === undefined) {
            url = file.url
          } else {
            url = file.response.data.url
          }

          if (this.goods.gallery[i] === url) {
            this.goods.gallery.splice(i, 1)
          }
        }
      },
      specChanged: function(label) {
        if (label === false) {
          this.specifications = [{
            specification: '规格',
            value: '标准',
            picUrl: ''
          }]
          this.products = [{
            id: 0,
            specifications: ['标准'],
            price: 0.00,
            number: 0,
            url: ''
          }]
        } else {
          this.specifications = []
          this.products = []
        }
      },
      uploadSpecPicUrl: function(response) {
        this.specForm.picUrl = response.data.url
      },
      handleSpecificationShow() {
        this.specificationValue = ''
        this.specForm = {
          specification: '',
          value: [],
          picUrl: ''
        }
        this.specVisiable = true
      },
      handleCloseTag(index) {
        this.specForm.value.splice(index, 1)
      },
      addTag() {
        if (!this.specificationValue) {
          this.$message.error('请输入规格值')
        } else {
          this.specForm.value.push(this.specificationValue)
          this.specificationValue = ''
        }
      },
      handleSpecificationAdd() {
        if (this.specForm.value.length) {
          this.specForm.value.forEach(item => {
            var obj = {
              specification: this.specForm.specification,
              value: item
            }
            if (this.specForm.picUrl) {
              obj.picUrl = this.specForm.picUrl
            }

            var index = this.specifications.length - 1
            for (var i = 0; i < this.specifications.length; i++) {
              const v = this.specifications[i]
              if (v.specification === this.specForm.specification) {
                index = i
              }
            }
            this.specifications.splice(index + 1, 0, obj)
          })
        }

        this.copyspecifications = JSON.parse(JSON.stringify(this.specifications))
        var tempMap = {}
        for (var i = 0; i < this.copyspecifications.length; i++) {
          var obj = this.copyspecifications[i]
          var key = obj['specification']
          if (tempMap[key] !== 0 && !tempMap[key]) {
            tempMap[key] = obj['value']
          } else {
            tempMap[key] = tempMap[key] + ',' + obj['value']
          }
        }
        var arrM = []
        for (key in tempMap) {
          arrM.push({
            specification: key,
            value: tempMap[key + ''].split(',')
          })
        }
        this.copyspecifications = arrM
        // this.copyspecifications = this.copyspecifications.filter(item => {
        //   return (item.specification !== '租期' && item.specification !== '分期类型')
        // })
        this.specVisiable = false
        this.specToProduct()
      },
      handleSpecificationDelete(row) {
        const index = this.copyspecifications.indexOf(row)
        var keys = row.specification
        this.copyspecifications.splice(index, 1)
        this.specifications = this.specifications.filter(item => {
          return item.specification !== keys
        })
        // var arr = this.specifications.filter(item => {
        //   return (item.specification !== '租期' && item.specification !== '分期类型')
        // })
        // if (arr.length) {
        this.specToProduct()
        // } else {
        //   this.products = []
        // }
      },
      specToProduct() {
        if (this.specifications.length === 0) {
          return
        }
        // 根据specifications创建临时规格列表
        var specValues = []
        var spec = this.specifications[0].specification
        var values = []
        values.push(0)

        for (var i = 1; i < this.specifications.length; i++) {
          const aspec = this.specifications[i].specification

          if (aspec === spec) {
            values.push(i)
          } else {
            specValues.push(values)
            spec = aspec
            values = []
            values.push(i)
          }
        }
        specValues.push(values)

        // 根据临时规格列表生产货品规格
        // 算法基于 https://blog.csdn.net/tyhj_sf/article/details/53893125
        var productsIndex = 0
        var products = []
        var combination = []
        var n = specValues.length
        for (var s = 0; s < n; s++) {
          combination[s] = 0
        }
        var index = 0
        var isContinue = false
        do {
          var specifications = []
          for (var x = 0; x < n; x++) {
            var z = specValues[x][combination[x]]
            specifications.push(this.specifications[z].value)
          }
          products[productsIndex] = {
            id: productsIndex,
            specifications: specifications,
            price: 0.00,
            number: 0,
            url: ''
          }
          productsIndex++

          index++
          combination[n - 1] = index
          for (var j = n - 1; j >= 0; j--) {
            if (combination[j] >= specValues[j].length) {
              combination[j] = 0
              index = 0
              if (j - 1 >= 0) {
                combination[j - 1] = combination[j - 1] + 1
              }
            }
          }
          isContinue = false
          for (var p = 0; p < n; p++) {
            if (combination[p] !== 0) {
              isContinue = true
            }
          }
        } while (isContinue)

        this.products = products
        this.changetenancy(this.leaseTerm)
        this.changetenancyLease(this.leaseTermLease)
      },
      handleProductShow(row) {
        this.productForm = Object.assign({}, row)
        this.productVisiable = true
      },
      uploadProductUrl: function(response) {
        this.productForm.url = response.data.url
      },
      handleProductEdit() {
        for (var i = 0; i < this.products.length; i++) {
          const v = this.products[i]
          if (v.id === this.productForm.id) {
            this.products.splice(i, 1, this.productForm)
            break
          }
        }
        this.productVisiable = false
      },
      handleAttributeShow() {
        this.attributeForm = {}
        this.attributeVisiable = true
      },
      handleAttributeShowLease() {
        this.attributeFormLease = {}
        this.attributeVisiableLease = true
      },
      handleAttributeAdd() {
        this.attributes.push(this.attributeForm)
        this.attributeVisiable = false
      },
      handleAttributeAddLease() {
        for (var i = 0; i < this.options.length; i++) {
          if (this.options[i].periods === this.attributeFormLease.num) {
            this.attributeFormLease.type = this.options[i].periods
            break
          }
        }
        this.attributesLease.push(this.attributeFormLease)
        this.attributeVisiableLease = false
      },
      handleAttributeDelete(row) {
        const index = this.attributes.indexOf(row)
        this.attributes.splice(index, 1)
      },
      handleAttributeDeleteLease(row) {
        const index = this.attributesLease.indexOf(row)
        this.attributesLease.splice(index, 1)
      },
      attributeUp(index) {
        if (index === 0) {
          return
        }
        var temp = this.attributes[index - 1]
        // [this.attributes[index], this.attributes[index - 1]] = [this.attributes[index - 1], this.attributes[index]]
        this.$set(this.attributes, index - 1, this.attributes[index])
        this.$set(this.attributes, index, temp)
      },
      attributeDown(index) {
        if (index === this.attributes.length - 1) {
          return
        }
        var temp = this.attributes[index + 1]
        // [this.attributes[index], this.attributes[index + 1]] = [this.attributes[index + 1], this.attributes[index]]
        this.$set(this.attributes, index + 1, this.attributes[index])
        this.$set(this.attributes, index, temp)
      },
      changetenancy(val) {
        this.financeSpecifications = []
        var arr = []
        var arr2 = []
        var that = this
        var txt = this.stagingType === 1 ? '个月' : '天'
        val.forEach(item1 => {
          arr2 = that.options.filter(item2 => {
            return item1 === item2.periods
          })
          arr = [...arr, ...arr2]
        })
        arr = this.sortKey(arr, 'periods')
        this.checkedLease = arr
        this.checkedLease.forEach(item => {
          item.price = ''
          item.periodType = this.stagingType
          this.financeData.forEach(item2 => {
            if (item.periods === item2.periods) {
              item.financeProductId = item2.id
            }
          })

          this.financeSpecifications.push({
            specification: '租期',
            value: `${item.periods}${txt}`
          })
        })
        this.products.forEach(item => {
          item.productFinances = this.checkedLease
        })
        // var arr = val
        // this.specifications = this.specifications.filter(item => {
        //   return item.specification !== '租期'
        // })
        // arr.forEach(item => {
        //   var obj = {}
        //   obj.specification = '租期'
        //   obj.value = item
        //   this.specifications.push(obj)
        // })

        // var checkArr = this.specifications.filter(item => {
        //   return (item.specification !== '租期' && item.specification !== '分期类型')
        // })
        // if (checkArr.length) {
        //   this.specToProduct()
        // }
      },
      changetenancyLease(val) {
        this.financeSpecifications = []
        var arr = []
        var arr2 = []
        var that = this
        var txt = this.stagingType === 1 ? '个月' : '天'
        val.forEach(item1 => {
          arr2 = that.options.filter(item2 => {
            return item1 === item2.periods
          })
          arr = [...arr, ...arr2]
        })
        arr = this.sortKey(arr, 'periods')
        this.checkedLease = arr
        this.checkedLease.forEach(item => {
          item.price = ''
          item.periodType = this.stagingType
          this.financeData.forEach(item2 => {
            if (item.periods === item2.periods) {
              item.financeProductId = item2.id
            }
          })

          this.financeSpecifications.push({
            specification: '租期',
            value: `${item.periods}${txt}`
          })
        })
        this.attributeFormLease.num = val[0]
        this.products.forEach(item => {
          item.productFinances = this.checkedLease
        })
      },
      changetenancyType(val) {
        this.options = this.financeData.filter(item => {
          return item.periodType === val
        })
      },
      changetenancyTypeLease(val) {
        this.options = this.financeData.filter(item => {
          return item.periodType === val
        })
      },
      handlelease(row) {
        this.productForm = JSON.parse(JSON.stringify(row))
        this.productLeaseVisi = true
      },
      handleLeaseEdit() {
        for (var i = 0; i < this.products.length; i++) {
          const v = this.products[i]
          if (v.id === this.productForm.id) {
            this.products.splice(i, 1, this.productForm)
            break
          }
        }
        this.productLeaseVisi = false
      },
      cancel() {
        this.productLeaseVisi = false
        // this.checkedLease.forEach(item => {
        //   item.rent = ''
        // })
      },
      sortKey(array, key) {
        return array.sort(function(a, b) {
          var x = a[key]
          var y = b[key]
          return ((x < y) ? -1 : (x > y) ? 1 : 0)
        })
      },
      editAttach() {
        if (this.once) {
          var obj = {}
          this.financeAttachData.forEach(item => {
            if (item.feeType === 1) {
              obj.feeType = 1
              obj.amount = parseFloat(this.once)
              obj.feeName = item.name
              obj.financeProductAttachId = item.id
            }
          })
          this.mallGoodsFinances.push(obj)
        }
        if (this.installment) {
          var obj2 = {}
          this.financeAttachData.forEach(item => {
            if (item.feeType === 2) {
              obj2.feeType = 2
              obj2.amount = parseFloat(this.installment)
              obj2.feeName = item.name
              obj2.financeProductAttachId = item.id
            }
          })
          this.mallGoodsFinances.push(obj2)
        }
      }
    },
    watch: {
      isInsure(newdata, olddata) {
        if (!newdata) {
          this.installment = null
          this.once = null
        }
      }
    }
  }

</script>
