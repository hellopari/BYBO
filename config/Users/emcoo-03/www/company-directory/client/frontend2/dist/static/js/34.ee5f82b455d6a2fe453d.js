webpackJsonp([34],{"W/2Z":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("Dd8w"),a=i.n(s),n=i("NYxO"),l={computed:a()({},Object(n.c)(["company"])),metaInfo:function(){return{title:this.newDetail.title?this.newDetail.title:"企業廣場",titleTemplate:"%s - 簡介__新聞_活動_企業廣場-企業管理和推廣平台",meta:[{name:"keywords",content:this.newDetail.title?this.newDetail.title:"企業廣場"},{name:"description",content:this.newDetail.content?this.newDetail.content:"企業廣場"},{name:"og:url",content:this.$fileUrl+"/company/new-detail?id="+this.orgId+"&newId="+this.newDetail.id},{name:"og:image",content:""+this.$fileUrl+this.metaImage}],htmlAttrs:{lang:"hk",amp:void 0}}},data:function(){return{orgId:null,newId:null,metaImage:null,newDetail:{},isLoading:!0}},methods:{_initNewDetail:function(){var t=this;this.isLoading=!0,this.$http.get("public/posts/"+this.newId).then(function(e){t.newDetail=e.data,t.metaImage=t.newDetail.postImages[0].key,t.isLoading=!1},function(t){})}},mounted:function(){this.orgId=this.$route.query.id,this.newId=this.$route.query.newId,this._initNewDetail()}},r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"coco-show-new-detail"},[i("v-container",{attrs:{fluid:""}},[i("ul",{staticClass:"v-breadcrumbs pl-0 theme--light"},[i("li",[i("router-link",{attrs:{to:"/",ss:"v-breadcrumbs__item"}},[t._v(t._s(t.$t("profile.home")))])],1),t._v(" "),i("li",{staticClass:"v-breadcrumbs__divider"},[t._v(">")]),t._v(" "),i("li",[i("router-link",{staticClass:"v-breadcrumbs__item",attrs:{to:"/company/home?code="+t.$route.query.id}},[t._v(t._s(t.company))])],1),t._v(" "),i("li",{staticClass:"v-breadcrumbs__divider"},[t._v(">")]),t._v(" "),i("li",[i("router-link",{staticClass:"v-breadcrumbs__item",attrs:{to:"/company/news?id="+t.$route.query.id}},[t._v(t._s(t.$t("global.hot_news")))])],1),t._v(" "),i("li",{staticClass:"v-breadcrumbs__divider"},[t._v(">")]),t._v(" "),i("li",[i("a",{staticClass:"v-breadcrumbs__item v-breadcrumbs__item--disabled",attrs:{disabled:"disabled",href:"breadcrumbs_link_1"}},[t._v(t._s(t.newDetail.title))])])]),t._v(" "),i("v-layout",{attrs:{column:""}},[t.isLoading?i("v-flex",{staticClass:"white mt-5"},[i("div",{staticClass:"text-xs-center"},[i("v-progress-circular",{attrs:{indeterminate:"",color:"primary"}})],1)]):t._e(),t._v(" "),t.newDetail.id?[i("v-flex",[i("h3",{staticClass:"headline"},[t._v(t._s(t.newDetail.title))])]),t._v(" "),i("v-flex",{staticClass:"mt-3 grey--text text--darken-1"},[i("div",{staticClass:"d-inline-block"},[i("v-icon",{attrs:{size:"20"}},[t._v("person")]),t._v(" "),i("span",{staticClass:"vertical-m ml-2"},[t._v(t._s(t.newDetail.organization.name))])],1),t._v(" "),i("div",{staticClass:"d-inline-block ml-3"},[i("v-icon",{attrs:{size:"20"}},[t._v("access_time")]),t._v(" "),i("span",{staticClass:"vertical-m ml-2"},[t._v(t._s(t.newDetail.createdAt))])],1)]),t._v(" "),i("v-flex",{staticClass:"text-xs-left mt-5 px-4 xspadding-0 subheading html-conent"},[i("div",{domProps:{innerHTML:t._s(t.newDetail.content)}})])]:t._e()],2)],1)],1)},staticRenderFns:[]};var c=i("VU/8")(l,r,!1,function(t){i("xyB0")},null,null);e.default=c.exports},xyB0:function(t,e){}});