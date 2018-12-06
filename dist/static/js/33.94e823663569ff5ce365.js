webpackJsonp([33],{O9FD:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("BO1k"),l=a.n(i),o=a("woOf"),r=a.n(o),s=a("vLgD");var n={name:"Keyword",data:function(){return{list:void 0,total:void 0,listLoading:!0,listQuery:{page:1,limit:20,keyword:void 0,url:void 0,sort:"add_time",order:"desc"},dataForm:{id:void 0,keyword:void 0,url:void 0,isHot:void 0,isDefault:void 0},dialogFormVisible:!1,dialogStatus:"",textMap:{update:"编辑",create:"创建"},rules:{keyword:[{required:!0,message:"关键词不能为空",trigger:"blur"}]},downloadLoading:!1}},created:function(){this.getList()},methods:{getList:function(){var t,e=this;this.listLoading=!0,(t=this.listQuery,Object(s.a)({url:"/keyword/list",method:"get",params:t})).then(function(t){e.list=t.data.data.items,e.total=t.data.data.total,e.listLoading=!1}).catch(function(){e.list=[],e.total=0,e.listLoading=!1})},handleFilter:function(){this.listQuery.page=1,this.getList()},handleSizeChange:function(t){this.listQuery.limit=t,this.getList()},handleCurrentChange:function(t){this.listQuery.page=t,this.getList()},resetForm:function(){this.dataForm={id:void 0,keyword:void 0,url:void 0,isHot:void 0,isDefault:void 0}},handleCreate:function(){var t=this;this.resetForm(),this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick(function(){t.$refs.dataForm.clearValidate()})},createData:function(){var t=this;this.$refs.dataForm.validate(function(e){var a;e&&(a=t.dataForm,Object(s.a)({url:"/keyword/create",method:"post",data:a})).then(function(e){t.list.unshift(e.data.data),t.dialogFormVisible=!1,t.$notify({title:"成功",message:"创建成功",type:"success",duration:2e3})})})},handleUpdate:function(t){var e=this;this.dataForm=r()({},t),this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick(function(){e.$refs.dataForm.clearValidate()})},updateData:function(){var t=this;this.$refs.dataForm.validate(function(e){var a;e&&(a=t.dataForm,Object(s.a)({url:"/keyword/update",method:"post",data:a})).then(function(){var e=!0,a=!1,i=void 0;try{for(var o,r=l()(t.list);!(e=(o=r.next()).done);e=!0){var s=o.value;if(s.id===t.dataForm.id){var n=t.list.indexOf(s);t.list.splice(n,1,t.dataForm);break}}}catch(t){a=!0,i=t}finally{try{!e&&r.return&&r.return()}finally{if(a)throw i}}t.dialogFormVisible=!1,t.$notify({title:"成功",message:"更新成功",type:"success",duration:2e3})})})},handleDelete:function(t){var e,a=this;(e=t,Object(s.a)({url:"/keyword/delete",method:"post",data:e})).then(function(e){a.$notify({title:"成功",message:"删除成功",type:"success",duration:2e3});var i=a.list.indexOf(t);a.list.splice(i,1)})},handleDownload:function(){var t=this;this.downloadLoading=!0,Promise.all([a.e(38),a.e(37)]).then(a.bind(null,"zWO4")).then(function(e){e.export_json_to_excel2(["关键词ID","关键词","跳转链接","是否推荐","是否默认"],t.list,["id","keyword","url","isHot","isDefault"],"关键词设置"),t.downloadLoading=!1})}}},d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container calendar-list-container"},[a("div",{staticClass:"filter-container"},[a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"请输入关键字"},model:{value:t.listQuery.keyword,callback:function(e){t.$set(t.listQuery,"keyword",e)},expression:"listQuery.keyword"}}),t._v(" "),a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"请输入跳转链接"},model:{value:t.listQuery.url,callback:function(e){t.$set(t.listQuery,"url",e)},expression:"listQuery.url"}}),t._v(" "),a("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("查找")]),t._v(" "),a("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-edit"},on:{click:t.handleCreate}},[t._v("添加")]),t._v(" "),a("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-download",loading:t.downloadLoading},on:{click:t.handleDownload}},[t._v("导出")])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],attrs:{size:"small",data:t.list,"element-loading-text":"正在查询中。。。",border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",width:"150px",label:"关键词ID",prop:"id",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{align:"center","min-width":"100px",label:"关键词",prop:"keyword"}}),t._v(" "),a("el-table-column",{attrs:{align:"center","min-width":"300px",label:"跳转链接",prop:"url"}}),t._v(" "),a("el-table-column",{attrs:{align:"center","min-width":"100px",label:"是否推荐",prop:"isHot"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{type:e.row.isHot?"success":"error"}},[t._v(t._s(e.row.isHot?"是":"否"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center","min-width":"100px",label:"是否默认",prop:"isDefault"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{type:e.row.isDefault?"success":"error"}},[t._v(t._s(e.row.isDefault?"是":"否"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",width:"250","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){t.handleUpdate(e.row)}}},[t._v("编辑")]),t._v(" "),a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){t.handleDelete(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),a("div",{staticClass:"pagination-container"},[a("el-pagination",{attrs:{background:"","current-page":t.listQuery.page,"page-sizes":[10,20,30,50],"page-size":t.listQuery.limit,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),a("el-dialog",{attrs:{title:t.textMap[t.dialogStatus],visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-form",{ref:"dataForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{rules:t.rules,model:t.dataForm,"status-icon":"","label-position":"left","label-width":"100px"}},[a("el-form-item",{attrs:{label:"关键词",prop:"keyword"}},[a("el-input",{model:{value:t.dataForm.keyword,callback:function(e){t.$set(t.dataForm,"keyword",e)},expression:"dataForm.keyword"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"跳转链接",prop:"url"}},[a("el-input",{model:{value:t.dataForm.url,callback:function(e){t.$set(t.dataForm,"url",e)},expression:"dataForm.url"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"是否推荐",prop:"isHot"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.dataForm.isHot,callback:function(e){t.$set(t.dataForm,"isHot",e)},expression:"dataForm.isHot"}},[a("el-option",{attrs:{label:"推荐",value:!0}}),t._v(" "),a("el-option",{attrs:{label:"普通",value:!1}})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"是否默认",prop:"isDefault"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.dataForm.isDefault,callback:function(e){t.$set(t.dataForm,"isDefault",e)},expression:"dataForm.isDefault"}},[a("el-option",{attrs:{label:"默认",value:!0}}),t._v(" "),a("el-option",{attrs:{label:"非默认",value:!1}})],1)],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取消")]),t._v(" "),"create"==t.dialogStatus?a("el-button",{attrs:{type:"primary"},on:{click:t.createData}},[t._v("确定")]):a("el-button",{attrs:{type:"primary"},on:{click:t.updateData}},[t._v("确定")])],1)],1)],1)},staticRenderFns:[]},u=a("VU/8")(n,d,!1,null,null,null);e.default=u.exports}});