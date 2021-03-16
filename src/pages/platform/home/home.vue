<template>
  <div class="home-page">
    <!-- 页面主体开始 -->
<div class="wrap company">
  <div class="box-container box-container-p80">
    <v-container fluid grid-list-lg class="xsmt-5">
      <!-- 最新商會开始 -->
      <v-layout row wrap>
        <!-- 标题 -->
        <v-flex xs12 class="text-xs-left">
          <div class="module-tabs">
            <h3 class="diamonds headline">{{ $t("global.hot_coc") }} <span>ENTERPRISE</span></h3>
            <!-- 按钮 -->
            
              <div v-if="orgs.length && !orgLoading" xs3 class="pb-4 px-0">
                <v-btn outline large color="primary" class="btn" to="company-list">{{
                  $t("global.see_more") }}
                </v-btn>
              </div>
            

            <!-- 按钮 -->
          </div>
        </v-flex>
        <!-- 标题 -->

        <!-- 加载器-->
        <v-flex class="white py-5" xs12 v-if="orgLoading">
          <div class="text-xs-center">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </div>
        </v-flex>
        <!-- 加载器-->
        <!-- 内容区域 -->
        <v-flex xs12 v-if="!orgLoading" class=" px-2">
          <v-layout wrap>
            <v-flex lg-5 md3 sm12 xs12 v-for="(org, index) of orgs" :key="index"  @click="orgDetail(org.id) "> 
              <div class="company-content text-xs-center">
                <div class="top">
                  <template>
                    <v-container grid-list-md>
                      <div class="item">
                        <div class="icon">
                          <template v-if="org.logo">
                            <img style="-webkit-border-radius: 10%;-moz-border-radius: 10%;border-radius: 10%;"
                                 :src="`${$fileUrl}/public/uploads/o/company/organization/${org.id}/${org.logo}`"
                                  lazy-src="./../../../../static/img/blank3.png"
                                 alt="">
                          </template>
                          <template v-else>
                            <img
                              src="./../../../../static/img/blank3.png"/>
                          </template>
                        </div>
                        <div class="text">
                          <a class="name" @click="orgDetail(org.id)">{{org.name}}</a>
                          <div class="industry">
                            <p class="grey&#45;&#45;text mt-1  mb-0">{{org.industry.name}}</p>
                          </div>
                          <div class="bottom clearfix">
                            <a class="bottom-item bottom-1 fl" @click="orgDetail(org.id)" target="_blank"
                            >
                              <p class="text-green mb-0 mr-2"><img src="./../../../../static/img/address.png"></p>
                              <p class="grey--text">{{ $t("chamber.create.region") }}</p>
                            </a>
                            <a class="bottom-item bottom-2 fl" @click="orgDetail(org.id)" target="_blank"
                            >
                              <p class="grey--text mr-2"><img src="./../../../../static/img/personnumber.png"></p>
                              <p class="text-green mb-0">
                                <template v-if="org.scale === 'BETWEEN30AND50'">30-50</template>
                                <template v-if="org.scale === 'BETWEEN50AND100'">50-100</template>
                                <template v-if="org.scale === 'MORETHAN100'">100+</template>
                              </p>

                            </a>

                          </div>
                        </div>
                      </div>
                    </v-container>
                  </template>

                </div>

              </div>
            </v-flex>


          </v-layout>
        </v-flex>
        <!-- 内容区域 -->



      </v-layout>
      <!-- 最新商會结束 -->

    </v-container>
  </div>
</div>


    <!-- 商會产品开始 -->
    <div class="wrap product">
      <div class="box-container box-container-p80">
        <v-layout row wrap class="xsmt-5">
          <!-- 标题 -->

          <v-flex xs12 class="text-xs-left">
            <div class="module-tabs">
              <h3 class="diamonds headline">{{ $t("profile.products") }}<span>PRODUCT</span></h3>
              <!-- 按钮 -->
                <div v-if="products.length && !orgLoading" xs3 class="pb-4 px-0">
                  <v-btn outline large color="primary"  class="btn" to="/product-list">{{
                    $t("global.see_more") }}
                  </v-btn>
                </div>

              <!-- 按钮 -->
            </div>
          </v-flex>
          <!-- 标题 -->

          <!-- 加载器-->
          <v-flex xs12 class="white py-5" v-if="newLoading">
            <div class="text-xs-center">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>
          </v-flex>
          <!-- 加载器-->

          <!-- 内容区域 -->
          <v-flex xs12 v-if="products.length" class="text-xs-left">
            <v-layout row wrap>
              <v-flex lg-5 md3 sm12 xs12  v-for="(item, index) of products" :key="index" @click="ruleDetail(item.organization.id,item.id)">
                <v-card style="background-color: #f1f4f6;" class="hover-card text-xs-left elevation-0">
                  <div class="img-content">
                    <template  v-if="item.productImage.length > 0">
                      <img class="mx-auto img-responsive"
                          lazy-src="./../../../../static/img/blank.png"
                          :src="`${$fileUrl}/public/uploads/o/company/product/image/${item.id}/${item.productImage[0].key}`"/>

                    </template>
                    <template v-else>
                      <img class="mx-auto img-responsive"
                           src="./../../../../static/img/blank.png"/>
                    </template>

                  </div>
                  <div class="text">
                    <div class="mb-3 text-no-wrap text-truncate name">{{item.name}}</div>

                    <div class="mb-3 text-no-wrap text-truncate brief">{{item.description| filterText}}</div>

                    <div class="text-no-wrap text-truncate price">$HK {{item.price}}</div>
                    <div class="mb-3 text-no-wrap text-truncate company">{{item.organization.name}}</div>
                  </div>

                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
          <!-- 内容区域 -->

          <v-flex v-if="products.length === 0 && !newLoading" row wrap class="white py-5 mt-4">
            <v-flex xs12 class=" py-5">
              <v-icon size="120" color="primary">fiber_new</v-icon>
              <div class="blue-grey--text text--darken-3 subheading">{{$t('cocShow.home.no_coc_news')}}</div>
            </v-flex>
          </v-flex>



        </v-layout>
      </div>
    </div>

    <!-- 商会产品结束 -->

    <!-- 商會活動开始 -->
    <div class="wrap activity">
      <div class="box-container">
        <v-layout row wrap class="xsmt-5">
          <!-- 标题 -->

          <v-flex xs12 class="text-xs-left">
            <div class="module-tabs">
              <h3 class="diamonds headline">{{ $t("profile.activities") }} <span>ACTIVITIES</span></h3>
              <!-- 按钮 -->
             
                <div v-if="acts.length && !actLoading" xs3  class="pb-4 px-0">
                  <v-btn outline large color="primary"  class="btn" to="/activity-list">{{
                    $t("global.see_more") }}
                  </v-btn>
                </div>
              

              <!-- 按钮 -->
            </div>
          </v-flex>
          <!-- 标题 -->

          <!-- 加载器-->
          <v-flex xs12 class="white py-5" v-if="actLoading">
            <div class="text-xs-center">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>
          </v-flex>
          <!-- 加载器-->

          <!-- 内容区域 -->
          <v-flex xs12 v-if="acts.length" class="text-xs-left">
            <v-layout row wrap>
              <v-flex lg-5 md3 sm12 xs12 class="cur-pointer" v-for="(act, index) of acts" :key="index"
                      @click="actDetail(act.organization.id, act.id)">
                <v-card style="background-color: #f1f4f6;" class="hover-card text-xs-left elevation-0">
                  <div class="img-content">
                    <template  v-if="act.eventFiles.length > 0">
                      <img class="mx-auto img-responsive"
                        lazy-src="./../../../../static/img/blank.png"
                        :src="`${$fileUrl}/public/uploads/o/company/event/${act.id}/${act.eventFiles[0].key}`"/>

                    </template>
                    <template v-else>
                      <img class="mx-auto img-responsive"
                           src="./../../../../static/img/blank.png"/>
                    </template>

                  </div>
                  <div class="text">
                    <div class="activity_name">{{act.title}}</div>
                    <div class="activity_time">活動時間：</div>
                   <div class="grey--text lighten-1">{{act.createdAt.substr(0,4)}}.{{act.createdAt.substr(5,2)}}.{{act.createdAt.substr(8,2)}}—{{act.endedAt.substr(0,4)}}.{{act.endedAt.substr(5,2)}}.{{act.endedAt.substr(8,2)}}</div>
                    <div class="signNumber">報名人數: <span class="grey--text lighten-1">{{act.totalNumber}}人</span></div>
                    <div class="sponsor">主辦機構：<span class="grey--text lighten-1">{{act.organization.name}}</span></div>
                  </div>

                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
          <!-- 内容区域 -->



          <v-flex v-if="acts.length === 0 && !actLoading" xs12 class=" py-5">
            <v-icon size="120" color="primary">local_activity</v-icon>
            <div class="blue-grey--text text--darken-3 subheading">{{$t('message.no_message')}}</div>
          </v-flex>

        </v-layout>
      </div>
    </div>

      <!-- 商會活動结束 -->



    <!-- 商會新聞开始 -->
    <div class="wrap news">
      <div class="box-container box-container-p80">
        <v-layout row wrap class="xsmt-5 ">
          <!-- 标题 -->
          <v-flex xs12 class="text-xs-left">
            <div class="module-tabs">
              <h3 class="diamonds headline">{{ $t("profile.news") }} <span>NEWS</span></h3>
              <!-- 按钮 -->
                <div v-if="news.length && !newLoading" xs3 class="pb-4 px-0">
                  <v-btn outline large color="primary"  class="btn" to="/news-list">{{
                    $t("global.see_more") }}
                  </v-btn>
                </div>

              <!-- 按钮 -->
            </div>
          </v-flex>
          <!-- 标题 -->

          <!-- 加载器-->
          <v-flex xs12 class="white py-5" v-if="newLoading">
            <div class="text-xs-center">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>
          </v-flex>
          <!-- 加载器-->

          <!-- 内容区域 -->
          <v-flex xlg6 lg6 md6 sm12 xs12 class="cur-pointer" v-for="(item, index) of news" :key="index"
                  @click="newDetail(item.organization.id, item.id)">
            <v-card class="d-flex elevation-0 hover-card">  
              <div class="img-content" v-if="item.postImages.length > 0">
                
                      <img class="img-responsive"
                           :src="`${$fileUrl}/public/uploads/o/company/post/${item.id}/${item.postImages[0].key}`"
                           lazy-src="./../../../../static/img/blank3.png" />                   
              </div>
              <div class="news-cover">
                <div class="create_time"><span>{{item.createdAt.substr(0,4)}}年{{item.createdAt.substr(6,1)}}月{{item.createdAt.substr(9,1)}}日</span></div>
                <div class="publish_company">發布: {{item.organization.contacts}}</div>
                <div class="title">{{item.title}}</div>
              </div>
            </v-card>
          </v-flex>
          <!-- 内容区域 -->

          <v-flex v-if="news.length === 0 && !newLoading" row wrap class="white py-5 mt-4">
            <v-flex xs12 class=" py-5">
              <v-icon size="120" color="primary">fiber_new</v-icon>
              <div class="blue-grey--text text--darken-3 subheading">{{$t('cocShow.home.no_coc_news')}}</div>
            </v-flex>
          </v-flex>



        </v-layout>
      </div>
    </div>

    <!-- 商會新聞结束 -->






    <!-- 页面主体结束 -->
  </div>
</template>

<script>
  export default {
    data: () => {
      return {
        search: null, //搜索框值
        orgLoading: true,
        actLoading: true,
        newLoading: true,
        orgs: [], //保存商会数据
        acts: [], //保存活动数据
        news: [], //保存新闻数据
        products: [] //保存产品数据
      }
    },
    computed: {
      currentDate() {
        return this.$moment(new Date())
      }
    },
    methods: {
      orgDetail(orgId) {
        this.$router.push({path: '/company', query: {code: orgId}})
      },
      actDetail(orgId, actId) {
        this.$router.push({
          path: 'company/activity-detail',
          query: {
            id: orgId,
            actId: actId
          }
        })
      },
      ruleDetail(orgId,ruleId) {
        this.$router.push({
          path: 'company/products-detail',
          query: {
            id: orgId,
            ruleId: ruleId
          }
        })
      },
      newDetail(orgId, newId) {
        this.$router.push({
          path: 'company/new-detail',
          query: {
            id: orgId,
            newId: newId
          }
        })
      },
      _initOrganizations() {

        this.orgLoading = true
        this.$http.get('public/organizations?page=0&size=16&isApproved=true').then(
          res => {
            this.orgs = res.data.content
            this.orgLoading = false
          },
          error => {
          }
        )
      },
      _initActivity() {
        this.actLoading = true
        this.$http.get('public/events?page=0&size=10&isApproved=true').then(
          res => {
            this.acts = res.data.content
            this.acts.forEach(val => {
              val['totalNumber'] = 0
              val.eventTickets.forEach(value => {
                val['totalNumber'] =
                  val['totalNumber'] + value.vendition
              });
              if (
                this.currentDate > val.startedAt &&
                this.currentDate < val.endedAt
              ) {
                val['timeStatus'] = 'global.conduct'
              } else if (
                this.currentDate > val.startedAt &&
                this.currentDate > val.endedAt
              ) {
                val['timeStatus'] = 'global.end'
              } else if (this.currentDate < val.startedAt) {
                val['timeStatus'] = 'global.soon'
              }
            });
            this.actLoading = false
          },
          error => {
          }
        )
      },
      _initNews() {
        this.newLoading = true
        this.$http.get('public/posts?page=0&size=10').then(
          res => {
            this.news = res.data.content
            this.newLoading = false
          },
          error => {
          }
        )
      },
      _initProducts() {
        this.newLoading = true
        this.$http.get('public/products?page=0&size=15').then(
          res => {
            this.products = res.data.content
            this.newLoading = false
          },
          error => {
          }
        )
      },

    },
    mounted() {
      this._initOrganizations();
      this._initActivity();
      this._initProducts();
      this._initNews()
    }
  }
</script>

<style lang='scss' scoped>

.wrap.product,.wrap.news{
  background-color:#fafafa
}

  .v-image {
    /deep/ .v-image__image--cover {
      background-size: auto;
    }
  }

  .btn {
    border: 1px solid #286667;

    &:hover {
      background-color: #286667 !important;

      /deep/ .v-btn__content {
        color: #fff;
      }
    }
  }
</style>
