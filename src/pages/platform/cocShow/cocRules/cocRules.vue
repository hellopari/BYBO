<template>
  <div class="coco-show-rules home-page">
    <v-container fluid>
      <ul data-v-52b79048="" class="v-breadcrumbs pl-0 theme--light">
        <li><router-link :to="`/`"ss="v-breadcrumbs__item">{{$t('profile.home')}}</router-link></li>
        <li class="v-breadcrumbs__divider">&gt;</li>
        <li><router-link :to="`/company/home?code=${$route.query.id}`" class="v-breadcrumbs__item">{{company}}</router-link></li>
        <li class="v-breadcrumbs__divider">&gt;</li>
        <li>
          <a disabled="disabled" href="breadcrumbs_link_1" class="v-breadcrumbs__item v-breadcrumbs__item--disabled">{{$t('cocShow.rules.member_rules')}}</a>
        </li>
      </ul>
      <!-- 开始 -->
      <v-layout column xsmt-5>
        <!-- 标题 -->
        <v-flex class="module-tabs text-xs-left">
          <h3 class="diamonds headline">{{ $t("profile.products") }}<span>PRODUCT</span></h3>
        </v-flex>
        <!-- 标题 -->
        <!-- 内容区域 -->
        <v-flex class="content py-3">

          <!-- 加载器-->
          <div v-if="ruleLoading" class="text-xs-center">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </div>
          <!-- 加载器-->

          <!-- 有数据 -->
          <v-layout row wrap rules>
           <v-flex xs12 v-if="rules.length" class="text-xs-left py-2">
            <v-layout row wrap>
              <v-flex lg-5 md3 sm12 xs12 v-for="(rule, index) of rules" :key="index" @click="ruleDetail(rule.organization.id, rule.id)">
                <v-card style="background-color: #f1f4f6;" class="hover-card text-xs-left elevation-0">
                  <div class="img-content">
                    <template  v-if="rule.productImage.length > 0">
                      <img class="mx-auto img-responsive"
                            lazy-src="./../../../../../static/img/blank.png"
                             :src="`${$fileUrl}/public/uploads/o/company/product/image/${rule.id}/${rule.productImage[0].key}`"/>

                    </template>
                    <template v-else>
                      <img class="mx-auto img-responsive"
                           src="./../../../../../static/img/blank.png"/>
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
          </v-layout>
          <v-layout v-if="rules.length">
            <!-- 按钮 -->
            <v-flex xs12 class="mt-5">
              <div class="text-xs-center">
                <v-pagination v-model="page" :length="totalPages" @input="handleInput"></v-pagination>
              </div>
            </v-flex>
            <!-- 按钮 -->
          </v-layout>
          <!-- 有数据 -->

          <!-- 没数据 -->
          <v-layout v-if="!rules.length && !ruleLoading" align-center justify-center row fill-height class="py-5">
            <v-flex>
              <v-icon size="120" color="primary">error</v-icon>
              <div class="blue-grey--text text--darken-3 subheading">{{$t('cocShow.rules.no_member_rules')}}</div>
            </v-flex>
          </v-layout>
          <!-- 没数据 -->
        </v-flex>
        <!-- 内容区域 -->

      </v-layout>
      <!-- 结束 -->

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
        orgId: null, //商会id
        ruleLoading: true,
        rules: []
      }
    },
    methods: {
      ruleDetail(orgId,ruleId) {
        this.$router.push({
          path: 'products-detail',
          query: {
            id: orgId,
            ruleId: ruleId
          }
        })
      },
      handleInput(value) {
        this.page = value
        this.filterpage = value - 1
        this.$router.push({
          path: '/company/products',
          query: {id: this.orgId, page: this.filterpage}
        })
        this.$vuetify.goTo(0, {duration: 800, easing: 'easeInOutCubic', offset: 50})
        this._initRules()
      },
      _initRules() {
        this.ruleLoading = true
        this.$route.query.page =
          this.$route.query.page !== undefined
            ? this.$route.query.page
            : 0
        this.$http
          .get(
            `public/organizations/${this.orgId}/products?page=${this.$route.query.page}&size=15`
          )
          .then(
            res => {
              this.rules = res.data.content
              this.totalPages = res.data.totalPages
              this.ruleLoading = false
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

      this._initRules()
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


