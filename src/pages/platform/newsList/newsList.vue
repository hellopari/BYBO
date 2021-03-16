<template>
  <div class="new-list-page">
    <!-- 页面主体开始 -->

    <v-container fluid class="my-5 xsmt-5">
      <!-- 标题 -->
      <v-layout row wrap class="mb-4">
        <v-flex xs12 class="text-xs-left">
          <div class="module-tabs">
            <h3 class="diamonds headline">{{ $t("navbar.news_list") }} <span>NEWS</span></h3>
          </div>
        </v-flex>
      </v-layout>

      <!-- 加载器-->
      <v-layout>
        <v-flex xs12 class="white py-5 mt-5" v-if="isLoading">
          <div class="text-xs-center">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </div>
        </v-flex>
      </v-layout>
      <!-- 加载器-->

      <!-- 新聞 -->
      <v-flex xs12 class="mb-4 cur-pointer" v-for="(item, index) of news" :key="index"
              @click="newDetail(item.organization.id, item.id)">
        <v-card class="d-flex elevation-0 hover-card">
          <v-layout row wrap class="px-4 py-4">
            <!-- 左 -->
            <v-flex lg9 md9 sm12>
              <v-layout row wrap>
                <v-flex lg3 md4 sm5 xs12>
                  <div class="img-content">
                    <template v-if="item.postImages.length > 0">
                      <img class="img-responsive"
                           :src="`${$fileUrl}/public/uploads/o/company/post/${item.id}/${item.postImages[0].key}`"
                           lazy-src="./../../../../static/img/blank.png"/>
                    </template>
                    <template v-else>
                            <img
                              src="./../../../../static/img/blank.png"/>
                    </template>
                  </div>
                </v-flex>
                <v-flex lg9 md8 sm7 xs12>
                  <v-card-text class="text-xs-left py-0">
                    <div class="mb-3 text-no-wrap text-truncate title">{{item.title}}</div>
                    <div class=" mb-3 text-no-wrap text-truncate ">
                      <v-icon color="grey">access_time</v-icon>
                      <span class="ml-2 subheading body-1 grey--text">{{item.createdAt | time}}</span>
                      <span class="ml-2 subheading body-1 grey--text">{{item.organization.name}}</span>
                    </div>
                    <v-divider class="mb-2"></v-divider>
                    <div>
                      <p class="three-line-overflow pb-0">{{item.content | filterText}}</p>
                    </div>

                  </v-card-text>

                </v-flex>
              </v-layout>
            </v-flex>

            <!-- 右 -->
            <v-flex lg3 md3 hidden-sm-only hidden-xs-only>
              <v-layout row wrap fill-height align-center>
                <v-flex md12>
                  <v-card-text class="text-xs-left pr-4" style="border-left: 1px solid #ddd;">
                    <div class=" mb-4 text-no-wrap text-truncate title primary--text">{{item.organization.name}}</div>
                    <div class="mb-0">
                      <v-layout row class="text-xs-left">
                        <v-flex xs4>
                          <div class="text-no-wrap text-truncate">
                            <span class="number" v-if="item.organization.scale === 'BETWEEN30AND50'">30-50</span>
                            <span class="number" v-if="item.organization.scale === 'BETWEEN50AND100'">50-100</span>
                            <span class="number" v-if="item.organization.scale === 'MORETHAN100'">100+</span>
                          </div>
                          <div class="text-no-wrap grey--text text-truncate">{{ $t("cocShow.navbar.scale") }}</div>
                        </v-flex>
                        <v-divider vertical class="mr-3 ml-1"></v-divider>
                        <v-flex xs4>
                          <div class="text-no-wrap text-truncate">{{item.organization.industry.name}}</div>
                          <div class="text-no-wrap grey--text text-truncate">{{ $t("chamber.select.industry") }}</div>
                        </v-flex>
                        <v-divider vertical class="mr-3 ml-1"></v-divider>
                        <v-flex xs4>
                          <div class="text-no-wrap text-truncate">{{item.view}}{{$t('cocShow.news.views')}}</div>
                          <div class="grey--text">{{ $t("cocShow.news.hot") }}</div>
                        </v-flex>
                      </v-layout>
                    </div>
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-flex>

          </v-layout>
        </v-card>
      </v-flex>
      <!-- 新聞 -->

      <v-flex v-if="news.length === 0 && !isLoading" row wrap class="white py-5 mt-4">
        <v-flex xs12 class=" py-5">
          <v-icon size="120" color="primary">fiber_new</v-icon>
          <div class="blue-grey--text text--darken-3 subheading">{{$t('cocShow.home.no_coc_news')}}</div>
        </v-flex>
      </v-flex>

      <!-- 分页器 -->
      <v-layout>

        <v-flex v-if="news.length && !isLoading" xs12 class="mt-5 text-xs-center">
          <v-pagination v-model="page" :length="totalPages" @input="handleInput"></v-pagination>
        </v-flex>

      </v-layout>
      <!-- 分页器 -->

    </v-container>

    <!-- 页面主体结束 -->
  </div>
</template>

<script>
  export default {
    metaInfo: {
      title: '新聞列表', // set a title
      titleTemplate: '%s_企業廣場_企業管理和推廣平台',
      htmlAttrs: {
        lang: 'hk',
        amp: undefined // "amp" has no value
      }
    },
    data: () => {
      return {
        loading: false, //控制搜索框
        model: null, //搜索框绑定数据
        search: null, //搜索框值
        news: [], //保存新闻数据
        isLoading: true,
        page: 1,
        filterpage: 0,
        totalPages: 0
      }
    },
    methods: {
      newDetail(orgId, newId) {
        this.$router.push({
          path: 'company/new-detail',
          query: {
            id: orgId,
            newId: newId
          }
        })
      },
      handleInput(value) {

        this.page = value
        this.filterpage = value - 1
        this.$router.push({
          path: '/news-list',
          query: {page: this.filterpage}
        })
        this.$vuetify.goTo(200, {
          duration: 800,
          easing: 'easeInOutCubic',
          offset: 50
        })
        this._initNews()
      },
      _initNews() {
        this.isLoading = true
        this.$route.query.page =( this.$route.query.page !== undefined)? this.$route.query.page: 0
        this.$http.get(
          `public/posts?page=${this.$route.query.page}&size=6`).then(
          res => {
            this.news = res.data.content
            this.totalPages = res.data.totalPages
            this.isLoading = false
          },
          error => {
          }
        )
      }
    },
    mounted() {
      this.page = this.$route.query.page !== undefined ? Number(this.$route.query.page) + 1 : 1
      if (this.$route.query.search !== undefined) {
        this.isLoading = true
        this.$http
          .get(
            `public/posts?page=${
              this.filterpage
              }&size=6&isApproved=true&search=${
              this.$route.query.search
              }`
          )
          .then(
            res => {
              this.orgs = res.data.content
              this.totalPages = res.data.totalPages
              this.isLoading = false
            },
            error => {
            }
          )
      } else {
        this._initNews()
      }

    }
  }
</script>

<style>
.new-list-page .hover-card{
   border:1px solid #EEE !important;
  border-radius:10px !important;
}
.new-list-page .hover-card .img-content{
      width: 216px;
    height: 135px;
}
 .new-list-page .hover-card .img-content img{
  height:100%;
}
/** iPhone**/
@media only screen and (min-width: 320px) and (max-width: 767px) {
  .new-list-page .hover-card .img-content{
    margin:0 auto 10px;
  }
}
</style>
