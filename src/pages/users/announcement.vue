<template>
  <div id="announcement">
    <v-divider class="my-2"></v-divider>
    <v-data-table hide-actions :headers="headers" :items="desserts" :no-data-text="$t('message.no_message')"  :pagination.sync="pagination" :rows-per-page-items="limit" :total-items="totalDesserts" :loading="loading" class="rtable rtable--flip elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.title }}</td>
        <td class="text-xs-left">{{ props.item.organization.name}}</td>
        <td class="text-xs-left">{{ props.item.createdAt | time }}</td>
        <td class="text-xs-left">{{ props.item.lastModifiedAt | time }}</td>
        <td class="text-xs-left text-md-center">
          <v-tooltip top>
            <v-btn flat icon color="primary" slot="activator" :to="{path : '/company/notice-detail',query: {id: props.item.organization.id,noticeId: props.item.id}}" target="_blank">
              <v-icon size="18">visibility</v-icon>
            </v-btn>
            <span>{{$t('chamber.btn.see')}}</span>
          </v-tooltip>
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

  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { error } from 'util'

export default {
    data() {
        return {
            loading: true,
            filters: {
                page: 0,
                size: 9
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
                .get(`user/members/userAnnouncement`, {
                    params: this.filters
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
                path: `/users/${this.$route.params.userId}/announcement`,
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


