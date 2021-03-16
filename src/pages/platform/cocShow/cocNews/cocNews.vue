oNcoc
<template>
  <div class="coco-show-news">
    <v-container fluid>
      <ul data-v-52b79048="" class="v-breadcrumbs pl-0 theme--light">
        <li><router-link :to="`/`"ss="v-breadcrumbs__item">{{$t('profile.home')}}</router-link></li>
        <li class="v-breadcrumbs__divider">&gt;</li>
          <li><router-link :to="`/company/home?code=${$route.query.id}`"class="v-breadcrumbs__item">{{company}}</router-link></li>
        <li class="v-breadcrumbs__divider">&gt;</li>
        <li>
          <a disabled="disabled" class="v-breadcrumbs__item v-breadcrumbs__item--disabled">{{$t('global.hot_news')}}</a>
        </li>
      </ul>
      <!-- 商会新闻开始 -->
      <v-layout column>
        <v-flex class="module-tabs text-xs-left">
          
        <h3 class="diamonds headline">{{ $t("profile.news") }} <span>NEWS</span></h3>
        </v-flex>
        <v-flex class="content py-3">
          <!-- 加载器-->
          <div v-if="newLoading" class="text-xs-center">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </div>
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
          <!-- 没数据 -->
          <v-layout v-if="!news.length && !newLoading" align-center justify-center row fill-height class="py-5">
            <v-flex>
              <v-icon size="120" color="primary">fiber_new</v-icon>
              <div class="blue-grey--text text--darken-3 subheading">{{$t('cocShow.news.no_coc_news' )}}</div>
            </v-flex>
          </v-layout>

        </v-flex>

        <!-- 按钮 -->
        <v-flex v-if="news.length">
          <div class="text-xs-center">
            <v-pagination v-model="page" :length="totalPages" @input="handleInput"></v-pagination>
          </div>
        </v-flex>

      </v-layout>
      <!-- 商会新闻结束 -->

    </v-container>
  </div>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    computed:{
      ...mapState(['company'])
    },
    data() {
      return {
        page: 1,
        filterpage: 0,
        totalPages: 0,
        orgId: null,
        news: [],
        newLoading: true,
      }
    },
    methods: {
      newDetail(orgId, newId) {
        this.$router.push({
          path: 'new-detail',
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
          path: '/company/news',
          query: {id: this.orgId, page: this.filterpage}
        })
        this.$vuetify.goTo(0, {duration: 800, easing: 'easeInOutCubic', offset: 50})
        this._initNews()
      },
      async _initNews() {
        this.newLoading = true
        this.$route.query.page =
          this.$route.query.page !== undefined
            ? this.$route.query.page
            : 0
      await this.$http
          .get(
            `public/posts?page=${this.$route.query.page}&size=6&organizationId=${
              this.orgId
              }`
          )
          .then(
            res => {
              this.news = res.data.content
              this.totalPages = res.data.totalPages
              this.newLoading = false
            },
            error => {
            }
          )
      }
    },
    mounted() {
      this.page =
        this.$route.query.page !== undefined
          ? Number(this.$route.query.page) + 1
          : 1
      this.orgId = this.$route.query.id
      this._initNews()
    }
  }
</script>

<style>
.coco-show-news .hover-card{
  border:1px solid #EEE;
  border-radius:10px;
}
.coco-show-news .hover-card .img-content{
      width: 216px;
    height: 135px;
}
.coco-show-news .hover-card .img-content img{
  height:100%;
}
</style>


