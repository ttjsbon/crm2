<template>
  <div class="app-container calendar-list-container">
    <h3 align="center">预言家报告</h3>
    <el-card class="box-card">
      <el-form :data="reportInfo" label-width="200px">
        <div class="flex itemtogether">
          <el-form-item label="报告编号：">
            {{ reportInfo.resp_order}}
          </el-form-item>
        </div>
        <div class="flex itemtogether">
          <el-form-item label="报告生成时间：">
            {{(reportInfo.timestamp | formatDate)}}
          </el-form-item>
        </div>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <el-form :data="reportInfo" label-width="200px">
        <div class="flex itemtogether">
          <el-form-item label="综合评分：">
            <span>{{reportInfo.resp_data.seer_grade}}</span>
          </el-form-item>
        </div>
        <div class="flex itemtogether">
          <el-form-item label="审核建议：">
            <span>{{reportInfo.resp_data.suggest}}</span>
          </el-form-item>
        </div>
        <div class="flex itemtogether">
          <el-form-item label="命中风险标注：">
            <span v-for="(sign, index) in reportInfo.resp_data.sign">
              {{index + 1 + '、' + sign}}<br>
            </span>
          </el-form-item>
        </div>
        <div class="flex itemtogether">
          <el-form-item label="分值标准说明：">
            <span>分值在（0-100）之间，得分越高，风险越高；</span><br>
            <span>（0-30）建议通过</span><br>
            <span>（30-80）建议审核</span><br>
            <span>（80-100）建议拒绝</span>
          </el-form-item>
        </div>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <h3>1.个人基本信息</h3>
      <el-form :data="reportInfo" label-width="200px">
        <div class="flex itemtogether">
          <el-form-item label="姓名：">
            <span>{{reportInfo.resp_data.base_info.name}}</span>
          </el-form-item>
          <el-form-item label="身份证号：">
            <span>{{reportInfo.resp_data.base_info.idcard}}</span>
          </el-form-item>
        </div>
        <div class="flex itemtogether">
          <el-form-item label="手机号：">
            <span>{{reportInfo.resp_data.base_info.phone}}</span>
          </el-form-item>
          <el-form-item label="年龄：">
            <span>{{reportInfo.resp_data.base_info.age}}</span>
          </el-form-item>
        </div>
        <div class="flex itemtogether">
          <el-form-item label="户籍：">
            <span>{{reportInfo.resp_data.base_info.idcard_address}}</span>
          </el-form-item>
          <el-form-item label="号码归属地：">
            <span>{{reportInfo.resp_data.base_info.phone_address}}</span>
          </el-form-item>
        </div>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <h3>2.风险名单检测</h3>
      <el-form :data="reportInfo" label-width="200px">
        <div class="flex itemtogether">
          <el-form-item label="高风险名单：">
            <span>{{reportInfo.resp_data.risk_list_check.hign_risk_focus_list}}</span>
          </el-form-item>
          <el-form-item label="虚拟号码库：">
            <span>{{reportInfo.resp_data.risk_list_check.virtual_number_base}}</span>
          </el-form-item>
        </div>
        <div class="flex itemtogether">
          <el-form-item label="信贷逾期名单：">
            <span>{{reportInfo.resp_data.risk_list_check.credit_overdue_list}}</span>
          </el-form-item>
          <el-form-item label="通信小号库：">
            <span>{{reportInfo.resp_data.risk_list_check.small_number_base}}</span>
          </el-form-item>
        </div>
        <div class="flex itemtogether">
          <el-form-item label="法院执行名单：">
            <span>{{reportInfo.resp_data.risk_list_check.court_execute_list}}</span>
          </el-form-item>
          <el-form-item label="位于高风险较为集中地区：">
            <span>{{reportInfo.resp_data.risk_list_check.census_register_hign_risk_area}}</span>
          </el-form-item>
        </div>
        <div class="flex itemtogether">
          <el-form-item label="法院结案名单：">
            <span>{{reportInfo.resp_data.risk_list_check.court_case_list}}</span>
          </el-form-item>
          <el-form-item label="助学贷款欠费历史：">
            <span>{{reportInfo.resp_data.risk_list_check.student_loan_arrearage_list}}</span>
          </el-form-item>
        </div>
        <div class="flex itemtogether">
          <el-form-item label="法院失信名单：">
            <span>{{reportInfo.resp_data.risk_list_check.court_break_faith_list}}</span>
          </el-form-item>
          <el-form-item label="车辆租赁违约名单：">
            <span>{{reportInfo.resp_data.risk_list_check.car_rental_break_contract_list}}</span>
          </el-form-item>
        </div>
        <div class="flex itemtogether">
          <el-form-item label="犯罪通缉名单：">
            <span>{{reportInfo.resp_data.risk_list_check.crime_manhunt_list}}</span>
          </el-form-item>
          <el-form-item label="租赁高风险名单：">
            <span>{{reportInfo.resp_data.risk_list_check.rent_high_list}}</span>
          </el-form-item>
        </div>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <h3>3.机构查询记录</h3>
      <el-table :data="loan_data" style="font-size: 10px">
        <el-table-column align="center" property="name" label=""></el-table-column>
        <el-table-column align="center" property="platform_total" label="查询总次数"></el-table-column>
        <el-table-column align="center" property="p2p_platform" label="互联网借贷公司"></el-table-column>
        <el-table-column align="center" property="petty_loan_platform" label="小额贷款公司"></el-table-column>
        <el-table-column align="center" property="common_amortize_platform" label="中小型消费分期平台"></el-table-column>
        <el-table-column align="center" property="large_finance_platform" label="大型消费金融公司"></el-table-column>
        <el-table-column align="center" property="credit_card" label="信用卡"></el-table-column>
        <el-table-column align="center" property="other_platform" label="其他类型公司"></el-table-column>
      </el-table>
    </el-card>

    <el-card class="box-card">
      <h3>4.历史借贷行为</h3>
      <h4>1>申请详情</h4>
      <el-table :data="apply_details" style="font-size: 10px">
        <el-table-column align="center" property="apply_mechanism_number" label="平台申请数量：">
          <el-table-column align="center" property="name" label=""></el-table-column>
          <el-table-column align="center" property="d7_apply_times" label="近7天"></el-table-column>
          <el-table-column align="center" property="m1_apply_times" label="近1个月"></el-table-column>
          <el-table-column align="center" property="m3_apply_times" label="近3个月"></el-table-column>
          <el-table-column align="center" property="m6_apply_times" label="近6个月"></el-table-column>
        </el-table-column>
      </el-table>

      <h4>2>负债详情</h4>
      <el-form :data="reportInfo" label-width="200px">
        <div class="flex itemtogether">
          <el-form-item label="负债机构总数：">
            {{ reportInfo.resp_data.loan_details.liabilities_mechanism_number}}
          </el-form-item>
        </div>
      </el-form>
      <el-form :data="reportInfo" label-width="200px">
        <div class="flex itemtogether">
          <el-form-item label="消费金融类机构数：" >
            {{ reportInfo.resp_data.loan_details.cflenders}}
          </el-form-item>
          <el-form-item label="网络贷款类机构数：">
            {{ reportInfo.resp_data.loan_details.nllenders}}
          </el-form-item>
        </div>
      </el-form>
      <el-form :data="reportInfo" label-width="200px">
        <div class="flex itemtogether">
          <el-form-item label="已结清负债机构书：">
            {{ reportInfo.resp_data.loan_details.settlement_number}}
          </el-form-item>
          <el-form-item label="首次负债距今时长(天)：">
            {{ reportInfo.resp_data.loan_details.loanday}}
          </el-form-item>
        </div>
      </el-form>
      <el-table :data="liability" style="font-size: 10px">
        <el-table-column align="center" property="name" label=""></el-table-column>
        <el-table-column align="center" property="d7" label="近7天"></el-table-column>
        <el-table-column align="center" property="m1" label="近1个月"></el-table-column>
        <el-table-column align="center" property="m3" label="近3个月"></el-table-column>
        <el-table-column align="center" property="m6" label="近6个月"></el-table-column>
      </el-table>

      <h4>3>还款详情</h4>
      <el-table :data="repay_succ" style="font-size: 10px">
        <el-table-column align="center" property="name" label=""></el-table-column>
        <el-table-column align="center" property="d7" label="近7天"></el-table-column>
        <el-table-column align="center" property="m1" label="近1个月"></el-table-column>
        <el-table-column align="center" property="m3" label="近3个月"></el-table-column>
        <el-table-column align="center" property="m6" label="近6个月"></el-table-column>
      </el-table>
      <h5>最近一次成功还款距今天数（天）：{{reportInfo.resp_data.repay_info.last_repay_day}}</h5>
      <br>
      <el-table :data="repay_fail" style="font-size: 10px">
        <el-table-column align="center" property="name" label=""></el-table-column>
        <el-table-column align="center" property="d7" label="近7天"></el-table-column>
        <el-table-column align="center" property="m1" label="近1个月"></el-table-column>
        <el-table-column align="center" property="m3" label="近3个月"></el-table-column>
        <el-table-column align="center" property="m6" label="近6个月"></el-table-column>
      </el-table>

      <h4>4>逾期详情</h4>
      <el-form :data="reportInfo" label-width="200px">
        <div class="flex itemtogether">
          <el-form-item label="是否逾期：">
            <span>{{reportInfo.resp_data.overdue_info.is_overdue}}</span>
          </el-form-item>
        </div>
        <div class="flex itemtogether">
          <el-form-item label="逾期机构数：">
            <span>{{reportInfo.resp_data.overdue_info.counts}}</span>
          </el-form-item>
        </div>
        <div class="flex itemtogether">
          <el-form-item label="逾期金额：">
            <span>{{reportInfo.resp_data.overdue_info.overdue_money}}</span>
          </el-form-item>
        </div>
        <div class="flex itemtogether">
          <el-form-item label="是否存在逾期未结清：">
            <span>{{reportInfo.resp_data.overdue_info.settlement}}</span>
          </el-form-item>
        </div>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <h3>5.风险关联检测</h3>
      <el-form :data="reportInfo" label-width="200px">
        <div class="flex itemtogether">
          <el-form-item label="3个月身份证关联手机号数：">
            <span>{{reportInfo.resp_data.relevance_risk_check.ident_to_phone_counts}}</span>
          </el-form-item>
        </div>
        <div class="flex itemtogether">
          <el-form-item label="3个月手机号关联身份证数：">
            <span>{{reportInfo.resp_data.relevance_risk_check.phone_to_ident_counts}}</span>
          </el-form-item>
        </div>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <h3>6.法院风险信息</h3>
      <el-table :data="reportInfo.resp_data.court_risk_info_list" style="font-size: 10px">
        <el-table-column align="center" type="index" :index="index + 1" label="序号"></el-table-column>
        <el-table-column align="center" label="审结日期" prop="sort_time_string">
          <template slot-scope="scope" >
            <span>  {{(scope.row.sort_time_string | dateformat('YYYY-MM-DD HH:mm:ss'))}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" property="data_type" label="类型"></el-table-column>
        <el-table-column align="center" property="summary" label="摘要说明"  :show-overflow-tooltip="true"></el-table-column>
        <el-table-column align="center" property="compatibility" label="匹配度"></el-table-column>
      </el-table>
    </el-card>

    <el-card class="box-card">
      <h3>7.租赁信息详情</h3>
      <el-table :data="booleandata_localhistory" style="font-size: 10px">
        <el-table-column align="center" property="name" label=""  :show-overflow-tooltip="true"></el-table-column>
        <el-table-column align="center" property="times_d7" label="近7天"  :show-overflow-tooltip="true"></el-table-column>
        <el-table-column align="center" property="times_m1" label="近1个月"></el-table-column>
        <el-table-column align="center" property="times_m3" label="近3个月"></el-table-column>
        <el-table-column align="center" property="times_m6" label="近6个月"></el-table-column>
      </el-table>
      <el-form :data="reportInfo" label-width="200px">
        <div class="flex itemtogether">
          <el-form-item label="最高分数：">
            <span>{{reportInfo.resp_data.booleandata_localhistory.max_grade}}</span>
          </el-form-item>
        </div>
        <div class="flex itemtogether">
          <el-form-item label="风险标注：">
            <span>{{(reportInfo.resp_data.booleandata_localhistory.sign + '').substr(0, reportInfo.resp_data.booleandata_localhistory.sign.length - 1)}}</span>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<style lang='scss'>

  .itemtogether .el-form-item__content {
    display: inline-block;
  }

  .zlInfo {
    display: grid;
    grid-auto-flow: column;
  }

  .zlDetail {
    font-size: 14px;
    display: grid;
    grid-auto-flow: row;
    grid-row-gap: 5px;
  }

  .zltitle {
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
  import Editor from '@tinymce/tinymce-vue'
  import {
    notification
  } from '@/api/jd_order'

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
        td_info: {},
        orderRemark: '',
        attributes: [],
        otherAttributes: [],
        attributesDays: [],
        attributesMonth: [],
        attributesMonths: [],
        reportInfo: {},
        booleandata_localhistory: [],
        loan_data: [],
        apply_details: [],
        liability: [],
        repay_fail: [],
        repay_succ: []
      }
    },
    filters: {
      formatDate: function(value) {
        var val = value + ''
        var y = val.substr(0, 4)
        var MM = val.substr(4, 2)
        var d = val.substr(6, 2)
        var h = val.substr(8, 2)
        var m = val.substr(10, 2)
        var s = val.substr(12, 2)
        return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
      }
    },
    created() {
      this.basicInfoReport()
    },
    methods: {
      basicInfoReport() {
        var orderId = this.$route.query.id
        if (this.$route.query.id == null) {
          return
        }
        notification(orderId).then(response => {
          this.reportInfo = response.data.data.reportInfo
          this.booleandatas()
        })
      },
      booleandatas() {
        var data = this.reportInfo.resp_data
        var booleandata = data.booleandata_localhistory
        booleandata.name = '申请租赁次数'
        this.booleandata_localhistory.push(booleandata)
        var loan_datad7 = data.personal_loan_demand.loan_datad7
        loan_datad7.name = '近7天'
        var loan_datam1 = data.personal_loan_demand.loan_datam1
        loan_datam1.name = '近30天'
        var loan_datam3 = data.personal_loan_demand.loan_datam3
        loan_datam3.name = '近90天'
        this.loan_data.push(loan_datad7)
        this.loan_data.push(loan_datam1)
        this.loan_data.push(loan_datam3)

        var apply_detail = data.apply_details
        apply_detail.name = '申请次数'
        this.apply_details.push(apply_detail)

        var liability = data.repay_info.liability
        liability.name = '负债机构数'
        this.liability.push(liability)

        var repay_fail_money = data.repay_info.repay_fail_money
        repay_fail_money.name = '还款失败金额'
        var repay_fail_times = data.repay_info.repay_fail_times
        repay_fail_times.name = '还款失败次数'
        var repay_succ_money = data.repay_info.repay_succ_money
        repay_succ_money.name = '还款成功金额'
        var repay_succ_times = data.repay_info.repay_succ_times
        repay_succ_times.name = '还款成功次数'
        this.repay_fail.push(repay_fail_times)
        this.repay_fail.push(repay_fail_money)
        this.repay_succ.push(repay_succ_times)
        this.repay_succ.push(repay_succ_money)
      }
    }
  }

</script>
