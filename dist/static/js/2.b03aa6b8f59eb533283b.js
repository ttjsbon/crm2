webpackJsonp([2],{"+U8d":function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"\n.table-expand[data-v-c6e94cda] {\n  font-size: 0;\n}\n.table-expand label[data-v-c6e94cda] {\n  width: 100px;\n  color: #99a9bf;\n}\n.table-expand .el-form-item[data-v-c6e94cda] {\n  margin-right: 0;\n  margin-bottom: 0;\n}\n.gallery[data-v-c6e94cda] {\n  width: 80px;\n  margin-right: 10px;\n}\n.statetag[data-v-c6e94cda] {\n  margin-left: 10px;\n}\n\n",""])},"1n3Z":function(t,e,a){"use strict";var i={name:"BackToTop",props:{visibilityHeight:{type:Number,default:400},backPosition:{type:Number,default:0},customStyle:{type:Object,default:function(){return{right:"50px",bottom:"50px",width:"40px",height:"40px","border-radius":"4px","line-height":"45px",background:"#e7eaf1"}}},transitionName:{type:String,default:"fade"}},data:function(){return{visible:!1,interval:null}},mounted:function(){window.addEventListener("scroll",this.handleScroll)},beforeDestroy:function(){window.removeEventListener("scroll",this.handleScroll),this.interval&&clearInterval(this.interval)},methods:{handleScroll:function(){this.visible=window.pageYOffset>this.visibilityHeight},backToTop:function(){var t=this,e=window.pageYOffset,a=0;this.interval=setInterval(function(){var i=Math.floor(t.easeInOutQuad(10*a,e,-e,500));i<=t.backPosition?(window.scrollTo(0,t.backPosition),clearInterval(t.interval)):window.scrollTo(0,i),a++},16.7)},easeInOutQuad:function(t,e,a,i){return(t/=i/2)<1?a/2*t*t+e:-a/2*(--t*(t-2)-1)+e}}},n={render:function(){var t=this.$createElement,e=this._self._c||t;return e("transition",{attrs:{name:this.transitionName}},[e("div",{directives:[{name:"show",rawName:"v-show",value:this.visible,expression:"visible"}],staticClass:"back-to-ceiling",style:this.customStyle,on:{click:this.backToTop}},[e("svg",{staticClass:"Icon Icon--backToTopArrow",staticStyle:{height:"16px",width:"16px"},attrs:{width:"16",height:"16",viewBox:"0 0 17 17",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true"}},[e("title",[this._v("回到顶部")]),this._v(" "),e("g",[e("path",{attrs:{d:"M12.036 15.59c0 .55-.453.995-.997.995H5.032c-.55 0-.997-.445-.997-.996V8.584H1.03c-1.1 0-1.36-.633-.578-1.416L7.33.29c.39-.39 1.026-.385 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.004z","fill-rule":"evenodd"}})])])])])},staticRenderFns:[]};var l=a("VU/8")(i,n,!1,function(t){a("lwhT")},"data-v-3d98aeee",null);e.a=l.exports},"7vs6":function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"\n.back-to-ceiling[data-v-3d98aeee] {\n  position: fixed;\n  display: inline-block;\n  text-align: center;\n  cursor: pointer;\n}\n.back-to-ceiling[data-v-3d98aeee]:hover {\n  background: #d5dbe7;\n}\n.fade-enter-active[data-v-3d98aeee],\n.fade-leave-active[data-v-3d98aeee] {\n  -webkit-transition: opacity .5s;\n  transition: opacity .5s;\n}\n.fade-enter[data-v-3d98aeee],\n.fade-leave-to[data-v-3d98aeee] {\n  opacity: 0\n}\n.back-to-ceiling .Icon[data-v-3d98aeee] {\n  fill: #9aaabf;\n  background: none;\n}\n",""])},RAZ6:function(t,e,a){var i=a("+U8d");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("rjj0")("ec3b8262",i,!0)},lwhT:function(t,e,a){var i=a("7vs6");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("rjj0")("dd7fe498",i,!0)},wsLs:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("mvHQ"),n=a.n(i),l=a("qsHl"),s={name:"GoodsList",components:{BackToTop:a("1n3Z").a},data:function(){return{list:[],total:0,listLoading:!0,listQuery:{page:1,limit:20,goodsSn:void 0,name:void 0,sort:"add_time",order:"desc"},descDetail:"",descDialogVisible:!1,downloadLoading:!1}},created:function(){this.getList()},methods:{getList:function(){var t=this;this.listLoading=!0,sessionStorage.getItem("listQueryData")&&(this.listQuery=JSON.parse(sessionStorage.getItem("listQueryData")),sessionStorage.removeItem("listQueryData")),Object(l.h)(this.listQuery).then(function(e){t.list=e.data.data.items,t.total=e.data.data.total,t.listLoading=!1}).catch(function(){t.list=[],t.total=0,t.listLoading=!1})},handleFilter:function(){this.listQuery.page=1,this.getList()},handleSizeChange:function(t){this.listQuery.limit=t,this.getList()},handleCurrentChange:function(t){this.listQuery.page=t,this.getList()},handleCreate:function(){this.$router.push({path:"/goods/create"})},handleUpdate:function(t){sessionStorage.setItem("listQueryData",n()(this.listQuery)),this.$router.push({path:"/goods/edit",query:{id:t.id}})},showDesc:function(t){this.descDetail=t,this.descDialogVisible=!0},handleDelete:function(t){var e=this;Object(l.a)(t).then(function(a){e.$notify({title:"成功",message:"删除成功",type:"success",duration:2e3});var i=e.list.indexOf(t);e.list.splice(i,1)})},handleDownload:function(){var t=this;this.downloadLoading=!0,Promise.all([a.e(38),a.e(37)]).then(a.bind(null,"zWO4")).then(function(e){e.export_json_to_excel2(["商品ID","商品编号","名称","专柜价格","当前价格","是否新品","是否热品","是否在售","首页主图","宣传图片列表","商品介绍","详细介绍","商品图片","商品单位","关键字","类目ID","品牌商ID"],t.list,["id","goodsSn","name","counterPrice","retailPrice","isNew","isHot","isOnSale","listPicUrl","gallery","brief","desc","picUrl","goodsUnit","keywords","categoryId","brandId"],"商品信息"),t.downloadLoading=!1})},setStock:function(t){},setState:function(t,e){var a=this,i={goodsId:t.id,onSale:e},n="";n=e?"确认上架此商品？":"确认下架此商品？",this.$confirm(n,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(l.d)(i).then(function(t){a.getList()})}).catch()}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container calendar-list-container"},[a("div",{staticClass:"filter-container"},[a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"请输入商品编号"},model:{value:t.listQuery.goodsSn,callback:function(e){t.$set(t.listQuery,"goodsSn",e)},expression:"listQuery.goodsSn"}}),t._v(" "),a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"请输入商品名称"},model:{value:t.listQuery.name,callback:function(e){t.$set(t.listQuery,"name",e)},expression:"listQuery.name"}}),t._v(" "),a("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("查找")]),t._v(" "),a("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-edit"},on:{click:t.handleCreate}},[t._v("添加")]),t._v(" "),a("el-button",{staticClass:"filter-item",attrs:{type:"primary",loading:t.downloadLoading,icon:"el-icon-download"},on:{click:t.handleDownload}},[t._v("导出")])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],attrs:{size:"small",data:t.list,"element-loading-text":"正在查询中。。。",border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-form",{staticClass:"table-expand",attrs:{"label-position":"left"}},[a("el-form-item",{attrs:{label:"宣传画廊"}},t._l(e.row.gallery,function(t){return a("img",{key:t,staticClass:"gallery",attrs:{src:t}})})),t._v(" "),a("el-form-item",{attrs:{label:"商品介绍"}},[a("span",[t._v(t._s(e.row.brief))])]),t._v(" "),a("el-form-item",{attrs:{label:"商品单位"}},[a("span",[t._v(t._s(e.row.unit))])]),t._v(" "),a("el-form-item",{attrs:{label:"关键字"}},[a("span",[t._v(t._s(e.row.keyword))])]),t._v(" "),a("el-form-item",{attrs:{label:"类目ID"}},[a("span",[t._v(t._s(e.row.categoryId))])]),t._v(" "),a("el-form-item",{attrs:{label:"品牌商ID"}},[a("span",[t._v(t._s(e.row.brandId))])])],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"商品编号",prop:"goodsSn"}}),t._v(" "),a("el-table-column",{attrs:{align:"center","min-width":"100",label:"名称",prop:"name"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",property:"iconUrl",label:"图片"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{attrs:{src:t.row.picUrl,width:"40"}})]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"详情",prop:"desc"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-dialog",{attrs:{title:"商品详情",visible:t.descDialogVisible},on:{"update:visible":function(e){t.descDialogVisible=e}}},[a("div",{domProps:{innerHTML:t._s(t.descDetail)}})]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){t.showDesc(e.row.description)}}},[t._v("查看")])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"专柜价格",prop:"counterPrice"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"当前价格",prop:"retailPrice"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"是否新品",prop:"isNew"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{type:e.row.isNew?"success":"error"}},[t._v(t._s(e.row.isNew?"新品":"非新品"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"是否热品",prop:"isHot"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{type:e.row.isHot?"success":"error"}},[t._v(t._s(e.row.isHot?"热品":"非热品"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"是否上架",prop:"isOnSale",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"flex"},[a("el-tag",{attrs:{type:e.row.isOnSale?"success":"error"}},[t._v(t._s(e.row.isOnSale?"已上架":"在库中"))]),t._v(" "),e.row.isOnSale?t._e():a("el-button",{staticClass:"statetag",attrs:{type:"primary",size:"mini"},on:{click:function(a){t.setState(e.row,!0)}}},[t._v("上架")]),t._v(" "),e.row.isOnSale?a("el-button",{staticClass:"statetag",attrs:{type:"danger",size:"mini"},on:{click:function(a){t.setState(e.row,!1)}}},[t._v("下架")]):t._e()],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",width:"200","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){t.handleUpdate(e.row)}}},[t._v("编辑")]),t._v(" "),a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){t.handleDelete(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),a("div",{staticClass:"pagination-container"},[a("el-pagination",{attrs:{background:"","current-page":t.listQuery.page,"page-sizes":[10,20,30,50],"page-size":t.listQuery.limit,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),a("el-tooltip",{attrs:{placement:"top",content:"返回顶部"}},[a("back-to-top",{attrs:{visibilityHeight:100}})],1)],1)},staticRenderFns:[]};var r=a("VU/8")(s,o,!1,function(t){a("RAZ6")},"data-v-c6e94cda",null);e.default=r.exports}});