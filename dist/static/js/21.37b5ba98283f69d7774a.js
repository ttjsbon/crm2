webpackJsonp([21],{UcOH:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("FWz8"),i=r("0xDb"),l={101:"已下单",102:"已取消",201:"已付款",202:"退款中",203:"已退款",301:"审核通过",302:"审核拒绝",401:"已发货",501:"租赁中",600:"归还中",900:"已完成"},o={name:"Order",data:function(){return{list:void 0,total:void 0,listLoading:!0,listQuery:{page:1,limit:20,id:void 0,name:void 0,orderStatusArray:[101],sort:"add_time",order:"desc"},statusMap:l,orderDialogVisible:!1,orderDetail:{order:{},user:{},orderGoods:[]},freeForm:{orderId:void 0,freeDeposit:void 0},freeDialogVisible:!1,downloadLoading:!1,userdata:null}},filters:{orderStatusFilter:function(e){return l[e]}},created:function(){this.getList()},methods:{getList:function(){var e=this;this.listLoading=!0,Object(a.e)(this.listQuery).then(function(t){e.list=t.data.data.items,e.total=t.data.data.total,e.listLoading=!1}).catch(function(){e.list=[],e.total=0,e.listLoading=!1})},handleFilter:function(){this.listQuery.page=1,this.getList()},handleSizeChange:function(e){this.listQuery.limit=e,this.getList()},handleCurrentChange:function(e){this.listQuery.page=e,this.getList()},handleDetail:function(e){var t=this;Object(a.b)(e.id).then(function(e){t.orderDetail=e.data.data,t.orderDetail.order.addTime=Object(i.a)(t.orderDetail.order.addTime),t.orderDetail.order.beginTime&&(t.orderDetail.order.beginTime=Object(i.a)(t.orderDetail.order.beginTime)),t.orderDetail.order.endTime&&(t.orderDetail.order.endTime=Object(i.a)(t.orderDetail.order.endTime)),t.userdata=JSON.parse(t.orderDetail.user.feature)}),this.orderDialogVisible=!0},closeDetail:function(){this.userdata=null},handleFree:function(e){this.freeForm.orderId=e.id,this.freeDialogVisible=!0},confirmFree:function(){var e=this;this.freeForm.freeDeposit&&/^[0-9]*$/.test(this.freeForm.freeDeposit)?this.$refs.freeForm.validate(function(t){t&&Object(a.c)(e.freeForm).then(function(t){e.freeDialogVisible=!1,e.$notify({title:"成功",message:"豁免成功",type:"success",duration:2e3}),e.freeForm={orderId:void 0,freeDeposit:void 0},e.getList()})}):this.$message.error("请输入正确金额")},handleDownload:function(){var e=this;this.downloadLoading=!0,Promise.all([r.e(38),r.e(37)]).then(r.bind(null,"zWO4")).then(function(t){t.export_json_to_excel2(["订单ID","订单编号","用户ID","订单状态","是否删除","收货人","收货联系电话","收货地址"],e.list,["id","orderSn","userId","orderStatus","isDelete","consignee","mobile","address"],"订单信息"),e.downloadLoading=!1})}}},s={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app-container calendar-list-container"},[r("div",{staticClass:"filter-container"},[r("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"请输入用户ID"},model:{value:e.listQuery.userId,callback:function(t){e.$set(e.listQuery,"userId",t)},expression:"listQuery.userId"}}),e._v(" "),r("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"请输入订单编号"},model:{value:e.listQuery.orderSn,callback:function(t){e.$set(e.listQuery,"orderSn",t)},expression:"listQuery.orderSn"}}),e._v(" "),r("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v("查找")]),e._v(" "),r("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-download",loading:e.downloadLoading},on:{click:e.handleDownload}},[e._v("导出")])],1),e._v(" "),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],attrs:{size:"small",data:e.list,"element-loading-text":"正在查询中。。。",border:"",fit:"","highlight-current-row":""}},[r("el-table-column",{attrs:{align:"center","min-width":"100",label:"订单编号",prop:"orderSn"}}),e._v(" "),r("el-table-column",{attrs:{align:"center",label:"用户ID",prop:"userId"}}),e._v(" "),r("el-table-column",{attrs:{align:"center",label:"用户姓名",prop:"consignee"}}),e._v(" "),r("el-table-column",{attrs:{align:"center",label:"手机号码",prop:"mobile"}}),e._v(" "),r("el-table-column",{attrs:{align:"center",label:"订单状态",prop:"orderStatus"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-tag",[e._v(e._s(e._f("orderStatusFilter")(t.row.orderStatus)))])]}}])}),e._v(" "),r("el-table-column",{attrs:{align:"center",label:"押金金额",prop:"actualDeposit"}}),e._v(" "),r("el-table-column",{attrs:{align:"center",label:"分期金额",prop:"periodPrice"}}),e._v(" "),r("el-table-column",{attrs:{align:"center",label:"期数",prop:"periods"}}),e._v(" "),r("el-table-column",{attrs:{align:"center",label:"支付时间",prop:"payTime"}}),e._v(" "),r("el-table-column",{attrs:{align:"center",label:"物流单号",prop:"shipSn"}}),e._v(" "),r("el-table-column",{attrs:{align:"center",label:"物流渠道",prop:"shipChannel"}}),e._v(" "),r("el-table-column",{attrs:{align:"center",label:"操作",width:"200","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(r){e.handleDetail(t.row)}}},[e._v("详情")]),e._v(" "),r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(r){e.handleFree(t.row)}}},[e._v("豁免押金")])]}}])})],1),e._v(" "),r("div",{staticClass:"pagination-container"},[r("el-pagination",{attrs:{background:"","current-page":e.listQuery.page,"page-sizes":[10,20,30,50],"page-size":e.listQuery.limit,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),r("el-dialog",{attrs:{title:"订单详情",width:"900",visible:e.orderDialogVisible},on:{"update:visible":function(t){e.orderDialogVisible=t},close:e.closeDetail}},[r("el-form",{attrs:{data:e.orderDetail,"label-position":"left"}},[r("el-form-item",{staticClass:"bigitem",attrs:{label:"认证信息"}},[r("span",[e._v("（姓名）"+e._s(e.orderDetail.user.cardName))]),e._v(" "),r("span",[e._v("（住址）"+e._s(e.orderDetail.user.homeAddress))]),e._v(" "),r("span",[e._v("（工作地址）"+e._s(e.orderDetail.user.workAddress))]),e._v(" "),r("span",[e._v("（身份证）"+e._s(e.orderDetail.user.idCardNo))]),e._v(" "),r("span",[e._v("（手机号）"+e._s(e.orderDetail.user.mobile))]),e._v(" "),r("span",[e._v("（紧急联系人）"+e._s(e.orderDetail.order.emergencyName))]),e._v(" "),r("span",[e._v("（联系人关系）"+e._s(e.orderDetail.order.emergencyRelation))]),e._v(" "),r("span",[e._v("（联系人手机）"+e._s(e.orderDetail.order.emergencyPhone))])]),e._v(" "),r("el-form-item",{staticClass:"bigitem",attrs:{label:"身份证照"}},[e.userdata?r("img",{staticClass:"detailIdimg",attrs:{src:e.userdata.idCardFrontImage,alt:""}}):e._e(),e._v(" "),e.userdata?r("img",{staticClass:"detailIdimg",attrs:{src:e.userdata.idCardBackImage,alt:""}}):e._e()]),e._v(" "),r("el-form-item",{staticClass:"bigitem",attrs:{label:"订单编号"}},[r("span",[e._v(e._s(e.orderDetail.order.orderSn))])]),e._v(" "),r("div",{staticClass:"flex itemtogether"},[r("el-form-item",{attrs:{label:"订单状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-tag",[e._v(e._s(e._f("orderStatusFilter")(e.orderDetail.order.orderStatus)))])]}}])}),e._v(" "),r("el-form-item",{attrs:{label:"下单用户"}},[r("span",[e._v(e._s(e.orderDetail.order.mobile))])]),e._v(" "),r("el-form-item",{staticClass:"bigitem",attrs:{label:"下单时间"}},[r("span",[e._v(e._s(e.orderDetail.order.addTime))])])],1),e._v(" "),r("div",{staticClass:"flex itemtogether"},[r("el-form-item",{attrs:{label:"分期期数"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(e.orderDetail.order.periods))])]}}])}),e._v(" "),r("el-form-item",{attrs:{label:"每期租金"}},[r("span",[e._v(e._s(e.orderDetail.order.periodPrice))])]),e._v(" "),r("el-form-item",{attrs:{label:"全部租金"}},[r("span",[e._v(e._s(e.orderDetail.order.actualPrice))])])],1),e._v(" "),r("div",{staticClass:"flex itemtogether"},[r("el-form-item",{attrs:{label:"豁免押金"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(e.orderDetail.order.freeDeposit))])]}}])}),e._v(" "),r("el-form-item",{attrs:{label:"实际押金"}},[r("span",[e._v(e._s(e.orderDetail.order.actualDeposit))])]),e._v(" "),r("el-form-item",[r("span")])],1),e._v(" "),r("div",{staticClass:"flex itemtogether"},[r("el-form-item",{staticClass:"bigitem",attrs:{label:"租赁开始时间"}},[r("span",[e._v(e._s(e.orderDetail.order.beginTime))])]),e._v(" "),r("el-form-item",{staticClass:"bigitem",attrs:{label:"租赁结束时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(e.orderDetail.order.endTime))])]}}])})],1),e._v(" "),r("el-form-item",{attrs:{label:"收货信息"}},[r("span",[e._v("（收货人）"+e._s(e.orderDetail.order.consignee))]),e._v(" "),r("span",[e._v("（手机号）"+e._s(e.orderDetail.order.mobile))]),e._v(" "),r("span",[e._v("（地址）"+e._s(e.orderDetail.order.address))])]),e._v(" "),r("el-form-item",{attrs:{label:"商品信息"}},[r("el-table",{attrs:{size:"small",data:e.orderDetail.orderGoods,border:"",fit:"","highlight-current-row":""}},[r("el-table-column",{attrs:{align:"center",label:"商品名称",prop:"goodsName"}}),e._v(" "),r("el-table-column",{attrs:{align:"center",label:"商品编号",prop:"goodsSn"}}),e._v(" "),r("el-table-column",{attrs:{align:"center",label:"货品规格",prop:"specifications"}}),e._v(" "),r("el-table-column",{attrs:{align:"center",label:"货品价格",prop:"price"}}),e._v(" "),r("el-table-column",{attrs:{align:"center",label:"货品数量",prop:"number"}}),e._v(" "),r("el-table-column",{attrs:{align:"center",label:"货品图片",prop:"picUrl"},scopedSlots:e._u([{key:"default",fn:function(e){return[r("img",{attrs:{src:e.row.picUrl,width:"40"}})]}}])})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"费用信息"}},[r("span",[e._v("\n          (实际费用)"+e._s(e.orderDetail.order.actualPrice)+"元 =\n          (商品总价)"+e._s(e.orderDetail.order.goodsPrice)+"元 +\n          (快递费用)"+e._s(e.orderDetail.order.freightPrice)+"元 -\n          (优惠减免)"+e._s(e.orderDetail.order.couponPrice)+"元 -\n          (积分减免)"+e._s(e.orderDetail.order.integralPrice)+"元\n        ")])]),e._v(" "),r("el-form-item",{attrs:{label:"支付信息"}},[r("span",[e._v("（支付渠道）支付宝")]),e._v(" "),e.orderDetail.pay&&e.orderDetail.pay.updateTime?r("span",[e._v("（支付时间）"+e._s(e.orderDetail.pay.updateTime))]):e._e(),e._v(" "),e.orderDetail.pay&&e.orderDetail.pay.outTradeOrderId?r("span",[e._v("（支付订单）"+e._s(e.orderDetail.pay.outTradeOrderId))]):e._e(),e._v(" "),e.orderDetail.pay&&e.orderDetail.pay.updateTime?e._e():r("span",[e._v("（支付时间）暂无")]),e._v(" "),e.orderDetail.pay&&e.orderDetail.pay.outTradeOrderId?e._e():r("span",[e._v("（支付订单）暂无")])]),e._v(" "),r("el-form-item",{attrs:{label:"快递信息"}},[r("span",[e._v("（快递公司）"+e._s(e.orderDetail.order.shipChannel))]),e._v(" "),r("span",[e._v("（快递单号）"+e._s(e.orderDetail.order.shipSn))]),e._v(" "),r("span",[e._v("（发货时间）"+e._s(e.orderDetail.order.shipTime))])]),e._v(" "),r("el-form-item",{attrs:{label:"收货信息"}},[r("span",[e._v("（确认收货时间）"+e._s(e.orderDetail.order.confirmTime))])]),e._v(" "),r("el-form-item",{attrs:{label:"归还信息"}},[e.orderDetail.order.backTime?r("span",[e._v("（归还时间）"+e._s(e.orderDetail.order.backTime))]):e._e(),e._v(" "),e.orderDetail.order.backShipSn?r("span",[e._v("（快递公司）"+e._s(e.orderDetail.order.backShipSn))]):e._e(),e._v(" "),e.orderDetail.order.backShipChannel?r("span",[e._v("（快递单号）"+e._s(e.orderDetail.order.backShipChannel))]):e._e(),e._v(" "),e.orderDetail.order.backTime?e._e():r("span",[e._v("（归还时间）暂无")]),e._v(" "),e.orderDetail.order.backShipSn?e._e():r("span",[e._v("（快递公司）暂无")]),e._v(" "),e.orderDetail.order.backShipChannel?e._e():r("span",[e._v("（快递单号）暂无")])])],1)],1),e._v(" "),r("el-dialog",{attrs:{title:"豁免",visible:e.freeDialogVisible},on:{"update:visible":function(t){e.freeDialogVisible=t}}},[r("el-form",{ref:"freeForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{model:e.freeForm,"status-icon":"","label-position":"left","label-width":"100px"}},[r("el-form-item",{attrs:{label:"豁免金额",prop:"freeDeposit"}},[r("el-input",{model:{value:e.freeForm.freeDeposit,callback:function(t){e.$set(e.freeForm,"freeDeposit",t)},expression:"freeForm.freeDeposit"}})],1)],1),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.freeDialogVisible=!1}}},[e._v("取消")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:e.confirmFree}},[e._v("确定")])],1)],1)],1)},staticRenderFns:[]};var n=r("VU/8")(o,s,!1,function(e){r("XPZk")},null,null);t.default=n.exports},XPZk:function(e,t,r){var a=r("q5YU");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);r("rjj0")("c6070b9e",a,!0)},q5YU:function(e,t,r){(e.exports=r("FZ+f")(!1)).push([e.i,"\n.itemtogether .el-form-item__content {\n  display: inline-block;\n}\n.itemtogether {\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.itemtogether .el-form-item {\n  min-width: 150px;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.itemtogether .bigitem {\n  min-width: 230px;\n}\n\n",""])}});