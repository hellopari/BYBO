<template>
  <div class="payment-page">
    <div class="text-xs-center mt-5" v-if="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <template v-else>
      <!-- 页面主体开始 -->
      <v-container v-if="!isSuccess" fluid class="mt-5">
        <v-layout column class="text-xs-left white px-4 py-3 mb-5">
          <!-- 标题 -->
          <v-flex>
            <h3 class="diamonds headline">{{$t('global.checkOrder')}}</h3>
          </v-flex>
          <!-- 标题 -->

          <!-- 联系方式 -->
          <v-flex class="mt-5">
            <div class="subheading primary--text">{{$t('global.contact')}}</div>
            <v-card>
              <v-layout column class="mt-3 py-4 px-3 grey lighten-5" v-if="isActivity">
                <v-flex>
                  <span>{{$t('user.user_baseinfo.name')}}：</span>
                  <span>{{orderItem.order.contact}}</span>
                </v-flex>
                <v-flex class="mt-4">
                  <span>{{$t('chamber.select.phone')}}：</span>
                  <span>{{orderItem.order.phone}}</span>
                </v-flex>
                <v-flex class="mt-4">
                  <span>{{$t('user.user_baseinfo.email' )}}：</span>
                  <span>{{orderItem.order.email}}</span>
                </v-flex>
              </v-layout>
              <v-layout column class="mt-3 py-4 px-3" v-if="!isActivity">
                <v-flex>
                  <span>{{$t('user.user_baseinfo.name')}}：</span>
                  <span v-if="member.joinType !== 'INVITATION'">{{member.user.userProfile.name}}</span>
                  <span v-else>{{member.name}}</span>
                </v-flex>
                <v-flex class="mt-4" v-if="member.joinType !== 'INVITATION'">
                  <span>{{$t('chamber.select.phone')}}：</span>
                  <span>{{member.user.userProfile.phone}}</span>
                </v-flex>
                <v-flex class="mt-4">
                  <span>{{$t('user.user_baseinfo.email' )}}：</span>
                  <span v-if="member.joinType !== 'INVITATION'">{{member.user.userProfile.email}}</span>
                  <span v-else>{{member.email}}</span>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <!-- 联系方式 -->

          <!-- 产品信息 -->
          <v-flex class="mt-5" v-if="isActivity">
            <div class="subheading indigo--text text-darken-4">{{$t('global.orderProfile')}}</div>
            <v-card>
              <!-- 信息头 -->
              <v-layout row wrap class="px-2 py-2 primary">
                <v-flex md5 >
                  <h4 class="subheading  white--text  text-darken-4">{{$t('chamber.activity.name')}}</h4>
                </v-flex>
                <v-flex md7 class="hidden-sm-and-down">
                  <v-layout row wrap class="subheading white--text text-darken-4">
                    <v-flex xs4>{{$t('chamber.activity.type')}}</v-flex>
                    <v-flex xs4>{{$t('chamber.activity.quantity')}}</v-flex>
                    <v-flex xs4>{{$t('chamber.activity.price')}}</v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
              <!-- 信息头 -->

              <!-- 信息内容 -->
              <v-layout row wrap>
                <!-- 单个产品内容 -->
                <v-flex>
                  <v-card>
                    <template >
                      <v-layout class="px-2 py-2 mt-1">
                        <v-flex md5>
                          <v-layout>
                            <v-flex xs12 md4 lg3>
                              <img :src="`${$fileUrl}${event.eventFiles[0].key}`" style="width:100%" alt="">
                            </v-flex>
                            <v-flex xs12 md8 lg9 class="body-2 pl-2">
                              <div class="subheading">{{event.title}}</div>
                              <div class="grey--text text--darken-1 mt-1 text-no-wrap text-truncate">{{$t('navbar.activity_time')}}：{{event.startedAt | time}} ~ {{event.endedAt | time}}</div>
                              <div class="grey--text text--darken-1 mt-3 text-no-wrap text-truncate">{{$t('chamber.activity.address' )}}：{{event.address}}</div>
                              <div class="grey--text text--darken-1 mt-3 text-no-wrap text-truncate hidden-sm-and-up" >{{$t('chamber.activity.type' )}}：{{orderItem.orderLineItems[0].title}}</div>
                              <div class="grey--text text--darken-1 mt-3 text-no-wrap text-truncate hidden-sm-and-up">{{$t('chamber.activity.quantity' )}}：{{orderItem.orderLineItems.length}}</div>
                              <div class="grey--text text--darken-1 mt-3 text-no-wrap text-truncate hidden-sm-and-up">{{$t('chamber.activity.price' )}}：$HK {{orderItem.orderLineItems[0].price}}</div>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex md7 class="hidden-sm-and-down">
                          <v-layout row wrap align-center justify-center row fill-height class="grey--text text--darken-1">
                            <v-flex xs4>{{orderItem.orderLineItems[0].title}}</v-flex>
                            <v-flex xs4>
                              <div class="pl-2">{{ orderItem.orderLineItems.length}}</div>
                            </v-flex>
                            <v-flex xs4>
                              <div class="pl-1 error--text">$HK {{orderItem.orderLineItems[0].price}}</div>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                    </template>
                  </v-card>
                </v-flex>
                <!-- 单个产品内容 -->
              </v-layout>
              <!-- 信息内容 -->

            </v-card>
          </v-flex>
          <!-- 产品信息 -->

          <!-- 产品信息 -->
          <v-flex class="mt-5" v-else>
            <div class="subheading indigo--text text-darken-4">{{$t('global.orderProfile')}}</div>
            <div>
              <!-- 信息头 -->
              <v-layout row wrap class="px-2 py-2 primary ">
                <v-flex md5 xs12>
                  <h4 class="subheading  white--text  text-darken-4">{{$t('chamber.create.name')}}</h4>
                </v-flex>
                <v-flex md7 xs12 class="hidden-sm-and-down">
                  <v-layout row wrap class="subheading white--text text-darken-4">
                    <v-flex xs4>{{$t('global.apply_group')}}</v-flex>
                    <v-flex xs4>{{$t('global.apply_position')}}</v-flex>
                    <v-flex xs4>{{$t('global.paid')}}</v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
              <!-- 信息头 -->

              <!-- 信息内容 -->
              <v-layout column>
                <!-- 单个产品内容 -->
                <v-flex>
                  <template>
                    <v-card>
                      <v-layout class="px-2 py-2  mt-1">
                        <v-flex md5 xs12>
                          <v-layout>
                            <v-flex xs4 md4 lg3>
                              <img :src="`${$fileUrl}${member.organization.logo}`" style="width:100%" alt="">
                            </v-flex>
                            <v-flex xs12 md8 lg9 class="body-2 pl-2">
                              <div class="subheading">{{member.organization.name}}</div>
                              <div class="grey--text text--darken-1 mt-1">{{$t('cocShow.navbar.founding_time')}}：{{member.organization.establishedDate}} </div>
                              <div class="grey--text text--darken-1 mt-3">{{$t('chamber.create.address')}}：{{member.organization.address}}</div>
                            </v-flex>
                          </v-layout>
                          <v-layout class="hidden-sm-and-up">
                            <v-flex xs12 class="body-2 pl-2">
                              <div class="subheading">{{$t('global.apply_group')}}: {{member.membership.name}}</div>
                              <div class="grey--text text--darken-1 mt-1">{{$t('global.apply_position')}}：{{member.memberPosition.title}} </div>
                              <div class="error--text text--darken-1 mt-3">{{$t('global.paid')}}：$HK {{member.membership.amount}}</div>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex md7 xs12 class="hidden-sm-and-down">
                          <v-layout row wrap align-center justify-center row fill-height class="grey--text text--darken-1">
                            <v-flex xs4>{{member.membership.name}}</v-flex>
                            <v-flex xs4>
                              <div class="pl-2">{{member.memberPosition.title}}</div>
                            </v-flex>
                            <v-flex xs4>
                              <div class="pl-1 error--text">$HK {{member.membership.amount}}</div>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                    </v-card>
                  </template>
                </v-flex>
                <!-- 单个产品内容 -->
              </v-layout>
              <!-- 信息内容 -->

            </div>
          </v-flex>
          <!-- 产品信息 -->

          <v-flex class="red--text mt-3" v-if="isActivity">{{$t('global.order_text')}}</v-flex>

          <!-- 付款部分 -->
          <v-flex class="mt-5" v-if="payment.length > 0">
            <template v-if="!isFree">
              <div>
                <span class="subheading indigo--text text-darken-4">{{$t('global.paymentMethod')}}</span>
                <v-radio-group row v-model="payType">
                  <template v-for="radio in payment">
                    <v-radio color="primary" @change="change(radio)" v-if="radio.payType === 'ONLINE'" :label="$t('global.online')" :value="radio.payType"></v-radio>
                    <v-radio color="primary" v-else @change="change(radio)" :label="$t('global.transfer')" :value="radio.payType"></v-radio>
                  </template>
                </v-radio-group>
              </div>
              <div class="mt-4" v-show="payType === 'ONLINE'">
                <form action="/charge" method="post" id="payment-form">
                  <div class="form-row">

                    <div id="card-element">
                      <!-- A Stripe Element will be inserted here. -->
                    </div>

                    <!-- Used to display form errors. -->
                    <div id="card-errors" role="alert"></div>
                  </div>

                </form>
              </div>

              <div class="mt-4" v-if="payType === 'TRANSFER'">
                <p>{{$t('chamber.payment.number')}}: {{transfer.cardNumber}}</p>
                <p>{{$t('chamber.payment.name')}}: {{transfer.bankName}}</p>
              </div>
            </template>

            <v-layout  class="my-5 text-xs-center" v-if="!isFree">
              <v-flex class="text-xs-center">
                <v-btn  @click="back()">{{$t('button.cancel')}}</v-btn>
                <v-btn  color="primary" :loading="isLoading" :disabled="isLoading" @click="onSubmit()">{{$t('global.payment')}}</v-btn>
              </v-flex>
            </v-layout>
            <v-layout  class="my-5 text-xs-center" v-else>
              <v-flex class="text-xs-center">
                <v-btn  color="primary" :loading="isLoading" :disabled="isLoading" @click="onSubmitActivity()">{{$t('cocShow.activity.me_apply')}}</v-btn>
                <v-btn  @click="back()">{{$t('button.cancel')}}</v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
          <!-- 付款部分 -->

          <v-flex class="mt-5" v-else>
            <v-icon size="100">payment</v-icon>
            <p> {{$t('global.noPay')}}
            </p>
          </v-flex>
        </v-layout>
      </v-container>
      <!-- 页面主体结束 -->
      <v-container v-else>
        <v-card color="lighten-1" class="mb-5 center-text mt-5 py-5">
          <v-icon size="100" color="primary">check_circle</v-icon>
          <p class="mt-3 title">{{!isActivity? `${$t('global.pay_success')}`: `${$t('message.signup_message')}`}}</p>
          <v-btn flat small to="/">{{$t('global.link_home')}}</v-btn>
          <v-btn flat small color="primary" @click="back()" v-if="!isActivity">{{$t('button.return')}}</v-btn>
          <v-btn flat small color="primary" :to="`/users/${userId}/event`" v-else>{{$t('global.seeSignDes')}}</v-btn>
        </v-card>
      </v-container>
    </template>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    data() {
        return {
            card: null,
            stripe: null,
            payType: null,
            isActivity: false,
            isLoading: false,
            loading: false,
            isSuccess: false,
            isFree: false,
            payment: [],
            userId: sessionStorage.getItem('userId'),
            event: {},
            transfer: {},
            orderItem: {},
            member: {}
        }
    },
    methods: {
        ...mapMutations(['snackbarStateChange']),
        reloadPayType() {
            this.loading = true
            this.$http
                .get(`user/payment_managements`, {
                    params: {
                        isActive: true,
                        organizationId: this.$route.params.organizationId
                    }
                })
                .then(res => {
                    this.payment = res.data.content
                    this.loading = false
                })
        },
        reloadEvent() {
            this.loading = true
            this.$http.get(`public/events/${this.$route.params.id}`).then(res => {
                this.event = res.data
                this.loading = false
            })
        },
        reloadMember() {
            this.loading = true
            this.$http.get(`members/${this.$route.params.id}`).then(res => {
                this.member = res.data
                this.loading = false
            })
        },

        //提交
        onSubmit() {
            if (this.payType !== null) {
                if (this.payType === 'ONLINE') {
                    this.isLoading = true
                    this.buy()
                } else {
                    this.isLoading = true
                    this.offlineBuy()
                }
            } else {
                this.snackbarStateChange({
                    color: 'error',
                    text: '請選擇支付類型',
                    snackbar: true
                })
            }
        },

        //線上支付
        async buy() {
            const promise = this.stripe.createToken(this.card)
            promise.then(async result => {
                if (result.token.id === undefined) {
                    this.isLoading = false
                    this.snackbarStateChange({
                        color: 'error',
                        text: result.error.message,
                        snackbar: true
                    })
                    return
                }
                if (this.isActivity) {
                    //支付活動
                    this.orderItem['stripeToken'] = result.token.id
                    this.onSubmitActivity()
                } else {
                    //支付會費
                    await this.$http
                        .put(
                            'members/pay_amount',
                            this.$serialize({
                                memberId: this.$route.params.id,
                                stripeToken: result.token.id
                            })
                        )
                        .then(res => {
                            if (res.data) {
                                this.isSuccess = true
                                this.isLoading = false
                            } else {
                                this.isLoading = false
                                this.snackbarStateChange({
                                    color: 'error',
                                    text: '支付失敗',
                                    snackbar: true
                                })
                            }
                        })
                        .catch(error => {
                            this.isLoading = false
                            this.snackbarStateChange({
                                color: 'error',
                                text: error.data.message,
                                snackbar: true
                            })
                        })
                }
            }).catch(err=>{
                this.isLoading = false
            })
        },

        back() {
            this.$router.back()
             localStorage.removeItem('orderItem')
        },

        //線下支付活動
        offlineBuy() {
            if (this.isActivity) {
                if (this.orderItem['stripeToken'] !== undefined) {
                    delete this.orderItem['stripeToken']
                }
                this.onSubmitActivity()
            } else {
                this.onSubmitTransaction()
            }
        },
        //線下支付會員訂單
        onSubmitTransaction() {
            this.$http
                .put(
                    'members/submit_transaction_record',
                    this.$serialize({ memberId: this.$route.params.id })
                )
                .then(res => {
                    this.snackbarStateChange({
                        color: 'success',
                        text: this.$t('message.signup_message'),
                        snackbar: true
                    })
                    this.isSuccess = true
                    this.isLoading = false
                    localStorage.removeItem('orderItem')
                })
                .catch(error => {
                    this.isLoading = false
                    this.snackbarStateChange({
                        color: 'error',
                        text: error.data.message,
                        snackbar: true
                    })
                })
        },

        //提交活動報名訂單
        onSubmitActivity() {
            this.isLoading = true
             if(!this.isFree){
              this.orderItem['payType'] = this.payType
            }
            this.$http
                .post('event_orders', this.$serialize(this.orderItem))
                .then(res => {
                    this.snackbarStateChange({
                        color: 'success',
                        text: this.$t('message.signup_message'),
                        snackbar: true
                    })
                    this.isSuccess = true
                    this.isLoading = false
                    localStorage.removeItem('orderItem')
                })
                .catch(error => {
                    this.isLoading = false
                    this.snackbarStateChange({
                        color: 'error',
                        text: error.data.message,
                        snackbar: true
                    })
                })
        },

        change(item) {
            if (item.payType === 'ONLINE') {
                this.stripe = Stripe(item.publishableKey)
                const elements = this.stripe.elements()
                this.card = elements.create('card')
                this.card.mount('#card-element')
            } else {
                this.transfer = item
            }
        }
    },
    mounted() {
        if (this.$route.params.type === 'activity') {
            this.isActivity = true
            this.orderItem = JSON.parse(localStorage.getItem('orderItem'))
            this.reloadEvent()
            if (this.orderItem.order.totalPrice === 0) {
                this.isFree = true
            } else {
                this.isFree = false
            }
        } else {
            this.isActivity = false
            this.isFree = false
            this.reloadMember()
        }
        this.reloadPayType()
    }
}
</script>

<style lang="scss" scoped>
.StripeElement {
    background-color: white;
    height: 40px;
    padding: 10px 12px;
    border-radius: 4px;
    border: 1px solid transparent;
    box-shadow: 0 1px 3px 0 #e6ebf1;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
}

.StripeElement--focus {
    box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
    border-color: #fa755a;
}

.StripeElement--webkit-autofill {
    background-color: #fefde5 !important;
}
</style>
