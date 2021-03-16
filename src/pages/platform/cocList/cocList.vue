<template>
  <div class="coc-list-page">
    <!-- 页面主体开始 -->
    <v-container fluid class="my-5 xsmt-5">
      <!-- 标题 -->
      <v-layout row wrap>
        <v-flex xs12 class="text-xs-left">
          <div class="module-tabs">
            <h3 class="diamonds headline">{{ $t("navbar.coc_list") }}<span>ENTERPRISE</span></h3>
          </div>
        </v-flex>
      </v-layout>
      <!-- 标题 -->

      <v-layout row wrap class="mt-4 hidden-sm-and-down">
        <v-flex xs12 class="text-xs-left">

          <!-- 地区选择 -->
          <v-layout v-if="!locationLoading" row wrap class="select-warp grey lighten-5 py-3">
            <v-flex xs1>
              <v-layout align-center justify-center row fill-height>
                <v-flex class="text-xs-left mt-2 pl-4">{{$t('chamber.select.region' )}}：</v-flex>
              </v-layout>
            </v-flex>

            <v-flex xs10 class="select-list text-xs-left" :class="{ auto: moreLocat }">
              <ul class="pl-0">
                <li class="select-box px-1 d-inline-block cur-pointer">
                  <div class="select-item py-2 px-4 mx-2 mt-2" :class="{ active: anyLocations === -1 }">
                    {{$t('global.unlimited' )}}
                  </div>
                </li>
                <li class="select-box px-1 d-inline-block cur-pointer" v-for="(location, index) of locations"
                    :key="index">
                  <div class="select-item py-2 px-4 mx-2 mt-2" :class="{ active: location.choose }"
                       @click="handleChoose('location',location)">{{location.name}}
                    <span class="item-close" v-if="location.choose">x</span>
                  </div>
                </li>
              </ul>
            </v-flex>

            <v-flex xs1 @click="moreLocat = !moreLocat">
              <v-layout align-center justify-center row fill-height>
                <v-flex class="text-xs-center more cur-pointer" :class="{ active: moreLocat }">{{$t('global.more' )}}
                </v-flex>
              </v-layout>
            </v-flex>

          </v-layout>
          <!-- 地区选择 -->
          <v-layout v-else row wrap class="select-warp grey lighten-5 py-3">
            <v-progress-linear :indeterminate="true"></v-progress-linear>
          </v-layout>

          <v-divider></v-divider>

          <!-- 行业选择 -->
          <v-layout v-if="!industryLoading" row wrap class="select-warp grey lighten-5 py-3">
            <v-flex xs1>
              <v-layout align-center justify-center row fill-height>
                <v-flex class="text-xs-left mt-2 pl-4">{{$t('chamber.select.industry')}}：</v-flex>
              </v-layout>
            </v-flex>

            <v-flex xs10 class="select-list text-xs-left" :class="{ auto: moreIndust }">
              <ul class="pl-0">
                <li class="select-box px-1 d-inline-block cur-pointer">
                  <div class="select-item py-2 px-4 mx-2 mt-2" :class="{ active: anyIndustrys === -1 }">
                    {{$t('global.unlimited' )}}
                  </div>
                </li>
                <li class="select-box px-1 d-inline-block cur-pointer" v-for="(industry, index) of industrys"
                    :key="index">
                  <div class="select-item py-2 px-4 mx-2 mt-2" :class="{ active: industry.choose }"
                       @click="handleChoose('industry',industry)">{{industry.name}}
                    <span class="item-close" v-if="industry.choose">x</span>
                  </div>
                </li>
              </ul>
            </v-flex>

            <v-flex xs1 @click="moreIndust = !moreIndust">
              <v-layout align-center justify-center row fill-height>
                <v-flex class="text-xs-center more cur-pointer" :class="{ active: moreIndust }">{{$t('global.more' )}}
                </v-flex>
              </v-layout>
            </v-flex>

          </v-layout>
          <!-- 行业选择 -->
          <v-layout v-else row wrap class="select-warp grey lighten-5 py-3">
            <v-progress-linear :indeterminate="true"></v-progress-linear>
          </v-layout>

        </v-flex>
      </v-layout>

      <!-- 排序方式 -->
      <v-layout v-if="!selectArr.length" row wrap class="mt-4 grey lighten-5 py-3 select-warp text-xs-left">
        <v-flex xs4 md1>
          <div class="pl-4">{{$t('global.sort')}}：</div>
        </v-flex>

        <v-flex xs8 md11 class="sort-list">
          <div>
            <div class="sort-item px-3 cur-pointer"
                 :class="{ active: sortType === 'scaleASC' || sortType === 'scaleDESC' }"
                 @click="stateToggle('scopeShow')">
              {{$t('cocShow.navbar.scale' )}}
              <v-icon :class="{ active: sortType === 'scaleASC' || sortType === 'scaleDESC' }" v-if="scopeShow">
                arrow_drop_down
              </v-icon>
              <v-icon :class="{ active: sortType === 'scaleASC' || sortType === 'scaleDESC' }" v-else>arrow_drop_up
              </v-icon>
            </div>
            <div class="sort-item px-3 ml-3 cur-pointer"
                 :class="{ active:  sortType === 'foundingDateASC' || sortType === 'foundingDateDESC' }"
                 @click="stateToggle('foundingShow')">
              {{$t('cocShow.navbar.founding_time')}}
              <v-icon :class="{ active:  sortType === 'foundingDateASC' || sortType === 'foundingDateDESC'  }"
                      v-if="foundingShow">arrow_drop_down
              </v-icon>
              <v-icon :class="{ active:  sortType === 'foundingDateASC' || sortType === 'foundingDateDESC'  }" v-else>
                arrow_drop_up
              </v-icon>
            </div>
          </div>
        </v-flex>

      </v-layout>
      <!-- 排序方式 -->

      <!-- 加载器-->
      <v-layout class="white mt-5 py-5" v-if="isLoading">
        <v-flex xs12>
          <div class="text-xs-center">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </div>
        </v-flex>
      </v-layout>
      <!-- 加载器-->

      <!-- 商会 -->

  <div class="box-container">
    <v-container fluid grid-list-lg class="xsmt-5">
      <!-- 最新商會开始 -->
      <v-layout row wrap>

        <!-- 内容区域 -->
        <v-flex xs12 v-if="orgs.length && !isLoading" class=" px-2">
          <v-layout wrap>
            <v-flex lg-5 md3 sm12 xs12 v-for="(org, index) of orgs" :key="index" @click="orgDetail(org.id)">
              <div class="company-content text-xs-center">
                <div class="top">
                  <template>
                    <v-container grid-list-md>
                      <div class="item">
                        <div class="icon">
                          <template v-if="org.logo">
                            <img style="-webkit-border-radius: 10%;-moz-border-radius: 10%;border-radius: 10%;"
                                 :src="`${$fileUrl}/public/uploads/o/company/organization/${org.id}/${org.logo}`"
                                  lazy-src="./../../../../static/img/blank.png"
                                 alt="">
                          </template>
                          <template v-else>
                            <img
                              src="./../../../../static/img/blank.png"/>
                          </template>
                        </div>
                        <div class="text">
                          <a class="name" @click="orgDetail(org.id)">{{org.name}}</a>
                          <div class="industry">
                            <p class="grey&#45;&#45;text mt-1  mb-0">{{org.industry.name}}</p>
                          </div>
                          <div class="bottom clearfix">
                            <a class="bottom-item bottom-1 fl" @click="orgDetail(org.id)" target="_blank"
                            >
                              <p class="text-green mb-0 mr-2"><img src="./../../../../static/img/address.png"></p>
                              <p class="grey--text">{{ $t("chamber.create.region") }}</p>
                            </a>
                            <a class="bottom-item bottom-2 fl" @click="orgDetail(org.id)" target="_blank"
                            >
                              <p class="grey--text mr-2"><img src="./../../../../static/img/personnumber.png"></p>
                              <p class="text-green mb-0">
                                <template v-if="org.scale === 'BETWEEN30AND50'">30-50</template>
                                <template v-if="org.scale === 'BETWEEN50AND100'">50-100</template>
                                <template v-if="org.scale === 'MORETHAN100'">100+</template>
                              </p>

                            </a>

                          </div>
                        </div>
                      </div>
                    </v-container>
                  </template>

                </div>

              </div>
            </v-flex>


          </v-layout>
        </v-flex>
        <!-- 内容区域 -->



      </v-layout>
      <!-- 最新商會结束 -->

    </v-container>
  </div>

      <!-- 商会 -->

      <v-layout v-if="orgs.length ===0 && !isLoading" row wrap class="white py-5 mt-4">
        <v-flex xs12 class=" py-5">
          <v-icon size="120" color="primary">search</v-icon>
          <div class="blue-grey--text text--darken-3 subheading">{{$t('message.no_message')}}</div>
        </v-flex>
      </v-layout>

      <!-- 分页器 -->
      <v-layout>
        <v-flex v-if="orgs.length && !isLoading" xs12 class="mt-5 text-xs-center">
          <v-pagination v-model="page" :length="totalPages" @input="handleInput"></v-pagination>
        </v-flex>

      </v-layout>
      <!-- 分页器 -->

    </v-container>
    <!-- 页面主体结束 -->

  </div>
</template>

<script>
  export default {
    metaInfo: {
      title: '企業列表', // set a title
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
        orgs: [], //商会列表数据
        page: 1,
        filterpage: 0,
        totalPages: 0,
        isLoading: true,
        scopeShow: true,
        foundingShow: true,
        locationLoading: false,
        industryLoading: false,
        locations: [], //筛选地区
        industrys: [], //筛选行业
        selectArr: [], //保存点击的筛选条件
        sortType: 'scaleASC', //排序方式筛选,
        moreLocat: false, //更多地区
        moreIndust: false //更多行业
      }
    },
    computed: {
      //地区筛选不限
      anyLocations() {
        return this._NoChoose(this.locations)
      },
      //行业筛选不限
      anyIndustrys() {
        return this._NoChoose(this.industrys)
      },
      //筛选的请求路径字符串
      reqSelectStr() {
        let pathStr = ''
        if (this.$route.query.filters) {
          if (typeof this.$route.query.filters !== 'string') {
            this.$route.query.filters.forEach(val => {
              pathStr += `${val}`
            })
          } else {
            pathStr = `${this.$route.query.filters}`
          }
          return pathStr
        } else {
          return (pathStr = '')
        }
      }
    },
    watch: {
      selectArr() {
        this.orgs = []
        this.$router.push({
          path: '/company-list',
          query: {
            filters: this.selectArr,
            page: this.filterpage
          }
        })
        this._initOrganizations()
      },
      sortType() {
        this.orgs = []
        this._organizationsSort()
      }
    },
    methods: {
      handleInput(value) {
        this.page = value
        this.filterpage = value - 1
        this.$router.push({
          path: '/company-list',
          query: {
            filters: this.selectArr,
            page: this.filterpage
          }
        })
        this.$vuetify.goTo(200, {duration: 800, easing: 'easeInOutCubic', offset: 50})
        this._initOrganizations()
      },
      sortTypeChange(value) {
        this.sortType = value
      },
      stateToggle(state) {
        switch (state) {
          case 'scopeShow':
            this.scopeShow = !this.scopeShow
            if (this.foundingShow) {
              this.foundingShow = false
            }
            if (this.scopeShow) {
              this.sortType = 'scaleASC'
            } else {
              this.sortType = 'scaleDESC'
            }
            this._organizationsSort()
            break
          case 'foundingShow':
            this.foundingShow = !this.foundingShow
            if (this.scopeShow) {
              this.scopeShow = false
            }
            if (this.foundingShow) {
              this.sortType = 'foundingDateASC'
            } else {
              this.sortType = 'foundingDateDESC'
            }
            this._organizationsSort()
            break
        }
      },
      //多选
      handleChoose(type, item) {
        if (item.choose) {
          let path = `&${type}Id=${item.id}`
          let index = this.selectArr.findIndex(item => {
            return item === path
          })
          this.selectArr.splice(index, 1)
        } else {
          this.selectArr.push(`&${type}Id=${item.id}`)
        }
        item.choose = !item.choose
      },
      //判断是否没选状态
      _NoChoose(data) {
        let result = data.findIndex(item => {
          return item.choose
        })
        return result
      },
      orgDetail(id) {
        this.$router.push({path: '/company', query: {code: id}})
      },
      _initIndustrys() {
        this.industryLoading = true
        this.$http.get(`public/industrys`).then(
          res => {
            let data = res.data.content
            if (this.$route.query.filters) {
              if (typeof this.$route.query.filters !== 'string') {
                data.forEach(item => {
                  this.$route.query.filters.forEach(val => {
                    if (`&industryId=${item.id}` === val) {
                      this.$set(item, 'choose', true)
                      this.$set(item, 'type', 'industry')
                    }
                  })
                })
              } else {
                data.forEach(item => {
                  this.$set(item, 'choose', false)
                  this.$set(item, 'type', 'industry')
                })
              }
            }
            this.industrys = data
            this.industryLoading = false
          },
          error => {
          }
        )
      },
      _initLocations() {
        this.locationLoading = true
        this.$http.get(`public/locations`).then(
          res => {
            let data = res.data.content
            if (this.$route.query.filters) {
              if (typeof this.$route.query.filters !== 'string') {
                data.forEach(item => {
                  this.$route.query.filters.forEach(val => {
                    if (`&locationId=${item.id}` === val) {
                      this.$set(item, 'choose', true)
                      this.$set(item, 'type', 'location')
                    }
                  })
                })
              } else {
                data.forEach(item => {
                  this.$set(item, 'choose', false)
                  this.$set(item, 'type', 'location')
                })
              }
            }
            this.locations = data
            this.locationLoading = false
          },
          error => {
          }
        )
      },
      _initOrganizations() {
        this.isLoading = true
        this.$route.query.page =
          this.$route.query.page !== undefined
            ? this.$route.query.page
            : 0
        this.$http
          .get(
            `public/organizations?page=${
              this.$route.query.page
              }&size=15&isApproved=true${this.reqSelectStr}`
          )
          .then(
            res => {
              this.orgs = res.data.content
              this.totalPages = res.data.totalPages
              this.isLoading = false
            },
            error => {
            }
          )
      },
      _organizationsSort() {
        //
        this.isLoading = true
        this.$http
          .get(
            `public/organizations?page=0&size=15&isApproved=true&sorting=${
              this.sortType
              }`
          )
          .then(
            res => {
              this.orgs = res.data.content
              this.totalPages = res.data.totalPages
              this.isLoading = false
            },
            error => {
            }
          )
      },
      _organizationsSearch(key) {
        this.isLoading = true
        this.$http.get(`public/organizations?&search=${key}`).then(
          res => {
            this.orgs = res.data.content
            this.totalPages = res.data.totalPages
            this.isLoading = false

          },
          error => {
          }
        )
      }
    },
    mounted() {

      this.page = this.$route.query.page !== undefined ? Number(this.$route.query.page) + 1 : 1
      if (this.$route.query.search !== undefined) {
        this.isLoading = true
        this.$http
          .get(
            `public/organizations?page=${
              this.filterpage
              }&size=15&isApproved=true&search=${
              this.$route.query.search
              }`
          )
          .then(
            res => {
              this.orgs = res.data.content
              this.totalPages = res.data.totalPages
              this.isLoading = false
            },
            error => {
            }
          )
      } else {
        this._initOrganizations()
      }
      this._initLocations()
      this._initIndustrys()
    }
  }
</script>

<style lang='scss' scoped>
.box-container{
  margin-top:80px;
}
  .coc-list-page {
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

      .sort-list {
        .sort-item {
          position: relative;
          display: inline-block;

          &.active {
            color: #286667;

            * {
              color: #286667;
            }
          }
        }
      }
    }
  }
  .home-page{
    background:#fff;
    .xsmt-5{

      .module-tabs{
        .more{
          float: right;
          .pb-4{
            padding:0;

            .btn{
              margin-top:0;
              padding:0 54px;
              height: 32px;
              -webkit-border-radius: 10px  10px 10px 10px;
              -moz-border-radius:   10px  10px 10px 10px;
              border-radius:  10px  10px 10px 10px;
            }
          }
        }
      }
      .hover-card{
        margin:0px 10px 32px 10px;
        background-color: #fff !important;
        -webkit-border-radius: 10px  10px 10px 10px;
        -moz-border-radius:   10px  10px 10px 10px;
        border-radius:  10px  10px 10px 10px;
            padding: 11px 12px 1px 12px;
      }

      .text{

        .name{
          margin-top: 16px;
          color: #000000;
          font-size: 16px;
        }
        .price{
          margin-top: 16px;
          margin-bottom:20px;
          color: #e57d12;
          font-size: 16px;
        }
        .company{
          color: #b4b4b4; margin-top: 16px;
          font-size: 14px;
        }
        .brief{
          color: #b4b4b4;
          font-size: 14px;
          line-height: 20px;
        }

      }
    }
  }
    .company-content {
    margin-top:0px;
    border: 1px solid #EEE;
    overflow: hidden;
    background: #fff;
    -webkit-border-radius: 10px  10px 10px 10px;
    -moz-border-radius:   10px  10px 10px 10px;
    border-radius:  10px  10px 10px 10px;
    margin-bottom:16px;

    .top {
      padding: 15px 20px 0 20px;
      text-align: left;
      position: relative;
      .mt-1{
        text-align: left;
      }
    }

    .bottom {
      border-top: 1px dashed #E0E0E0;
      .bottom-item {
        position: relative;
        display: block;
        margin-top: 15px;
        float: left;
        text-align: left;
        width: 50%;
        display: flex;
        color: #b4b4b4;
        .fa{
          font-size: 1.3rem;
        }
      }


    }

    .icon {
      width: 140px;
      height: 140px;
      margin: 0 auto;
      img {
        width: 100%;
        height:100%;
      }
    }

    .indus-stage {
      height: 22px;
      color: #555;
      margin-top: 10px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      word-wrap: normal;
    }

    .name {
      height: 22px;
      margin-top: 13px;
      font-size: 16px;
      color: #000;
      display: inline-block;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      width:185px;
    }
    .industry{
      font-size: 14px;
      color: #b4b4b4;
      padding-bottom: 16px;
    }
    .name:hover {
      color: #286667;
    }

  }

  .company-content:hover {
    -webkit-box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.1);
  -webkit-border-radius: 8px  8px 8px 8px !important;
      -moz-border-radius:  8px  8px 8px 8px !important;
      border-radius:  8px  8px 8px 8px !important;
  }
/** iPad **/
@media only screen and (min-width: 768px) and (max-width: 1023px) {
.box-container{
  margin-top:0px;
}
}
/** iPad **/
/** iPhone **/
@media only screen and (min-width: 320px) and (max-width: 767px) {

.box-container{
  margin-top:0px;
}

}
/** iPhone **/
</style>
