<template>


  <div class="main">
    <!--header-->
    <div id="lg_header">

      <!--C端头部黑色导航-->
      <div id="lg_tbar">

        <div class="inner">

          <ul class="lg_tbar_l">
            <li class="pull-left" style="float: left">
              <router-link to="/"><img src="./../../../../static/img/logo/phone_logo.png" style="width: 25px" alt="">
              </router-link>
            </li>
            <li>
              <router-link class="white--text" to="/company-list">
                {{$t("navbar.coc_list")}}
              </router-link>
            </li>
            <li>
              <router-link class="white--text" to="/product-list">
                {{$t("navbar.product_list")}}
              </router-link>
            </li>
            <li>
              <router-link class="white--text" to="/news-list">
                {{$t("navbar.news_list")}}
              </router-link>
            </li>
            <li>
              
              <router-link class="white--text" to="/activity-list">
                {{$t("navbar.activity_list")}}
              </router-link>
            </li>
          </ul>
          <ul class="lg_tbar_r">
            <li v-if="!isAuthenticated">
              <a @click="login('/implicit/callback')"
                 rel="nofollow">
                {{ $t("navbar.login") }}
              </a>
            </li>
            <li v-if="!isAuthenticated">
              <a @click="login('/enterprise/callback')"
                 rel="nofollow">{{ $t("navbar.cocLogin") }}</a>
            </li>
            <li v-if="iscustomerLogin">
              <router-link :to="`/users/${this.userId}/home`"
                           rel="nofollow">{{$t('navbar.user_center')}}
              </router-link>
            </li>
            <li v-if="isOrganizationLogin">
              <a class="cursor-p" @click="readOrganization()"
                 rel="nofollow">{{$t('navbar.back_coc_center')}}</a>
            </li>
            <li>
              <v-menu
                class="hidden-sm-and-down"
                style="    height: 27px;"
              >
                <v-btn
                  style="    padding: 0;
    height: 20px; color:#fff;font-weight: inherit;font-size: 14px;margin-top: 3px"
                  flat

                  slot="activator"
                >
                  {{$t(`lang.${$i18n.locale}`)}}
                </v-btn>
                <v-list>
                  <v-list-tile @click="changLang('CN')">
                    <v-list-tile-title>
                      {{$t('lang.CN')}}
                    </v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile @click="changLang('EN')">
                    <v-list-tile-title>
                      {{$t('lang.EN')}}
                    </v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile @click="changLang('HK')">
                    <v-list-tile-title>
                      {{$t('lang.HK')}}
                    </v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </li>
          </ul>
        </div>
      </div><!--end #lg_tbar-->


      <!--C端头部白色导航-->
      <div id="lg_tnav">

        <div class="inner">
          <v-toolbar style="box-shadow:none;padding: 0" class="px-0 white">
            <v-toolbar-side-icon class="hidden-md-and-up" @click.stop="drawer = !drawer"
            ></v-toolbar-side-icon>
            <v-toolbar-title class="px-0">
              <router-link to="/" class="lg_logo">

                <template v-if="orgData.logo !== null">
                  <img :src="`${$fileUrl}/public/uploads/o/company/organization/${orgData.id}/${orgData.logo}`"
                       lazy-src="./../../../../../static/img/blank.png"
                       style="height: 50px;"
                  >
                </template>
                <template v-else>
                  <img src="./../../../../static/img/lazy/logo.png"
                    lazy-src="./../../../../../static/img/blank.png"
                       style="height: 50px;"
                  >
                </template>
              </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
              <v-btn flat :to="{ path: '/company/home', query: { code: orgData.id}}">{{$t('profile.home')}}</v-btn>
              <v-btn flat :to="{ path: '/company/framework', query: { id: orgData.id}}">
                {{$t('cocShow.framework.introduction_coc')}}
              </v-btn>
              <v-btn flat :to="{ path: '/company/news', query: { id: orgData.id}}">{{$t('profile.news')}}</v-btn>
              <v-btn flat :to="{ path: '/company/activity', query: { id: orgData.id}}">{{$t('profile.activities')}}
              </v-btn>
              <v-btn flat :to="{ path: '/company/products', query: { id: orgData.id}}">{{$t('chamber.left.know')}}
              </v-btn>
              <v-btn flat :to="{ path: '/company/notice', query: { id: orgData.id}}">{{$t('chamber.left.notice')}}
              </v-btn>
              <template v-for="item in tabs">
                <v-btn
                  flat
                  @click="go({ path: '/company/link', query: { id: item.id}})"
                >{{item.title}}
                </v-btn>
              </template>
            </v-toolbar-items>
          </v-toolbar>


        </div>

      </div><!--end #lg_tnav-->


    </div>
    <!--header-->

    <!-- 主体 -->
    <main style="min-height: 320px;">
      <v-app class="white">
        <v-content>
          <div class="py-2 box-container">
            <v-app class="white">
              <div class="company-page">
                <v-container
                  fluid
                  class=" xsmt-5"
                >
                  <!-- 头部信息部分开始 -->


                  <!-- 头部信息部分结束 -->


                  <!-- tab结束 -->
                  <!-- 轮播开始 -->
                  <v-layout
                    row
                    wrap
                    class="mt-5 xsShowCarousel"
                    v-if="isShowCarousel"
                  >
                    <v-flex
                      xs12
                      v-if="slideLoading"
                    >
                      <!-- 加载器-->
                      <div class="fakeItem animated-background ">
                        <h2></h2>
                        <h3></h3>
                        <p></p>
                      </div>
                      <!-- 加载器-->
                    </v-flex>

                    <v-flex
                      xs12
                      v-if="slides.length"
                    >
                      <v-carousel
                        hide-delimiters
                        interval="4000"
                      >
                        <v-carousel-item
                          v-for="(slide, index) of slides"
                          :key="index"
                        >
                          <v-img
                            :src="`${$fileUrl}/public/uploads/o/company/slideShow/${slide.id}/${slide.key}`"
                            lazy-src="./../../../../static/img/blank.png"
                            style="height: 100%;"
                          >
                          </v-img>
                          <a
                            :href="slide.url"
                            target="_blank"
                            class="slide-title"
                          >{{slide.title}}</a>
                        </v-carousel-item>
                      </v-carousel>
                    </v-flex>

                    <v-flex
                      xs12
                      v-if="!slides.length && !slideLoading"
                      class="no-data"
                    >
                      <v-layout
                        align-center
                        justify-center
                        row
                        fill-height
                        class="white"
                      >
                        <v-flex>
                          <v-icon
                            size="120"
                            color="primary"
                          >slideshow
                          </v-icon>
                          <div class="blue-grey--text text--darken-3 subheading">
                            {{$t('user.user_baseinfo.no_cocCarousel')}}
                          </div>
                        </v-flex>
                      </v-layout>
                    </v-flex>

                  </v-layout>
                  <!-- 轮播结束 -->

                  <v-layout
                    row
                    wrap
                  >
                    <!-- 视图 -->
                    <v-flex
                      xs12
                    >
                      <router-view class="white xspadding-0 view-wrap py-4"></router-view>
                    </v-flex>
                    <!-- 视图 -->


                  </v-layout>

                </v-container>
                <v-btn
                  fab
                  bottom
                  right
                  color="primary"
                  v-if="orgData.openMessage"
                  dark
                  fixed
                  @click="openModel()"
                >
                  <v-icon>message</v-icon>
                </v-btn>

                <!-- 添加修改模態框 -->
                <v-layout
                  row
                  justify-center
                >
                  <v-dialog
                    v-model="dialog"
                    persistent
                    max-width="500px"
                  >
                    <v-card>
                      <v-card-title>
                        <span class="title">{{$t('global.reply')}}</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container grid-list-md>
                          <v-form
                            ref="form"
                            v-model="form"
                          >
                            <v-layout
                              row
                              wrap
                            >
                              <v-flex xs12>
                                <v-text-field
                                  color="purple darken-2"
                                  v-model="forms.title"
                                  :label="$t('chamber.know.title')"
                                  :rules="[vaild.required]"
                                  clearable
                                ></v-text-field>
                              </v-flex>

                              <v-flex xs12>
                                <v-textarea
                                  counter="3000"
                                  color="purple darken-2"
                                  :label="$t('chamber.know.content')"
                                  :rules="[vaild.required]"
                                  v-model="forms.leavingMessage"
                                ></v-textarea>
                              </v-flex>
                            </v-layout>
                          </v-form>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="darken-1"
                          flat
                          @click.native="dialog = false"
                        >{{$t('button.cancel')}}
                        </v-btn>
                        <v-btn
                          color="primary darken-1"
                          :disabled="!form"
                          :loading="isLoading"
                          flat
                          @click.native="onSubmit()"
                        >{{$t('button.save')}}
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-layout>

              </div>
            </v-app>
          </div>
        </v-content>
      </v-app>
    </main>
    <!-- 主体 -->
    <!--footer-->

    <v-footer
      dark
      class="primary"
      height="auto"
    >
      <v-layout
        row
        wrap
        class=" pt-3"
      >
        <v-flex
          xl8
          offset-xl2
          lg10
          offset-lg1
          md10
          offset-md1
          sm10
          offset-sm1
          xs10
          offset-xs1
        >
          <v-card
            flat
            tile
            class="primary text-xs-left box-container"
          >
            <div style="text-align:center">
              <img
              src="./../../../../static/img/trans_logo.png"
              width="160"
              class="mt-3"
              contain
              style="cursor: pointer"
            >
            </img>
            </div>
          </v-card>
        </v-flex>



        <v-flex
          xl8
          offset-xl2
          lg10
          offset-lg1
          md10
          offset-md1
          sm10
          offset-sm1
          xs10
          offset-xs1

        >
          <v-card
            flat
            tile
            class="primary text-xs-left box-container"
          >
            <div style="text-align:center;margin-bottom:36px;">
              <v-btn
                flat
                class="subheading"
                to="/supplement/service_agreement"
              >{{ $t("global.Service") }}
              </v-btn>
              <v-btn
                flat
                class="subheading"
                to="/supplement/abouts"
              >{{ $t("global.abouts") }}
              </v-btn>
              <v-btn
                flat
                class="subheading"
                to="/supplement/contacts"
              >{{ $t("global.contacts") }}
              </v-btn>
            </div>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-divider></v-divider>
        </v-flex>
        <v-flex xs12 class="text-xs-center py-2 copyright">
          Copyright © 2019 YOOV. All Rights Reserved. Version V1.1.3
        </v-flex>

      </v-layout>
    </v-footer>
    <!--footer-->
    <v-layout
      wraps
      style="background: #fff;"
    >
      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <v-toolbar flat>
          <v-list class="primary">
            <v-list-tile>
              <v-list-tile-title class="title text-xs-center white--text">
                企業廣場
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-toolbar>

        <v-divider></v-divider>

        <v-list class="pt-1"
                dense>
          <v-list-tile :to="{ path: '/company/home', query: { code: orgData.id}}"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{$t('profile.home')}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile :to="{ path: '/company/framework', query: { id: orgData.id}}"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{$t('cocShow.framework.introduction_coc' )}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile :to="{ path: '/company/news', query: { id: orgData.id}}"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{$t('profile.news')}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile :to="{ path: '/company/activity', query: { id: orgData.id}}"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{$t('profile.activities')}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile :to="{ path: '/company/products', query: { id: orgData.id}}"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{$t('chamber.left.know')}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile :to="{ path: '/company/notice', query: { id: orgData.id}}"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{$t('chamber.left.notice')}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </div>
</template>

<script>
  import {mapState, mapMutations} from "vuex";

  export default {
    metaInfo() {
      return {
        title: this.orgData.name ? this.orgData.name : "企業廣場",
        titleTemplate: "%s - 簡介__新聞_活動_企業廣場-企業管理和推廣平台",
        meta: [
          {
            name: "keywords",
            content: this.orgData.name ? this.orgData.name : "企業廣場"
          },
          {
            name: "description",
            content: this.orgData.description
              ? this.orgData.description
              : "企業廣場"
          },
          {
            name: "og:url",
            content: `${this.$fileUrl}/company/home?id=${this.orgData.id}`
          },
          {
            name: "og:image",
            content: `${this.$fileUrl}${this.orgData.logo}`
          }
        ],
        htmlAttrs: {
          lang: "hk",
          amp: undefined // "amp" has no value
        }
      };
    },
    data() {
      return {
        tab: "", //tab值
        orgId: null, //商会id
        orgData: {}, //商会数据
        headLoading: true,
        ruleLoading: true,
        anLoading: true,
        isLoading: false,
        drawer: false,
        isAuthenticated: false,
        form: true,
        slideLoading: true,
        dialog: false,
        btnName: "cocShow.navbar.apply_into_coc",
        isMember: {},
        slides: [],
        rules: [],
        tabs: [],
        announcements: [],
        userId: sessionStorage.getItem("userId"),
        forms: {
          "user.id": sessionStorage.getItem("userId"),
          title: null,
          isActive: true,
          "organization.id": this.$route.query.code?this.$route.query.code:this.$route.query.id,
          leavingMessage: null
        },
        vaild: {
          required: value => !!value || "Required."
        }
      };
    },
    computed: {
      //是否展示轮播
      isShowCarousel() {
        let path = this.$route.path;
        let result = path.slice(path.lastIndexOf("/") + 1);
        return result === "home";
      },
      ...mapState(["isOrganizationLogin", "iscustomerLogin"])
    },
    methods: {
      ...mapMutations(["snackbarStateChange", "iscustomerLoginChange",
        "isOrganizationLoginChange","setCompanyData"]),
      login(callback) {
        this.$auth.loginRedirect(callback);
      },
      async openModel() {
        if (await this.$auth.isAuthenticated()) {
          if (sessionStorage.getItem("role") === "user") {
            this.dialog = true;
            await this.$http.get(`user/user/${this.userId}/profiles`).then(res => {
              this.forms["email"] = res.data.content[0].email;
              this.forms["phone"] = res.data.content[0].phone;
              this.forms["contacts"] = res.data.content[0].name;
            });
          } else {
            this.snackbarStateChange({
              color: "error",
              text: "請退出重新登錄您的用戶賬號",
              snackbar: true
            });
          }
        } else {
          this.$auth.loginRedirect("/implicit/callback");
        }
      },
      readEnterprises() {
        this.$http
          .get(`public/user/${this.userId}/enterprises`, {
            params: {"user.id": this.userId},
          })
          .then(res => {
            if (res.data.content.length > 0) {
              this.readOrganization();
            } else {
              this.$router.push({
                path: `/organizations/${this.userId}/settled`
              });
            }
          });
      },
      readOrganization() {
        this.$http.get(`public/organizations/user`).then(res => {
          if (res.data.content.length > 0) {
            this.$router.push({
              path: `/organizations/select`
            });
          } else {
            this.$router.push({
              path: `/organizations/create`
            });
          }
        });
      },
      onSubmit() {
        this.isLoading = true;
        this.$http
          .post(`/public/messages`, this.$serialize(this.forms))
          .then(res => {
            this.snackbarStateChange({
              color: "success",
              text: this.$t(`message.store_message`),
              snackbar: true
            });
            this.dialog = false;
            this.isLoading = false;
          })
          .catch(error => {

            this.isLoading = false;
            this.snackbarStateChange({
              color: "error",
              text: error.data.message,
              snackbar: true
            });
          });
      },
      // async handleClick() {
      //   if (await this.$auth.isAuthenticated()) {
      //     if (sessionStorage.getItem("role") === "user") {
      //       if (
      //         this.isMember.status === null &&
      //         this.isMember.joinType === null
      //       ) {
      //         const userInfo = await this.$http
      //           .get(`public/user/${this.userId}/profiles`)
      //           .then(res => {
      //             return res.data.content;
      //           });
      //         const userCompany = await this.$http
      //           .get(`public/user_companys`, {
      //             params: {
      //               "user.id": sessionStorage.getItem("userId")
      //             }
      //           })
      //           .then(res => {
      //             return res.data.content;
      //           });
      //         if (userInfo.length === 0) {
      //           this.snackbarStateChange({
      //             color: "error",
      //             text: this.$t("global.userInfo"),
      //             snackbar: true
      //           });
      //           const {href} = this.$router.resolve({
      //             path: `/users/${this.userId}/info`
      //           });
      //           setTimeout(() => {
      //             window.open(href, "_blank");
      //           }, 3000);
      //         } else {
      //           if (userInfo[0]["phone"] === null || userCompany.length === 0) {
      //             let infoText =
      //               userInfo[0]["phone"] === null ? "global.userInfo" : "";
      //             let companyTetx =
      //               userCompany.length === 0 ? "global.userCompany" : "";
      //             this.snackbarStateChange({
      //               color: "error",
      //               text: `${this.$t(infoText)}${this.$t(companyTetx)}`,
      //               snackbar: true
      //             });
      //             const {href} = this.$router.resolve({
      //               path: `/users/${this.userId}/info`
      //             });
      //             setTimeout(() => {
      //               window.open(href, "_blank");
      //             }, 3000);
      //           } else {
      //             const {href} = this.$router.resolve({
      //               path: "/apply",
      //               query: {organizationId: this.orgId}
      //             });
      //             window.open(href, "_blank");
      //           }
      //         }
      //       } else {
      //         this.snackbarStateChange({
      //           color: "error",
      //           text: this.$t(this.btnName),
      //           snackbar: true
      //         });
      //       }
      //     } else {
      //       this.snackbarStateChange({
      //         color: "error",
      //         text: "請退出重新登錄您的用戶賬號",
      //         snackbar: true
      //       });
      //     }
      //   } else {
      //     this.$auth.loginRedirect("/implicit/callback");
      //   }
      // },
      infoDetail(type, orgId, infoId) {
        //organization_rules/6
        if (type) {
          this.$router.push({
            path: "products-detail",
            query: {
              id: orgId,
              ruleId: infoId
            }
          });
        } else {
          this.$router.push({
            path: "notice-detail",
            query: {
              id: orgId,
              noticeId: infoId
            }
          });
        }
      },
      // _chekIsApplay() {
      //   this.$http
      //     .get("public/organizations/is_member", {
      //       params: {userId: this.userId, organizationId: this.orgId}
      //     })
      //     .then(res => {
      //       this.isMember = res.data;
      //       if (
      //         this.isMember.status === "PENDING" &&
      //         this.isMember.joinType === "APPLIY"
      //       ) {
      //         this.btnName = "cocShow.navbar.pending_coc";
      //       } else if (
      //         this.isMember.status === "SUCCESS" &&
      //         this.isMember.joinType === "APPLIY"
      //       ) {
      //         this.btnName = "cocShow.navbar.apply_coc";
      //       } else if (
      //         this.isMember.status === "SUCCESS" &&
      //         this.isMember.joinType === "INVITATION"
      //       ) {
      //         this.btnName = "cocShow.navbar.apply_coc";
      //       } else if (
      //         this.isMember.status === "PENDING" &&
      //         this.isMember.joinType === "INVITATION"
      //       ) {
      //         this.btnName = "cocShow.navbar.invited_coc";
      //       } else {
      //         this.btnName = "cocShow.navbar.apply_into_coc";
      //       }
      //     });
      // },
      _initOrganizations() {
        this.headLoading = true;
        this.$http.get(`public/organizations/${this.orgId}`).then(
          res => {
            this.orgData = res.data;
            this.setCompanyData(this.orgData.name)
            this.headLoading = false;
          },
          error => {
          }
        );
      },

      _initSlide() {
        this.slideLoading = true;
        this.$http.get(`public/slide_shows?organization.id=${this.orgId}`).then(
          res => {
            this.slides = res.data.content;
            this.slideLoading = false;
          },
          error => {
          }
        );
      },
      _initTab() {
        this.$http.get(`public/tabs?organization.id=${this.orgId}`).then(res => {
          this.tabs = res.data.content;
        });
      },

      go(url) {
        this.$router.push(url);
      },
      changLang(key) {
        localStorage.setItem("i18n", key);
        this.$i18n.locale = key;
      }
    },

    async mounted() {
      this.orgId = this.$route.query.code !== undefined?  this.$route.query.code: this.$route.query.id;
      this._initOrganizations();
      this._initTab();
      // this._initRules();
      // this._initAnnouncements();
      this._initSlide();
      if (await this.$auth.isAuthenticated()) {
        this.isAuthenticated = true;
        if (sessionStorage.getItem("role") === "user") {
          this.iscustomerLoginChange(true);
        } else {
          this.isOrganizationLoginChange(true);
        }
      }
      // if (await this.$auth.isAuthenticated()) {
      //   if (sessionStorage.getItem("role") === "user") {
      //     this._chekIsApplay();
      //   }
      // }
    }

  };
</script>

<style lang="scss" scoped>
  #lg_tbar, #lg_tnav {
    min-width: 1200px;
  }

  .v-menu__activator {
    height: 27px !important;
  }

  #lg_tnav {
    box-shadow: 0 2px 2px 0px rgba(0, 0, 0, .1);
    position: relative;
    width: 100%;
    will-change: padding-left, padding-right;

    .v-toolbar__content{
      padding:0 !important;
      background: red;

      .v-toolbar__title{
        margin:0;
      }
    }
  }

  #lg_tbar {
    min-width: 1024px;
    height: 30px;
    background-color: #286667;

    .inner {
      position: relative;
      max-width: 1308px;
      margin: 0 auto;
    }

    .lg_tbar_l {
      float: left;
      list-style: none;

      li {
        position: relative;
        float: left;
        height: 30px;
        line-height: 30px;
      }

      a {
        text-decoration: none;
        display: inline-block;
        margin-left: 15px;
      }

      a.lg_app {
        color: #08d7a2;
        background: url(//www.lgstatic.com/www/static/common/widgets/header_c/modules/img/app_icon_0495d1d.png) 10px 0 no-repeat;
        padding: 0 12px 0 27px;
        float: left;
        line-height: 15px;
        margin: 7px 0 0;
      }
    }

    ul.lg_tbar_r {
      float: right;
      list-style: none;

      li {
        position: relative;
        float: left;
        height: 30px;
        cursor: pointer;

        a {
          color: #fff;
          float: left;
          line-height: 15px;
          padding: 0 12px;
          margin: 7px 0 0;
          text-decoration: none;
        }

        .bl {
          border-left: 1px solid #fff;
        }
      }
    }
  }

  #lg_tnav {
    min-width: 1024px;
    height: 66px;
    border-top: 1px solid #d2d2d2;
    border-bottom: 1px solid #e5e5e5;
    background-color: #fff;

    .inner {
      width: 1200px;
      margin: 0 auto;
      .v-toolbar__content{
        padding:0px;
      }
    }

    .lg_tnav_l {
      float: left;
      width: 260px;
      padding-top: 7px;
    }

    .lg_tnav_wrap {
      float: right;

      li {
        display: inline-block;
        *float: left;
        margin: 0 16px;
        position: relative;
      }
    }

  }

  .align-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .showList {
    margin-top: 20px;
  }

  .showList li {
    display: inline-block;
    border-right: 1px solid #dddddd;
    padding-right: 20px;
    margin-right: 20px;
  }

  .showList li:last-child {
    border: none;
  }

  @media (min-width: 1024px) {
    .lgpl120 {
      padding-left: 120px;
    }
    .xspul {
      float: left;
    }

  }

  @media (max-width: 600px) {
    
    .v-carousel {
      height: 142px;
    }
    .xspadding-0 {
      margin-right: 0 !important;
    }
    .xsib {
      display: inline-block !important;
    }
  }

  .html-conent {
    .flex img {
      max-width: 100%;
      height: auto;
    }
  }

  .company-page {
    .head-wrap {
      padding: 16px 20px 30px 20px;
      font-family: PingFangSC-Regular, "PingFang SC";

      .logo {
        .v-image {
          /deep/ .v-image__image--cover {
            //background-position: left;
          }
        }
      }

      .detail-box {
        list-style: none;
      }

      .name {
        color: #323d50;
      }

      .purpose {
        color: #828da0;
        line-height: 14px;
      }

      .address {
        color: #828da0;
        line-height: 14px;
      }

      .info-type {
        .info-type-item {
          border-left: 1px solid #dcdcdc;

          p {
            margin-bottom: 0;
          }

          .item-title {
            color: #828da0;
          }
        }
      }
    }

    .tab-box {
      // .v-tabs__slider-wrapper {

      // }
      .v-tabs__div {
        font-size: 18px;
        color: #828da0;

        /deep/ .v-tabs__item {
          opacity: 1;
        }

        /deep/ .accent {
          background-color: #2c7a90 !important;
        }

        /deep/ .active-tab {
          color: #2c7a90;
        }
      }
    }

    .slide-title {
      position: absolute;
      width: 100%;
      height: 60px;
      bottom: 0;
      left: 0;
      padding-left: 16px;
      color: #fff;
      line-height: 60px;
      font-size: 16px;
      text-align: left;
      background-color: rgba(0, 0, 0, 0.4);
    }

    .no-data {
      height: 500px;
    }

    .right-box {
      height: 400px;
    }

    .btn {
      &:hover {
        background-color: #2c7a90;

        /deep/ .v-btn__content {
          color: #fff;
        }
      }
    }
  }

  .tabs__diva {
    color: #2c7a90 !important;
  }

  .tabs__diva::after {
    content: "" !important;
    bottom: -6px !important;
    width: 100px !important;
    height: 2px !important;
    position: absolute !important;
    background-color: #2c7a90 !important;
  }
  .mt-5{
    margin-top: 30px!important;
  }
</style>

