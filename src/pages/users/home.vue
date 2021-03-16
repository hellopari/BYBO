<template>
  <div id="userHome">
    <v-divider class="my-2"></v-divider>
    <!-- 商會公告 -->
    <div class="title px-4 py-3 xspy-0">{{$t('user.title.coc_notice' )}}</div>
    <v-data-table :headers="headers" :items="desserts" hide-actions :no-data-text="$t('message.no_message')"
                  :rows-per-page-items="limit" :loading="loading" class="rtable rtable--flip elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.title }}</td>
        <td class="text-xs-left">{{ props.item.organization.name}}</td>
        <td class="text-xs-left">{{ props.item.createdAt | time }}</td>
        <td class="text-xs-left">{{ props.item.lastModifiedAt | time }}</td>
        <td class="text-xs-left text-md-center">
          <v-tooltip top>
            <v-btn flat icon color="primary" slot="activator"
                   :to="{path : '/company/notice-detail',query: {id: props.item.organization.id,noticeId: props.item.id}}">
              <v-icon size="18">visibility</v-icon>
            </v-btn>
            <span>{{$t('chamber.btn.see')}}</span>
          </v-tooltip>
        </td>
      </template>
    </v-data-table>

    <!-- 我的商會 -->
    <div class="title px-4 py-3">{{$t('user.navbar.My_coc' )}}</div>
    <v-layout>
      <v-flex>
        <v-tabs slot="extension" slider-color="#2c7a90" align-with-title>
          <v-tab @click="changTab('APPLIY')">
            {{$t('user.title.coc_apply')}}
          </v-tab>
          <v-tab @click="changTab('INVITATION')">
            {{$t('user.title.coc_invitation')}}
          </v-tab>
        </v-tabs>
      </v-flex>
    </v-layout>
    <!-- 列表 -->
    <v-data-table :headers="headers1" hide-actions :items="desserts1" :no-data-text="$t('message.no_message')"
                  :rows-per-page-items="limit" :loading="loading1" class="rtable rtable--flip elevation-1">
      <template slot="items" slot-scope="props">
        <td class="py-1">
          <router-link target="_blank" :to="{ path: '/company', query: { id: props.item.organization.id } }"
                       class="black--text" style="text-decoration: none;">
            <v-img class="hidden-sm-and-down"
                   :src="`${$fileUrl}/public/uploads/o/company/organization/${props.item.organization.id}/${props.item.organization.logo}`"
                   style="width:80px;float:left" lazy-src="https://picsum.photos/510/300?random"></v-img>
            <span class="ml-3 xsmy-0 body-1 block text-no-wrap text-truncate">{{ props.item.organization.name }} </span>
            <br>
            <span class="ml-3 body-1 py-1 block">
              {{$t('chamber.member.post')}}: {{ props.item.membership.name }}
              <span class="success white--text px-1 caption" v-if="props.item.active">{{$t('global.effect')}}</span>
              <span class="red white--text px-1 caption" v-else>{{$t('global.invalid')}}</span>
            </span> <br>
            <span class="ml-3 body-1 py-1 block">{{$t('chamber.member.position')}}: {{ props.item.memberPosition.title }}</span>
            <span class="ml-3 body-1 py-1 block">{{$t('chamber.member.number')}}: {{ props.item.number }}</span>
          </router-link>
        </td>
        <td>
          {{props.item.joinAt}}
        </td>
        <td>
          <span v-if="props.item.startAt !== null && props.item.expiredAt === null"> {{ $t('global.forever')}}</span>
          <span v-if="props.item.startAt !== null && props.item.expiredAt !== null"> {{ props.item.startAt}} <span
            class="hidden-xs-and-up">- {{ props.item.expiredAt}}</span></span> </br>
        </td>
        <td class="text-xs-left">
          <span v-if="props.item.status === 'PENDING' && props.item.joinType==='APPLIY'" class="orange--text">{{$t('chamber.btn.audited')}}</span>
          <span v-if="props.item.status === 'SUCCESS' && props.item.joinType==='APPLIY'" class="success--text">{{$t('chamber.btn.adopt')}}</span>
          <span v-if="props.item.status === 'PENDING' && props.item.joinType==='INVITATION'" class="orange--text">{{$t('global.n_active')}}</span>
          <span v-if="props.item.status === 'SUCCESS' && props.item.joinType==='INVITATION'" class="success--text">{{$t('user.home.already_accept')}}</span>
          <span v-if="props.item.status === 'REJECT'" class="error--text">{{$t('chamber.btn.refuse') }}</span>
          <p v-if="props.item.status === 'REJECT' && props.item.joinType==='APPLIY'">
            <span class="error--text">{{$t('user.home.administrator_refusal')}}</span>
            <a @click="props.expanded = !props.expanded">{{$t('chamber.btn.see')}}</a>
          </p>
        </td>
        <td class="text-xs-left text-md-center">
          <!-- 支付成功查看 -->
          <v-tooltip top v-if="props.item.status === 'SUCCESS' && props.item.isPay">
            <v-btn flat icon slot="activator" color="primary"
                   :to="`/users/${$route.params.userId}/memberApply/${props.item.id}/detail`">
              <v-icon size="18">visibility</v-icon>
            </v-btn>
            <span>{{$t('chamber.btn.see')}}</span>
          </v-tooltip>

          <!-- 待審核取消 -->
          <v-tooltip top v-if="props.item.status === 'PENDING' && !props.item.isPay && props.item.joinType==='APPLIY'">
            <v-btn flat icon color="error" slot="activator" @click.native="change(props.item.id)">
              <v-icon size="18">close</v-icon>
            </v-btn>
            <span>{{$t('chamber.btn.cancel')}}</span>
          </v-tooltip>
          <!-- 未支付支付 -->
          <v-tooltip top v-if="props.item.status === 'SUCCESS' && !props.item.isPay">
            <v-btn flat icon color="light-blue accent-4" slot="activator"
                   :to="`/member/${props.item.organization.id}/order/pay/${props.item.id}`">
              <v-icon size="18">payment</v-icon>
            </v-btn>
            <span>{{$t('global.payDues')}}</span>
          </v-tooltip>

          <!-- 接受 -->
          <v-tooltip top v-if="props.item.status === 'PENDING' && props.item.joinType ==='INVITATION'">
            <v-btn flat icon color="primary" @click="handle(props.item,'SUCCESS')" slot="activator">
              <v-icon size="18">done</v-icon>
            </v-btn>
            <span>{{$t('user.home.accept')}}</span>
          </v-tooltip>

          <!-- 拒絕 -->
          <v-tooltip top v-if="props.item.status === 'PENDING' && props.item.joinType ==='INVITATION'">
            <v-btn flat icon color="primary" @click="handle(props.item,'REJECT')" slot="activator">
              <v-icon size="18">close</v-icon>
            </v-btn>
            <span>{{$t('user.home.refuse')}}</span>
          </v-tooltip>
        </td>
      </template>
      <template slot="expand" slot-scope="props">
        <v-card flat>
          <v-card-text>{{ props.item.remark}}</v-card-text>
        </v-card>
      </template>
    </v-data-table>

    <!-- 我的活動 -->
    <div class="title px-4 py-3 xspy-0">{{$t('user.title.activity_apply' )}}</div>
    <v-data-table :headers="headers2" :items="desserts2" hide-actions :no-data-text="$t('message.no_message')"
                  :rows-per-page-items="limit" :loading="loading2" class="rtable rtable--flip elevation-1">
      <template slot="items" slot-scope="props">
        <td class="text-xs-left px-2 py-1">
          <router-link class="black--text" style="text-decoration: none;"
                       :to="{path : '/company/activity-detail',query: {id: props.item.event.organization.id,actId: props.item.event.id}}">
            <v-img class="mr-2 hidden-sm-and-down " style="width: 100px;float:left"
                   :src="`${$fileUrl}/public/uploads/o/company/event/${props.item.event.id}/${props.item.event.eventFiles[0].key}`"
                   lazy-src="https://picsum.photos/510/300?random"></v-img>
            <p class="mt-0 ml-3"> {{ props.item.event.title }} <span class="white--text caption px-1"
                                                                     :class="{ 'success': props.item.timeStatus==='global.conduct', 'error': props.item.timeStatus==='global.soon','orange darken-1': props.item.timeStatus==='global.end'  }">{{$t(props.item.timeStatus)}}</span>
            </p>
            <p class="ml-3"> {{$t('chamber.activity.time')}}: {{ props.item.event.startedAt | time}} - {{
              props.item.event.endedAt | time}}</p>
          </router-link>
        </td>
        <td class="text-xs-left">
          {{props.item.order.orderLineItems[0].title}}
        </td>
        <td class="text-xs-left">
          {{props.item.order.orderLineItems[0].quantity}}
        </td>
        <td class="text-xs-left">
          <span class="pt-4" v-if="props.item.eventTicket.price === 0"> {{$t('global.freeTicket')}}</span>
          <span class="pt-4" v-else> {{$t('global.chargeTicket')}}</span>
          <p class="error--text">$HK {{props.item.eventTicket.price}}</p>
        </td>
        <td class="text-xs-left">
          <span v-if="props.item.statusType === 'PENDING'" class="warning--text">{{$t('chamber.btn.audited') }}</span>
          <span v-if="props.item.statusType === 'SUCCESS'" class="success--text">{{$t('global.SUCCESS') }}</span>
          <span v-if="props.item.statusType === 'REFUSE'" class="error--text">{{$t('chamber.btn.refuse') }}</span>
        </td>

        <td class="text-md-center text-xs-left">
          <v-tooltip top v-if="props.item.statusType === 'SUCCESS'">
            <v-btn flat icon color="primary" slot="activator" @click="change1(props.item)">
              <v-icon size="18">visibility</v-icon>
            </v-btn>
            <span>{{$t('global.seeTickets')}}</span>
          </v-tooltip>
          <v-tooltip top v-if="props.item.statusType === 'PENDING' && props.item.eventTicket.price !== 0">
            <v-btn flat icon color="primary" slot="activator"
                   :to="`/users/${$route.params.userId}/activities/${props.item.order.id}/detail`">
              <v-icon size="18">visibility</v-icon>
            </v-btn>
            <span>{{$t('chamber.btn.see')}}</span>
          </v-tooltip>
          <p class="error--text" v-if="props.item.statusType === 'PENDING'">{{$t('global.noRefund')}}</p>
        </td>
      </template>
    </v-data-table>

    <!-- 刪除模態框 -->
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">{{$t('global.deleteConfirmTitle')}}</v-card-title>
          <v-card-text class="text-xs-left">{{$t('global.confirmedDeleteCoc')}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="darken-1" flat @click.native="dialog = false">{{$t('button.cancel')}}</v-btn>
            <v-btn color="primary darken-1" flat @click="deletes()">{{$t('button.confirm')}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <!-- 電子卷模態框 -->
    <v-layout row justify-center>
      <v-dialog v-model="dialog1" persistent max-width="700">
        <v-card class="text-xs-left">
          <v-card-title class="headline">{{$t('global.ticket_title')}}</v-card-title>
          <div id="pdf">
            <v-layout row wrap v-if="ticket" style="background: #CFD8DC" class="px-3 py-2">
              <v-flex xs6>
                {{$t('chamber.activity.name' )}}: {{ticket.event.title}}
              </v-flex>
              <v-flex xs6 class="text-xs-right">
                {{$t('global.signTime')}}: {{ticket.order.createdAt | time}}
              </v-flex>
            </v-layout>
            <v-layout row wrap v-if="ticket" class="px-3 grey pt-3 lighten-5">
              <v-flex sm3 xs4>
                <img src="./../../../static/img/code.png" style="width:80%" alt="code">
              </v-flex>
              <v-flex sm6 xs8>
                <p> {{$t('global.code' )}}: {{ticket.referenceNumber}}</p>
                <p> {{$t('navbar.activity_time' )}}: {{ticket.event.startedAt | time}} - {{ticket.event.endedAt |
                  time}}</p>
                <a color="primary darken-1" flat @click="exportPdf()">{{$t('global.download')}}</a>
              </v-flex>
              <v-flex sm3 xs12>
                <p>
                  {{$t('global.ticket')}}: {{ticket.eventTicket.name}}
                  <span class="success--text" v-if="ticket.order.totalPrice ===0">{{$t('global.free')}}</span>
                  <span class="error--text" v-else>$HK {{ticket.order.totalPrice}}</span>
                </p>
                <p> {{$t('chamber.payment.orderName')}}: {{ticket.order.contact}}</p>
                <p> {{$t('chamber.select.phone')}}: {{ticket.order.phone}}</p>
                <p> {{$t('chamber.payment.email')}}: {{ticket.order.email}}</p>
              </v-flex>
            </v-layout>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="darken-1" flat @click.native="dialog1 = false">{{$t('button.cancel')}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>
<script>
  import {mapMutations} from 'vuex'
  import * as domtoimage from 'dom-to-image'
  import * as jsPDF from 'jspdf'

  window['jsPDF'] = jsPDF
  export default {
    data() {
      return {
        indexId: null,
        dialog: false,
        dialog1: false,
        loading: false,
        loading1: false,
        loading2: false,
        totalDesserts: 0,
        totalDesserts1: 0,
        totalDesserts2: 0,
        limit: [4],
        headers: [
          {
            text: this.$t('chamber.know.title'),
            align: 'left',
            sortable: false,
            value: 'title'
          },
          {
            text: this.$t('chamber.know.coc'),
            value: 'coc',
            sortable: false
          },
          {
            text: this.$t('cocShow.news.release_time'),
            value: 'createdAt'
          },
          {
            text: this.$t('chamber.know.update_time'),
            value: 'lastModifiedAt'
          },
          {
            text: this.$t('chamber.know.operation'),
            value: 'operation',
            sortable: false
          }
        ],
        headers1: [
          {
            text: this.$t('chamber.select.information'),
            value: 'name',
            sortable: false
          },
          {
            text: this.$t('global.joinAt'),
            value: 'joinAt'
          },
          {
            text: this.$t('chamber.member.position_end_time'),
            value: 'email',
            sortable: false
          },
          {
            text: this.$t('chamber.select.status'),
            value: 'status',
            sortable: false
          },
          {
            text: this.$t('chamber.know.operation'),
            value: 'operation',
            sortable: false
          }
        ],
        headers2: [
          {
            text: this.$t('chamber.activity.name'),
            align: 'left',
            sortable: false,
            value: 'name'
          },
          {
            text: this.$t('chamber.activity.type'),
            value: 'type',
            sortable: false
          },
          {
            text: this.$t('chamber.activity.quantity'),
            value: 'quantity',
            sortable: false
          },
          {
            text: this.$t('chamber.activity.price'),
            value: 'price',
            sortable: false
          },
          {
            text: this.$t('chamber.activity.status'),
            value: 'status',
            sortable: false
          },
          {
            text: this.$t('chamber.know.operation'),
            value: 'operation',
            sortable: false
          }
        ],
        filters: {
          page: 0,
          size: 4
        },
        filters1: {
          search: null,
          'user.id': this.$route.params.userId,
          page: 0,
          size: 4,
          joinType: 'APPLIY'
        },
        filters2: {
          page: 0,
          size: 4,
          orderUserId: this.$route.params.userId
        },
        desserts: [],
        desserts1: [],
        desserts2: [],
        pagination: {
          sortBy: 'createdAt',
          sortBy: 'lastModifiedAt'
        },
        ticket: {event: {}, eventTicket: {}, order: {}},
        currentDate: this.$moment(new Date())
      }
    },
    watch: {
      pagination: {
        handler() {
          if (this.filters.page !== this.pagination.page - 1) {
            this.filters.page = this.pagination.page - 1
            this.reloadTable()
          } else {
            const sortBy = this.pagination.sortBy
            this.desserts = this.desserts.sort((a, b) => {
              const sortA = a[sortBy]
              const sortB = b[sortBy]
              if (this.pagination.descending) {
                if (sortA < sortB) return 1
                if (sortA > sortB) return -1
                return 0
              } else {
                if (sortA < sortB) return -1
                if (sortA > sortB) return 1
                return 0
              }
            })
          }
        },
        deep: true
      }
    },
    mounted() {
      this.reloadTable()
      this.reloadTable1()
      this.reloadTable2()
    },
    methods: {
      ...mapMutations(['snackbarStateChange']),
      //獲取公告
      reloadTable() {
        this.loading = true
        this.$http
          .get(`user/members/userAnnouncement`, {
            params: this.filters
          })
          .then(res => {
            this.desserts = res.data.content
            this.totalDesserts = res.data.totalElements
            this.loading = false
          })
      },
      //獲取商會列表
      reloadTable1() {
        this.loading1 = true
        if (this.filters1.search === null) {
          delete this.filters1.search
        }
        this.$http
          .get('user/members', {
            params: this.filters1
          })
          .then(res => {
            this.desserts1 = res.data.content
            this.totalDesserts1 = res.data.totalElements
            this.loading1 = false
          })
      },
      //活動活動列表
      reloadTable2() {
        this.loading2 = true
        this.$http
          .get(`user/event_attendees`, {
            params: this.filters
          })
          .then(res => {
            this.desserts2 = res.data.content
            this.desserts2.forEach(val => {
              if (
                this.currentDate > val.event.startedAt &&
                this.currentDate < val.event.endedAt
              ) {
                val['timeStatus'] = 'global.conduct'
              } else if (
                this.currentDate > val.event.startedAt &&
                this.currentDate > val.event.endedAt
              ) {
                val['timeStatus'] = 'global.end'
              } else if (this.currentDate < val.event.startedAt) {
                val['timeStatus'] = 'global.soon'
              }
            })
            this.totalDesserts2 = res.data.totalElements
            this.loading2 = false
          })
      },
      deletes() {
        this.$http
          .delete(`user/members/revocation_application/${this.indexId}`)
          .then(res => {
            this.snackbarStateChange({
              color: 'success',
              text: this.$t('message.delete_success'),
              snackbar: true
            })
            this.dialog = false
            this.reloadTable()
          })
          .catch(error => {
            this.snackbarStateChange({
              color: 'error',
              text: error.data.message,
              snackbar: true
            })
          })
      },
      //審核
      async handle(data, status) {
        await this.$http
          .get(`user/user/${this.$route.params.userId}/profiles`)
          .then(async res => {
            if (res.data.content.length === 0) {
              this.snackbarStateChange({
                color: 'error',
                text: this.$t('global.profileText'),
                snackbar: true
              })
              this.$router.push({
                path: `/users/${this.$route.params.userId}/info`
              })
            } else {
              let obj = {
                status: status,
                memberId: data.id,
                organizationId: data.organization.id,
                memberPositionId: data.memberPosition.id,
                membershipId: data.membership.id,
                statement1: true,
                statement2: true,
                statement3: true,
                active: false,
                isPay: false,
                joinType: data.joinType,
                role: 'user'
              }
              await this.$http
                .put('user/allow', this.$serialize(obj))
                .then(async res => {
                  this.snackbarStateChange({
                    color: 'success',
                    text: this.$t('message.update_message'),
                    snackbar: true
                  })
                  await this.reloadTable1()
                })
                .catch(error => {
                  this.snackbarStateChange({
                    color: 'error',
                    text: error.data.message,
                    snackbar: true
                  })
                })
            }
          })
      },
      //打開dialog
      change(id) {
        this.dialog = true
        this.indexId = id
      },
      change1(data) {
        this.ticket = data
        this.dialog1 = true
      },
      // 切換商會
      changTab(type) {
        if (type === 'APPLIY') {
          this.filters1['user.id'] = this.$route.params.userId
          this.filters1.joinType = type
          delete this.filters1['email']
        } else {
          this.filters1.joinType = type
          this.filters1['email'] = sessionStorage.getItem('email')
          delete this.filters1['user.id']
        }
        this.reloadTable1()
      },
      exportPdf() {
        const hideNode = document.getElementById('pdf')
        domtoimage
          .toJpeg(hideNode, {
            bgcolor: '#fff'
          })
          .then(dataUrl => {
            const img = new Image()
            img.src = dataUrl
            const pdf = new jsPDF()
            pdf.addImage(dataUrl, 'JPEG', 14, 10, 180, img.height / 12) //300DPI 1mm=12px
            pdf.save(`入場卷.pdf`)
          })
      }
    }
  }
</script>
<style lang="scss">
  .v-tabs__container--align-with-title {
    padding-left: 15px !important;
  }
</style>


