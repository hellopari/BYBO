webpackJsonp([20],{G4rK:function(t,e){},Mf1D:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("Dd8w"),i=a.n(n),s=a("NYxO"),r={computed:i()({},Object(s.c)(["company"])),data:function(){return{page:1,filterpage:0,totalPages:0,orgId:null,anLoading:!0,announcements:[]}},methods:{noticeDetail:function(t,e){this.$router.push({path:"notice-detail",query:{id:t,noticeId:e}})},handleInput:function(t){this.page=t,this.filterpage=t-1,this.$router.push({path:"/company/notice",query:{id:this.orgId,page:this.filterpage}}),this.$vuetify.goTo(0,{duration:800,easing:"easeInOutCubic",offset:50}),this._initAnnouncements()},_initAnnouncements:function(){var t=this;this.anLoading=!0,this.$route.query.page=void 0!==this.$route.query.page?this.$route.query.page:0,this.$http.get("public/organizations/"+this.orgId+"/announcements?page="+this.$route.query.page+"&size=8&organization.id="+this.orgId).then(function(e){t.announcements=e.data.content,t.totalPages=e.data.totalPages,t.anLoading=!1},function(t){})}},mounted:function(){this.page=void 0!==this.$route.query.page?Number(this.$route.query.page)+1:1,this.orgId=this.$route.query.id,this._initAnnouncements()}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"coco-show-notice"},[a("v-container",{attrs:{fluid:""}},[a("ul",{staticClass:"v-breadcrumbs pl-0 theme--light",attrs:{"data-v-52b79048":""}},[a("li",[a("router-link",{attrs:{to:"/",ss:"v-breadcrumbs__item"}},[t._v(t._s(t.$t("profile.home")))])],1),t._v(" "),a("li",{staticClass:"v-breadcrumbs__divider"},[t._v(">")]),t._v(" "),a("li",[a("router-link",{staticClass:"v-breadcrumbs__item",attrs:{to:"/company/home?code="+t.$route.query.id}},[t._v(t._s(t.company))])],1),t._v(" "),a("li",{staticClass:"v-breadcrumbs__divider"},[t._v(">")]),t._v(" "),a("li",[a("a",{staticClass:"v-breadcrumbs__item v-breadcrumbs__item--disabled",attrs:{disabled:"disabled",href:"breadcrumbs_link_1"}},[t._v(t._s(t.$t("profile.notice")))])])]),t._v(" "),a("v-layout",{attrs:{column:""}},[a("v-flex",{staticClass:"module-tabs text-xs-left"},[a("h3",{staticClass:"grey--text text--darken-4 xspadding-0 diamonds headline diamonds"},[t._v(t._s(t.$t("profile.notice")))])]),t._v(" "),a("v-flex",{staticClass:"content py-3"},[t.anLoading?a("div",{staticClass:"text-xs-center"},[a("v-progress-circular",{attrs:{indeterminate:"",color:"primary"}})],1):t._e(),t._v(" "),t.announcements.length?a("v-layout",{staticClass:"text-xs-left  xspadding-0",attrs:{column:""}},[t._l(t.announcements,function(e,n){return a("v-flex",{key:n,staticClass:"notice-item mt-2 cur-pointer",on:{click:function(a){return t.noticeDetail(e.organization.id,e.id)}}},[a("h4",{staticClass:"title"},[t._v(t._s(e.title))]),t._v(" "),a("div",{staticClass:"grey--text text--darken-1 mt-2"},[t._v(t._s(e.createdAt))]),t._v(" "),a("div",{staticClass:" grey--text text--darken-1 mt-2 pb-2  text-no-wrap text-truncate "},[t._v(t._s(t._f("filterText")(e.content))+"\n            ")])])}),t._v(" "),a("v-flex",{staticClass:"mt-5"},[a("div",{staticClass:"text-xs-center"},[a("v-pagination",{attrs:{length:t.totalPages},on:{input:t.handleInput},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}})],1)])],2):t._e(),t._v(" "),t.announcements.length||t.anLoading?t._e():a("v-layout",{staticClass:"py-5",attrs:{"align-center":"","justify-center":"",row:"","fill-height":""}},[a("v-flex",[a("v-icon",{attrs:{size:"120",color:"primary"}},[t._v("announcement")]),t._v(" "),a("div",{staticClass:"blue-grey--text text--darken-3 subheading"},[t._v(t._s(t.$t("cocShow.notice.no_member_notice")))])],1)],1)],1)],1)],1)],1)},staticRenderFns:[]};var c=a("VU/8")(r,o,!1,function(t){a("G4rK")},"data-v-a298f94c",null);e.default=c.exports}});