<template>
  <div class="coco-show-notice">
    <v-container fluid>
      <ul data-v-52b79048="" class="v-breadcrumbs pl-0 theme--light">
        <li><router-link :to="`/`"ss="v-breadcrumbs__item">{{$t('profile.home')}}</router-link></li>
        <li class="v-breadcrumbs__divider">&gt;</li>
        <li><router-link :to="`/company/home?code=${$route.query.id}`" class="v-breadcrumbs__item">{{company}}</router-link></li>
        <li class="v-breadcrumbs__divider">&gt;</li>
        <li>
          <a disabled="disabled" href="breadcrumbs_link_1" class="v-breadcrumbs__item v-breadcrumbs__item--disabled">{{$t('profile.notice')}}</a>
        </li>
      </ul>
      <!-- 商会公告开始 -->
      <v-layout column>
        <v-flex class="module-tabs text-xs-left">
          <h3 class="grey--text text--darken-4 xspadding-0 diamonds headline diamonds">{{$t('profile.notice')}}</h3>
        </v-flex>
        <v-flex class="content py-3">

          <!-- 加载器-->
          <div v-if="anLoading" class="text-xs-center">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </div>
          <!-- 加载器-->

          <!-- 有数据 -->
          <v-layout v-if="announcements.length" column class="text-xs-left  xspadding-0">
            <v-flex class="notice-item mt-2 cur-pointer" v-for="(announcement, index) of announcements" :key="index"
                    @click="noticeDetail(announcement.organization.id ,announcement.id)">
              <h4 class="title">{{announcement.title}}</h4>
              <div class="grey--text text--darken-1 mt-2">{{announcement.createdAt}}</div>
              <div class=" grey--text text--darken-1 mt-2 pb-2  text-no-wrap text-truncate ">{{announcement.content |
                filterText}}
              </div>
            </v-flex>

            <!-- 按钮 -->
            <v-flex class="mt-5">
              <div class="text-xs-center">
                <v-pagination v-model="page" :length="totalPages" @input="handleInput"></v-pagination>

              </div>
            </v-flex>
            <!-- 按钮 -->

          </v-layout>
          <!-- 有数据 -->

          <!-- 没数据 -->
          <v-layout v-if="!announcements.length && !anLoading" align-center justify-center row fill-height class="py-5">
            <v-flex>
              <v-icon size="120" color="primary">announcement</v-icon>
              <div class="blue-grey--text text--darken-3 subheading">{{$t('cocShow.notice.no_member_notice')}}</div>
            </v-flex>
          </v-layout>
          <!-- 没数据 -->
        </v-flex>

      </v-layout>
      <!-- 商会公告结束 -->

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
        anLoading: true,
        announcements: []
      }
    },
    methods: {
      noticeDetail(orgId, anId) {
        this.$router.push({
          path: 'notice-detail',
          query: {
            id: orgId,
            noticeId: anId
          }
        })
      },
      handleInput(value) {
        this.page = value;
        this.filterpage = value - 1;
        this.$router.push({
          path: '/company/notice',
          query: {id: this.orgId, page: this.filterpage}
        });
        this.$vuetify.goTo(0, {duration: 800, easing: 'easeInOutCubic', offset: 50});
        this._initAnnouncements()
      },
      _initAnnouncements() {
        this.anLoading = true;
        this.$route.query.page =
          this.$route.query.page !== undefined
            ? this.$route.query.page
            : 0;
        this.$http
          .get(
            `public/organizations/${this.orgId}/announcements?page=${
              this.$route.query.page
              }&size=8&organization.id=${this.orgId}`
          )
          .then(
            res => {
              this.announcements = res.data.content
              this.totalPages = res.data.totalPages
              this.anLoading = false
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
      this._initAnnouncements()
    }
  }
</script>

<style lang="scss" scoped>
  .notice-item {
    border-bottom: 1px solid #dcdcdc;

    .notice-content {
      height: 50px;
      overflow: hidden;
    }
  }
</style>


