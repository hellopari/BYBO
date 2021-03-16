webpackJsonp([32],{"1MAM":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("Dd8w"),i=e.n(s),r=e("NYxO"),n={data:function(){return{loading:!1,dialog:!1,isApproved:!0,organizations:[],headers:[{text:this.$t("chamber.create.logo"),align:"left",sortable:!1,value:"name"},{text:this.$t("chamber.select.information"),align:"left",sortable:!1,value:"name"},{text:this.$t("chamber.select.contacts"),value:"calories",sortable:!1},{text:this.$t("chamber.select.phone"),value:"calories",sortable:!1},{text:this.$t("chamber.create.region"),value:"region",sortable:!1},{text:this.$t("chamber.create.industry"),value:"region",sortable:!1},{text:this.$t("chamber.select.operation"),value:"calories",align:"center",sortable:!1}]}},mounted:function(){this.readOrganization()},methods:i()({},Object(r.b)(["snackbarStateChange"]),{readOrganization:function(){var t=this;this.loading=!0,this.$http.get("public/organizations/user").then(function(a){t.organizations=a.data.content,t.loading=!1})},change:function(t){this.dialog=!0,this.itemId=t},deletes:function(){var t=this;this.$http.delete("manager/organizations/"+this.itemId,{headers:{"X-TENANT-ID":this.itemId}}).then(function(a){t.snackbarStateChange({color:"success",text:t.$t("message.delete_success"),snackbar:!0}),t.dialog=!1,t.readOrganization()}).catch(function(a){t.snackbarStateChange({color:"error",text:a.data.message,snackbar:!0})})},selectChamber:function(t){t.isApproved?this.$router.push({path:"/organization/"+t.id+"/dashboard"}):this.isApproved=!1}})},o={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-container",{attrs:{"grid-list-xl":"","text-xs-center":""}},[t.isApproved?e("v-card",{staticClass:"pa-4 pb-100 mt-80"},[e("div",{staticClass:"card-header card-header-icon card-header-rose"},[e("div",{staticClass:"card-icon"},[e("i",{staticClass:"material-icons"},[e("font",{staticStyle:{"vertical-align":"inherit"}},[e("font",{staticStyle:{"vertical-align":"inherit"}},[t._v("home")])],1)],1)]),t._v(" "),e("h4",{staticClass:"text-lg-left"},[e("font",{staticClass:"headline",staticStyle:{"vertical-align":"inherit"}},[e("font",{staticStyle:{"vertical-align":"inherit"}},[t._v(t._s(t.$t("chamber.select.my_coc"))+"\n          ")])],1),t._v(" "),e("span",{staticClass:"ml-3"},[e("span",{staticClass:"error--text font-weight-regular"},[t._v(" "+t._s(t.$t("chamber.prompt.title"))+": ")]),t._v(" "),e("span",{staticClass:"font-weight-regular ml-2"},[t._v(t._s(t.$t("chamber.prompt.add_coc_text")))])]),t._v(" "),e("v-btn",{staticStyle:{float:"right"},attrs:{small:"",color:"primary",to:"/organizations/create"}},[t._v(t._s(t.$t("chamber.btn.add_coc"))+"\n        ")])],1)]),t._v(" "),e("v-divider",{staticClass:"mt-4 py-1"}),t._v(" "),e("v-data-table",{staticClass:"rtable rtable--flip elevation-1",attrs:{headers:t.headers,items:t.organizations,"no-data-text":t.$t("message.no_message"),loading:t.loading,"hide-actions":""},scopedSlots:t._u([{key:"items",fn:function(a){return[e("td",{staticClass:"py-3 text-xs-left"},[e("img",{attrs:{src:t.$fileUrl+"/public/uploads/o/company/organization/"+a.item.id+"/"+a.item.logo,width:"50"}})]),t._v(" "),e("td",{staticClass:"text-xs-left"},[t._v(t._s(a.item.name))]),t._v(" "),e("td",{staticClass:"text-xs-left"},[t._v(t._s(a.item.contacts))]),t._v(" "),e("td",{staticClass:"text-xs-left"},[t._v(t._s(a.item.phone))]),t._v(" "),e("td",{staticClass:"text-xs-left"},[t._v(t._s(a.item.location.name))]),t._v(" "),e("td",{staticClass:"text-xs-left"},[t._v(t._s(a.item.industry.name))]),t._v(" "),e("td",{staticClass:"text-xs-center"},[e("v-tooltip",{attrs:{top:""}},[e("v-btn",{attrs:{slot:"activator",flat:"",icon:"",color:"purple darken-2"},on:{click:function(e){return t.selectChamber(a.item)}},slot:"activator"},[e("v-icon",{attrs:{size:"18"}},[t._v("visibility")])],1),t._v(" "),e("span",[t._v(t._s(t.$t("global.see_coc")))])],1),t._v(" "),e("v-tooltip",{attrs:{top:""}},[e("v-btn",{attrs:{slot:"activator",flat:"",icon:"",color:"primary",to:"/organizations/"+a.item.id+"/edit"},slot:"activator"},[e("v-icon",{attrs:{size:"18"}},[t._v("edit")])],1),t._v(" "),e("span",[t._v(t._s(t.$t("button.edit")))])],1),t._v(" "),e("v-tooltip",{attrs:{top:""}},[e("v-btn",{attrs:{slot:"activator",flat:"",icon:"",color:"error"},nativeOn:{click:function(e){return t.change(a.item.id)}},slot:"activator"},[e("v-icon",{attrs:{size:"18"}},[t._v("close")])],1),t._v(" "),e("span",[t._v(t._s(t.$t("button.delete")))])],1)],1)]}}],null,!1,3613581685)})],1):e("v-card",{staticClass:"pa-4 pb-100 mt-80 text-xs-center"},[e("div",{staticClass:"px-5 mb-3"},[e("v-icon",{attrs:{color:"primary",size:"100"}},[t._v("block")])],1),t._v(" "),e("p",[t._v(t._s(t.$t("chamber.prompt.settled_success")))]),t._v(" "),e("div",[e("v-btn",{attrs:{color:"primary"},on:{click:function(a){t.isApproved=!0}}},[t._v("返回企業管理")])],1)]),t._v(" "),e("v-layout",{attrs:{row:"","justify-center":""}},[e("v-dialog",{attrs:{persistent:"","max-width":"290"},model:{value:t.dialog,callback:function(a){t.dialog=a},expression:"dialog"}},[e("v-card",[e("v-card-title",{staticClass:"headline"},[t._v(t._s(t.$t("global.deleteConfirmTitle")))]),t._v(" "),e("v-card-text",{staticClass:"text-xs-left"},[t._v(t._s(t.$t("global.confirmedDeleteCoc")))]),t._v(" "),e("v-card-actions",[e("v-spacer"),t._v(" "),e("v-btn",{attrs:{color:"darken-1",flat:""},nativeOn:{click:function(a){t.dialog=!1}}},[t._v(t._s(t.$t("button.cancel")))]),t._v(" "),e("v-btn",{attrs:{color:"primary darken-1",flat:""},on:{click:function(a){return t.deletes()}}},[t._v(t._s(t.$t("button.confirm")))])],1)],1)],1)],1)],1)},staticRenderFns:[]};var c=e("VU/8")(n,o,!1,function(t){e("zB2U")},null,null);a.default=c.exports},zB2U:function(t,a){}});