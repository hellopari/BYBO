webpackJsonp([50],{Gqhm:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("Dd8w"),i=a.n(s),n=a("bOdI"),r=a.n(n),l=a("NYxO"),o={data:function(){return{loading:!0,dialog:!1,form:!1,isLoading:!1,snackbarText:null,snackbar:!1,itemId:null,filters:{search:null,organizationId:this.$route.params.organizationId,page:0,size:9},totalDesserts:0,totalPages:0,pagination:r()({sortBy:"id"},"sortBy","amount"),rules:{required:function(t){return!!t||"This field is required"}},limit:[10],headers:[{text:this.$t("chamber.payment.orderNumber"),align:"left",value:"id"},{text:this.$t("chamber.payment.orderName"),align:"left",sortable:!1,value:"orderName"},{text:this.$t("chamber.payment.email"),align:"left",sortable:!1,value:"email"},{text:this.$t("chamber.payment.type"),align:"left",sortable:!1,value:"type"},{text:this.$t("chamber.payment.method"),align:"left",sortable:!1,value:"method"},{text:this.$t("chamber.payment.money"),align:"left",value:"amount"},{text:this.$t("chamber.payment.status"),align:"left",sortable:!1,value:"status"},{text:this.$t("chamber.know.operation"),value:"operation",sortable:!1}],desserts:[]}},watch:{pagination:{handler:function(){var t=this,e=this.pagination.sortBy;this.desserts=this.desserts.sort(function(a,s){var i=a[e],n=s[e];return t.pagination.descending?i<n?1:i>n?-1:0:i<n?-1:i>n?1:0})},deep:!0}},mounted:function(){this.filters.page=void 0!==this.$route.query.page?Number(this.$route.query.page)-1:0,this.reloadTable()},methods:i()({},Object(l.b)(["snackbarStateChange"]),{reloadTable:function(){var t=this;this.loading=!0,null===this.filters.search&&delete this.filters.search,this.$http.get("manager/transactions",{params:this.filters,headers:{"X-TENANT-ID":this.$route.params.organizationId}}).then(function(e){t.desserts=e.data.content,t.totalDesserts=e.data.totalElements,t.totalPages=e.data.totalPages,t.loading=!1})},verify:function(t){var e=this;this.$http.put("manager/transactions/"+this.itemId,{headers:{"X-TENANT-ID":this.$route.params.organizationId}}).then(function(t){e.snackbarStateChange({color:"success",text:e.$t("message.update_message"),snackbar:!0}),e.dialog=!1,e.reloadTable()}).catch(function(t){e.snackbarStateChange({color:"error",text:t.data.message,snackbar:!0})})},edieDialog:function(t){this.itemId=t,this.dialog=!0},handleInput:function(t){this.pagination.page=t,this.$router.push({path:"/organization/"+this.$route.params.organizationId+"/payments",query:{page:t}}),this.filters.page=t-1,this.reloadTable()}})},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-layout",{staticClass:"mx-4 mt-2",attrs:{row:"",wrap:"","align-center":"","fill-height":""}},[a("v-flex",{attrs:{md3:"",sm6:""}},[a("v-text-field",{staticClass:"px3",attrs:{label:t.$t("global.search_text"),"prepend-icon":"search",px3:""},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.reloadTable()}},model:{value:t.filters.search,callback:function(e){t.$set(t.filters,"search",e)},expression:"filters.search"}})],1),t._v(" "),a("v-flex",[a("v-btn",{staticClass:"pull-right",attrs:{color:"primary",to:{path:"/organization/"+t.$route.params.organizationId+"/payments_type"}}},[t._v("\n        "+t._s(t.$t("chamber.btn.add_card"))+"\n      ")])],1)],1),t._v(" "),a("v-data-table",{staticClass:"rtable rtable--flip elevation-1",attrs:{"hide-actions":"",headers:t.headers,items:t.desserts,"no-data-text":t.$t("message.no_message"),pagination:t.pagination,"rows-per-page-items":t.limit,"total-items":t.totalDesserts,loading:t.loading},on:{"update:pagination":function(e){t.pagination=e}},scopedSlots:t._u([{key:"items",fn:function(e){return[a("td",[t._v(t._s(e.item.id))]),t._v(" "),a("td",{staticClass:"text-xs-left"},[t._v(t._s(e.item.name))]),t._v(" "),a("td",{staticClass:"text-xs-left"},[t._v(t._s(e.item.email))]),t._v(" "),a("td",{staticClass:"text-xs-left"},[t._v(t._s(t.$t("global."+e.item.subjectType)))]),t._v(" "),a("td",{staticClass:"text-xs-left"},[t._v(t._s(e.item.gateway))]),t._v(" "),a("td",{staticClass:"text-xs-left error--text"},[t._v("$HK "+t._s(e.item.amount))]),t._v(" "),a("td",{staticClass:"text-xs-left"},["SUCCESS"===e.item.status?a("span",{staticClass:"success--text"},[t._v(t._s(t.$t("global.alreadyPaid")))]):t._e(),t._v(" "),"PENDING"===e.item.status&&e.item.isActive?a("span",{staticClass:"success--text"},[t._v(t._s(t.$t("global.alreadyPaid")))]):t._e(),t._v(" "),"PENDING"!==e.item.status||e.item.isActive?t._e():a("span",{staticClass:"warning--text"},[t._v(t._s(t.$t("global.nPaid")))]),t._v(" "),"ERROR"===e.item.status?a("span",{staticClass:"error--text"},[t._v(t._s(t.$t("global.ERROR")))]):t._e(),t._v(" "),"銀行卡轉賬"!==e.item.gateway||e.item.isActive?t._e():a("v-btn",{staticClass:"caption my-0",staticStyle:{"min-width":"0",height:"20px"},attrs:{depressed:"",small:"",color:"error"},on:{click:function(a){return t.edieDialog(e.item.id)}}},[t._v("\n          "+t._s(t.$t("global.nverify"))+"\n        ")]),t._v(" "),"线下转账"!==e.item.gateway||e.item.isActive?t._e():a("v-btn",{staticClass:"caption my-0",staticStyle:{"min-width":"0",height:"20px"},attrs:{depressed:"",small:"",color:"error"},on:{click:function(a){return t.edieDialog(e.item.id)}}},[t._v("\n          "+t._s(t.$t("global.nverify"))+"\n        ")]),t._v(" "),"銀行卡轉賬"===e.item.gateway&&e.item.isActive?a("v-btn",{staticClass:"caption",staticStyle:{"min-width":"0",height:"20px"},attrs:{depressed:"",small:"",color:"success"}},[t._v(t._s(t.$t("global.alreadyPaid"))+"\n        ")]):t._e(),t._v(" "),"线下转账"===e.item.gateway&&e.item.isActive?a("v-btn",{staticClass:"caption",staticStyle:{"min-width":"0",height:"20px"},attrs:{depressed:"",small:"",color:"success"}},[t._v(t._s(t.$t("global.alreadyPaid"))+"\n        ")]):t._e()],1),t._v(" "),a("td",{staticClass:"text-md-center text-xs-left"},[a("v-tooltip",{attrs:{top:""}},[a("v-btn",{attrs:{slot:"activator",flat:"",icon:"",color:"primary",to:{path:"/organization/"+t.$route.params.organizationId+"/order/apply/"+e.item.id+"/detail"}},slot:"activator"},[a("v-icon",{attrs:{size:"20"}},[t._v("visibility")])],1),t._v(" "),a("span",[t._v(t._s(t.$t("chamber.btn.see")))])],1)],1)]}}])},[t._v(" "),a("template",{slot:"footer"},[a("td",{staticClass:"px-0",attrs:{colspan:t.headers.length+1}},[a("v-pagination",{staticClass:"pull-right my-2",attrs:{circle:"","total-visible":7,length:t.totalPages},on:{input:t.handleInput},model:{value:t.filters.page+1,callback:function(e){t.$set(t.filters,"page+1",e)},expression:"filters.page+1"}})],1)])],2),t._v(" "),a("v-layout",{attrs:{row:"","justify-center":""}},[a("v-dialog",{attrs:{"max-width":"290"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-card-title",{staticClass:"headline"},[t._v(t._s(t.$t("global.verifyText"))+"?")]),t._v(" "),a("v-card-text",[t._v(t._s(t.$t("global.verifyText")))]),t._v(" "),a("v-card-actions",[a("v-spacer"),t._v(" "),a("v-btn",{attrs:{color:"darken-1",flat:""},nativeOn:{click:function(e){t.dialog=!1}}},[t._v(t._s(t.$t("button.cancel")))]),t._v(" "),a("v-btn",{attrs:{color:"primary darken-1",flat:""},on:{click:function(e){return t.verify()}}},[t._v(t._s(t.$t("button.confirm")))])],1)],1)],1)],1)],1)},staticRenderFns:[]},d=a("VU/8")(o,c,!1,null,null,null);e.default=d.exports}});