<template>
  <div class="coco-show-rules home-page" >
    <v-container fluid class=" xsmt-5" >

      <div class="wrap product">
        <div class="box-container box-container-p80">
          <v-layout row wrap class="xsmt-5">
            <v-flex xs12 class="text-xs-left">
              <div class="module-tabs">
                <h3 class="diamonds headline">{{ $t("profile.products") }}<span>PRODUCT</span></h3>
              </div>
            </v-flex>
            <!-- 标题 -->
            <!-- 加载器-->
            <v-flex xs12 class="white py-5" v-if="ruleLoading&&isLoading">
              <div class="text-xs-center">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </div>
            </v-flex>
            <!-- 加载器-->

            <!-- 内容区域 --> 
            <v-flex xs12 v-if="products.length" class="text-xs-left py-2">
              <v-layout row wrap>
                <v-flex lg-5 md3 sm12 xs12 v-for="(rule, index) of products" :key="index" @click="ruleDetail(rule.organization.id,rule.id)">
                  <v-card style="background-color: #f1f4f6;" class="hover-card text-xs-left elevation-0">
                    <div class="img-content">
                      <template  v-if="rule.productImage.length > 0">
                        <img class="mx-auto img-responsive"
                            lazy-src="./../../../../static/img/blank.png"
                            :src="`${$fileUrl}/public/uploads/o/company/product/image/${rule.id}/${rule.productImage[0].key}`"/>

                      </template>
                      <template v-else>
                        <img class="mx-auto img-responsive"
                             src="./../../../../static/img/blank.png"/>
                      </template>

                    </div>
                    <div class="text">
                      <div class="mb-3 text-no-wrap text-truncate name">{{rule.name}}</div>

                      <div class="mb-3 text-no-wrap text-truncate brief">{{rule.description| filterText}}</div>

                      <div class="text-no-wrap text-truncate price">$HK {{rule.price}}</div>
                      <div class="mb-3 text-no-wrap text-truncate company">藍庫網絡科技有限公司</div>
                    </div>

                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
            <!-- 内容区域 -->

            <v-flex v-if="products.length === 0 && !ruleLoading" row wrap class="white py-5 mt-4">
              <v-flex xs12 class=" py-5">
                <v-icon size="120" color="primary">fiber_new</v-icon>
                <div class="blue-grey--text text--darken-3 subheading">{{$t('cocShow.home.no_coc_news')}}</div>
              </v-flex>
            </v-flex>


            <v-flex class="text-xs-center" v-if="products.length&&isLoading">
                <v-pagination v-model="page" :length="totalPages" @input="handleInput"></v-pagination>
            </v-flex>

          </v-layout>
        </div>
      </div>


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
        ruleLoading: true,
        page: 1,
        filterpage: 0,
        products: [],
        isLoading:true,
      }
    },
    methods: {
      ruleDetail(orgId,ruleId) {
        this.$router.push({
          path: 'company/products-detail',
          query: {
            id: orgId,
            ruleId: ruleId
          }
        })
      },
      handleInput(value) {
        this.page = value 
        this.filterpage = value-1
        this.$router.push({
          path: '/product-list',
          query: {page: this.filterpage}
        })
        this.$vuetify.goTo(600, {duration: 800, easing: 'easeInOutCubic', offset: 50})
        this._initProducts()
      },
      _initProducts() {
        this.ruleLoading = true
        this.$route.query.page =
          this.$route.query.page !== undefined
            ? this.$route.query.page
            : 0
        this.$http
          .get(
            `public/products?page=${this.$route.query.page}&size=20`)
          .then(
            res => {
              this.products = res.data.content
              this.totalPages = res.data.totalPages
              this.ruleLoading = false
            },
            error => {
            }
          )
      }
    },
    mounted() {

      this.page = this.$route.query.page !== undefined ? Number(this.$route.query.page) + 1 : 1

      if (this.$route.query.search !== undefined&&this.$route.query.search!='undefined') {
        this.isLoading = true
        this.$http
          .get(
            `public/products?page=${
              this.filterpage
              }&size=15&isApproved=true&search=${
              this.$route.query.search
              }`
          )
          .then(
            res => {
              this.products = res.data.content
              this.totalPages = res.data.totalPages
              this.isLoading = false

            },
            error => {
            }
          )
      } else {
        this._initProducts()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mdi-cart:before {
    content: "\F110";
  }

  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .5;
    position: absolute;
    width: 100%;
  }

  .rule-item {
    border-bottom: 1px solid #dcdcdc;

    .rule-content {
      height: 50px;
      overflow: hidden;
    }
  }
</style>


