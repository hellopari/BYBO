<template>
  <div class="coco-show-frameWork">
    <v-container class="my-0" fluid>
      <ul data-v-52b79048="" class="v-breadcrumbs pl-0 theme--light">
        <li><router-link :to="`/`" ss="v-breadcrumbs__item">{{$t('profile.home')}}</router-link></li>
        <li class="v-breadcrumbs__divider">&gt;</li>
        <li><router-link :to="`/company/home?code=${$route.query.id}`" class="v-breadcrumbs__item">{{orgData.name}}</router-link></li>
        <li class="v-breadcrumbs__divider">&gt;</li>
        <li>
          <a disabled="disabled" class="v-breadcrumbs__item v-breadcrumbs__item--disabled">{{$t('cocShow.framework.introduction_coc')}}</a>
        </li>
      </ul>

      <!-- 加载器-->
      <v-flex class="white" v-if="orgLoading">
        <div class="text-xs-center">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
      </v-flex>
      <!-- 加载器-->
      <!-- 商会简介开始 -->
      <v-layout column class="html-conent" v-else>
        <v-flex class="module-tabs text-xs-left">
          <h3 class="xspadding-0  grey--text text--darken-4 diamonds headline diamonds">{{$t('cocShow.framework.introduction_coc' )}}<span>PROFILE</span></h3>
        </v-flex>
        <v-flex style="word-wrap: break-word;" v-html="orgData.description" class="mt-5 xspadding-0 grey--text text--darken-4 text-xs-left detail"></v-flex>
      </v-layout>
      <!-- 商会简介结束 -->
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orgId: null,
      orgData: {},
      orgLoading: false,
    }
  },
  methods: {
    _initOrganizations () {
      this.orgLoading = true;
      this.$http.get(`public/organizations/${this.orgId}`).then(res => {
        this.orgData = res.data;
        this.orgLoading = false;
      }, error => {

      })
    },
  },
  mounted () {
    this.orgId = this.$route.query.id;
    this._initOrganizations();
  }
}
</script>

<style lang="scss" >
.detail {
  line-height: 24px;
   img {
         max-width: 100%!important;
         height: auto!important;
     }
}
</style>


