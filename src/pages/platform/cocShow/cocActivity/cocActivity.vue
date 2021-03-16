<template>
  <div class="coco-show-activity activity">
    <v-container fluid>
      <ul data-v-52b79048="" class="v-breadcrumbs pl-0 theme--light">
        <li><router-link :to="`/`" ss="v-breadcrumbs__item">{{$t('profile.home')}}</router-link></li>
        <li class="v-breadcrumbs__divider">&gt;</li>
        <li><router-link :to="`/company/home?code=${$route.query.id}`" class="v-breadcrumbs__item">{{company}}</router-link></li>
        <li class="v-breadcrumbs__divider">&gt;</li>
        <li>
          <a disabled="disabled" href="breadcrumbs_link_1" class="v-breadcrumbs__item v-breadcrumbs__item--disabled">{{$t('cocShow.activity.coc_activity')}}</a>
        </li>
      </ul>
      <!-- 商会活動开始 -->
      <v-layout column>
        <v-flex class="module-tabs text-xs-left">
             <h3 class="diamonds headline">{{$t('cocShow.activity.coc_activity')}}<span>ACTIVITIES</span></h3>
        </v-flex>
        <v-flex class="content py-3">

          <!-- 加载器-->
          <div v-if="actLoading" class="text-xs-center">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </div>
          <!-- 加载器-->

          <!-- 有数据 -->
          <!-- 内容区域 -->
          <v-flex xs12 v-if="acts.length" class="text-xs-left py-2">
            <v-layout row wrap>
              <v-flex lg-5 md3 sm12 xs12 class="cur-pointer" v-for="(act, index) of acts" :key="index"
                      @click="actDetail(act.organization.id, act.id)">
                <v-card style="background-color: #f1f4f6;" class="hover-card text-xs-left elevation-0">
                  <div class="img-content">
                    <template  v-if="act.eventFiles.length > 0">
                      <img class="mx-auto img-responsive"
                          lazy-src="./../../../../../static/img/blank.png"
                           :src="`${$fileUrl}/public/uploads/o/company/event/${act.id}/${act.eventFiles[0].key}`"/>

                    </template>
                    <template v-else>
                      <img class="mx-auto img-responsive"
                           src="./../../../../../static/img/blank.png"/>
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
          <!-- 没数据 -->
          <v-layout v-if="!acts.length && !actLoading" align-center justify-center row fill-height class="py-5">
            <v-flex>
              <v-icon size="120" color="primary">local_activity</v-icon>
              <div class="blue-grey--text text--darken-3 subheading">{{$t('cocShow.home.no_coc_activity')}}</div>
            </v-flex>
          </v-layout>
        </v-flex>

        <!-- 按钮 -->
        <v-flex v-if="acts.length">
          <div class="text-xs-center">
            <v-pagination v-model="page" :length="totalPages" @input="handleInput"></v-pagination>
          </div>
        </v-flex>

      </v-layout>
      <!-- 商会活動结束 -->

    </v-container>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  export default {
    data() {
      return {
        page: 1,
        filterpage: 0,
        totalPages: 0,
        orgId: null,
        actLoading: true,
        items: [
          {
            text: this.$t('profile.home'),
            disabled: false,
            href: `/company/home?id=${this.$route.query.id}`
          },
          {
            text: this.$t('cocShow.activity.coc_activity'),
            disabled: true,
            href: 'breadcrumbs_link_1'
          }
        ],
        acts: [] //保存活动数据
      }
    },
    computed: {
      currentDate() {
        return this.$moment(new Date())
      },
      ...mapState(['company'])
    },
    methods: {
      actDetail(orgId, actId) {
        this.$router.push({
          path: 'activity-detail',
          query: {
            id: orgId,
            actId: actId
          }
        })
      },
      handleInput(value) {
        this.page = value
        this.filterpage = value - 1
        this.$router.push({
          path: '/company/activity',
          query: {id: this.orgId, page: this.filterpage}
        })
        this.$vuetify.goTo(0, {duration: 800, easing: 'easeInOutCubic', offset: 50})
        this._initActivity()
      },
      _initActivity() {
        this.actLoading = true
        this.$route.query.page =
          this.$route.query.page !== undefined
            ? this.$route.query.page
            : 0
        this.$http
          .get(
            `public/events?page=${
              this.$route.query.page
              }&size=6&organizationId=${this.orgId}&isApproved=true`
          )
          .then(
            res => {
              this.acts = res.data.content
              this.totalPages = res.data.totalPages
              this.acts.forEach(val => {
                val['totalNumber'] = 0
                val.eventTickets.forEach(value => {
                  val['totalNumber'] =
                    val['totalNumber'] + value.vendition
                })
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
              })
              this.actLoading = false
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
      this._initActivity()
    }
  }
</script>

<style lang="scss" scoped>
  .coco-show-activity {
    .active-type {
      padding: 2px 4px;
      margin-left: 10px;
      font-size: 12px;
      color: #ebebeb;
      background-color: #b3b3b3;
    }
  }
</style>


