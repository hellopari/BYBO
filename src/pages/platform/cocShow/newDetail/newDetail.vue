<template>
  <div class="coco-show-new-detail">
    <v-container fluid>
      <ul  class="v-breadcrumbs pl-0 theme--light">
        <li><router-link :to="`/`" ss="v-breadcrumbs__item">{{$t('profile.home')}}</router-link></li>
        <li class="v-breadcrumbs__divider">&gt;</li>
        <li><router-link :to="`/company/home?code=${$route.query.id}`" class="v-breadcrumbs__item">{{company}}</router-link></li>

        <li class="v-breadcrumbs__divider">&gt;</li>
        <li>
          <router-link :to="`/company/news?id=${$route.query.id}`" class="v-breadcrumbs__item">{{$t('global.hot_news')}}</router-link>
        </li>
        <li class="v-breadcrumbs__divider">&gt;</li>
        <li>
          <a disabled="disabled" href="breadcrumbs_link_1" class="v-breadcrumbs__item v-breadcrumbs__item--disabled">{{newDetail.title}}</a>
        </li>
      </ul>

      <v-layout column>
        <!-- 加载器-->
        <v-flex class="white mt-5" v-if="isLoading">
          <div class="text-xs-center">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>
        </v-flex>
        <!-- 加载器-->

        <template v-if="newDetail.id">
          <!-- 标题 -->
          <v-flex>
            <h3 class="headline">{{newDetail.title}}</h3>
          </v-flex>

          <v-flex class="mt-3 grey--text text--darken-1">
            <div class="d-inline-block">
              <v-icon size="20">person</v-icon>
              <span class="vertical-m ml-2">{{newDetail.organization.name}}</span>
            </div>
            <div class="d-inline-block ml-3">
              <v-icon size="20">access_time</v-icon>
              <span class="vertical-m ml-2">{{newDetail.createdAt}}</span>
            </div>
<!--            <div class="d-inline-block ml-3">-->
<!--              <v-icon size="20">visibility</v-icon>-->
<!--              <span class="vertical-m ml-2">{{newDetail.view}}次</span>-->
<!--            </div>-->
          </v-flex>
          <!-- 标题 -->

          <!-- 内容区域 -->
          <v-flex class="text-xs-left mt-5 px-4 xspadding-0 subheading html-conent">
            <div v-html="newDetail.content"></div>
          </v-flex>
          <!-- 内容区域 -->
        </template>

      </v-layout>
    </v-container>
  </div>
</template>

<script>
import {mapState} from "vuex";
export default {
  computed:{
    ...mapState(['company'])
  },
   metaInfo() {
        return {
            title: this.newDetail.title ? this.newDetail.title : '企業廣場',
            titleTemplate:
                '%s - 簡介__新聞_活動_企業廣場-企業管理和推廣平台',
            meta: [
                {
                    name: 'keywords',
                    content: this.newDetail.title ? this.newDetail.title : '企業廣場'
                },
                {
                    name: 'description',
                    content: this.newDetail.content ? this.newDetail.content : '企業廣場'
                },
                 {
                    name: 'og:url',
                    content: `${this.$fileUrl}/company/new-detail?id=${this.orgId}&newId=${this.newDetail.id}`
                },
                 {
                    name: 'og:image',
                    content: `${this.$fileUrl}${this.metaImage}`
                }
            ],
            htmlAttrs: {
                lang: 'hk',
                amp: undefined // "amp" has no value
            }
        }
    },
  data () {
    return {
      orgId: null,
      newId: null,
      metaImage: null,
      newDetail: {},
      isLoading: true,
    }
  },
  methods: {
    _initNewDetail () {
      this.isLoading = true;
      this.$http.get(`public/posts/${this.newId}`).then(
        res => {
          this.newDetail = res.data;
          this.metaImage = this.newDetail.postImages[0].key;
          this.isLoading = false;
        },
        error => {}
      );
    }

  },
  mounted () {
    this.orgId = this.$route.query.id;
    this.newId = this.$route.query.newId;
    this._initNewDetail();
  }
}
</script>

<style lang="scss" >
 .html-conent img{
         max-width: 100%;
         height: auto;
         margin:0 auto;
         display: inherit;

 }
</style>
