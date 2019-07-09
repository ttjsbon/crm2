<template>
  <div class="app-container calendar-list-container">
    <h3 align="center">凡有个人信息报告</h3>
    <el-card class="box-card">
      <el-form :data="info" label-width="150px">
        <div class="flex itemtogether">
          <el-form-item label="反欺诈评分：">
              <span>{{info[0].anti_fraud ? info[0].anti_fraud : '无'}}</span>
          </el-form-item>
        </div>
        <div class="flex itemtogether">
          <el-form-item label="凡有信用分：">
              <span>{{info[0].model_score ? info[0].model_score : '无'}}</span>
          </el-form-item>
        </div>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <h3>1.个人基本信息</h3>
      <el-form :data="info" label-width="150px">
        <div class="flex itemtogether">
          <el-form-item label="申请人姓名：">
              <span>{{info[0].card_name ? info[0].card_name : '无'}}</span>
          </el-form-item>
          <el-form-item label="申请人身份证号：">
              <span>{{info[0].id_card_no ? info[0].id_card_no : '无'}}</span>
          </el-form-item>
        </div>
        <div class="flex itemtogether">
          <el-form-item label="申请人手机号：">
            <span>{{info[0].regist ? info[0].regist : '无'}}</span>
          </el-form-item>
          <el-form-item label="手机归属地：">
              <span>{{info[0].mobile_address ? info[0].mobile_address : '是'}}</span>
          </el-form-item>
        </div>
        <div class="flex itemtogether">
          <el-form-item label="年龄：">
              <span>{{info[0].age ? info[0].age : '无'}}</span>
          </el-form-item>
          <el-form-item label="手机号在网时长：">
              <span>{{info[0].length ? info[0].length : '无'}}</span>
          </el-form-item>
        </div>
        <div class="flex itemtogether">
          <el-form-item label="户籍地：">
              <span>{{info[0].home_address ? info[0].home_address : info[0].home_city ? info[0].home_city : '无'}}</span>
          </el-form-item>
        </div>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <h3>2.收货人和联系人信息</h3>
      <el-form :data="info" label-width="150px">
        <div class="flex itemtogether">
          <el-form-item label="收货人姓名：">
              <span>{{info[0].consignee ? info[0].consignee : '无'}}</span>
          </el-form-item>
          <el-form-item label="联系人姓名：">
              <span>{{info[0].emergency_name ? info[0].emergency_name : '无'}}</span>
          </el-form-item>
        </div>
        <div class="flex itemtogether">
          <el-form-item label="收货人电话：">
            <span>{{info[0].shouhuoMobile ? info[0].shouhuoMobile : '无'}}</span>
          </el-form-item>
          <el-form-item label="联系人电话：">
            <span>{{info[0].emergency_phone ? info[0].emergency_phone : '无'}}</span>
          </el-form-item>
        </div>
        <div class="flex itemtogether">
          <el-form-item label="收货人地址：">
            <span>{{info[0].address ? info[0].address : '无'}}</span>
          </el-form-item>
          <el-form-item label="关系：">
            <span>{{info[0].emergency_relation ? info[0].emergency_relation : '无'}}</span>
          </el-form-item>
        </div>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <h3>3.信息验证</h3>
      <h4>基础信息校验</h4>
      <el-form :data="info" label-width="340px">
        <div class="flex itemtogether">
          <el-form-item label="手机归属地和收货地址城市是否一致">
              <span>{{info[0].phoneAddressComparison ? info[0].phoneAddressComparison : '无'}}</span>
          </el-form-item>
        </div>
        <div class="flex itemtogether">
          <el-form-item label="收货人的手机号和下单人手机号是否一致">
              <span>{{info[0].phoneComparison ? info[0].phoneComparison : '无'}}</span>
          </el-form-item>
        </div>
        <div class="flex itemtogether">
          <el-form-item label="手机归属地，收货地址和户籍所在地是否一致">
              <span>{{info[0].addressComparison ? info[0].addressComparison : '是'}}</span>
          </el-form-item>
        </div>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <h3>本地库校验：客服根据以下反馈的结果与客户交互</h3>
      <el-form :data="info" label-width="340px">
        <div class="flex itemtogether">
          <el-form-item label="下单人手机号是否存在已下单客户中或收货人信息中">
              <span>{{info[0].submitOrder ? info[0].submitOrder : '无'}}</span>
          </el-form-item>
        </div>
        <div class="flex itemtogether">
          <el-form-item label="下单人身份证号是否存在已下单客户中">
            <span>{{info[0].idCardOrder ? info[0].idCardOrder : '无'}}</span>
          </el-form-item>
        </div>
        <div class="flex itemtogether">
          <el-form-item label="收货人的手机号是否存在已下单客户或收货人信息中">
            <span>{{info[0].shouhuoMobileOrder ? info[0].shouhuoMobileOrder : '无'}}</span>
          </el-form-item>
        </div>
        <div class="flex itemtogether">
          <el-form-item label="收货地址是否存在与凡有的本地库一致的">
            <span>{{info[0].shouhuoAddress ? info[0].shouhuoAddress : '无'}}</span>
          </el-form-item>
        </div>
        <div class="flex itemtogether">
          <el-form-item label="下单人手机号是否在凡有其他渠道下有逾期">
              <span>{{'暂无渠道信息'}}</span>
          </el-form-item>
        </div>
        <div class="flex itemtogether">
          <el-form-item label="下单人身份证号是否在凡有其他渠道下有逾期">
              <span>{{'暂无渠道信息'}}</span>
          </el-form-item>
        </div>
        <div class="flex itemtogether">
          <el-form-item label="收货人的手机号是否在凡有其他渠道下有逾期">
              <span>{{'暂无渠道信息'}}</span>
          </el-form-item>
        </div>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <h3>4.多平台申请情况</h3>
      <h4>1>近七天申请情况</h4>
      <div class="zlInfo">
        <div class="zlDetail">
          <div class="zltitle">{{'手机号申请详情'}}</div>
          <div v-for="(tdinfo,ind) in td_info['7天内租赁人在多个平台申请借款']['租赁人手机']" :key='ind'> 
            <el-text>{{tdinfo}}</el-text>
          </div>
        </div>
      <div class="zlDetail">
        <div class="zltitle">{{'身份证申请详情'}}</div>
        <div v-for="(tdinfo,ind) in td_info['7天内租赁人在多个平台申请借款']['租赁人身份证']" :key='ind'> 
            <el-text>{{tdinfo}}</el-text>
        </div>
      </div>
      <div class="zlDetail">
        <div class="zltitle">{{'多维度申请详情'}}</div>
        <div v-for="(tdinfo,ind) in td_info['7天内租赁人在多个平台申请借款']['多维度']" :key='ind'> 
            <el-text>{{tdinfo}}</el-text>
        </div>
      </div>
    </div>
      <!--el-table :data="td_info['7天内租赁人在多个平台申请借款']">
        <el-table-column property="value" label="手机号申请详情" prop="租赁人手机">
            <template slot-scope="scope">
                {{ scope.row }}
            </template>
        </el-table-column>
        <el-table-column property="value" label="身份证申请详情" prop="租赁人身份证">
            <template slot-scope="scope">
                {{ scope.row }}
            </template>
        </el-table-column>
        <el-table-column property="value" label="多维度申请情况" prop="多维度">
            <template slot-scope="scope">
                {{ scope.row }}
            </template>
        </el-table-column>
      </el-table-->
      <h4>2>近1个月申请情况</h4>
      <div class="zlInfo">
          <div class="zlDetail">
            <div class="zltitle">{{'手机号申请详情'}}</div>
            <div v-for="(tdinfo,ind) in td_info['1个月内租赁人在多个平台申请借款']['租赁人手机']" :key='ind'> 
              <el-text>{{tdinfo}}</el-text>
            </div>
          </div>
        <div class="zlDetail">
          <div class="zltitle">{{'身份证申请详情'}}</div>
          <div v-for="(tdinfo,ind) in td_info['1个月内租赁人在多个平台申请借款']['租赁人身份证']" :key='ind'> 
              <el-text>{{tdinfo}}</el-text>
          </div>
        </div>
        <div class="zlDetail">
          <div class="zltitle">{{'多维度申请详情'}}</div>
          <div v-for="(tdinfo,ind) in td_info['1个月内租赁人在多个平台申请借款']['多维度']" :key='ind'> 
              <el-text>{{tdinfo}}</el-text>
          </div>
        </div>
      </div>
      <!--el-table :data="info">
        <el-table-column property="value" label="手机号申请详情">
        </el-table-column>
        <el-table-column property="value" label="身份证申请详情">
        </el-table-column>
        <el-table-column property="value" label="多维度申请情况">
        </el-table-column>
      </el-table-->
      <h4>3>近3个月多平台申请情况</h4>
      <div class="zlInfo">
          <div class="zlDetail">
            <div class="zltitle">{{'手机号申请详情'}}</div>
            <div v-for="(tdinfo,ind) in td_info['3个月内租赁人在多个平台申请借款']['租赁人手机']" :key='ind'> 
              <el-text>{{tdinfo}}</el-text>
            </div>
          </div>
        <div class="zlDetail">
          <div class="zltitle">{{'身份证申请详情'}}</div>
          <div v-for="(tdinfo,ind) in td_info['3个月内租赁人在多个平台申请借款']['租赁人身份证']" :key='ind'> 
              <el-text>{{tdinfo}}</el-text>
          </div>
        </div>
        <div class="zlDetail">
          <div class="zltitle">{{'多维度申请详情'}}</div>
          <div v-for="(tdinfo,ind) in td_info['3个月内租赁人在多个平台申请借款']['多维度']" :key='ind'> 
              <el-text>{{tdinfo}}</el-text>
          </div>
        </div>
      </div>
      <!--el-table :data="info">
        <el-table-column property="value" label="手机号申请详情">
        </el-table-column>
        <el-table-column property="value" label="身份证申请详情">
        </el-table-column>
        <el-table-column property="value" label="多维度申请情况">
        </el-table-column>
      </el-table-->
    </el-card>

    <el-card class="box-card">

      <h3>4.客户申请记录</h3>
      <!--el-table :data="attributes">
        <el-table-column property="add_time" :formatter="dateFormat" label="申请时间">
        </el-table-column>
        <el-table-column property="order_sn" label="订单编号">
        </el-table-column>
        <el-table-column property="goods_name" label="商品名称">
        </el-table-column>
        <el-table-column property="price" label="商品价值">
        </el-table-column>
        <el-table-column property="consignee" label="收货人姓名">
        </el-table-column>
        <el-table-column property="mobile" label="收货人手机号">
        </el-table-column>
        <el-table-column property="address" label="收货地址">
        </el-table-column>
        <el-table-column property="order_status" label="订单状态">
        </el-table-column>
      </el-table-->
    </el-card>

    <el-card class="box-card">
      <h3>备注</h3>
      <el-input type="textarea" placeholder="备注" v-model="orderRemark"></el-input>
    </el-card>

    <el-button type="primary" @click="addRemark">保存</el-button>


    <!--备注信息-->
    <el-form-item label="备注信息">
      <el-input clearable v-model="orderRemark" class="filter-item" style="width: 500px; margin-left: 10px" placeholder="核实客户在网贷款申请和还款情况">
      </el-input>
      <el-button type="primary" size="mini" @click="addRemark">保存信息</el-button>
    </el-form-item>

    <div class="op-container">
      <!--<el-button @click="handleCancel">取消</el-button>-->
      <!--<el-button @click="handleEdit" type="primary">更新商品</el-button>-->
    </div>

  </div>
</template>

<style lang='scss'>

  .itemtogether .el-form-item__content {
    display: inline-block;
  }

  .zlInfo{
    display: grid;
    grid-auto-flow: column;
  }

  .zlDetail{
    font-size: 14px;
    display: grid;
    grid-auto-flow: row;
    grid-row-gap: 5px;
  }

  .zltitle{
    margin-bottom: 3px;
    font-weight: 700;
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
    width: 70px;
    line-height: 36px;
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
    basicInfoReportV1_5_4,listOrderReport,addOrderReport
  } from '@/api/order'
  import Editor from '@tinymce/tinymce-vue'

  export default {
    name: 'GoodsEdit',
    components: {
      Editor
    },
    data() {
      return {
        info: [{
          address: undefined,
          addressComparison: undefined,
          age: undefined,
          anti_fraud: undefined,
          card_name: undefined,
          consignee: undefined,
          emergency_name: undefined,
          emergency_phone: undefined,
          emergency_relation: undefined,
          home_city: undefined,
          id_card_no: undefined,
          mobile_address: undefined,
          model_score: undefined,
          order_sn: undefined,
          phoneAddressComparison: undefined,
          phoneComparison: undefined,
          regist: undefined,
          result: undefined,
          submitOrder: undefined,
          idCardOrder: undefined,
          shouhuoMobileOrder: undefined,
          shouhuoAddress: undefined,
          mobileOverdue: undefined,
          idCardOverdue: undefined,
          orders: [],
          shouhuoMobileOverdue: undefined
        }],
        td_info:{
        },
        orderRemark:'',
        attributes: []
      }
    },
    created() {
      this.basicInfoReport()

      //let dataRes={"errno":0,"data":{"id_card_no":"412825199805067027","emergency_relation":"亲人","emergency_name":"了么","emergency_phone":"18601381456","result":"{\"INFOANALYSIS\":{\"id_age\":\"21\",\"id_gender\":\"F\",\"address_detect\":{\"mobile_address_city\":\"北京市\",\"id_card_city\":\"驻马店地区\",\"mobile_address\":\"北京市\",\"id_card_province\":\"河南省\",\"mobile_address_province\":\"北京市\",\"id_card_address\":\"河南省驻马店地区上蔡县\"},\"geoip_info\":{},\"device_info\":{\"error\":\"参数缺失\"},\"geotrueip_info\":{}},\"DEFAULT_MODEL\":{\"b1a14f3fe5013fe3\":{\"credit_score\":0,\"model_version\":\"1\"}},\"RENT\":{\"final_decision\":\"PASS\",\"final_score\":15,\"risk_items\":[{\"rule_id\":4515942,\"policy_score\":15,\"score\":5,\"policy_mode\":\"Weighted\",\"decision\":\"Accept\",\"policy_decision\":\"Accept\",\"policy_name\":\"信用租赁_安卓\",\"risk_name\":\"7天内设备或身份证或手机号申请次数过多\",\"risk_detail\":[{\"frequency_detail_list\":[{\"count\":\"31\",\"note\":\"7天内租赁人手机号申请次数\",\"detail\":\"7天内租赁人手机号申请次数：31\",\"dim_type\":\"accountMobile\"}],\"type\":\"frequency_detail\"}]},{\"rule_id\":4516016,\"policy_score\":15,\"score\":5,\"policy_mode\":\"Weighted\",\"decision\":\"Accept\",\"policy_decision\":\"Accept\",\"policy_name\":\"信用租赁_安卓\",\"risk_name\":\"1个月内租赁人身份证关联过多的收货地址_本平台\",\"risk_detail\":[{\"frequency_detail_list\":[{\"count\":\"4\",\"note\":\"主属性在指定时间范围内出现的次数或者关联从属性的个数\",\"sub_dim_type\":\"accountAddress\",\"detail\":\"主属性在指定时间范围内出现的次数或者关联从属性的个数：4\",\"data\":[\"北京市市辖区东城区xx\",\"浙江杭州市西湖区城区紫荆花路188号骆家庄西苑(一区)117号\",\"?????????xx\",\"??????????\"],\"dim_type\":\"idNumber\"}],\"type\":\"frequency_detail\"}]},{\"rule_id\":4516018,\"policy_score\":15,\"score\":5,\"policy_mode\":\"Weighted\",\"decision\":\"Accept\",\"policy_decision\":\"Accept\",\"policy_name\":\"信用租赁_安卓\",\"risk_name\":\"1个月内租赁人手机关联过多的收货地址\",\"risk_detail\":[{\"frequency_detail_list\":[{\"count\":\"4\",\"note\":\"主属性在指定时间范围内出现的次数或者关联从属性的个数\",\"sub_dim_type\":\"accountAddress\",\"detail\":\"主属性在指定时间范围内出现的次数或者关联从属性的个数：4\",\"data\":[\"北京市市辖区东城区xx\",\"浙江杭州市西湖区城区紫荆花路188号骆家庄西苑(一区)117号\",\"?????????xx\",\"??????????\"],\"dim_type\":\"accountMobile\"}],\"type\":\"frequency_detail\"}]}]}}","shouhuoMobile":"18601381457","addressComparison":"否","submitOrder":"否","consignee":"刘梦威","address":"北京市市辖区东城区xx","phoneComparison":"是","anti_fraud":"15","mobile_address":"北京市","shouhuoMobileOrder":"否","phoneAddressComparison":"是","idCardOrder":"否","home_city":"河南省驻马店地区上蔡县","user_id":4620,"model_score":202,"card_name":"刘梦威","shouhuoAddress":"是","orders":[{"goods_name":"慎小嶷 十天突破雅思口语 剑13版（附赠便携式速查手册+纯正英音朗读音频卡）","order_status":"待审核","consignee":"刘梦威","address":"北京市市辖区东城区xx","price":0.01,"mobile":"18601381457","add_time":1562315894000,"order_sn":"TO20190705001664"}],"order_sn":"TO20190705001664","regist":"18601381457","age":"21", "td_info": {"3个月内租赁人在多个平台申请借款":{"多维度":["P2P网贷","综合类电商平台"],"租赁人身份证":["P2P网贷","综合类电商平台"],"租赁人手机":["P2P网贷","综合类电商平台"]},"7天内租赁人在多个平台申请借款":{"多维度":["P2P网贷","综合类电商平台"],"租赁人身份证":["P2P网贷","综合类电商平台"],"租赁人手机":["P2P网贷","综合类电商平台"]},"1个月内租赁人在多个平台申请借款":{"多维度":["P2P网贷","综合类电商平台"],"租赁人身份证":["P2P网贷","综合类电商平台"],"租赁人手机":["P2P网贷","综合类电商平台"]}}},"errmsg":"成功"};
      //this.info[0]=dataRes.data; 
      //console.log(this.info[0].td_info['7天内租赁人在多个平台申请借款']);
    },
    methods: {
      basicInfoReport() {
        var orderId = this.$route.query.id
        if (this.$route.query.id == null) {
          return
        }
        basicInfoReportV1_5_4(orderId).then(response => {
          this.info[0] = response.data.data;
          this.td_info = this.info[0].td_info;
          console.log(this.td_info['7天内租赁人在多个平台申请借款']['多维度']);
          //console.log(this.info[0].td_info['7天内租赁人在多个平台申请借款']);
          this.attributes = this.info[0].orders
          //console.info(this.attributes)
        })
        listOrderReport(orderId).then(res=>{
          //console.log(res);
          if(res.data.data){
            this.orderRemark=res.data.data;
          }
        })
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
      },
      addRemark() {
        //console.log(this.orderRemark)
        let queryP={
          id:this.$route.query.id,
          remark:this.orderRemark
        }
        addOrderReport(queryP).then(res=>{
          //console.log(res);
        })
      }
    }
  }

</script>
