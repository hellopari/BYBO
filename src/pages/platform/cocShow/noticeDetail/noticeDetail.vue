<template>
  <div class="coco-show-info-detail">
    <v-container fluid>
      <ul data-v-52b79048="" class="v-breadcrumbs pl-0 theme--light">
        <li><router-link :to="`/company/home?code=${$route.query.id}`"ss="v-breadcrumbs__item">{{$t('profile.home')}}</router-link></li>
        <li class="v-breadcrumbs__divider">&gt;</li>
        <li>
          <router-link  :to="`/company/notice?id=${$route.query.id}`" class="v-breadcrumbs__item">{{$t('profile.notice')}}</router-link>
        </li>
        <li class="v-breadcrumbs__divider">&gt;</li>
        <li>
          <a disabled="disabled" href="breadcrumbs_link_1" class="v-breadcrumbs__item v-breadcrumbs__item--disabled">{{$t('profile.notice')}}</a>
        </li>
      </ul>
      <v-layout column>

        <!-- 加载器-->
        <v-flex class="white mt-5 py-5" v-if="isLoading">
          <div class="text-xs-center">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </div>
        </v-flex>
        <!-- 加载器-->

        <template v-if="!isLoading">
          <template v-if="!isMember">
            <!-- 标题 -->
            <v-flex>
              <h3 class="headline">{{infoDetail.title}}</h3>
            </v-flex>

            <v-flex v-if="infoDetail.organization" class="mt-3 grey--text text--darken-1">
              <div class="d-inline-block">
                <v-icon size="20">person</v-icon>
                <span class="vertical-m ml-2">{{infoDetail.organization.name}}</span>
              </div>
              <div class="d-inline-block ml-3">
                <v-icon size="20">access_time</v-icon>
                <span class="vertical-m ml-2">{{infoDetail.createdAt}}</span>
              </div>
            </v-flex>
            <!-- 标题 -->

            <!-- 内容区域 -->
            <v-flex class="text-xs-left mt-5 px-4 xspadding-0 subheading html-conent">
              <div v-html="infoDetail.content"></div>
            </v-flex>
            <!-- 内容区域 -->
          </template>

          <template v-else>
            <v-flex class="py-4 px-2 text-xs-center">
              <img src="./../.././../../../static/img/no-authority.png" lazy-src="./../../../../static/img/logo/logo.png" alt="">
              <p>{{$t('cocShow.home.member_can_read')}}</p>
            </v-flex>
            <v-flex>
              <v-btn @click="login()" color="primary"> {{$t('auth.login')}} {{$t('navbar.user_center')}}</v-btn>
            </v-flex>
          </template>
        </template>

      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    metaInfo() {
      return {
        title: this.infoDetail.title ? this.infoDetail.title : '企業廣場',
        titleTemplate:
          '%s - 簡介__新聞_活動_企業廣場-企業管理和推廣平台',
        meta: [
          {
            name: 'keywords',
            content: this.infoDetail.title ? this.infoDetail.title : '企業廣場'
          },
          {
            name: 'description',
            content: this.infoDetail.content ? this.infoDetail.content : '企業廣場'
          },
          {
            name: 'og:url',
            content: `${this.$fileUrl}/company/notice-detail?id=${this.$route.query.id}&noticeId=${this.infoDetail.id}`
          },

        ],
        htmlAttrs: {
          lang: 'hk',
          amp: undefined // "amp" has no value
        }
      }
    },
    data() {
      return {
        infoDetail: {},
        isLoading: true,
        isMember: false,
      }
    },
    watch: {
      $route(to, from) {
        this._initNotice()
      }
    },
    methods: {
      _initNotice() {
        this.isLoading = true
        this.$http
          .get(
            `public/organizations/${this.$route.query.id}/announcements/${
              this.$route.query.noticeId
              }`
          )
          .then(
            res => {
              this.isLoading = false
              if (res.data.code === 401) {
                this.isMember = true
              } else {
                this.infoDetail = res.data
                this.isMember = false
              }
            },
            error => {
            }
          )
      },
      login() {
        localStorage.clear()
        sessionStorage.clear()
        this.$auth.loginRedirect('/implicit/callback')
      }
    },
    mounted() {
      this._initNotice()
    }
  }
</script>

<style lang="scss">
  .html-conent img {
    max-width: 100%;
    height: auto;

  }
</style>

