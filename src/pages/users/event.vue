<template>
  <div id="event">
    <v-divider class="my-2"></v-divider>
    <v-layout row wrap class="mx-4 mt-4">
      <v-flex md2 class="mr-3">
        <v-select @change="changeStatus(select)" v-model="select" :items="items" item-text="abbr" item-value="id" label="Select" persistent-hint return-object single-line></v-select>
      </v-flex>
      <v-flex md3 sm4>
        <v-text-field :label="$t('global.search_text')" v-model="filters.searchName" @keyup.enter="reloadTable()" prepend-icon="search" px3 class="px3"></v-text-field>
      </v-flex>
    </v-layout>

    <v-data-table hide-actions :headers="headers" :items="desserts" :no-data-text="$t('message.no_message')" :pagination.sync="pagination" :rows-per-page-items="limit" :total-items="totalDesserts" :loading="loading" class="rtable rtable--flip elevation-1">
      <template slot="items" slot-scope="props">
        <td class="text-xs-left px-2 py-1">
           <router-link target="_blank" class="black--text" style="text-decoration: none;" :to="{path : '/company/activity-detail',query: {id: props.item.event.organization.id,actId: props.item.event.id}}">
            <v-img class="mr-2 hidden-sm-and-down " style="width: 100px;float:left"
                   :src="`${$fileUrl}/public/uploads/o/company/event/${props.item.event.id}/${props.item.event.eventFiles[0].key}`"
                    lazy-src="https://picsum.photos/510/300?random"></v-img>
            <p class="mt-0 ml-3"> {{ props.item.event.title }} <span class="white--text caption px-1" :class="{ 'success': props.item.timeStatus==='global.conduct', 'error': props.item.timeStatus==='global.soon','orange darken-1': props.item.timeStatus==='global.end'  }">{{$t(props.item.timeStatus)}}</span></p>
            <p class="ml-3"> {{$t('chamber.activity.time')}}: {{ props.item.event.startedAt | time}} - {{ props.item.event.endedAt | time}}</p>
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
            <v-btn flat icon color="primary" slot="activator" @click="change(props.item)">
              <v-icon size="18">visibility</v-icon>
            </v-btn>
            <span>{{$t('global.seeTickets')}}</span>
          </v-tooltip>
          <v-tooltip top v-if="props.item.statusType === 'PENDING' && props.item.eventTicket.price !== 0">
            <v-btn flat icon color="primary" slot="activator"  :to="`/users/${$route.params.userId}/activities/${props.item.order.id}/detail`">
              <v-icon size="18">visibility</v-icon>
            </v-btn>
            <span>{{$t('chamber.btn.see')}}</span>
          </v-tooltip>
          <p class="error--text" v-if="props.item.statusType === 'PENDING' && props.item.eventTicket.price !== 0">{{$t('global.noRefund')}}</p>
        </td>
      </template>
          <template slot="footer">
        <td :colspan="headers.length +1"class="px-0">
          <v-pagination
		        circle
            class="pull-right my-2"
		        :total-visible="7"
            @input="handleInput"
            v-model="filters.page+1"
            :length="totalPages"
          ></v-pagination>
        </td>
      </template>
    </v-data-table>

    <!-- 電子卷模態框 -->
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="700">
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
                <p> {{$t('navbar.activity_time' )}}: {{ticket.event.startedAt | time}} - {{ticket.event.endedAt | time}}</p>
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
            <v-btn color="darken-1" flat @click.native="dialog = false">{{$t('button.cancel')}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { error } from 'util'
import domtoimage from 'dom-to-image'
import jsPDF from 'jspdf'
window['jsPDF'] = jsPDF
export default {
    data() {
        return {
            select: { id: ' ', abbr: this.$t('cocShow.home.whole') },
            items: [
                { id: ' ', abbr: this.$t('cocShow.home.whole') },
                {
                    id: 'SUCCESS',
                    abbr: this.$t('user.home.success'),
                    statusType: 'statusType'
                },
                {
                    id: 'PENDING',
                    abbr: this.$t('user.home.pending'),
                    statusType: 'statusType'
                },
                {
                    id: 'REFUSE',
                    abbr: this.$t('user.home.fail'),
                    statusType: 'statusType'
                }
            ],
            loading: false,
            dialog: false,
            isLoading: false,
            snackbarText: null,
            snackbar: false,
            ticket: { event: {}, eventTicket: {}, order: {} },
            itemId: null,
            currentDate: this.$moment(new Date()),
            filters: {
                page: 0,
                size: 9,
                searchName: null,
                statusType: null,
                orderUserId: this.$route.params.userId
            },
            totalDesserts: 0,
            totalPages: 0,
            pagination: {},
            limit: [9],
            headers: [
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
            desserts: []
        }
    },
    watch: {
        pagination: {
            handler() {
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
            },
            deep: true
        }
    },
    mounted() {
       this.filters.page =
            this.$route.query.page !== undefined
                ? Number(this.$route.query.page) - 1
                : 0
        this.reloadTable()
    },
    methods: {
        ...mapMutations(['snackbarStateChange']),
        reloadTable() {
            this.loading = true

            this.$http
                .get(`user/event_attendees`)
                .then(res => {
                    this.desserts = res.data.content
                    this.desserts.forEach(val => {
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
                    this.totalDesserts = res.data.totalElements
                    this.totalPages = res.data.totalPages
                    this.loading = false
                })
        },
        changeStatus(item) {
            if (item.id === ' ') {
                delete this.filters.statusType
            } else {
                this.filters.statusType = item.id
            }
            this.reloadTable()
        },
        change(data) {
            this.ticket = data
            this.dialog = true
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
        },
         handleInput(value) {
            this.pagination.page = value
            this.$router.push({
                path: `/users/${this.$route.params.userId}/event`,
                query: {
                    page: value
                }
            })
             this.filters.page = value-1
            this.reloadTable()
      }
    }
}
</script>

