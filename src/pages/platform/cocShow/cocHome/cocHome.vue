<template>
  <div class="coco-show-home">
    <v-container class="white" fluid>
      <!-- 商会新闻开始 -->
      <v-layout row wrap class="mt-5">
        <v-flex  xs12 md4 class="pr-4">
          <!-- 标题 -->
          <div class="module-tabs text-xs-left">
            <h3 class="grey--text xspadding-0 text--darken-4 diamonds headline diamonds">
              {{$t('cocShow.home.coc_news')}}</h3>
            <v-btn flat small color="primary" class="pull-right"
                   :to="{ path: 'news', query: { id: orgData.id}}">{{$t('global.more')}}
            </v-btn>
          </div>
          <!-- 标题 -->

          <!-- 内容区域 -->
          <v-flex class="content ">
            <!-- 加载器-->
            <div v-if="newLoading" class="py-5 text-xs-center">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>
            <!-- 加载器-->
            <!-- 有数据 -->
            <v-flex xs12 v-if="news.length" class="text-xs-left">
              <v-layout row wrap>
                <template>
                  <v-carousel hide-delimiters style="height: 370px;" interval="100000">
                    <v-flex sm12 xs12 class="cur-pointer active-item">
                      <v-carousel-item  v-for="(item, index) of news " :key="index"
                        @click="newDetail(item.organization.id, item.id)"
                      >
                          <template v-if="item.postImages.length > 0">
                            <img class="img-responsive"
                                 :src="`${$fileUrl}/public/uploads/o/company/post/${item.id}/${item.postImages[0].key}`"
                                 lazy-src="./../../../../static/img/blank.png"/>
                          </template>
                        <span class="slide-title">{{item.title}}</span>
                      </v-carousel-item>

                    </v-flex>
                  </v-carousel>



                </template>



              </v-layout>
            </v-flex>
            <!-- 有数据 -->
            <!-- 没数据 -->
            <v-layout v-if="!news.length && !newLoading" align-center justify-center row fill-height class="py-5">
              <v-flex>
                <v-icon size="120" color="primary">fiber_new</v-icon>
                <div class="blue-grey--text text--darken-3 subheading">{{$t('cocShow.news.no_coc_news')}}</div>
              </v-flex>
            </v-layout>
            <!-- 没数据 -->
          </v-flex>
          <!-- 内容区域 -->
        </v-flex>


        <!--活動--------------------------------->
        <v-flex  xs12 md4 class="pr-4">
          <!-- 标题 -->
          <v-flex xs12 class="text-xs-left ">
            <div class="module-tabs text-xs-left">
              <h3 class="text--darken-4 diamonds headline diamonds">{{ $t("profile.activities") }}</h3>
              <v-btn flat small color="primary" class="pull-right"
                     :to="{ path: 'activity', query: { id: orgData.id}}">{{$t('global.more')}}
              </v-btn>
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
              <template>
                <v-carousel hide-delimiters >
                  <v-flex sm12 xs12 class="cur-pointer active-item">
                    <v-carousel-item v-for="(act, index) of acts" :key="index" @click="actDetail(act.organization.id, act.id)">
                          
                            <template  v-if="act.eventFiles.length > 0">
                              <img 
                              lazy-src="./../../../../../static/img/blank.png"
                              :src="`${$fileUrl}/public/uploads/o/company/event/${act.id}/${act.eventFiles[0].key}`"/>

                            </template>
                            <template v-else>
                              <img class="mx-auto img-responsive"
                                   src="./../../../../../static/img/blank.png"/>
                            </template>

                          
                      
                      <span class="slide-title">{{act.title}}</span>
                    </v-carousel-item>
                  </v-flex>
                </v-carousel>
              </template>
            </v-layout>
          </v-flex>
          <!-- 内容区域 -->

          <!-- 没数据 -->
          <v-layout v-if="!acts.length && !actLoading" align-center justify-center row class="py-5">
            <v-flex>
              <v-icon size="120" color="primary">local_activity</v-icon>
              <div class="blue-grey--text text--darken-3 subheading ">{{$t('cocShow.home.no_coc_activity')}}</div>
            </v-flex>
          </v-layout>
          <!-- 没数据 -->
        </v-flex>
        <!--活動-->

        <!--產品及服務-->
        <v-flex  xs12 md4 class="pr-4">
          <!-- 标题 -->
          <v-flex xs12 class="text-xs-left ">
            <div class="module-tabs text-xs-left">
              <h3 class="text--darken-4 diamonds headline diamonds">{{ $t("chamber.left.know") }}</h3>
              <v-btn flat small color="primary" class="pull-right"
                     :to="{ path: 'products', query: { id: orgData.id}}">{{$t('global.more')}}
              </v-btn>
            </div>
          </v-flex>
          <!-- 标题 -->

          <!-- 加载器-->
          <v-flex xs12 class="white py-5" v-if="productLoading">
            <div class="text-xs-center">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>
          </v-flex>
          <!-- 加载器-->

          <!-- 内容区域 -->
          <v-flex xs12 v-if="products.length" class="text-xs-left">
            <v-layout row wrap>
              <template>
                <v-carousel hide-delimiters interval="100000">
                  <v-flex sm12 xs12 class="cur-pointer active-item">
                    <v-carousel-item v-for="(rule, index) of products " :key="index"
                                      @click="proDetail(rule.organization.id, rule.id)"
                    >
                        <template  v-if="rule.productImage.length > 0">
                          <img class="mx-auto img-responsive"
                              lazy-src="./../../../../../static/img/blank.png"
                               :src="`${$fileUrl}/public/uploads/o/company/product/image/${rule.id}/${rule.productImage[0].key}`"/>

                        </template>
                        <template v-else>
                          <img class="mx-auto img-responsive"
                               src="./../../../../../static/img/blank.png"/>
                        </template>
                      <span class="slide-title">{{rule.name}}</span>
                    </v-carousel-item>
                  </v-flex>
                </v-carousel>
              </template>
            </v-layout>
          </v-flex>
          <!-- 内容区域 -->

          <!-- 没数据 -->
          <v-layout v-if="!products.length && !productLoading" align-center justify-center row class="py-5">
            <v-flex>
              <v-icon size="120" color="primary">local_activity</v-icon>
              <div class="blue-grey--text text--darken-3 subheading ">{{$t('cocShow.rules.no_member_rules')}}</div>
              <div class="blue-grey--text text--darken-3 subheading ">{{$t('cocShow.rules.no_member_rules')}}</div>
              <div class="blue-grey--text text--darken-3 subheading ">{{$t('cocShow.rules.no_member_rules')}}</div>
            </v-flex>
          </v-layout>
          <!-- 没数据 -->
        </v-flex>

        <!--產品及服務-->
      </v-layout>
      <!-- 商会新闻结束 -->


    </v-container>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        orgId: null,
        orgLoading: true,
        actLoading: true,
        newLoading: true,
        productLoading: true,
        orgData: {}, //保存商会数据
        acts: [], //保存活动数据
        news: [], //保存新闻数据
        products: [] //保存新闻数据
      }
    },
    computed: {},
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
      actDetail(orgId, actId) {
        this.$router.push({
          path: 'activity-detail',
          query: {
            id: orgId,
            actId: actId
          }
        })
      },
      proDetail(orgId,ruleId) {
        this.$router.push({
          path: 'products-detail',
          query: {
            id: orgId,
            ruleId: ruleId
          }
        })
      },
      _initOrganizations() {
        this.orgLoading = true
        this.$http.get(`public/organizations/${this.orgId}`).then(
          res => {
            this.orgData = res.data
            this.orgLoading = false
          },
          error => {
          }
        )
      },
      _initActivity() {
        this.actLoading = true
        this.$http
          .get(`public/events?page=0&size=3&organizationId=${this.orgId}&isApproved=true`)
          .then(
            res => {
              this.acts = res.data.content
              this.actLoading = false
            },
            error => {
              
            }
          )
      },
      _initNews() {
        this.newLoading = true
        this.$http
          .get(`public/posts?page=0&size=3&organizationId=${this.orgId}`)
          .then(
            res => {
              this.news = res.data.content
              this.newLoading = false
            },
            error => {
            }
          )
      },
      _initProducts() {
        this.productLoading = true
        this.$http
          .get(`public/products?page=0&size=3&organizationId=${this.orgId}`)
          .then(
            res => {
              this.products = res.data.content
              this.productLoading = false
            },
            error => {
            }
          )
      }
    },
    mounted() {
      this.orgId = this.$route.query.code?this.$route.query.code:this.$route.query.id
      this._initOrganizations()
      this._initActivity()
      this._initNews()
      this._initProducts()
    }
  }
</script>

<style lang="scss">
  .v-toolbar__content {
    padding:0;
  }
  .coco-show-home {
    .v-carousel__next .v-btn{
      .material-icons{
        color:rgba(0, 0, 0, 0.4);
      }
    }
    .v-btn .v-btn__content .v-icon{
      color:rgba(0, 0, 0, 0.4);
    }
    &.py-4{
      padding: 0px!important;
    }

    .detail {
      line-height: 24px;

      img {
        max-width: 100% !important;
        height: auto !important;
      }
    }

    .active-item {
      .item-img {
        position: relative;

        .active-text {
          position: absolute;
          bottom: 0;
          width: 100%;
          line-height: 40px !important;
          height: 40px;
          color: #fff;
          background-color: rgba(6, 64, 110, 0.6);
        }
      }

      .item-bottom {
        .border-r {
          border-right: 1px solid #dcdcdc;
        }
      }
    }

    .btn {
      height: 40px;
      border: 1px solid #286667;

      &:hover {
        background-color: #286667;

        /deep/ .v-btn__content {
          color: #fff;
        }
      }
    }
    .module-tabs{
      .pull-right{
        margin:0;
        padding:0;
        font-size:16px;
        padding:0 10px;
        width:30px;
        &:hover{
          background-color: transparent;
          border:none;
        }
        .v-btn__content{
          max-width: 30px;
          width:30px;

        }
      }
    }
    .v-responsive{
      position: relative;
      height: 300px !important;
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
    }
  }
  .text-xs-left {

    .v-carousel {
      height: 300px !important;
      margin-bottom: 40px;
      .v-image__image{
        height: 300px;
      }
    }
  }
  .mt-5{
    margin-top: 30px!important;
  }

</style>


