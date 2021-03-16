<template>
  <div class="coco-show-link">
    <v-container fluid>
      <ul data-v-52b79048="" class="v-breadcrumbs pl-0 theme--light">
        <li><router-link :to="`/company/home?code=${$route.query.id}`"ss="v-breadcrumbs__item">{{$t('profile.home')}}</router-link></li>
        <li class="v-breadcrumbs__divider">&gt;</li>
        <li>
          <a disabled="disabled" href="breadcrumbs_link_1" class="v-breadcrumbs__item v-breadcrumbs__item--disabled">{{links.title}}</a>
        </li>
      </ul>
      <!-- 开始 -->
      <v-layout column>
        <!-- 标题 -->
        <v-flex v-if="!linkLoading">
          <h3 class="text-xs-left pl-3 grey--text text--darken-4 xspadding-0 diamonds headline diamonds">{{links.title}}</h3>
        </v-flex>
        <!-- 标题 -->

        <!-- 内容区域 -->
        <v-flex class="content py-3">

          <!-- 加载器-->
          <div v-if="linkLoading" class="text-xs-center">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </div>
          <!-- 加载器-->

          <!-- 有数据 -->

          <v-layout v-else column class="text-xs-left html-conent px-3 xspadding-0">
            <v-flex v-html="links.content"></v-flex>
          </v-layout>

          <!-- 有数据 -->

        </v-flex>
        <!-- 内容区域 -->

      </v-layout>
      <!-- 结束 -->

    </v-container>
  </div>
</template>

<script>
export default {
    data() {
        return {
            page: 1,
            orgId: null, //商会id
            linkLoading: true,
            links: null
        }
    },
    watch: {
        $route(to, from) {
            this.orgId = to.query.id
            this._initLinks()
        }
    },
    mounted() {
        this.orgId = this.$route.query.id
        this._initLinks()
    },
    methods: {
        handleClick() {},
        _initLinks() {
            this.linkLoading = true
            this.$http.get(`public/tabs/${this.orgId}`).then(
                res => {
                    this.links = res.data
                    this.linkLoading = false
                },
                error => {}
            )
        }
    }
}
</script>

<style lang="scss" >
.rule-item {
    border-bottom: 1px solid #dcdcdc;
}
 .html-conent img{
         max-width: 100%;
         height: auto;

 }

</style>


