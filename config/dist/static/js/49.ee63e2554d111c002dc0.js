webpackJsonp([49],{"2XRY":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("Dd8w"),i=a.n(s),r=a("NYxO"),o=(a("OMJi"),{data:function(){var t=this;return{countries:[1,2,3,4,5,6,7,8,9,10,11,12],loading:!0,dialog:!1,dialog1:!1,form:!1,isLoading:!1,snackbarText:null,snackbar:!1,itemId:null,title:"chamber.btn.add_position",filters:{search:null,"organization.id":this.$route.params.organizationId,isDefault:!1,page:0,size:9},forms:{isDefault:!1,description:null,title:null},totalDesserts:0,totalPages:0,pagination:{sortBy:"createdAt"},rules:{required:function(e){return!!e||t.$t("validation.required")}},limit:[9],headers:[{text:this.$t("chamber.position.title"),align:"left",sortable:!1,value:"title"},{text:this.$t("chamber.position.description"),value:"description",sortable:!1},{text:this.$t("chamber.know.time"),value:"createdAt"},{text:this.$t("chamber.know.operation"),value:"operation",sortable:!1}],desserts:[]}},watch:{pagination:{handler:function(){var t=this,e=this.pagination.sortBy;this.desserts=this.desserts.sort(function(a,s){var i=a[e],r=s[e];return t.pagination.descending?i<r?1:i>r?-1:0:i<r?-1:i>r?1:0})},deep:!0}},mounted:function(){this.filters.page=void 0!==this.$route.query.page?Number(this.$route.query.page)-1:0,this.reloadTable()},methods:i()({},Object(r.b)(["snackbarStateChange"]),{reloadTable:function(){var t=this;this.loading=!0,null===this.filters.search&&delete this.filters.search,this.$http.get("manager/member_positions",{params:this.filters,headers:{"X-TENANT-ID":this.$route.params.organizationId}}).then(function(e){t.desserts=e.data.content,t.totalDesserts=e.data.totalElements,t.totalPages=e.data.totalPages,t.loading=!1})},change:function(t){this.dialog=!0,this.itemId=t},deletes:function(){var t=this;this.$http.delete("manager/member_positions/"+this.itemId,{headers:{"X-TENANT-ID":this.$route.params.organizationId}}).then(function(e){t.snackbarStateChange({color:"success",text:t.$t("message.delete_success"),snackbar:!0}),t.dialog=!1,t.reloadTable()}).catch(function(e){t.snackbarStateChange({color:"error",text:e.data.message,snackbar:!0})})},onSubmit:function(){var t=this;this.isLoading=!0,this.forms["organization.id"]=this.$route.params.organizationId;var e=void 0;void 0===this.forms.id?e="store_message":(delete this.forms.lastModifiedAt,delete this.forms.createdAt,delete this.forms.remark,e="update_message"),this.$http.post("manager/member_positions",this.$serialize(this.forms),{headers:{"X-TENANT-ID":this.$route.params.organizationId}}).then(function(a){t.snackbarStateChange({color:"success",text:t.$t("message."+e),snackbar:!0}),t.reloadTable(),t.dialog1=!1,t.isLoading=!1,t.forms={}}).catch(function(e){t.isLoading=!1,t.snackbarStateChange({color:"error",text:e,snackbar:!0})})},edieDialog:function(t){this.forms=t,this.dialog1=!0,this.title="chamber.btn.edit_position"},handleInput:function(t){this.pagination.page=t,this.$router.push({path:"/organization/"+this.$route.params.organizationId+"/positions",query:{page:t}}),this.filters.page=t-1,this.reloadTable()}})}),n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-layout",{staticClass:"mx-4 mt-2",attrs:{row:"",wrap:"","align-center":"","fill-height":""}},[a("v-flex",{attrs:{md3:"",sm6:""}},[a("v-text-field",{staticClass:"px3",attrs:{label:t.$t("global.search_text"),"prepend-icon":"search",px3:""},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.reloadTable()}},model:{value:t.filters.search,callback:function(e){t.$set(t.filters,"search",e)},expression:"filters.search"}})],1),t._v(" "),a("v-flex",{attrs:{md1:"",sm2:"","offset-sm4":"","offset-md8":""}},[a("v-btn",{attrs:{color:"primary"},on:{click:function(e){t.dialog1=!0,t.title="chamber.btn.add_position"}}},[t._v("\n        "+t._s(t.$t("chamber.btn.add_position"))+"\n      ")])],1)],1),t._v(" "),a("v-data-table",{staticClass:"rtable rtable--flip elevation-1",attrs:{"hide-actions":"",headers:t.headers,items:t.desserts,"no-data-text":t.$t("message.no_message"),pagination:t.pagination,"rows-per-page-items":t.limit,"total-items":t.totalDesserts,loading:t.loading},on:{"update:pagination":function(e){t.pagination=e}},scopedSlots:t._u([{key:"items",fn:function(e){return[a("td",[t._v(t._s(e.item.title))]),t._v(" "),a("td",{staticClass:"text-xs-left"},[t._v(t._s(e.item.description))]),t._v(" "),a("td",{staticClass:"text-xs-left"},[t._v(t._s(t._f("time")(e.item.createdAt)))]),t._v(" "),a("td",{staticClass:"text-md-center text-xs-left"},[a("v-tooltip",{attrs:{top:""}},[a("v-btn",{attrs:{slot:"activator",flat:"",icon:"",color:"primary"},on:{click:function(a){return t.edieDialog(e.item)}},slot:"activator"},[a("v-icon",{attrs:{size:"18"}},[t._v("edit")])],1),t._v(" "),a("span",[t._v(t._s(t.$t("button.edit")))])],1),t._v(" "),a("v-tooltip",{attrs:{top:""}},[a("v-btn",{attrs:{slot:"activator",flat:"",icon:"",color:"error"},nativeOn:{click:function(a){return t.change(e.item.id)}},slot:"activator"},[a("v-icon",{attrs:{size:"18"}},[t._v("close")])],1),t._v(" "),a("span",[t._v(t._s(t.$t("button.delete")))])],1)],1)]}}])},[t._v(" "),a("template",{slot:"footer"},[a("td",{staticClass:"px-0",attrs:{colspan:t.headers.length+1}},[a("v-pagination",{staticClass:"pull-right my-2",attrs:{circle:"","total-visible":7,length:t.totalPages},on:{input:t.handleInput},model:{value:t.filters.page+1,callback:function(e){t.$set(t.filters,"page+1",e)},expression:"filters.page+1"}})],1)])],2),t._v(" "),a("v-layout",{attrs:{row:"","justify-center":""}},[a("v-dialog",{attrs:{persistent:"","max-width":"290"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-card-title",{staticClass:"headline"},[t._v(t._s(t.$t("global.deleteConfirmTitle")))]),t._v(" "),a("v-card-text",[t._v(t._s(t.$t("global.deleteConfirmText")))]),t._v(" "),a("v-card-actions",[a("v-spacer"),t._v(" "),a("v-btn",{attrs:{color:"darken-1",flat:""},nativeOn:{click:function(e){t.dialog=!1}}},[t._v(t._s(t.$t("button.cancel")))]),t._v(" "),a("v-btn",{attrs:{color:"primary darken-1",flat:""},on:{click:function(e){return t.deletes()}}},[t._v(t._s(t.$t("button.confirm")))])],1)],1)],1)],1),t._v(" "),a("v-layout",{attrs:{row:"","justify-center":""}},[a("v-dialog",{attrs:{"max-width":"500px"},model:{value:t.dialog1,callback:function(e){t.dialog1=e},expression:"dialog1"}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"title"},[t._v(t._s(t.$t(t.title)))])]),t._v(" "),a("v-card-text",[a("v-container",{attrs:{"grid-list-md":""}},[a("v-form",{ref:"form",model:{value:t.form,callback:function(e){t.form=e},expression:"form"}},[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{xs12:""}},[a("v-text-field",{attrs:{color:"purple darken-2",label:t.$t("chamber.know.title"),rules:[t.rules.required],clearable:""},model:{value:t.forms.title,callback:function(e){t.$set(t.forms,"title",e)},expression:"forms.title"}})],1),t._v(" "),a("v-flex",{attrs:{xs12:""}},[a("v-textarea",{attrs:{counter:"3000",color:"purple darken-2",label:t.$t("chamber.know.content"),rules:[t.rules.required]},model:{value:t.forms.description,callback:function(e){t.$set(t.forms,"description",e)},expression:"forms.description"}})],1)],1)],1)],1)],1),t._v(" "),a("v-card-actions",[a("v-spacer"),t._v(" "),a("v-btn",{attrs:{color:"darken-1",flat:""},nativeOn:{click:function(e){t.dialog1=!1,t.forms={}}}},[t._v(t._s(t.$t("button.cancel")))]),t._v(" "),a("v-btn",{attrs:{color:"primary darken-1",disabled:!t.form,loading:t.isLoading,flat:""},nativeOn:{click:function(e){return t.onSubmit()}}},[t._v("\n            "+t._s(t.$t("button.save"))+"\n          ")])],1)],1)],1)],1)],1)},staticRenderFns:[]},l=a("VU/8")(o,n,!1,null,null,null);e.default=l.exports}});