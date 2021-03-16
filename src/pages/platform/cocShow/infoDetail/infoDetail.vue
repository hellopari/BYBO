<template>
  <div class="coco-show-info-detail">
    <v-container fluid>
      <ul data-v-52b79048="" class="v-breadcrumbs pl-0 theme--light">
        <li><router-link  :to="`/company/home?id=${$route.query.id}`"  class="v-breadcrumbs__item">{{$t('profile.home')}}</router-link ></li>
        <li class="v-breadcrumbs__divider">&gt;</li>
        <li><router-link :to="`/company/home?code=${$route.query.id}`" class="v-breadcrumbs__item">{{company}}</router-link></li>
        <li class="v-breadcrumbs__divider">&gt;</li>
        <li>
          <router-link :to="`/company/products?id=${$route.query.id}`"  class="v-breadcrumbs__item">{{$t('cocShow.rules.member_rules')}}</router-link>
        </li>
        <li class="v-breadcrumbs__divider">&gt;</li>
        <li>
          <a disabled="disabled" href="breadcrumbs_link_1" class="v-breadcrumbs__item v-breadcrumbs__item--disabled">{{infoDetail.name}}</a>
        </li>
      </ul>
      <v-layout column>

        <!-- 加载器-->
        <v-flex class="white mt-5 py-5" v-if="isLoading">
          <div class="text-xs-center">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>
        </v-flex>
        <!-- 加载器-->

        <v-layout
          row
          wrap
          v-if="!isLoading"
        >
          <v-flex
            md6
            xs12
            

          >
            <template v-if="productImage.length">
              <v-carousel class="grey lighten-5" style="box-shadow: none" hide-delimiters>
                <v-carousel-item v-for="(item,i) in productImage"
                                 :key="i"
                                 :src="`${$fileUrl}/public/uploads/o/${item.path}`"
                                 lazy-src="./../../../../static/img/blank.png"
                ></v-carousel-item>
              </v-carousel>
            </template>
            <template v-else>
              <v-carousel class="grey lighten-5" style="box-shadow: none" hide-delimiters>
                <v-carousel-item
                  src="./../../../../static/img/blank.png"
                ></v-carousel-item>
              </v-carousel>
            </template>
            
          </v-flex>
          <v-flex md6>
            <v-layout
              column
              class="text-xs-left px-3 xspadding-0"
            >
              <v-flex>
                <h4 style="font-size: 24px" class=" primary--text">{{infoDetail.name}}</h4>
              </v-flex>

              <v-flex class="mt-3">
                <p class="vertical-m ml-2 mb-3">sku : {{infoDetail.sku}}</p>
                <div class="vertical-m mb-3">
                  <div class=" ml-2 mb-1">
                    {{$t('chamber.know.categories')}}:
                  </div>
                  <v-chip outline color="primary" v-for="(item,i) in infoDetail.categories" :key="i">{{item.name}}
                  </v-chip>
                </div>
                <p class="vertical-m ml-2 primary--text ">{{$t('chamber.know.compareAtPrice')}}: <strong
                  class="red--text">$HK {{infoDetail.compareAtPrice}}</strong></p>
                <p class="vertical-m ml-2 primary--text ">{{$t('chamber.know.price')}}:
                  <del class="grey--text">$HK {{infoDetail.price}}</del>
                </p>
              </v-flex>
              <v-divider></v-divider>
              <v-flex class="ml-2">
                <div class="mt-3">{{$t('chamber.know.content')}}</div>
                <span class="vertical-m ml-2 grey--text lighten-5
" style="overflow-wrap: break-word;" v-html="infoDetail.content"></span>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 class="text-xs-left mt-5  xspadding-0 subheading html-conent">
            <div class="module-tabs text-xs-left">
              <h3 class="grey--text xspadding-0 text--darken-4 diamonds headline diamonds">
                {{$t('chamber.know.description')}}</h3>
            </div>
            <div style="overflow-wrap: break-word;" v-html="infoDetail.description"></div>
          </v-flex>
        </v-layout>

      </v-layout>
    </v-container>
  </div>
</template>

<script>
import {mapMutations,mapState} from "vuex";
  export default {
    computed:{
      ...mapState(['company'])
    },
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
            content: `${this.$fileUrl}/company/products-detail?id=${this.$route.query.id}&noticeId=${this.infoDetail.id}`
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
        infoId: '',
        infoType: '',
        infoDetail: {},
        productImage: [],
        isLoading: true,

      }
    },
    watch: {
      $route(to, from) {
        this._initInfo()
      }
    },
    mounted() {
      this._initInfo()
      this._initView()

    },
    methods: {
      _initView() {
        this.$http.put(`public/products/${this.$route.query.ruleId}/view`).then(res => {
        });
      },
      _initInfo() {
        if (this.infoType === 'rule')
          this.isLoading = true;
        this.$http.get(`public/products/${this.$route.query.ruleId}`).then(res => {
          this.infoDetail = res.data;
          this.productImage = res.data.productImage;
          this.isLoading = false;
        }, error => {
        })
      },
    }
  }
</script>

<style lang="scss">
  .html-conent img {
    max-width: 100%;
    height: auto;

  }
</style>

