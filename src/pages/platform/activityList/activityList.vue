<template>
  <div class="activity-page home-page">
    <!-- 页面主体开始 -->

    <v-container fluid class="my-5 xsmt-5">
      <!-- 标题 -->
      <v-layout row wrap>
        <v-flex x12 class="text-xs-left">
          <div class="module-tabs">
            <h3 class="diamonds headline">{{ $t("navbar.activity_list") }} <span>ACTIVITIES</span></h3>
          </div>
        </v-flex>
      </v-layout>

      <!-- 活動狀態 -->
      <v-layout row wrap class="mt-3 hidden-sm-and-down">
        <v-flex x12 class="text-xs-left">

          <v-layout row wrap class="select-warp grey lighten-5 py-3 ">
            <v-flex xs1>
              <v-layout align-center justify-center row fill-height>
                <v-flex class="text-xs-left mt-2 pl-4">{{$t('navbar.activity_state')}}：</v-flex>
              </v-layout>
            </v-flex>

            <v-flex xs10 class="select-list text-xs-left">
              <ul class="pl-0">
                <li class="select-box px-1 d-inline-block cur-pointer" @click="handleActState('')">
                  <div class="select-item py-2 px-4 mx-2 mt-2" :class="{ active: actState === ''}">{{$t('global.unlimited' )}}</div>
                </li>
                <li class="select-box px-1 d-inline-block cur-pointer" @click="handleActState('release')">
                  <div class="select-item py-2 px-4 mx-2 mt-2" :class="{ active: actState === 'release'}">{{$t('cocShow.home.sign_up')}}</div>
                </li>
                <li class="select-box px-1 d-inline-block cur-pointer" @click="handleActState('start')">
                  <div class="select-item py-2 px-4 mx-2 mt-2" :class="{ active: actState === 'start'}">{{$t('cocShow.home.in_process')}}</div>
                </li>
              </ul>
            </v-flex>
          </v-layout>

          <v-divider></v-divider>

          <v-layout v-if="!loading" row wrap class="select-warp grey lighten-5 py-3">
            <v-flex xs1>
              <v-layout align-center justify-center row fill-height>
                <v-flex class="text-xs-left mt-2 pl-4">{{$t('navbar.activity_type')}}：</v-flex>
              </v-layout>
            </v-flex>

            <v-flex xs10 class="select-list text-xs-left" :class="{ auto: moreType }">
              <ul class="pl-0">
                <li class="select-box px-1 d-inline-block cur-pointer">
                  <div class="select-item py-2 px-4 mx-2 mt-2" :class="{ active: anyType === -1 }">{{$t('global.unlimited' )}}</div>
                </li>
                <li class="select-box px-1 d-inline-block cur-pointer" v-for="(actType, index) of actTypes" :key="index">
                  <div class="select-item py-2 px-4 mx-2 mt-2" :class="{ active: actType.choose }" @click="handleChoose(actType)">{{actType.name}}
                    <span class="item-close" v-if="actType.choose">x</span>
                  </div>
                </li>
              </ul>
            </v-flex>

            <v-flex xs1 @click="moreType = !moreType">
              <v-layout align-center justify-center row fill-height>
                <v-flex class="text-xs-center more cur-pointer" :class="{ active: moreType }">{{$t('global.more')}}</v-flex>
              </v-layout>
            </v-flex>

          </v-layout>
          <v-layout v-else row wrap class="select-warp white py-3">
            <v-progress-linear :indeterminate="true"></v-progress-linear>
          </v-layout>
        </v-flex>
      </v-layout>


      <!-- 商會活動开始 -->
      <div class="wrap activity">
        <div class="box-container">
          <v-layout row wrap class="xsmt-5">
   

            <!-- 加载器-->
            <v-flex xs12 class="white py-5" v-if="isLoading">
              <div class="text-xs-center">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </div>
            </v-flex>
            <!-- 加载器-->

            <!-- 内容区域 -->
            <v-flex xs12 v-if="acts.length" class="text-xs-left py-2">
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

            <!-- 无数据 -->
            <v-flex v-if="acts.length === 0" xs12 class=" py-5">
              <v-icon size="120" color="primary">local_activity</v-icon>
              <div class="blue-grey--text text--darken-3 subheading">{{$t('message.no_message')}}</div>
            </v-flex> 
            <!-- 无数据 -->

            <!-- 分页器 -->
            <v-layout>
              <v-flex v-if="acts.length && !isLoading" x12 class="mt-5 text-xs-center">
                <v-pagination v-model="page" :length="totalPages" @input="handleInput"></v-pagination>
              </v-flex>

            </v-layout>
            <!-- 分页器 -->

          </v-layout>
        </div>
      </div>

      <!-- 商會活動结束 -->

    </v-container>
    <!-- 页面主体结束 -->

  </div>
</template>

<script>


export default {
    metaInfo: {
        title: '活動列表', // set a title
        titleTemplate: '%s_企業廣場_企業管理和推廣平台',
        htmlAttrs: {
            lang: 'hk',
            amp: undefined // "amp" has no value
        }
    },
    data: () => {
        return {
            loading: false, //控制搜索框
            model: null, //搜索框绑定数据
            search: null, //搜索框值
            page: 1,
            filterpage: 0,
            totalPages: 0,
            acts: [], //保存活动数据
            isLoading: true,
            actTypes: [], //筛选的活动类型
            selectArr: [], //保存点击的筛选条件
            moreType: false, //更多活动类型
            actState: '' //活动状态
        }
    },
    computed: {
        currentDate() {
            return this.$moment(new Date())
        },
        reqSelectStr() {
            let pathStr
            if (this.$route.query.eventCategoryId) {
                if (typeof this.$route.query.eventCategoryId !== 'string') {
                    let str = ''
                    this.$route.query.eventCategoryId.forEach(val => {
                        str += `${val}`     
                    })
                    pathStr = `&eventStatus=${this.actState}${str}`
                } else {
                    pathStr = `&eventStatus=${this.actState}${
                        this.$route.query.eventCategoryId
                    }`
                }
                return pathStr
            } else {
                return pathStr = this.actState !== '' ? `&eventStatus=${this.actState}`: '';
            }
        },
        anyType() {
            return this._NoChoose(this.actTypes)
        }
    },
    watch: {
        selectArr() {
            this.acts = []
            this.$router.push({
                path: '/activity-list',
                query: {
                    eventCategoryId: this.selectArr,
                    page: this.filterpage
                }
            })
            this._initActivity()
        },
        actState() {
            this.acts = []
            this._initActivity()
        }
    },
    methods: {
        handleInput(value) {
            this.page = value
            this.filterpage = value - 1
            this.$router.push({
                path: '/activity-list',
                query: {
                    eventCategoryId: this.selectArr,
                    page: this.filterpage
                }
            })
            this.$vuetify.goTo(600, {
                duration: 800,
                easing: 'easeInOutCubic',
                offset: 50
            })
            this._initActivity()
        },
        handleActState(value) {
            this.actState = value
        },
        handleChoose(item) {
            if (item.choose) {
                let path = `&eventCategoryId=${item.id}`
                let index = this.selectArr.findIndex(item => {
                    return item === path
                })
                this.selectArr.splice(index, 1)
            } else {
                this.selectArr.push(`&eventCategoryId=${item.id}`)
            }
            item.choose = !item.choose
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
        //判断是否没选状态
        _NoChoose(data) {
            let result = data.findIndex(item => {
                return item.choose
            })
            return result
        },
        //初始化活动列表
        _initActivity() {
            this.isLoading = true
            this.$route.query.page =
                this.$route.query.page !== undefined
                    ? this.$route.query.page
                    : 0;

            this.$http
                .get(
                    `public/events?page=${this.$route.query.page}&size=15${
                        this.reqSelectStr
                    }&isApproved=true`
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

                        this.isLoading = false
                    },
                    error => {}
                )
        },
        //初始化筛选活动类型
        _initActType() {
          this.loading = true
            this.$http.get(`public/event_categorys`).then(
                res => {
                    let data = res.data.content
                    this.totalPages = res.data.totalPages
                    if (this.$route.query.eventCategoryId) {
                        if (
                            typeof this.$route.query.eventCategoryId !==
                            'string'
                        ) {
                            data.forEach(item => {
                                this.$route.query.eventCategoryId.forEach(
                                    val => {
                                        if (
                                            `&eventCategoryId=${item.id}` ===
                                            val
                                        ) {
                                            this.$set(item, 'choose', true)
                                        }
                                    }
                                )
                            })
                        } else {
                            data.forEach(item => {
                                this.$set(item, 'choose', false)
                            })
                        }
                    }

                    this.actTypes = data
                    this.loading = false
                },
                error => {}
            )
        }
    },
    mounted() {
      this.page = this.$route.query.page !== undefined ? Number(this.$route.query.page) + 1 : 1

      if (this.$route.query.search !== undefined) {
        this.isLoading = true
        this.$http
          .get(
            `public/events?page=${
              this.filterpage
              }&size=15&isApproved=true&search=${
              this.$route.query.search
              }`
          )
          .then(
            res => {
              this.acts = res.data.content
              this.totalPages = res.data.totalPages
              this.isLoading = false

            },
            error => {
            }
          )
      } else {
        this._initActivity()
      }

        this._initActType()
    }
}
</script>

<style lang='scss' scoped>
@media (max-width: 600px){
  .container{
    padding: 3px!important;
  }
}
.activity-page {
    .v-card--reveal {
        align-items: center;
        bottom: 0;
        justify-content: center;
        opacity: 0.8;
        position: absolute;
        width: 100%;
    }
    .select-warp {
        background-color: #fff;
        border-bottom: 1px solid #dcdcdc;
        &:last-child {
            border-bottom: none;
        }
        .select-list {
            height: 44px;
            overflow: hidden;
            line-height: 20px;
            &.auto {
                height: auto;
                line-height: auto;
            }
            .select-box {
                .select-item {
                    position: relative;
                    &:hover {
                        background-color: #286667;
                        color: #fff;
                    }
                    &.active {
                        background-color: #286667;
                        color: #fff;
                    }
                    .item-close {
                        position: absolute;
                        right: 10px;
                        top: 5px;
                        font-size: 22px;
                    }
                }
            }
        }

        .more {
            color: #286667;
            position: relative;

            &::after {
                content: '';
                display: block;
                position: absolute;
                left: 20%;
                top: -4px;
                bottom: 0;
                height: 1px;
                margin: auto 0;
                border-bottom: solid 4px #286667;
                border-left: solid 4px transparent;
                border-top: solid 4px transparent;
                border-right: solid 4px transparent;
            }
            &.active {
                &::after {
                    top: 4px;
                    border-top: solid 4px #286667;
                    border-left: solid 4px transparent;
                    border-bottom: solid 4px transparent;
                    border-right: solid 4px transparent;
                }
            }
        }
    }
}
</style>
