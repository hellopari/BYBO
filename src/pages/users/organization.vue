<template>
  <div id="oranization">
    <v-divider class="my-2"></v-divider>

    <!-- 過濾 -->
    <v-layout row wrap class="mx-4 mt-4">
      <v-flex md2 class="mr-3">
        <v-select @change="changeStatus(select)" v-model="select" :items="items" item-text="abbr" item-value="id"
                  label="Select" persistent-hint return-object single-line>
                  
        </v-select>
      </v-flex>
      <v-flex md3 sm4>
        <v-text-field :label="$t('global.search_text')" v-model="filters.search" @keyup.enter="reloadTable()"
                      prepend-icon="search" px3 class="px3"></v-text-field>
      </v-flex>

    </v-layout> 
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
    <v-data-table hide-actions :headers="headers" :items="desserts" :no-data-text="$t('message.no_message')"
                  :pagination.sync="pagination" :rows-per-page-items="limit" :total-items="totalDesserts"
                  :loading="loading" class="rtable rtable--flip elevation-1">
      <template slot="items" slot-scope="props">

        <td class="py-1">
          <router-link target="_blank" :to="{ path: '/company', query: { id: props.item.organization.id } }"
                       class="black--text" style="text-decoration: none;">
            <v-img class="hidden-sm-and-down"
                   :src="`${$fileUrl}/public/uploads/o/company/organization/${props.item.organization.id}/${props.item.organization.logo}`"
                   style="width:80px;float:left" lazy-src="https://picsum.photos/510/300?random"></v-img>
            <span class="ml-3 body-1 block text-no-wrap text-truncate">{{ props.item.organization.name }}</span> <br>
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
                   :to="`/users/${$route.params.userId}/memberApply/${props.item.id}/detail?orgid=${props.item.organization.id}`">
              <v-icon size="18">visibility</v-icon>
            </v-btn>vis
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
      <template slot="footer">
        <td :colspan="headers.length +1" class="px-0">
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
  </div>
</template>
<style lang="scss">
  .filter {
    padding: 20px 20px 0 20px;
  }

  .v-label {
    font-size: 13px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.87);
  }

  .tab {
    position: absolute;
    top: 15px;
    right: 0;
  }

  .primarys {
    background-color: #2c7a90 !important;
    border-color: #2c7a90 !important;
    color: #fff !important;
    position: relative !important;
  }

  .position {
    position: absolute !important;
    top: -9px !important;
    left: -9px;
  }

  .block {
    display: inline-block;
  }

  .v-tabs__container--align-with-title {
    padding-left: 15px !important;
  }
</style>

<script>
  import {mapMutations} from 'vuex'

  export default {
    data() {
      return {
        dialog: false,
        pagination: {
          sortBy: 'createdAt'
        },
        select: {id: ' ', abbr: this.$t('cocShow.home.whole')},
        items: [
          {id: ' ', abbr: this.$t('cocShow.home.whole')},
          {
            id: 'SUCCESS',
            abbr: this.$t('user.home.already_joined'),
            statusType: 'statusType'
          },
          {
            id: 'PENDING',
            abbr: this.$t('user.user_baseinfo.wait_join'),
            statusType: 'statusType'
          },
          {
            id: 'REFUSE',
            abbr: this.$t('user.home.fail'),
            statusType: 'statusType'
          }
        ],
        loading: false,
        limit: [10],
        totalDesserts: 0,
        totalPages: 0,
        indexId: null,
        filters: {
          search: null,
          'user.id': this.$route.params.userId,
          page: 0,
          size: 9,
          joinType: 'APPLIY'
        },
        headers: [
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
      changeSort(column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
        }
      },
      //獲取名單列表
      reloadTable() {
        this.loading = true
        if (this.filters.search === null) {
          delete this.filters.search
        }
        this.$http
          .get('user/members', {
            params: this.filters
          })
          .then(res => {
            this.desserts = res.data.content
            this.totalDesserts = res.data.totalElements
            this.totalPages = res.data.totalPages
            this.loading = false
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
                .put('user/members/allow', this.$serialize(obj))
                .then(async res => {
                  this.snackbarStateChange({
                    color: 'success',
                    text: this.$t('message.update_message'),
                    snackbar: true
                  })
                  await this.reloadTable()
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
      change(id) {
        this.dialog = true
        this.indexId = id
      },
      changeStatus(item) {
        if (item.id === ' ') {
          delete this.filters.status
        } else {
          this.filters.status = item.id
        }
        this.reloadTable()
      },
      changTab(type) {
        if (type === 'APPLIY') {
          this.filters['user.id'] = this.$route.params.userId
          delete this.filters['email']
          this.filters.joinType = type
        } else {
          this.filters.joinType = type
          this.filters['email'] = sessionStorage.getItem('email')
          delete this.filters['user.id']
        }
        this.reloadTable()
      },
      handleInput(value) {
        this.pagination.page = value
        this.$router.push({
          path: `/users/${this.$route.params.userId}/organization`,
          query: {
            page: value
          }
        });
        this.filters.page = value - 1;
        this.reloadTable()
      }
    }
  }
</script>
