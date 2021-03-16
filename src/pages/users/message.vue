<template>
  <div id="messages">
    <v-divider class="my-2"></v-divider>
    <v-data-table hide-actions :headers="headers" :items="desserts" :no-data-text="$t('message.no_message')"
                  :pagination.sync="pagination" :rows-per-page-items="limit" :total-items="totalDesserts"
                  :loading="loading" class="rtable rtable--flip elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.title }}</td>
        <td class="text-xs-left">{{ props.item.organization.name}}</td>
        <td class="text-xs-left">{{ props.item.messageReply}}</td>
        <td class="text-xs-left">{{ props.item.leavingMessagedAt | time }}</td>
        <td class="text-xs-left text-md-center">
          <v-tooltip top>
            <v-btn flat icon color="primary" slot="activator" @click="openDialog(props.item)">
              <v-icon size="18">visibility</v-icon>
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

    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="600">
        <v-card>
          <v-card-title class="headline">{{$t('chamber.left.message')}}</v-card-title>
          <v-card-text>
            <div>{{$t('chamber.know.title')}}</div>
            <div>{{item.title}}</div>
          </v-card-text>
          <v-spacer></v-spacer>
          <v-card-text>
            <div>{{$t('chamber.create.contacts')}}</div>
            <div>{{item.contacts}}</div>
          </v-card-text>
          <v-spacer></v-spacer>
          <v-card-text>
            <div>{{$t('chamber.create.phone')}}</div>
            <div>{{item.phone}}</div>
          </v-card-text>
          <v-spacer></v-spacer>
          <v-card-text>
            <div>{{$t('chamber.create.email')}}</div>
            <div>{{item.email}}</div>
          </v-card-text>
          <v-spacer></v-spacer>
          <v-card-text>
            <div>{{$t('chamber.know.content')}}</div>
            <div>{{item.leavingMessage}}</div>
          </v-card-text>
          <v-spacer></v-spacer>
          <v-card-text>
            <div>{{$t('chamber.member.admin_post')}}</div>
            <div>{{item.messageReply}}</div>
          </v-card-text>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="darken-1" flat @click.native="dialog = false">{{$t('button.cancel')}}</v-btn>
            <v-btn color="primary darken-1" flat @click.native="dialog = false">{{$t('button.confirm')}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

  </div>
</template>
<script>
  import {mapMutations} from 'vuex'
  import {error} from 'util'

  export default {
    data() {
      return {
        loading: true,
        dialog: false,
        filters: {
          page: 0,
          size: 9,
          'user.id': this.$route.params.userId
        },
        totalDesserts: 0,
        totalPages: 0,
        pagination: {
          sortBy: 'leavingMessagedAt'
        },
        limit: [9],
        item: {},
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
            text: this.$t('chamber.member.admin_post'),
            value: 'createdAt',
            sortable: false
          },
          {
            text: this.$t('chamber.know.update_time'),
            value: 'leavingMessagedAt'
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
          .get(`user/messages`, {
            params: this.filters
          })
          .then(res => {
            this.desserts = res.data.content
            this.totalDesserts = res.data.totalElements
            this.totalPages = res.data.totalPages
            this.loading = false
          })
      },
      openDialog(data) {
        this.dialog = true
        this.item = data
      },
      handleInput(value) {
        this.pagination.page = value
        this.$router.push({
          path: `/users/${this.$route.params.userId}/messages`,
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

