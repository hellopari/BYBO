<template>
  <div id="dashboard">
    <template v-if="!loading">
      <v-layout row wrap class="my-5 mx-4">
        <v-flex md4>
          <v-card class="my-5 mx-4 py-2 text-xs-right" style="position: relative">
            <div class="crad-icon1 red">
              <v-icon class="white--text" size="56">account_circle</v-icon>
            </div>
            <p class=" pr-4 card-category">
              <span>{{$t('chamber.btn.audited')}}</span> <br>
              <span class="card-title1">{{candidates.member}}</span>
            </p>
            <v-divider></v-divider>
            <div class="card-footer text-xs-left px-4 py-2">
              {{$t('chamber.home.member' )}}
              <router-link :to="`/organization/${$route.params.organizationId}/member_list`">{{$t('global.handle')}}
              </router-link>
            </div>
          </v-card>
        </v-flex>
        <v-flex md4>
          <v-card class="my-5 mx-4 py-2 text-xs-right" style="position: relative">
            <div class="crad-icon1 e-bg  ">
              <v-icon class="white--text" size="56">local_activity</v-icon>
            </div>
            <p class=" pr-4 card-category">
              <span>{{$t('chamber.btn.audited')}}</span> <br>
              <span class="card-title1">{{candidates.event}}</span>
            </p>
            <v-divider></v-divider>
            <div class="card-footer text-xs-left px-4 py-2">
              {{$t('chamber.home.activity' )}}
              <router-link :to="`/organization/${$route.params.organizationId}/events`">{{$t('global.handle')}}
              </router-link>
            </div>
          </v-card>
        </v-flex>
        <v-flex md4>
          <v-card class=" my-5 mx-4 py-2 text-xs-right" style="position: relative">
            <div class="crad-icon1 red m-bg">
              <v-icon class="white--text" size="56">message</v-icon>
            </div>
            <p class=" pr-4 card-category">
              <span>{{$t('chamber.btn.audited')}}</span> <br>
              <span class="card-title1">{{candidates.message}}</span>
            </p>
            <v-divider></v-divider>
            <div class="card-footer text-xs-left px-4 py-2">
              {{$t('chamber.home.message' )}}
              <router-link :to="`/organization/${$route.params.organizationId}/messages`">{{$t('global.handle')}}
              </router-link>
            </div>
          </v-card>
        </v-flex>
      </v-layout>

    </template>
    <div class="text-xs-center" v-else>
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        authenticated: false,
        loading: false,
        candidates: {},
        oktaAuth: {}
      }
    },
    mounted() {
      this.readStatistics()
    },
    methods: {
      readStatistics() {
        this.loading = true
        this.$http
          .get('manager/organizations/waiting_for_processing',
            {
            headers: {
              "X-TENANT-ID": this.$route.params.organizationId
            },
            params: {
              organizationId: this.$route.params.organizationId
            },
          })

        .then(res => {
            this.candidates = res.data
            this.loading = false
          })
      }
    }
  }
</script>
<style lang="scss">
  .pull-right {
    float: right;
  }

  .crad-icon1 {
    border-radius: 3px;
    padding: 15px;
    background: linear-gradient(60deg, #2c7a90, #E0F2F1);
    margin-top: -40px;
    margin-right: 15px;
    color: #fff;
    float: left;
    margin-left: 30px;
  }

  .m-bg {
    background: linear-gradient(60deg, #ec407a, #d81b60);
  }

  .e-bg {
    background: linear-gradient(60deg, #26c6da, #00acc1) !important;
  }

  .card-category {
    color: #999;
    font-size: 14px;
  }

  .card-title1 {
    color: #3c4858;
    font-size: 24px;
  }

  .card-footer {
    color: #999;
    font-size: 12px;
    line-height: 22px;
  }
</style>
