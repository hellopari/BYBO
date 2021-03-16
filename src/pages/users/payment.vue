<template>
  <div id="userPayment">
    <v-divider class="my-2"></v-divider>
    <v-data-table hide-actions :headers="headers" :no-data-text="$t('message.no_message')" :items="desserts"
                  :loading="loading" :pagination.sync="pagination" :total-items="totalDesserts"
                  :rows-per-page-items="limit" class="rtable rtable--flip elevation-1">
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">
          {{ props.item.id }}
        </td>
        <td class="text-xs-left">
          {{ props.item.name }}
        </td>
        <td class="text-xs-left">
          {{ props.item.email }}
        </td>
        <td class="text-xs-left">
          {{ $t(`global.${props.item.subjectType}`) }}
        </td>
        <td class="text-xs-left">
          {{ props.item.gateway }}
        </td>
        <td class="text-xs-left error--text">
          $HK {{ props.item.amount }}
        </td>
        <td class="text-xs-left error--text">
          <span v-if="props.item.status === 'SUCCESS'" class="success--text">{{$t('global.alreadyPaid')}}</span>
          <span v-if="props.item.status === 'PENDING' && props.item.isActive" class="success--text">{{$t('global.alreadyPaid')}}</span>
          <span v-if="props.item.status === 'PENDING' && !props.item.isActive" class="warning--text">{{$t('global.nPaid')}}</span>
          <span v-if="props.item.status === 'ERROR'" class="error--text">{{$t('global.ERROR')}}</span>
        </td>
        <td class="text-xs-left text-md-center">
          <v-tooltip top>
            <v-btn flat icon color="primary" slot="activator"
                   :to="{path: `/users/${$route.params.userId}/apply/${props.item.id}/detail`}">
              <v-icon size="20">visibility</v-icon>
            </v-btn>
            <span>{{$t('chamber.btn.see')}}</span>
          </v-tooltip>

        </td>
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

  </div>
</template>
<script>
  import {mapMutations} from 'vuex'
  import {error} from 'util'

  export default {
    data() {
      return {
        loading: true,
        filters: {
          page: 0,
          size: 9,
          userId: this.$route.params.userId
        },
        totalDesserts: 0,
        totalPages: 0,
        pagination: {
          sortBy: 'createdAt',
          sortBy: 'lastModifiedAt'
        },
        limit: [9],
        headers: [
          {
            text: this.$t('chamber.payment.orderNumber'),
            value: 'orderNumber',
            sortable: false
          },
          {
            text: this.$t('chamber.payment.orderName'),
            value: 'orderName',
            sortable: false
          },
          {
            text: this.$t('chamber.payment.email'),
            value: 'email',
            sortable: false
          },
          {
            text: this.$t('chamber.payment.type'),
            value: 'method',
            sortable: false
          },
          {
            text: this.$t('chamber.payment.method'),
            value: 'method',
            sortable: false
          },
          {
            text: this.$t('chamber.payment.money'),
            value: 'method',
            sortable: false
          },
          {
            text: this.$t('chamber.payment.status'),
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
          .get(`user/transactions`, {
            params: this.filters,
          })
          .then(res => {
            this.desserts = res.data.content
            this.totalDesserts = res.data.totalElements
            this.totalPages = res.data.totalPages
            this.loading = false
          })
      },
      handleInput(value) {
        this.pagination.page = value
        this.$router.push({
          path: `/users/${this.$route.params.userId}/payments`,
          query: {
            page: value
          }
        })
        this.filters.page = value - 1
        this.reloadTable()
      }
    }
  }
</script>
