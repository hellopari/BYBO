webpackJsonp([5],{wp4a:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("Dd8w"),i=e.n(s),n=e("YaEn"),o=e("NYxO"),r={metaInfo:function(){return{title:this.ptofile.name,titleTemplate:"%s - 企業管理和推廣平台",htmlAttrs:{lang:"hk",amp:void 0}}},components:{"my-upload":e("bTAJ").a},data:function(){var t=this;return{dialog1:!1,userId:sessionStorage.getItem("userId"),show:!1,form:!0,show1:!1,show2:!1,show3:!1,dialog:!1,isLoading:!1,loading:!1,drawer:null,imgDataUrl:null,dialogm1:null,icon:"home",ptofile:{email:null,avatar:null},items:n.c[0].children,rules:{required:function(a){return!!a||t.$t("validation.required")},min:function(a){return a>=6||t.$t("validation.min")+"6"}},updatePassword:{userId:sessionStorage.getItem("userId"),oldPassword:null,newPassword:null,confirmPassword:null}}},props:{source:String},computed:i()({},Object(o.c)(["snackbarSetting","imagesToUpload"])),mounted:function(){this.readUsers(),this.readProfile()},methods:i()({},Object(o.b)(["snackbarStateChange","iscustomerLoginChange"]),{changLang:function(t){localStorage.setItem("i18n",t),this.$i18n.locale=t},route:function(t,a){this.$router.push({path:"/users/"+this.$route.params.userId+"/"+t}),this.icon=a},goTo:function(t){this.$router.push({path:t})},searchOrg:function(){null!==this.search&&(location.href="/company-list?search="+this.search)},readUsers:function(){var t=this;this.loading=!0,this.$http.get("user/users/"+this.$route.params.userId).then(function(a){t.ptofile.email=a.data.email,sessionStorage.setItem("email",a.data.email),t.loading=!1})},back:function(){this.$router.back()},readProfile:function(){var t=this;this.loading=!0,this.$http.get("user/user/"+this.$route.params.userId+"/profiles").then(function(a){a.data.content.length>0&&(t.ptofile=a.data.content[0]),t.loading=!1})},cropSuccess:function(t,a){var e=this;this.imgDataUrl=t,setTimeout(function(){e.upload()},100)},upload:function(){for(var t=this,a=new FormData,e=0,s=this.imagesToUpload.length;e<s;e++)a.append(this.imagesToUpload[e].key,this.imagesToUpload[e].value,"covers"+e+".png");a.append("user.id",this.$route.params.userId),a.append("size",10),this.$http.post("user/user/"+this.$route.params.userId+"/profiles/update_image",a).then(function(a){t.snackbarStateChange({color:"success",text:"更新封面圖成功",snackbar:!0}),t.ptofile=a.data,t.$store.commit("clearImagesToUpload"),t.$store.commit("clearFilesToUpload"),t.isLoading=!1}).catch(function(a){t.snackbarStateChange({color:"error",text:a.data.message,snackbar:!0}),t.isLoading=!1})},onSubmit:function(){var t=this;this.updatePassword.newPassword!==this.updatePassword.confirmPassword?this.snackbarStateChange({color:"error",text:"密碼不一致",snackbar:!0}):(this.isLoading=!0,this.$http.put("user/users",this.$serialize(this.updatePassword)).then(function(a){t.snackbarStateChange({color:"success",text:t.$t("message.update_message"),snackbar:!0}),t.dialog1=!1,t.isLoading=!1}).catch(function(a){t.isLoading=!1,t.snackbarStateChange({color:"error",text:a.data.message,snackbar:!0})}))},logout:function(){localStorage.clear(),window.location.href="https://id.yoov.com/logout",this.$router.push({path:"/"}),this.iscustomerLoginChange(!1),this.snackbarStateChange({color:"success",text:this.$t("退出成功"),snackbar:!0})}})},l={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-app",{attrs:{id:"users"}},[e("v-navigation-drawer",{attrs:{clipped:t.$vuetify.breakpoint.lgAndUp,fixed:"",app:""},model:{value:t.drawer,callback:function(a){t.drawer=a},expression:"drawer"}},[e("v-toolbar",{staticClass:"transparent",attrs:{flat:""}},[e("v-list",{staticClass:"pa-0"},[e("v-list-tile",{attrs:{avatar:""}},[e("v-list-tile-avatar",[t.ptofile.avatar?e("img",{attrs:{src:t.$fileUrl+"/public/uploads/o/company/user/"+this.$route.params.userId+"/"+t.ptofile.avatar}}):e("v-avatar",{attrs:{color:"grey"}},[e("v-icon",{attrs:{dark:""}},[t._v("account_circle")])],1)],1),t._v(" "),e("div",{staticClass:"text-no-wrap text-truncate",staticStyle:{width:"60%"}},[e("v-list-tile-title",[t._v(t._s(t.ptofile.email))])],1),t._v(" "),e("v-list-tile-action",[e("v-btn",{attrs:{icon:""},on:{click:function(a){a.stopPropagation(),t.show=!0}}},[e("v-icon",[t._v("chevron_right")])],1)],1)],1)],1)],1),t._v(" "),e("v-list",{attrs:{dense:""}},[t._l(t.items,function(a){return[a.heading?e("v-layout",{key:a.heading,attrs:{row:"","align-center":""}},[e("v-flex",{attrs:{xs6:""}},[a.heading?e("v-subheader",[t._v("\n              "+t._s(a.heading)+"\n            ")]):t._e()],1),t._v(" "),e("v-flex",{staticClass:"text-xs-center",attrs:{xs6:""}},[e("a",{staticClass:"body-2 black--text",attrs:{href:"#!"}},[t._v("EDIT")])])],1):a.children?e("v-list-group",{key:a.text,attrs:{"prepend-icon":a.model?a.icon:a["icon-alt"],"append-icon":""},model:{value:a.model,callback:function(e){t.$set(a,"model",e)},expression:"item.model"}},[e("v-list-tile",{attrs:{slot:"activator"},slot:"activator"},[e("v-list-tile-content",[e("v-list-tile-title",[t._v("\n                "+t._s(t.$t(a.name))+"\n              ")])],1)],1),t._v(" "),t._l(a.children,function(s,i){return e("v-list-tile",{key:i},[s.icon?e("v-list-tile-action",[e("v-icon",[t._v(t._s(s.icon))])],1):t._e(),t._v(" "),e("v-list-tile-content",[e("v-list-tile-title",[t._v("\n                "+t._s(t.$t(a.name))+"\n              ")])],1)],1)})],2):e("v-list-tile",{key:a.text,on:{click:function(e){return t.route(a.path,a.icon)}}},[e("v-list-tile-action",[e("v-icon",[t._v(t._s(a.icon))])],1),t._v(" "),e("v-list-tile-content",[e("v-list-tile-title",[t._v("\n              "+t._s(t.$t(a.name))+"\n            ")])],1)],1)]})],2)],1),t._v(" "),e("v-toolbar",{attrs:{"clipped-left":t.$vuetify.breakpoint.lgAndUp,color:"#2c7a90",dark:"",app:"",fixed:""}},[e("v-toolbar-title",{staticClass:"ml-0 pl-3",staticStyle:{width:"300px","text-align":"left"}},[e("v-toolbar-side-icon",{on:{click:function(a){a.stopPropagation(),t.drawer=!t.drawer}}}),t._v(" "),e("v-btn",{staticClass:" white--text",attrs:{flat:"",small:"",to:"/"}},[t._v("YOOV\n      ")])],1),t._v(" "),e("v-text-field",{staticClass:"hidden-sm-and-down",attrs:{flat:"","solo-inverted":"","hide-details":"","prepend-inner-icon":"search",label:t.$t("global.search_text")},on:{keyup:function(a){return!a.type.indexOf("key")&&t._k(a.keyCode,"enter",13,a.key,"Enter")?null:t.searchOrg(t.search)}}}),t._v(" "),e("v-spacer"),t._v(" "),e("v-menu",{attrs:{"offset-y":"",light:"",transition:"scale-transition"}},[e("v-btn",{attrs:{slot:"activator",light:"",icon:""},slot:"activator"},[e("v-icon",{attrs:{color:"#fff"}},[t._v("apps")])],1),t._v(" "),e("v-list",[e("v-list-tile",{attrs:{to:"/users/"+this.userId+"/home"}},[e("v-list-tile-title",[t._v(" "+t._s(t.$t("navbar.user_center"))+"\n          ")])],1),t._v(" "),e("v-list-tile",{on:{click:function(a){return t.logout()}}},[e("v-list-tile-title",[t._v("\n            "+t._s(t.$t("navbar.logout"))+"\n          ")])],1)],1)],1),t._v(" "),e("v-menu",{staticClass:"hidden-sm-and-down",attrs:{"offset-y":""}},[e("v-btn",{staticClass:"subheading",attrs:{slot:"activator",flat:""},slot:"activator"},[t._v("\n        "+t._s(t.$t("lang."+t.$i18n.locale))+"\n      ")]),t._v(" "),e("v-list",[e("v-list-tile",{on:{click:function(a){return t.changLang("CN")}}},[e("v-list-tile-title",[t._v("\n            "+t._s(t.$t("lang.CN"))+"\n          ")])],1),t._v(" "),e("v-list-tile",{on:{click:function(a){return t.changLang("EN")}}},[e("v-list-tile-title",[t._v("\n            "+t._s(t.$t("lang.EN"))+"\n          ")])],1),t._v(" "),e("v-list-tile",{on:{click:function(a){return t.changLang("HK")}}},[e("v-list-tile-title",[t._v("\n            "+t._s(t.$t("lang.HK"))+"\n          ")])],1)],1)],1)],1),t._v(" "),e("v-content",{attrs:{"data-app":""}},[e("div",{staticClass:"card",attrs:{"data-app":""}},[e("div",{staticClass:"card-header card-header-success card-header-icon"},[e("div",{staticClass:"card-icon"},[e("v-icon",[t._v(t._s(t.icon))])],1),t._v(" "),e("h4",{staticClass:"card-title"},[t.$route.meta.isBack?e("v-btn",{attrs:{flat:"",icon:"",color:"primary"},on:{click:function(a){return t.back()}}},[e("v-icon",[t._v("arrow_back")])],1):t._e(),t._v("\n          "+t._s(t.$t(t.$route.name))+"\n        ")],1)]),t._v(" "),e("router-view",{staticClass:"router-view",attrs:{"data-app":""}})],1)]),t._v(" "),e("v-snackbar",{attrs:{timeout:3e3,top:"top",color:t.snackbarSetting.color},model:{value:t.snackbarSetting.snackbar,callback:function(a){t.$set(t.snackbarSetting,"snackbar",a)},expression:"snackbarSetting.snackbar"}},[t._v("\n    "+t._s(t.snackbarSetting.text)+"\n    "),e("v-btn",{attrs:{flat:""},on:{click:function(a){t.snackbarSetting.snackbar=!1}}},[t._v("\n      Close\n    ")])],1),t._v(" "),e("my-upload",{ref:"file",attrs:{field:"file",width:100,height:100,"img-format":"png"},on:{"crop-success":t.cropSuccess},model:{value:t.show,callback:function(a){t.show=a},expression:"show"}}),t._v(" "),e("v-layout",{attrs:{row:"","justify-center":""}},[e("v-dialog",{attrs:{persistent:"","max-width":"400px"},model:{value:t.dialog1,callback:function(a){t.dialog1=a},expression:"dialog1"}},[e("v-card",[e("v-card-title",[e("span",{staticClass:"title"},[t._v(t._s(t.$t("navbar.revise_password")))])]),t._v(" "),e("v-card-text",[e("v-container",{attrs:{"grid-list-md":""}},[e("v-form",{ref:"form",model:{value:t.form,callback:function(a){t.form=a},expression:"form"}},[e("v-layout",{attrs:{row:"",wrap:""}},[e("v-flex",{attrs:{xs12:""}},[e("v-text-field",{attrs:{"append-icon":t.show1?"visibility_off":"visibility",rules:[t.rules.required,t.rules.min],type:t.show1?"text":"password",name:"input-10-1",label:t.$t("auth.oldPassword"),hint:"At least 6 characters",counter:""},on:{"click:append":function(a){t.show1=!t.show1}},model:{value:t.updatePassword.oldPassword,callback:function(a){t.$set(t.updatePassword,"oldPassword",a)},expression:"updatePassword.oldPassword"}})],1),t._v(" "),e("v-flex",{attrs:{xs12:""}},[e("v-text-field",{attrs:{"append-icon":t.show2?"visibility_off":"visibility",rules:[t.rules.required,t.rules.min],type:t.show2?"text":"password",name:"input-10-1",label:t.$t("auth.password"),hint:"At least 6 characters",counter:""},on:{"click:append":function(a){t.show2=!t.show2}},model:{value:t.updatePassword.newPassword,callback:function(a){t.$set(t.updatePassword,"newPassword",a)},expression:"updatePassword.newPassword"}})],1),t._v(" "),e("v-flex",{attrs:{xs12:""}},[e("v-text-field",{attrs:{"append-icon":t.show3?"visibility_off":"visibility",rules:[t.rules.required,t.rules.min],type:t.show3?"text":"password",name:"input-10-1",label:t.$t("auth.verifyPassword"),hint:"At least 6 characters",counter:""},on:{"click:append":function(a){t.show3=!t.show3}},model:{value:t.updatePassword.confirmPassword,callback:function(a){t.$set(t.updatePassword,"confirmPassword",a)},expression:"updatePassword.confirmPassword"}})],1)],1)],1)],1)],1),t._v(" "),e("v-card-actions",[e("v-spacer"),t._v(" "),e("v-btn",{attrs:{color:"darken-1",flat:""},nativeOn:{click:function(a){t.dialog1=!1}}},[t._v(t._s(t.$t("button.cancel")))]),t._v(" "),e("v-btn",{attrs:{color:"primary darken-1",disabled:!t.form,loading:t.isLoading,flat:""},nativeOn:{click:function(a){return t.onSubmit()}}},[t._v("\n            "+t._s(t.$t("button.save"))+"\n          ")])],1)],1)],1)],1)],1)},staticRenderFns:[]},c=e("VU/8")(r,l,!1,null,null,null);a.default=c.exports}});