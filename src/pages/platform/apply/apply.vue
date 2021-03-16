<template>
  <div class="apply-page">
    <div class="text-xs-center" v-if="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <v-form ref="form" v-else v-model="valid">
      <v-container fluid class="mt-5 pb-5">
        <!-- 头部信息部分开始 -->
        <v-layout row wrap class="head-wrap white">
          <v-flex xs12>
            <v-layout row wrap>
              <v-flex xs12>
                <v-layout row wrap>
                  <v-flex md1 xs2 class="logo text-xs-left">
                    <img :src="$fileUrl + cocSelf.logo" alt="">
                  </v-flex>
                  <v-flex xs10 class="ml-2 text-xs-left detail-box">
                    <div class="name headline font-weight-bold my-2">{{cocSelf.name}}</div>
                    <div class="purpose mb-3 body-2">{{$t('cocShow.navbar.purpose' )}}：{{cocSelf.purpose}}</div>
                    <div class="address body-2">{{$t('cocShow.navbar.coc_address' )}}：{{cocSelf.address}}</div>
                  </v-flex>

                  <v-layout v-if="cocSelf.industry" wrap row class="info-type text-xs-left">
                    <v-flex xs4 md2 class="pl-4 mt-3">
                      <p class="item-title mb-1">{{$t('cocShow.navbar.industry')}}</p>
                      <p>{{cocSelf.industry.name}}</p>
                    </v-flex>
                    <v-flex xs4 md1 class="info-type-item pl-4 mt-3">
                      <p class="item-title mb-1">{{$t('cocShow.navbar.region')}}</p>
                      <p>{{cocSelf.location.name}}</p>
                    </v-flex>
                    <v-flex xs4 md1 class="info-type-item pl-4 mt-3">
                      <p class="item-title mb-1">{{$t('cocShow.navbar.scale' )}}</p>
                      <p>
                        <span class="number" v-if="cocSelf.scale === 'BETWEEN30AND50'">30-50</span>
                        <span class="number" v-if="cocSelf.scale === 'BETWEEN50AND100'">50-100</span>
                        <span class="number" v-if="cocSelf.scale === 'MORETHAN100'">100+</span>
                      </p>
                    </v-flex>
                    <v-flex xs4 md2 class="info-type-item pl-4 mt-3">
                      <p class="item-title mb-1">{{$t('cocShow.navbar.founding_time')}}</p>
                      <p>{{cocSelf.establishedDate}}</p>
                    </v-flex>
                    <v-flex xs4 md2 class="info-type-item pl-4 mt-3">
                      <p class="item-title mb-1">{{$t('cocShow.navbar.contacts')}}</p>
                      <p>{{cocSelf.contacts}}</p>
                    </v-flex>
                    <v-flex xs4 md2 class="info-type-item pl-4 mt-3">
                      <p class="item-title mb-1">{{$t('cocShow.navbar.contact_number')}}</p>
                      <p>{{cocSelf.phone}}</p>
                    </v-flex>
                  </v-layout>
                </v-layout>
              </v-flex>

            </v-layout>
          </v-flex>
        </v-layout>
        <!-- 头部信息部分结束 -->

        <!-- 选择部分 -->
        <v-layout column class="text-xs-left white mt-3">
          <v-flex class="py-3 px-3 apply-back">
            <span class="subheading vertical-m ml-1">
              <v-btn :to="{path: '/company/home',query:{id: cocSelf.id}}" icon flat color="primary"><v-icon>arrow_back</v-icon></v-btn> {{$t('cocShow.navbar.apply_into_coc')}}
            </span>
          </v-flex>

          <v-flex>
            <!-- 商會會籍 -->
            <v-layout column>
              <v-flex class="pl-4 mt-3">
                <span class="title">{{$t('global.apply_group')}}</span>
                <span class="ml-3">({{$t('global.selectApplyShip')}})</span>
              </v-flex>
              <v-flex class="px-3 mt-3">
                <template v-for="item in memberships">
                  <v-btn depressed flat class=" btn " @click="change('membership',item.id)" :class="{'active': forms['membership.id'] === item.id}">
                    {{item.name}} <span v-if="item.period !== null">HK${{item.amount}} /</span>
                    <span class="ml-1" v-if="!item.isForever && item.period !== 0 ">{{item.period}}<span v-if="item.period !== null">{{$t('global.month')}}</span></span>
                    <span class="ml-1" v-else>{{$t('global.forever')}}</span>
                  </v-btn>
                </template>
              </v-flex>
            </v-layout>
            <!-- 商會會籍 -->

            <!-- 商會職務 -->
            <v-layout column>
              <v-flex class="pl-4 mt-3">
                <span class="title">{{$t('global.apply_position')}}</span>
                <span class="ml-3">({{$t('global.selectApplyPosition')}})</span>
              </v-flex>
              <v-flex class="px-3 mt-3">
                <template v-for="item in positions">
                  <v-btn depressed flat class=" btn" @click="change('position',item.id)" :class="{'active': forms['memberPosition.id'] === item.id}">{{item.title}}</v-btn>
                </template>
              </v-flex>
            </v-layout>
            <!-- 商會職務 -->

            <!-- 介绍人 -->
            <v-layout row wrap>
              <v-flex class="px-4">
                <v-checkbox color="primary" :label="$t('global.isIntroducer' )" v-model="checkbox"></v-checkbox>
              </v-flex>
              <v-flex class="px-4" v-if="checkbox">
                <v-text-field color="primary" :label="$t('global.isIntroducer_text')" v-model="forms.introducer"></v-text-field>
              </v-flex>
            </v-layout>
            <!-- 介绍人 -->

            <v-layout row wrap>
              <v-flex class="px-4">
                <h4 class="title pt-4 mb-3">{{$t('global.statement')}}</h4>
          <div class="  mt-2">1、{{$t('global.statement_one')}}</div>
          <div class=" mt-2">2、{{$t('global.statement_two')}}</div>
          <div class="mt-2">3、{{$t('global.statement_three')}}</div>
          <v-checkbox v-model="forms.statement1" :rules="[rules.required]" :label="$t('global.statement_one_text')" color="primary" hide-details></v-checkbox>
          <v-checkbox v-model="forms.statement2" :rules="[rules.required]" :label="$t('global.statement_two_text')" color="primary" hide-details></v-checkbox>
          <v-checkbox v-model="forms.statement3" :rules="[rules.required]" :label="$t('global.statement_three_text')" color="primary" hide-details></v-checkbox>
              </v-flex>
            </v-layout>

          </v-flex>
        </v-layout>
        <!-- 选择部分 -->

        <!-- 声明部分 -->

        <!-- 声明部分 -->

        <v-layout class="white pb-5" align-center justify-center row fill-height>
          <v-flex md2 xs6>
            <v-btn color="primary" :disabled="!valid" :loading="isLoading" @click.native="onSubmit()" block>{{$t('button.apply')}}</v-btn>
          </v-flex>
        </v-layout>

      </v-container>
    </v-form>

  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    data() {
        return {
            checkbox: false,
            loading: false,
            isLoading: false,
            valid: true,
            cocSelf: {},
            radioGroup: 1,
            positions: [],
            memberships: [],
            forms: {
                active: false,
                isPay: false,
                introducer: null,
                status: 'PENDING',
                role: 'user',
                statement1: false,
                statement2: false,
                statement3: false,
                joinType: 'APPLIY',
                'memberPosition.id': null,
                'membership.id': null,
                'organization.id': this.$route.query.organizationId,
                'user.id': sessionStorage.getItem('userId')
            },
            rules: {
                required: v => !!v || 'This field is required'
            }
        }
    },
    mounted() {
        this._initOrganizations()
        this.reloadPositions()
        this.reloadMemberships()
    },
    methods: {
        ...mapMutations(['snackbarStateChange']),
        _initOrganizations() {
            this.loading = true
            this.$http
                .get(`public/organizations/${this.$route.query.organizationId}`)
                .then(
                    res => {
                        this.cocSelf = res.data
                        this.loading = false
                    },
                    error => {}
                )
        },
        //獲取職務
        reloadPositions() {
            this.$http
                .get('member_positions', {
                    params: {
                        'organization.id': this.$route.query.organizationId
                    }
                })
                .then(res => {
                    this.positions = res.data.content
                })
        },
        //獲取會籍
        reloadMemberships() {
            this.$http
                .get('memberships', {
                    params: {
                        'organization.id': this.$route.query.organizationId
                    }
                })
                .then(res => {
                    this.memberships = res.data.content
                })
        },
        change(type, id) {
            if (type === 'membership') {
                this.forms['membership.id'] = id
            } else {
                this.forms['memberPosition.id'] = id
            }
        },
        onSubmit() {
            if (this.forms['membership.id'] === null) {
                this.snackbarStateChange({
                    color: 'error',
                    text: this.$t('global.selectApplyShip'),
                    snackbar: true
                })
                return
            } else if (this.forms['memberPosition.id'] === null) {
                this.snackbarStateChange({
                    color: 'error',
                    text: this.$t('global.selectApplyPosition'),
                    snackbar: true
                })
                return
            } else {
                if (this.forms.introducer === null) {
                    delete this.forms.introducer
                }
                this.isLoading = true
                this.$http
                    .post('members', this.$serialize(this.forms))
                    .then(res => {
                        this.snackbarStateChange({
                            color: 'success',
                            text: this.$t('global.applySuccess'),
                            snackbar: true
                        })
                        this.$router.push({
                            path: '/company/home',
                            query: { id: this.$route.query.organizationId }
                        })
                        this.isLoading = false
                    })
                    .catch(error => {
                        this.isLoading = false
                        this.snackbarStateChange({
                            color: 'error',
                            text: error,
                            snackbar: true
                        })
                    })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.apply-page {
    .active {
        background-color: #2c7a90;
        color: #fff;
    }
    .head-wrap {
        padding: 20px 20px 30px 20px;
        font-family: PingFangSC-Regular, 'PingFang SC';
        .logo {
            img {
                width: 100px;
                height: 100px;
            }
        }
        .detail-box {
            margin-left: -20px;
        }
        .name {
            color: #323d50;
        }
        .purpose {
            color: #828da0;
            line-height: 14px;
        }
        .address {
            color: #828da0;
            line-height: 14px;
        }
        .info-type {
            .info-type-item {
                border-left: 1px solid #dcdcdc;
                p {
                    margin-bottom: 0;
                }
                .item-title {
                    color: #828da0;
                }
            }
        }
    }
    .apply-back {
        border-bottom: 1px solid #f5f5f5;
    }
    .btn {
        height: 40px;
        border: 1px solid #2c7a90;
        &:hover {
            background-color: #2c7a90;
            /deep/ .v-btn__content {
                color: #fff;
            }
        }
    }
    .declaration {
        /deep/ .v-label {
            color: #333;
        }
    }
}
</style>
