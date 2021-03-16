<template>
  <div class="coco-show-activity-detail">
    <v-container fluid>
      <ul data-v-52b79048="" class="v-breadcrumbs pl-0 theme--light">
        <li><router-link :to="`/`"ss="v-breadcrumbs__item">{{$t('profile.home')}}</router-link></li>
        <li class="v-breadcrumbs__divider">&gt;</li>
        <li><router-link :to="`/company/home?code=${$route.query.id}`" class="v-breadcrumbs__item">{{company}}</router-link></li>

        <li class="v-breadcrumbs__divider">&gt;</li>

        <li>
          <router-link :to="`/company/activity?id=${$route.query.id}`" class="v-breadcrumbs__item">
            {{$t('cocShow.activity.coc_activity')}}
          </router-link>
        </li>
        <li class="v-breadcrumbs__divider">&gt;</li>
        <li>
          <a disabled="disabled" href="breadcrumbs_link_1" class="v-breadcrumbs__item v-breadcrumbs__item--disabled">{{activity.title}}</a>
        </li>
      </ul>

      <v-layout
        column
        class=" py-2 xspadding-0"
      >
        <!-- 标题 -->
        <v-flex class="text-xs-left module-tabs ">
          <h3 class="diamonds headline">{{$t('cocShow.activity.activity_detail')}}</h3>
        </v-flex>
        <!-- 标题 -->

        <!-- 加载器-->
        <v-flex
          class="white mt-5 py-5"
          v-if="isLoading"
        >
          <div class="text-xs-center">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>
        </v-flex>
        <!-- 加载器-->

        <template v-if="!isLoading">
          <!-- 简介 -->
          <v-flex class="mt-5">
            <v-layout
              row
              wrap
            >
              <v-flex
                md6
                xs12

              >
                <template v-if="activity.eventFiles.length > 0">
                  <v-img
                    :src="`${$fileUrl}/public/uploads/o/company/event/${activity.id}/${activity.eventFiles[0].key}`"
                    lazy-src="./../../../../../static/img/blank.png">

                  </v-img>
                </template>
                <template v-else>
                  <v-img
                    src="./../../../../../static/img/blank.png"
                  >
                  </v-img>
                </template>
              </v-flex>
              <v-flex md6>
                <v-layout
                  column
                  class="text-xs-left px-3 xspadding-0"
                >
                  <v-flex>
                    <h4 class="ac-title indigo--text text--darken-4">{{activity.title}}</h4>
                  </v-flex>

                  <v-flex class="mt-3">
                    <v-icon size="20">update</v-icon>
                    <span class="vertical-m ml-2">{{$t('navbar.activity_time')}}:{{activity.startedAt | time}} ~ {{activity.endedAt | time}}</span>
                    <span
                      class="white--text caption px-1"
                      :class="{ 'success': activity.timeStatus==='global.conduct', 'error': activity.timeStatus==='global.soon','orange darken-1': activity.timeStatus==='global.end'  }"
                    >{{$t(activity.timeStatus)}}</span>
                  </v-flex>

                  <v-flex class="mt-3">
                    <v-icon size="20">location_on</v-icon>
                    <span class="vertical-m ml-2 address">{{$t('chamber.activity.address' )}}: {{activity.address}}</span>
                  </v-flex>

                  <v-flex class="mt-3">
                    <v-icon size="20">people</v-icon>
                    <span class="vertical-m ml-2">{{$t('chamber.activity.scale')}}：{{activity.personnelNumber>0?activity.personnelNumber+'人':'不限'}} | {{activity.totalNumber}}{{$t('cocShow.activity.apply_num')}}</span>
                  </v-flex>

                  <v-flex class="mt-3">
                    <v-icon size="20">access_time</v-icon>
                    <span class="vertical-m ml-2">{{$t('chamber.activity.signUpEndTimedAt')}}：{{activity.releasedAt | time}}</span>
                  </v-flex>

<!--                  <v-flex class="mt-3">-->
<!--                    <v-icon size="20">visibility</v-icon>-->
<!--                    <span class="vertical-m ml-2">{{activity.view}}{{$t('cocShow.activity.views')}}</span>-->
<!--                  </v-flex>-->

                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          <!-- 简介 -->

          <!-- 按钮 -->
          <v-flex
            class="mt-5"
            v-if="!activity.isSignedAt"
          >

            <v-layout
              row
              wrap
            >
              <v-flex
                xs6
                md4
                class="px-4 xspadding-0"
                v-for="(eventTicket, index) of activity.eventTickets"
                :key="index"
                @click="chooseTicket(eventTicket.id,eventTicket.approvalType,eventTicket.name,eventTicket.price)"
              >
                <v-btn
                  block
                  class="btn subheading mx-auto"
                  :class="{active: eventTicket.id === orders.eventTicketId}"
                  flat
                >
                  <span>{{eventTicket.name}}</span>
                  <span
                    class="ml-3">{{eventTicket.price === 0? `${$t('global.free')}`: `HK$${eventTicket.price}`}}</span>
                </v-btn>
              </v-flex>

            </v-layout>

            <v-layout
              row
              wrap
            >
              <v-flex
                xs6
                md4
                class="px-4 xspadding-0"
              >
                <div class="add-btn d-flex">
                  <span
                    @click="reduce"
                    style="border-right: 1px solid #b3b3b3;"
                    class="cur-pointer"
                  >-</span>
                  <span>{{num}}</span>
                  <span
                    @click="add"
                    style="border-left: 1px solid #b3b3b3;"
                    class="cur-pointer"
                  >+</span>
                </div>
              </v-flex>
              <v-flex
                xs6
                md4
                class="px-4"
              >
                <div class="add-text">{{numRemaining}} {{$t('global.surplus')}}</div>
              </v-flex>
            </v-layout>

            <v-layout
              class="mt-5"
              row
              wrap
              align-center
              justify-center
              row
              fill-height
            >
              <v-flex
                md3
                xs6
              >
                <v-btn
                  block
                  color="primary"
                  :disabled="disabled"
                  dark
                  @click="openDialog()"
                >{{$t(btnName)}}
                </v-btn>
              </v-flex>
            </v-layout>

          </v-flex>
          <!-- 按钮 -->

          <!-- 主办方 -->
          <v-flex class="mt-5 text-xs-left ">
            <div class="module-tabs">
              <h4 class="diamonds headline">{{$t('user.home.sponsor')}}</h4>
            </div>
            <v-layout
              wrap
              class="mt-4 xsmt-5"
              v-if="activity.organization"
            >
              <v-flex md6>
                <div>
                  <v-icon size="20">people</v-icon>
                  <span
                    class="vertical-m ml-2">{{$t('chamber.activity.sponsor_coc')}}：{{activity.organization.name}}</span>
                </div>
                <div class="mt-4 xsmt-5">
                  <v-icon size="20">phone</v-icon>
                  <span class="vertical-m ml-2">{{$t('chamber.create.phone')}}：{{activity.organization.phone}}</span>
                </div>
              </v-flex>
              <v-flex md6>
                <div>
                  <v-icon size="20">person</v-icon>
                  <span class="vertical-m ml-2">{{$t('chamber.activity.sponsor')}}：{{activity.organization.name}}</span>
                </div>
                <div class="mt-4 xsmt-5">
                  <v-icon size="20">email</v-icon>
                  <span class="vertical-m ml-2">{{$t('chamber.create.email')}}：{{activity.organization.email}}</span>
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
          <!-- 主办方 -->

          <!-- 活动内容 -->
          <v-flex class="mt-5 text-xs-left html-conent">
            <div class="module-tabs">
              <h4 class="diamonds headline">{{$t('chamber.activity.content')}}</h4>
            </div>
            <div
              class="act-content mt-4"
              v-html="activity.description"
            ></div>
          </v-flex>
          <!-- 活动内容 -->
        </template>

      </v-layout>
    </v-container>

    <!-- 報名模態框 -->
    <v-layout
      row
      justify-center
    >
      <v-dialog
        v-model="dialog"
        persistent
        max-width="500px"
      >
        <v-card>
          <v-card-title>
            <span class="title">{{$t('cocShow.activity.me_apply')}}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-form
                ref="form"
                v-model="valid"
              >
                <v-layout
                  row
                  wrap
                >
                  <v-flex xs12>
                    <v-text-field
                      color="purple darken-2"
                      v-model="orders.order.contact"
                      :label="$t('user.user_baseinfo.name')"
                      :rules="[rules.required]"
                      clearable
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      color="purple darken-2"
                      v-model="orders.order.email"
                      :label="$t('user.user_baseinfo.email')"
                      :rules="[rules.required,rules.email]"
                      clearable
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      color="purple darken-2"
                      v-model="orders.order.phone"
                      :label="$t('user.user_baseinfo.phone')"
                      :rules="[rules.required]"
                      clearable
                    ></v-text-field>
                  </v-flex>

                </v-layout>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="darken-1"
              flat
              @click.native="dialog = false;"
            >{{$t('button.cancel')}}
            </v-btn>
            <v-btn
              color="primary darken-1"
              :disabled="!valid"
              :loading="isLoading"
              flat
              @click.native="onSubmit()"
            >{{$t('button.save')}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>
<style lang="scss">
  .html-conent img {
    max-width: 100%;
    height: auto;
  }

  .coco-show-activity-detail {
    .ac-title {
      font-size: 18px;
    }

    .active-type {
      padding: 2px 4px;
      font-size: 12px;
      color: #ebebeb;
      background-color: #b3b3b3;
    }

    .v-btn__content {
      white-space: inherit !important;
    }

    .btn {
      height: auto !important;

      border: 1px solid #b3b3b3;
      color: #b3b3b3;


      &.active {
        color: #3d60a7;
        border: 1px solid #3d60a7;
      }
    }

    .add-btn {
      height: 40px;
      line-height: 40px;
      margin: 6px auto;
      border: 1px solid #b3b3b3;
      font-size: 20px;
    }

    .add-text {
      width: 200px;
      height: 40px;
      line-height: 40px;
      margin: 6px auto;
      font-size: 20px;
      text-align: left;
    }

    /deep/ .act-content {
      word-wrap: break-word;

      img {
        max-width: 100%;
        margin: 0 auto;
        height: auto;
      }
    }
  }
.address{
  word-break:break-word;
}
  @media (max-width: 600px) {
    .xspadding-0,
    .content {
      padding: 0 !important;
    }
  }
</style>

<script>
  import {mapMutations,mapState} from "vuex";

  export default {

    computed:{
      ...mapState(['company'])
    },
    metaInfo() {
      return {
        title: this.activity.title ? this.activity.title : "企業廣場",
        titleTemplate: "%s - 簡介__新聞_活動_企業廣場-企業管理和推廣平台",
        meta: [
          {
            name: "keywords",
            content: this.activity.title ? this.activity.title : "企業廣場"
          },
          {
            name: "description",
            content: this.activity.descrpition
              ? this.activity.descrpition
              : "企業廣場"
          },
          {
            name: "og:url",
            content: `${this.$fileUrl}/company/activity-detail?id=${
              this.orgId
              }&actId=${this.activity.id}`
          },
          {
            name: "og:image",
            content: `${this.$fileUrl}${this.metaImage}`
          }
        ],
        htmlAttrs: {
          lang: "hk",
          amp: undefined // "amp" has no value
        }
      };
    },
    data() {
      return {
        orgId: null,
        actId: null,
        dialog: false,
        activity: {}, //活动数据
        approvalType: null,
        ticketType: null,
        metaImage: null,
        price: null,
        currentDate: this.$moment(new Date()),
        isLoading: true,
        valid: true,
        disabled: false,
        numRemaining: "",
        orders: {
          order: {
            contact: null,
            phone: null,
            email: null,
            totalPrice: null,
            totalItemPrice: null,
            financialStatus: null
          },
          organizationId: this.$route.query.id,
          eventTicketId: null,
          eventId: this.$route.query.actId,
          userId: sessionStorage.getItem("userId"),
          orderLineItems: []
        },
        items: [
          {
            text: this.$t('profile.home'),
            disabled: false,
            href: `/company/home?id=${this.$route.query.id}`
          },
          {
            text: this.$t('cocShow.activity.coc_activity'),
            disabled: false,
            href: `/company/activity?id=${this.$route.query.id}`
          }
        ],
        num: 1,
        btnName: "cocShow.activity.me_apply",
        rules: {
          required: v => !!v || "This field is required",
          email: v => (v || "").match(/@/) || "Please enter a valid email"
        }
      };
    },
    watch: {
      //计算不能票类型的剩余数量
      ticketType() {
        let ticketArr = this.activity.eventTickets;
        let chooseTick = ticketArr.find(item => {
          return item.name === this.ticketType;
        });
        this.num = 1;
        this.numRemaining = chooseTick.quantity - chooseTick.vendition - this.num;
        // console.log(this.numRemaining, 'test')
      }
    },
    methods: {
      ...mapMutations(["snackbarStateChange"]),
      reduce() {
        if (this.num > 1 && this.ticketType) {
          this.num--;
          this.numRemaining++;
        }
      },
      add() {
        if (this.ticketType && this.numRemaining > 0) {
          this.num++;
          this.numRemaining--;
        }
      },
      chooseTicket(id, type, name, price) {
        this.orders.eventTicketId = id;
        this.approvalType = type;
        this.ticketType = name;
        this.price = price;
        this.orders.order.totalPrice = this.price;
        this.orders.order.totalItemPrice = this.price;
      },
      _initAcDetail() {
        this.isLoading = true;
        this.$http.get(`public/events/${this.actId}`).then(res => {
          this.activity = res.data;
          this.$set(this.items, 2, {text: this.activity.title, disabled: true});
          if (this.activity.eventTickets.length > 0) {
            this.orders.eventTicketId = this.activity.eventTickets[0].id;
            this.approvalType = this.activity.eventTickets[0].approvalType;
            this.ticketType = this.activity.eventTickets[0].name;
            this.price = this.activity.eventTickets[0].price;
          }
          if (this.activity.eventFiles.length > 0) {
            this.metaImage = this.activity.eventFiles[0].key;
          }
          ;
          this.orders.order.totalPrice = this.price;
          this.orders.order.totalItemPrice = this.price;
          this.activity["totalNumber"] = 0;
          this.activity.eventTickets.forEach(value => {
            this.activity["totalNumber"] =
              this.activity["totalNumber"] + value.vendition;
          });
          this.activity["isSignedAt"] =
            this.currentDate > this.activity.releasedAt ? true : false;
          if (
            this.currentDate > this.activity.startedAt &&
            this.currentDate < this.activity.endedAt
          ) {
            this.activity["timeStatus"] = "global.conduct";
          } else if (
            this.currentDate > this.activity.startedAt &&
            this.currentDate > this.activity.endedAt
          ) {
            this.activity["timeStatus"] = "global.end";
          } else if (this.currentDate < this.activity.startedAt) {
            this.activity["timeStatus"] = "global.soon";
          }
          if (this.activity["totalNumber"] >= this.activity.personnelNumber && this.activity.personnelNumber !== 0) {
            this.disabled = true;
            this.btnName = this.$t("cocShow.home.full");
          }
          if (this.activity["timeStatus"] === "global.end") {
            this.disabled = true;
            this.btnName = this.$t("cocShow.home.ended");
          }
          this.isLoading = false;
        });
      },
      readProfile() {
        this.$http
          .get(`public/user/${sessionStorage.getItem("userId")}/profiles`)
          .then(res => {
            this.orders.order.contact = res.data.content[0].name;
            this.orders.order.phone = res.data.content[0].phone;
            this.orders.order.email = res.data.content[0].email;
          });
      },
      openDialog() {
        if (this.$auth.isAuthenticated()) {
          if (sessionStorage.getItem("role") === "user") {
            if (this.activity["timeStatus"] === "global.end") {
              this.disabled = true;
              this.btnName = this.$t("cocShow.home.ended");
            } else {
              if (this.numRemaining <= 0) {

       
                this.snackbarStateChange({
                  color: "error",
                  text: "門票已售完",
                  snackbar: true
                });
                return;
              } else {

                if (
                  this.activity.eventTickets.length > 0 &&
                  this.orders.eventTicketId !== null
                ) {
                  this.readProfile();
                  this.dialog = true;
                } else {
                  this.snackbarStateChange({
                    color: "error",
                    text: this.$t("global.selectType"),
                    snackbar: true
                  });
                }
              }
            }
          } else {
            console.log(1);  //1
            this.snackbarStateChange({
              color: "error",
              text: "請退出重新登錄您的用戶賬號",
              snackbar: true
            });
          }
        } else {

          this.$auth.loginRedirect("/implicit/callback");
        }
      },
      onSubmit() {
        //收費進入訂單確認頁面
        this.orders.order.financialStatus =
          this.approvalType === "NONE" ? "PAID" : "PENDING";
        for (let i = 0; i < this.num; i++) {
          this.orders.orderLineItems.push({
            title: this.ticketType,
            price: this.price,
            totalPrice: this.price,
            quantity: 1,
            position: i
          });
        }

        localStorage.setItem("orderItem", JSON.stringify(this.orders));
        this.$router.push({
          path: `/activity/${this.$route.query.id}/order/pay/${this.activity.id}`
        });
      }
    },
    mounted() {
      this.orgId = this.$route.query.id;
      this.actId = this.$route.query.actId;
      this._initAcDetail();
    }
  };
</script>


