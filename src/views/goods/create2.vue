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
        <!-- <el-form-item label="是否在售" prop="isOnSale">
          <el-radio-group v-model="goods.isOnSale">
            <el-radio :label="true">在售</el-radio>
            <el-radio :label="false">未售</el-radio>
          </el-radio-group>
        </el-form-item> -->

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
          <el-input class="input-new-keyword" v-if="newKeywordVisible" v-model="newKeyword" ref="newKeywordInput"
                    size="small"
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
            <img :src="scope.row.picUrl" width="40" v-if="scope.row.picUrl"/>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="250" class-name="small-padding fixed-width"
                         v-if="multipleSpec">
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

            <el-tag :key="index" v-for="(item, index) in specForm.value" closable :disable-transitions="false"
                    @close="handleCloseTag(index)">
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
        <!--        <el-radio-group v-model="stagingType" @change="changetenancyType">-->
        <!--          <el-radio :label="1">按月</el-radio>-->
        <!--          <el-radio :label="2" >按天</el-radio>-->
        <!--          <el-radio :label="3" >按周</el-radio>-->
        <!--          <el-radio :label="4" >按季</el-radio>-->
        <!--          <el-radio :label="5" >按年</el-radio>-->
        <!--        </el-radio-group>-->
        <el-checkbox-group v-model="stagingType" @change="changetenancyType">
          <el-checkbox v-for="(item,index) in optionsType" :key="'travel' + index" :label="item.periodType" name="type">
            <div>{{item.productName}}</div>
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="flex tenancybox">
        <span class="tenancylabel">租期</span>
        <el-checkbox-group v-model="nperarr" @change="changetenancy">
          <el-checkbox v-for="item in leaseTerm" :key="item.periods" :label="item" name="type">
            <div>{{item.productName}}{{item.periods}}期</div>
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <!-- <div class="flex tenancybox">
        <span class="tenancylabel">违约金系数</span>
        <el-input  disabled   value="5%"></el-input>
      </div>
      <div class="flex tenancybox">
        <span class="tenancylabel">违约缓冲天数</span>
        <el-input  disabled  value="1"></el-input>
      </div> -->
      <div class="flex tenancybox">
        <span class="tenancylabel">最低租赁天数</span>
        <el-input v-model="MinimumDays" placeholder="输入最低租赁天数，如：1" style="width: 25%">
          <template slot="append">天</template>
        </el-input>
      </div>
      <div class="flex tenancybox">
        <span class="tenancylabel">买断系数</span>
        <el-input v-model="BuyoutCoefficient" placeholder="输入买断系数，如：1" style="width: 25%">
          <!--          <template slot="append">元</template>-->
        </el-input>
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
            <img :src="scope.row.url" width="40" v-if="scope.row.url"/>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handlelease(scope.row)" style="width:auto">设置租期金额</el-button>
            <el-button type="primary" size="mini" @click="handleProductShow(scope.row)" style="width:auto">设置库存
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="设置货品" :visible.sync="productVisiable">
        <el-form ref="productForm" :model="productForm" status-icon label-position="left" label-width="100px"
                 style='width: 400px; margin-left:50px;'>
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
        <!--        <div v-if="nperval.length > 0">-->
        <div v-if="productForm.productFinances">
          <!--          <div v-for="item in nperval" :key="item.periods" class="flex mar-b">-->
          <div v-for="item in productForm.productFinances" :key="item.periods" class="flex mar-b">
            <span class="rentlabel">{{item.productName}}{{item.periods}}期:</span>
            <el-input v-model="item.price" placeholder="输入租金">
              <template slot="append">元</template>
            </el-input>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span class="rentlabel">活动价格:</span>
            <el-input v-model="item.activityPrice" placeholder="输入活动价格">
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
        <el-form ref="attributeForm" :model="attributeForm" status-icon label-position="left" label-width="100px"
                 style='width: 400px; margin-left:50px;'>
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

    <el-card class="box-card">
      <h3>商品活动</h3>
      <el-form :rules="rules" ref="goods" :model="goods" label-width="150px">
        <el-form-item label="是否热门推荐" prop="hotGoods">
          <el-radio-group v-model="goods.hotGoods">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <!--        <el-form-item label="活动价格" prop="activityPrice">-->
        <!--          <el-input v-model="goods.activityPrice" placeholder="输入商品活动价格，如：0.00">-->
        <!--            <template slot="append">元</template>-->
        <!--          </el-input>-->
        <!--        </el-form-item>-->
        <el-form-item label="活动赠品" prop="activityGift">
          <el-input v-model="goods.activityGift" placeholder="输入商品活动赠品(字数不可超过7个字符)，如：赠送一张钢化膜"></el-input>
        </el-form-item>
      </el-form>
    </el-card>


    <div class="op-container">
      <el-button @click="handleCancel">取消</el-button>
      <el-button @click="handlePublish" type="primary">保存商品信息</el-button>
    </div>

  </div>
</template>


<script>
  import {
    publishGoods,
    listCatAndBrand,
    getfinanceProduct,
    getfinanceAttach,
    publishGoodsV1_4_0,
    publishGoodsV2_1_1
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
        nperarr: [],
        nperval: [],
        radisTyep: {},
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
        attributeForm: {
          attribute: '',
          value: ''
        },
        attributes: [],
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
        stagingType: [],
        // stagingType: [],
        productLeaseVisi: false,
        options: [],
        optionsType: [],
        checkedLease: [],
        isInsure: false,
        financeData: [],
        financeAttachData: [],
        mallGoodsFinances: [],
        installment: null,
        once: null,
        MinimumDays: null,
        BuyoutCoefficient: null
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
        getfinanceProduct().then(res => {
          this.financeData = res.data.data
          this.optionsType = res.data.data
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
        this.goods.minimumDays = this.MinimumDays
        this.goods.buyoutCoefficient = this.BuyoutCoefficient
        if (!this.goods.goodsSn || this.goods.goodsSn.length < 0) {
          MessageBox.alert('商品编号未配置', '未配置', {
            confirmButtonText: '确定',
            type: 'error'
          })
          return
        }
        if (!this.goods.name || this.goods.name.length < 0) {
          MessageBox.alert('商品名称未配置', '未配置', {
            confirmButtonText: '确定',
            type: 'error'
          })
          return
        }
        if (!this.goods.counterPrice || this.goods.counterPrice.length < 0) {
          MessageBox.alert('租赁价格未配置', '未配置', {
            confirmButtonText: '确定',
            type: 'error'
          })
          return
        }
        if (!this.goods.retailPrice || this.goods.retailPrice.length < 0) {
          MessageBox.alert('商品价格未配置', '未配置', {
            confirmButtonText: '确定',
            type: 'error'
          })
          return
        }
        if (!this.goods.categoryId || this.goods.categoryId.length < 0 || this.goods.categoryId === 'undefined') {
          MessageBox.alert('商品类目未配置', '未配置', {
            confirmButtonText: '确定',
            type: 'error'
          })
          return
        }
        if (!this.goods.brief || this.goods.brief.length < 0) {
          MessageBox.alert('商品简介未配置', '未配置', {
            confirmButtonText: '确定',
            type: 'error'
          })
          return
        }
        if (!this.goods.description || this.goods.description.length < 0) {
          MessageBox.alert('商品详细介绍未配置', '未配置', {
            confirmButtonText: '确定',
            type: 'error'
          })
          return
        }
        console.log(this.specifications, '商品规格')
        if (!this.specifications || this.specifications.length <= 0) {
          MessageBox.alert('商品规格未配置', '未配置', {
            confirmButtonText: '确定',
            type: 'error'
          })
          return
        }
        console.log(this.products, '租赁信息')
        if (!this.products || this.products.length <= 0) {
          MessageBox.alert('租赁信息未配置', '未配置', {
            confirmButtonText: '确定',
            type: 'error'
          })
          return
        }
        var priceInfo = null
        var productFinancesInfo = null
        var amountInfo = null
        if (this.products || this.products.length > 0) {
          for (let i = 0; i < this.products.length; i++) {
            if (!this.products[i].price || this.products[i].price.length <= 0) {
              priceInfo = false
            }
            if (!this.products[i].productFinances || this.products[i].productFinances.length <= 0 || this.products[i].productFinances === 'undefined') {
              productFinancesInfo = false
            } else {
              for (let j = 0; j < this.products[i].productFinanceDTOS.length; j++) {
                if (!this.products[i].productFinanceDTOS[j].price || isNaN(this.products[i].productFinanceDTOS[j].price) || this.products[i].productFinanceDTOS[j].price === '0') {
                  amountInfo = false
                }
              }
            }
          }
          if (priceInfo === false) {
            MessageBox.alert('货品售价未配置', '未配置', {
              confirmButtonText: '确定',
              type: 'error'
            })
            return
          }
          if (productFinancesInfo === false) {
            MessageBox.alert('货品规格未配置', '未配置', {
              confirmButtonText: '确定',
              type: 'error'
            })
            return
          }
          if (amountInfo === false) {
            MessageBox.alert('分期价格未配置', '未配置', {
              confirmButtonText: '确定',
              type: 'error'
            })
            return
          }
        }

        // 判断商品为热卖的话，活动价格和赠品不可为空
        if (this.goods.hotGoods === true) {
          if (!this.goods.activityGift || this.goods.activityGift.length < 0) {
            MessageBox.alert('商品活动赠品未配置', '未配置', {
              confirmButtonText: '确定',
              type: 'error'
            })
            return
          }
          if (this.goods.activityGift != null && this.goods.activityGift.length > 7) {
            MessageBox.alert('商品活动赠品配置输入内容最多不可超过7个字符', '未配置', {
              confirmButtonText: '确定',
              type: 'error'
            })
            return
          }
          var infos = this.products
          var flag = null
          var number = 0
          if (infos != null && infos.length > 0) {
            for (var i = 0; i < infos.length; i++) {
              if (infos[i].productFinances != null && infos[i].productFinances.length > 0) {
                var priceInfo = infos[i].productFinances
                for (var j = 0; j < priceInfo.length; j++) {
                  if (!priceInfo[j].activityPrice || isNaN(priceInfo[j].activityPrice) || priceInfo[j].activityPrice === '0') {
                    flag = false
                  } else {
                    number = number + 1
                  }
                }
              } else {
                flag = false
              }
            }
          } else {
            flag = false
          }
          console.log(number, '数量')
          if (number < 1) {
            MessageBox.alert('热门推荐商品活动价至少需要配置一项', '未配置', {
              confirmButtonText: '确定',
              type: 'error'
            })
            return
          }
          // if (flag === false) {
          //   MessageBox.alert('热门推荐商品活动价不能为空', '未配置', {
          //     confirmButtonText: '确定',
          //     type: 'error'
          //   })
          //   return
          // }
        }
        // 判断商品支持买断的话，买断系数不可为空
        if (this.goods.isBuyout === true) {
          if (this.goods.buyoutCoefficient == null || this.goods.buyoutCoefficient === '' || this.goods.buyoutCoefficient === '0' || isNaN(this.goods.buyoutCoefficient)) {
            MessageBox.alert('买断系数不可以为空或者为0，请重新填写', '未配置', {
              confirmButtonText: '确定',
              type: 'error'
            })
            return
          }
          if (isNaN(this.goods.buyoutCoefficient)) {
            MessageBox.alert('买断系数输入内容不能输入特殊字符，请重新填写', '未配置', {
              confirmButtonText: '确定',
              type: 'error'
            })
            return
          }
        }
        const finalGoods = {
          goods: this.goods,
          specifications: this.specifications,
          products: this.products,
          attributes: this.attributes,
          mallGoodsFinances: this.mallGoodsFinances,
          financeSpecifications: this.financeSpecifications
        }
        publishGoodsV2_1_1(finalGoods).then(response => {
          // 保存商品信息1.4.0接口
          // publishGoodsV1_4_0(finalGoods).then(response => {
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
        // 多规格的规格数组为1的时候，点击删除清空products
        if (this.copyspecifications.length === 1) {
          this.products = []
        }
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
        this.nperarr = this.leaseTerm
        this.changetenancy(this.leaseTerm)
        // this.changetenancy(this.nperarr)
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
      handleAttributeAdd() {
        this.attributes.push(this.attributeForm)
        this.attributeVisiable = false
      },
      handleAttributeDelete(row) {
        const index = this.attributes.indexOf(row)
        this.attributes.splice(index, 1)
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
        // this.products = [{
        //   id: 0,
        //   specifications: ['标准'],
        //   price: 0.00,
        //   number: 0,
        //   url: '',
        //   productFinances: []
        // }]
        this.nperval = val
        this.financeSpecifications = []
        this.nperval.forEach((item1, index) => {
          this.financeSpecifications.push({
            installmentRules: '分期规范',
            installmentType: item1.periodType,
            specification: '租期',
            value: item1.periods
          })
        })
        var arr = []
        arr = this.sortKey(arr, 'periods')
        this.nperval.forEach((item, index) => {
          item.price = ''
          this.financeData.forEach(item2 => {
            if (item.periods === item2.periods) {
              item.financeProductId = item2.id
            }
          })
          this.products.forEach(item => {
            item.productFinances = this.nperval
          })
        })
      },
      changetenancyType(val) {
        this.nperarr = []
        this.leaseTerm = []
        this.nperval = []
        for (let i = 0; i < val.length; i++) {
          let a = val[i] - 1
          this.leaseTerm.push(this.optionsType[a])
          this.nperarr = this.leaseTerm
          this.nperval = this.leaseTerm
        }
        // this.products = products
        this.changetenancy(this.leaseTerm)
      }
      ,
      handlelease(row) {
        this.productForm = JSON.parse(JSON.stringify(row))
        this.productLeaseVisi = true
      }
      ,
      handleLeaseEdit() {
        for (var i = 0; i < this.products.length; i++) {
          const v = this.products[i]
          if (v.id === this.productForm.id) {
            this.products.splice(i, 1, this.productForm)
            break
          }
        }
        this.productLeaseVisi = false
      }
      ,
      cancel() {
        this.productLeaseVisi = false
        // this.checkedLease.forEach(item => {
        //   item.rent = ''
        // })
      }
      ,
      sortKey(array, key) {
        return array.sort(function(a, b) {
          var x = a[key]
          var y = b[key]
          return ((x < y) ? -1 : (x > y) ? 1 : 0)
        })
      }
      ,
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
<style lang='scss'>
  .el-card {
    margin-bottom: 10px;
  }

  .el-tag + .el-tag {
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

  .el-tag + .el-tag,
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
    width: 200px;
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
