webpackJsonp([19],{KUSF:function(t,e){},uTEG:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("Dd8w"),i=a.n(s),r=a("NYxO"),c={data:function(){return{page:1,filterpage:0,totalPages:0,orgId:null,actLoading:!0,items:[{text:this.$t("profile.home"),disabled:!1,href:"/company/home?id="+this.$route.query.id},{text:this.$t("cocShow.activity.coc_activity"),disabled:!0,href:"breadcrumbs_link_1"}],acts:[]}},computed:i()({currentDate:function(){return this.$moment(new Date)}},Object(r.c)(["company"])),methods:{actDetail:function(t,e){this.$router.push({path:"activity-detail",query:{id:t,actId:e}})},handleInput:function(t){this.page=t,this.filterpage=t-1,this.$router.push({path:"/company/activity",query:{id:this.orgId,page:this.filterpage}}),this.$vuetify.goTo(0,{duration:800,easing:"easeInOutCubic",offset:50}),this._initActivity()},_initActivity:function(){var t=this;this.actLoading=!0,this.$route.query.page=void 0!==this.$route.query.page?this.$route.query.page:0,this.$http.get("public/events?page="+this.$route.query.page+"&size=6&organizationId="+this.orgId+"&isApproved=true").then(function(e){t.acts=e.data.content,t.totalPages=e.data.totalPages,t.acts.forEach(function(e){e.totalNumber=0,e.eventTickets.forEach(function(t){e.totalNumber=e.totalNumber+t.vendition}),t.currentDate>e.startedAt&&t.currentDate<e.endedAt?e.timeStatus="global.conduct":t.currentDate>e.startedAt&&t.currentDate>e.endedAt?e.timeStatus="global.end":t.currentDate<e.startedAt&&(e.timeStatus="global.soon")}),t.actLoading=!1},function(t){})}},mounted:function(){this.page=void 0!==this.$route.query.page?Number(this.$route.query.page)+1:1,this.orgId=this.$route.query.id,this._initActivity()}},n={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"coco-show-activity activity"},[s("v-container",{attrs:{fluid:""}},[s("ul",{staticClass:"v-breadcrumbs pl-0 theme--light",attrs:{"data-v-52b79048":""}},[s("li",[s("router-link",{attrs:{to:"/",ss:"v-breadcrumbs__item"}},[t._v(t._s(t.$t("profile.home")))])],1),t._v(" "),s("li",{staticClass:"v-breadcrumbs__divider"},[t._v(">")]),t._v(" "),s("li",[s("router-link",{staticClass:"v-breadcrumbs__item",attrs:{to:"/company/home?code="+t.$route.query.id}},[t._v(t._s(t.company))])],1),t._v(" "),s("li",{staticClass:"v-breadcrumbs__divider"},[t._v(">")]),t._v(" "),s("li",[s("a",{staticClass:"v-breadcrumbs__item v-breadcrumbs__item--disabled",attrs:{disabled:"disabled",href:"breadcrumbs_link_1"}},[t._v(t._s(t.$t("cocShow.activity.coc_activity")))])])]),t._v(" "),s("v-layout",{attrs:{column:""}},[s("v-flex",{staticClass:"module-tabs text-xs-left"},[s("h3",{staticClass:" xspadding-0 grey--text text--darken-4 diamonds headline diamonds"},[t._v("\n          "+t._s(t.$t("cocShow.activity.coc_activity")))])]),t._v(" "),s("v-flex",{staticClass:"content py-3"},[t.actLoading?s("div",{staticClass:"text-xs-center"},[s("v-progress-circular",{attrs:{indeterminate:"",color:"primary"}})],1):t._e(),t._v(" "),t.acts.length?s("v-flex",{staticClass:"text-xs-left py-2",attrs:{xs12:""}},[s("v-layout",{attrs:{row:"",wrap:""}},t._l(t.acts,function(e,i){return s("v-flex",{key:i,staticClass:"cur-pointer",attrs:{"lg-5":"",md3:"",sm12:"",xs12:""},on:{click:function(a){return t.actDetail(e.organization.id,e.id)}}},[s("v-card",{staticClass:"hover-card text-xs-left elevation-0",staticStyle:{"background-color":"#f1f4f6"}},[s("div",{staticClass:"img-content"},[e.eventFiles.length>0?[s("img",{staticClass:"mx-auto img-responsive",attrs:{src:t.$fileUrl+"/public/uploads/o/company/event/"+e.id+"/"+e.eventFiles[0].key}})]:[s("img",{staticClass:"mx-auto img-responsive",attrs:{src:a("E3Gn")}})]],2),t._v(" "),s("div",{staticClass:"text"},[s("div",{staticClass:"activity_name"},[t._v(t._s(e.title))]),t._v(" "),s("div",{staticClass:"activity_time"},[t._v("活動時間：")]),t._v(" "),s("div",{staticClass:"grey--text lighten-1"},[t._v(t._s(e.createdAt.substr(0,4))+"."+t._s(e.createdAt.substr(5,2))+"."+t._s(e.createdAt.substr(8,2))+"—"+t._s(e.endedAt.substr(0,4))+"."+t._s(e.endedAt.substr(5,2))+"."+t._s(e.endedAt.substr(8,2)))]),t._v(" "),s("div",{staticClass:"signNumber"},[t._v("報名人數: "),s("span",{staticClass:"grey--text lighten-1"},[t._v(t._s(e.totalNumber)+"人")])]),t._v(" "),s("div",{staticClass:"sponsor"},[t._v("主辦機構："),s("span",{staticClass:"grey--text lighten-1"},[t._v(t._s(e.organization.name))])])])])],1)}),1)],1):t._e(),t._v(" "),t.acts.length||t.actLoading?t._e():s("v-layout",{staticClass:"py-5",attrs:{"align-center":"","justify-center":"",row:"","fill-height":""}},[s("v-flex",[s("v-icon",{attrs:{size:"120",color:"primary"}},[t._v("local_activity")]),t._v(" "),s("div",{staticClass:"blue-grey--text text--darken-3 subheading"},[t._v(t._s(t.$t("cocShow.home.no_coc_activity")))])],1)],1)],1),t._v(" "),t.acts.length?s("v-flex",[s("div",{staticClass:"text-xs-center"},[s("v-pagination",{attrs:{length:t.totalPages},on:{input:t.handleInput},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}})],1)]):t._e()],1)],1)],1)},staticRenderFns:[]};var o=a("VU/8")(c,n,!1,function(t){a("KUSF")},"data-v-adb3297c",null);e.default=o.exports}});