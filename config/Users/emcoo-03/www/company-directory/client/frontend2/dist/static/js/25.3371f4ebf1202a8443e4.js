webpackJsonp([25],{H36y:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={metaInfo:{title:"活動列表",titleTemplate:"%s_企業廣場_企業管理和推廣平台",htmlAttrs:{lang:"hk",amp:void 0}},data:function(){return{loading:!1,model:null,search:null,page:1,filterpage:0,totalPages:0,acts:[],isLoading:!0,actTypes:[],selectArr:[],moreType:!1,actState:""}},computed:{currentDate:function(){return this.$moment(new Date)},reqSelectStr:function(){var t=void 0;if(this.$route.query.eventCategoryId){if("string"!=typeof this.$route.query.eventCategoryId){var e="";this.$route.query.eventCategoryId.forEach(function(t){e+=""+t}),t="&eventStatus="+this.actState+e}else t="&eventStatus="+this.actState+this.$route.query.eventCategoryId;return t}return""!==this.actState?"&eventStatus="+this.actState:""},anyType:function(){return this._NoChoose(this.actTypes)}},watch:{selectArr:function(){this.acts=[],this.$router.push({path:"/activity-list",query:{eventCategoryId:this.selectArr,page:this.filterpage}}),this._initActivity()},actState:function(){this.acts=[],this._initActivity()}},methods:{handleInput:function(t){this.page=t,this.filterpage=t-1,this.$router.push({path:"/activity-list",query:{eventCategoryId:this.selectArr,page:this.filterpage}}),this.$vuetify.goTo(600,{duration:800,easing:"easeInOutCubic",offset:50}),this._initActivity()},handleActState:function(t){this.actState=t},handleChoose:function(t){if(t.choose){var e="&eventCategoryId="+t.id,s=this.selectArr.findIndex(function(t){return t===e});this.selectArr.splice(s,1)}else this.selectArr.push("&eventCategoryId="+t.id);t.choose=!t.choose},actDetail:function(t,e){this.$router.push({path:"company/activity-detail",query:{id:t,actId:e}})},_NoChoose:function(t){return t.findIndex(function(t){return t.choose})},_initActivity:function(){var t=this;this.isLoading=!0,this.$route.query.page=void 0!==this.$route.query.page?this.$route.query.page:0,this.$http.get("public/events?page="+this.$route.query.page+"&size=15"+this.reqSelectStr+"&isApproved=true").then(function(e){t.acts=e.data.content,t.totalPages=e.data.totalPages,t.acts.forEach(function(e){e.totalNumber=0,e.eventTickets.forEach(function(t){e.totalNumber=e.totalNumber+t.vendition}),t.currentDate>e.startedAt&&t.currentDate<e.endedAt?e.timeStatus="global.conduct":t.currentDate>e.startedAt&&t.currentDate>e.endedAt?e.timeStatus="global.end":t.currentDate<e.startedAt&&(e.timeStatus="global.soon")}),t.isLoading=!1},function(t){})},_initActType:function(){var t=this;this.loading=!0,this.$http.get("public/event_categorys").then(function(e){var s=e.data.content;t.totalPages=e.data.totalPages,t.$route.query.eventCategoryId&&("string"!=typeof t.$route.query.eventCategoryId?s.forEach(function(e){t.$route.query.eventCategoryId.forEach(function(s){"&eventCategoryId="+e.id===s&&t.$set(e,"choose",!0)})}):s.forEach(function(e){t.$set(e,"choose",!1)})),t.actTypes=s,t.loading=!1},function(t){})}},mounted:function(){var t=this;this.page=void 0!==this.$route.query.page?Number(this.$route.query.page)+1:1,void 0!==this.$route.query.search?(this.isLoading=!0,this.$http.get("public/events?page="+this.filterpage+"&size=15&isApproved=true&search="+this.$route.query.search).then(function(e){t.acts=e.data.content,t.totalPages=e.data.totalPages,t.isLoading=!1},function(t){})):this._initActivity(),this._initActType()}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"activity-page home-page"},[a("v-container",{staticClass:"my-5 xsmt-5",attrs:{fluid:""}},[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{staticClass:"text-xs-left",attrs:{x12:""}},[a("div",{staticClass:"module-tabs"},[a("h4",{staticClass:"diamonds headline xspl-10"},[t._v(t._s(t.$t("navbar.activity_list")))])])])],1),t._v(" "),a("v-layout",{staticClass:"mt-3 hidden-sm-and-down",attrs:{row:"",wrap:""}},[a("v-flex",{staticClass:"text-xs-left",attrs:{x12:""}},[a("v-layout",{staticClass:"select-warp grey lighten-5 py-3 ",attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{xs1:""}},[a("v-layout",{attrs:{"align-center":"","justify-center":"",row:"","fill-height":""}},[a("v-flex",{staticClass:"text-xs-left mt-2 pl-4"},[t._v(t._s(t.$t("navbar.activity_state"))+"：")])],1)],1),t._v(" "),a("v-flex",{staticClass:"select-list text-xs-left",attrs:{xs10:""}},[a("ul",{staticClass:"pl-0"},[a("li",{staticClass:"select-box px-1 d-inline-block cur-pointer",on:{click:function(e){return t.handleActState("")}}},[a("div",{staticClass:"select-item py-2 px-4 mx-2 mt-2",class:{active:""===t.actState}},[t._v(t._s(t.$t("global.unlimited")))])]),t._v(" "),a("li",{staticClass:"select-box px-1 d-inline-block cur-pointer",on:{click:function(e){return t.handleActState("release")}}},[a("div",{staticClass:"select-item py-2 px-4 mx-2 mt-2",class:{active:"release"===t.actState}},[t._v(t._s(t.$t("cocShow.home.sign_up")))])]),t._v(" "),a("li",{staticClass:"select-box px-1 d-inline-block cur-pointer",on:{click:function(e){return t.handleActState("start")}}},[a("div",{staticClass:"select-item py-2 px-4 mx-2 mt-2",class:{active:"start"===t.actState}},[t._v(t._s(t.$t("cocShow.home.in_process")))])])])])],1),t._v(" "),a("v-divider"),t._v(" "),t.loading?a("v-layout",{staticClass:"select-warp white py-3",attrs:{row:"",wrap:""}},[a("v-progress-linear",{attrs:{indeterminate:!0}})],1):a("v-layout",{staticClass:"select-warp grey lighten-5 py-3",attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{xs1:""}},[a("v-layout",{attrs:{"align-center":"","justify-center":"",row:"","fill-height":""}},[a("v-flex",{staticClass:"text-xs-left mt-2 pl-4"},[t._v(t._s(t.$t("navbar.activity_type"))+"：")])],1)],1),t._v(" "),a("v-flex",{staticClass:"select-list text-xs-left",class:{auto:t.moreType},attrs:{xs10:""}},[a("ul",{staticClass:"pl-0"},[a("li",{staticClass:"select-box px-1 d-inline-block cur-pointer"},[a("div",{staticClass:"select-item py-2 px-4 mx-2 mt-2",class:{active:-1===t.anyType}},[t._v(t._s(t.$t("global.unlimited")))])]),t._v(" "),t._l(t.actTypes,function(e,s){return a("li",{key:s,staticClass:"select-box px-1 d-inline-block cur-pointer"},[a("div",{staticClass:"select-item py-2 px-4 mx-2 mt-2",class:{active:e.choose},on:{click:function(s){return t.handleChoose(e)}}},[t._v(t._s(e.name)+"\n                  "),e.choose?a("span",{staticClass:"item-close"},[t._v("x")]):t._e()])])})],2)]),t._v(" "),a("v-flex",{attrs:{xs1:""},on:{click:function(e){t.moreType=!t.moreType}}},[a("v-layout",{attrs:{"align-center":"","justify-center":"",row:"","fill-height":""}},[a("v-flex",{staticClass:"text-xs-center more cur-pointer",class:{active:t.moreType}},[t._v(t._s(t.$t("global.more")))])],1)],1)],1)],1)],1),t._v(" "),a("div",{staticClass:"wrap activity"},[a("div",{staticClass:"box-container"},[a("v-layout",{staticClass:"xsmt-5",attrs:{row:"",wrap:""}},[a("v-flex",{staticClass:"text-xs-left",attrs:{xs12:""}},[a("div",{staticClass:"module-tabs"},[a("h3",{staticClass:"diamonds headline"},[t._v(t._s(t.$t("profile.activities"))+" "),a("span",[t._v("ACTIVITIES")])])])]),t._v(" "),t.isLoading?a("v-flex",{staticClass:"white py-5",attrs:{xs12:""}},[a("div",{staticClass:"text-xs-center"},[a("v-progress-circular",{attrs:{indeterminate:"",color:"primary"}})],1)]):t._e(),t._v(" "),t.acts.length?a("v-flex",{staticClass:"text-xs-left py-2",attrs:{xs12:""}},[a("v-layout",{attrs:{row:"",wrap:""}},t._l(t.acts,function(e,i){return a("v-flex",{key:i,staticClass:"cur-pointer",attrs:{"lg-5":"",md3:"",sm12:"",xs12:""},on:{click:function(s){return t.actDetail(e.organization.id,e.id)}}},[a("v-card",{staticClass:"hover-card text-xs-left elevation-0",staticStyle:{"background-color":"#f1f4f6"}},[a("div",{staticClass:"img-content"},[e.eventFiles.length>0?[a("img",{staticClass:"mx-auto img-responsive",attrs:{src:t.$fileUrl+"/public/uploads/o/company/event/"+e.id+"/"+e.eventFiles[0].key}})]:[a("img",{staticClass:"mx-auto img-responsive",attrs:{src:s("E3Gn")}})]],2),t._v(" "),a("div",{staticClass:"text"},[a("div",{staticClass:"activity_name"},[t._v(t._s(e.title))]),t._v(" "),a("div",{staticClass:"activity_time"},[t._v("活動時間：")]),t._v(" "),a("div",{staticClass:"grey--text lighten-1"},[t._v(t._s(e.createdAt.substr(0,4))+"."+t._s(e.createdAt.substr(5,2))+"."+t._s(e.createdAt.substr(8,2))+"—"+t._s(e.endedAt.substr(0,4))+"."+t._s(e.endedAt.substr(5,2))+"."+t._s(e.endedAt.substr(8,2)))]),t._v(" "),a("div",{staticClass:"signNumber"},[t._v("報名人數: "),a("span",{staticClass:"grey--text lighten-1"},[t._v(t._s(e.totalNumber)+"人")])]),t._v(" "),a("div",{staticClass:"sponsor"},[t._v("主辦機構："),a("span",{staticClass:"grey--text lighten-1"},[t._v(t._s(e.organization.name))])])])])],1)}),1)],1):t._e(),t._v(" "),a("v-layout",[t.acts.length&&!t.isLoading?a("v-flex",{staticClass:"mt-5 text-xs-center",attrs:{x12:""}},[a("v-pagination",{attrs:{length:t.totalPages},on:{input:t.handleInput},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}})],1):t._e()],1)],1)],1)])],1)],1)},staticRenderFns:[]};var r=s("VU/8")(a,i,!1,function(t){s("KVBl")},"data-v-6136972c",null);e.default=r.exports},KVBl:function(t,e){}});