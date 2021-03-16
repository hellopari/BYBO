import Vue from 'vue'
import Router from 'vue-router'
import sampleConfig from '@/auth.config'
import Auth from './../../static/@okta/okta-vue/src/Auth'

Vue.use(Router)
Vue.use(Auth, {
  issuer: sampleConfig.oidc.issuer,
  client_id: sampleConfig.oidc.clientId,
  redirect_uri: sampleConfig.oidc.redirectUri,
  scope: sampleConfig.oidc.scope
})

//平台公共路由
export const plarformRouter = [
  {
    path: '/',
    component: resolve => require(['@/layouts/plarform.vue'], resolve),
    children: [
      {
        path: '/',
        component: resolve =>
          require(['@/pages/platform/home/home.vue'], resolve),
        meta: {
          isShowHeadAndFooter: true,
          isShowSearch: true
        }
      },
      {
        path: 'company-list',
        component: resolve =>
          require(['@/pages/platform/cocList/cocList'], resolve),
        meta: {
          isShowHeadAndFooter: true,
          isShowSearch: true
        }
      },
      {
        path: 'activity-list',
        component: resolve =>
          require([
            '@/pages/platform/activityList/activityList'
          ], resolve),
        meta: {
          isShowHeadAndFooter: true,
          isShowSearch: true
        }
      },
      {
        path: 'news-list',
        component: resolve =>
          require(['@/pages/platform/newsList/newsList'], resolve),
        meta: {
          isShowHeadAndFooter: true,
          isShowSearch: true
        }
      },
      {
        path: 'product-list',
        component: resolve =>
          require(['@/pages/platform/productList/productList'], resolve),
        meta: {
          isShowHeadAndFooter: true,
          isShowSearch: true
        }
      },
      {
        path: 'apply',
        component: resolve =>
          require(['@/pages/platform/apply/apply'], resolve),
        meta: {
          isShowHeadAndFooter: true
        }
      },

      {
        path: ':type/:organizationId/order/pay/:id',
        component: resolve =>
          require(['@/pages/platform/payment/payment'], resolve),
        meta: {
          isShowHeadAndFooter: true
        }
      },
      {
        path: 'supplement/:page',
        component: resolve =>
          require([
            '@/pages/platform/supplement/supplement'
          ], resolve),
        meta: {
          isShowHeadAndFooter: true
        }
      }
    ]
  },
  {
    path: '/company',
    component: resolve =>
      require(['@/pages/platform/cocShow/cocShow'], resolve),
    children: [
      {
        path: 'home',
        name: 'coc-show-home',
        component: resolve =>
          require([
            '@/pages/platform/cocShow/cocHome/cocHome'
          ], resolve),
      },
      {
        path: 'framework',
        name: 'coc-show-framework',
        component: resolve =>
          require([
            '@/pages/platform/cocShow/cocFrameWork/cocFrameWork'
          ], resolve),
      },
      {
        path: 'news',
        component: resolve =>
          require([
            '@/pages/platform/cocShow/cocNews/cocNews'
          ], resolve),
      },
      {
        path: 'new-detail',
        component: resolve =>
          require([
            '@/pages/platform/cocShow/newDetail/newDetail'
          ], resolve),
      },
      {
        path: 'activity',
        component: resolve =>
          require([
            '@/pages/platform/cocShow/cocActivity/cocActivity'
          ], resolve),
      },
      {
        path: 'activity-detail',
        component: resolve =>
          require([
            '@/pages/platform/cocShow/activityDetail/activityDetail'
          ], resolve),
      },
      {
        path: 'products',
        component: resolve =>
          require([
            '@/pages/platform/cocShow/cocRules/cocRules'
          ], resolve),
      },
      {
        path: 'notice',
        component: resolve =>
          require([
            '@/pages/platform/cocShow/cocNotice/cocNotice'
          ], resolve),
      },
      {
        path: 'notice-detail',
        component: resolve =>
          require([
            '@/pages/platform/cocShow/noticeDetail/noticeDetail'
          ], resolve),
      },
      {
        path: 'products-detail',
        component: resolve =>
          require([
            '@/pages/platform/cocShow/infoDetail/infoDetail'
          ], resolve),
      },
      {
        path: 'link',
        component: resolve =>
          require([
            '@/pages/platform/cocShow/cocLink/cocLink'
          ], resolve),
      },
      {
        path: '',
        redirect: 'home'
      }
    ]
  },
  {
    path: '/sign-callback',
    component: resolve =>
      require([
        '@/pages/platform/sign-callback/sign-callback.vue'
      ], resolve)
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/pages/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/pages/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/pages/error-page/404.vue')
  }
]

//需要權限訪問商會後台的路由
export const backendRouter = [
  {
    path: '/organization/:organizationId',
    component: resolve => require(['@/layouts/backend.vue'], resolve),
    // meta: {requiresAuth: true}, // 添加该字段，表示进入这个路由是需要登录的},
    children: [
      {
        path: 'dashboard',
        icon: 'home',
        name: 'chamber.left.home',
        meta: {isBack: false},
        component: resolve =>
          require([
            '@/pages/organization/dashboard/dashboard.vue'
          ], resolve)
      },
      {
        path: 'sliderShow',
        icon: 'slideshow',
        name: 'chamber.left.course',
        meta: {isBack: false},
        component: resolve =>
          require([
            '@/pages/organization/sliderShow/sliderShow.vue'
          ], resolve)
      },
      {
        path: 'post_list',
        icon: 'fiber_new',
        name: 'chamber.left.news',
        meta: {isBack: false},
        component: resolve =>
          require([
            '@/pages/organization/post/post-list.vue'
          ], resolve)
      },
      {
        path: 'announcements',
        icon: 'add_alert',
        name: 'chamber.left.notice',
        meta: {isBack: false},
        component: resolve =>
          require([
            '@/pages/organization/announcement/announcement.vue'
          ], resolve)
      },
      {
        path: 'events',
        icon: 'local_activity',
        name: 'chamber.left.activity',
        meta: {isBack: false},
        component: resolve =>
          require(['@/pages/organization/event/event.vue'], resolve)
      },
      {
        path: 'rules',
        icon: 'error',
        name: 'chamber.left.know',
        meta: {isBack: false},
        component: resolve =>
          require(['@/pages/organization/rule/rule.vue'], resolve)
      },
      {
        path: 'tabs',
        icon: 'tabs',
        name: 'chamber.tab.custom_tab',
        meta: {isBack: false},
        component: resolve =>
          require(['@/pages/organization/tabs/tabs.vue'], resolve)
      },
      {
        path: 'member_list',
        icon: 'supervisor_account',
        name: 'chamber.left.member',
        meta: {isBack: false},
        component: resolve =>
          require([
            '@/pages/organization/member/member-list.vue'
          ], resolve)
      },
      {
        path: 'memberships',
        icon: 'record_voice_over',
        name: 'chamber.left.examine',
        meta: {isBack: false},
        component: resolve =>
          require([
            '@/pages/organization/membership/membership.vue'
          ], resolve)
      },
      {
        path: 'positions',
        icon: 'group_add',
        name: 'chamber.left.position',
        meta: {isBack: false},
        component: resolve =>
          require([
            '@/pages/organization/positions/positions.vue'
          ], resolve)
      },
      {
        path: 'messages',
        icon: 'message',
        name: 'chamber.left.message',
        meta: {isBack: false},
        component: resolve =>
          require([
            '@/pages/organization/message/message.vue'
          ], resolve)
      },
      {
        path: 'payments',
        icon: 'payment',
        name: 'chamber.left.payment',
        meta: {isBack: false},
        component: resolve =>
          require([
            '@/pages/organization/payment/payment.vue'
          ], resolve)
      },
      {
        path: 'recording',
        icon: 'email',
        name: 'chamber.left.receipt',
        meta: {isBack: false},
        component: resolve =>
          require([
            '@/pages/organization/receipts/receipts.vue'
          ], resolve)
      },
      {
        path: 'settings',
        icon: 'settings',
        name: 'chamber.left.setting',
        meta: {isBack: false},
        component: resolve =>
          require([
            '@/pages/organization/settings/settings.vue'
          ], resolve)
      }
    ]
  },
  {
    path: '/organization/:organizationId',
    component: resolve => require(['@/layouts/backend.vue'], resolve),
    meta: {requiresAuth: true}, // 添加该字段，表示进入这个路由是需要登录的},
    children: [
      {
        path: 'emails',
        icon: 'email',
        name: 'chamber.left.email',
        meta: {isBack: true},
        component: resolve =>
          require(['@/pages/organization/emails/emails.vue'], resolve)
      },
      {
        path: 'payments_type',
        icon: 'settings',
        name: 'chamber.btn.add_card',
        meta: {isBack: true},
        component: resolve =>
          require([
            '@/pages/organization/payment/payment-type.vue'
          ], resolve)
      },
      {
        path: 'order/:type/:paymentId/detail',
        name: 'chamber.left.orderDetail',
        meta: {isBack: true},
        component: resolve =>
          require([
            '@/pages/organization/payment/payment-detail.vue'
          ], resolve)
      },
      {
        path: 'import',
        icon: 'important_devices',
        isBack: true,
        name: 'global.batchImportMember',
        meta: {isBack: true},
        component: resolve =>
          require([
            '@/pages/organization/member/member-import.vue'
          ], resolve)
      },
      {
        path: 'member/:memberId/detail',
        icon: 'important_devices',
        name: 'chamber.home.member',
        meta: {isBack: true},
        component: resolve =>
          require([
            '@/pages/organization/member/member-detail.vue'
          ], resolve)
      },
      {
        path: 'sign/:signId/list',
        icon: 'important_devices',
        name: 'chamber.left.list',
        meta: {isBack: true},
        component: resolve =>
          require([
            '@/pages/organization/event/event-sign.vue'
          ], resolve)
      }
    ]
  },
  {
    path: '/organization/:organizationId',
    component: resolve => require(['@/layouts/plarform.vue'], resolve),
    meta: {requiresAuth: true}, // 添加该字段，表示进入这个路由是需要登录的},
    children: [
      {
        path: 'create/events',
        icon: 'local_activity',
        name: 'chamber.btn.add_activity',
        component: resolve =>
          require([
            '@/pages/organization/event/event-form.vue'
          ], resolve)
      },
      {
        path: 'edit/:eventId/events',
        icon: 'local_activity',
        name: 'chamber.btn.edit_activity',
        component: resolve =>
          require([
            '@/pages/organization/event/event-form.vue'
          ], resolve)
      },
      {
        path: '/organization/:organizationId/event/create',
        component: resolve =>
          require([
            '@/pages/organization/event/event-form.vue'
          ], resolve)
      }
    ]
  },
  {
    path: '/organizations',
    component: resolve => require(['@/layouts/plarform.vue'], resolve),
    meta: {requiresAuth: true}, // 添加该字段，表示进入这个路由是需要登录的},
    children: [
      {
        path: 'select',
        component: resolve =>
          require([
            '@/pages/organization/select-organization/select-organization.vue'
          ], resolve)
      },
      {
        path: ':userId/settled',
        name: 'global.settled_coc',
        component: resolve =>
          require([
            '@/pages/organization/organization-form/organization-form.vue'
          ], resolve)
      },
      {
        path: 'create',
        name: 'chamber.btn.add_coc',
        component: resolve =>
          require([
            '@/pages/organization/organization-form/organization-form.vue'
          ], resolve)
      },
      {
        path: ':organizationId/edit',
        name: 'chamber.btn.edit_coc',
        component: resolve =>
          require([
            '@/pages/organization/organization-form/organization-form.vue'
          ], resolve)
      }
    ]
  },
  {
    path: '/implicit/callback',
    component: Auth.handleCallback()
  },
  {
    path: '/enterprise/callback',
    component: Auth.handleCallback()
  }
]

//用戶中心
export const userRouter = [
  {
    path: '/users/:userId',
    component: resolve => require(['@/layouts/customer.vue'], resolve),
    // meta: {requiresAuth: true}, // 添加该字段，表示进入这个路由是需要登录的},
    children: [
      {
        path: 'home',
        icon: 'home',
        name: 'user.navbar.personal_home_page',
        component: resolve =>
          require(['@/pages/users/home.vue'], resolve)
      },
      {
        path: 'info',
        icon: 'account_box',
        name: 'user.navbar.my_information',
        component: resolve =>
          require(['@/pages/users/info.vue'], resolve)
      },
      {
        path: 'organization',
        icon: 'group_work',
        name: 'user .navbar.My_coc',
        component: resolve =>
          require(['@/pages/users/organization.vue'], resolve)
      },
      {
        path: 'event',
        icon: 'local_activity',
        name: 'user.navbar.my_activities',
        component: resolve =>
          require(['@/pages/users/event.vue'], resolve)
      },
      {
        path: 'announcement',
        icon: 'announcement',
        name: 'cocShow.notice.member_notice',
        component: resolve =>
          require(['@/pages/users/announcement.vue'], resolve)
      },
      {
        path: 'messages',
        icon: 'message',
        name: 'user.navbar.my_message',
        component: resolve =>
          require(['@/pages/users/message.vue'], resolve)
      },
      {
        path: 'payments',
        icon: 'payment',
        name: 'chamber.member.pay',
        component: resolve =>
          require(['@/pages/users/payment.vue'], resolve)
      }
    ]
  },
  {
    path: '/users/:userId',
    component: resolve => require(['@/layouts/customer.vue'], resolve),
    meta: {requiresAuth: true}, // 添加该字段，表示进入这个路由是需要登录的},
    children: [
      {
        path: ':type/:paymentId/detail',
        name: 'chamber.left.orderDetail1',
        meta: {isBack: true},
        component: resolve =>
          require([
            '@/pages/organization/payment/payment-detail.vue'
          ], resolve)
      }
    ]
  }
]

let appRouter = [...plarformRouter, ...backendRouter, ...userRouter]

//实例化vue的时候只挂载backendRouter
export default new Router({
  mode: 'history',
  // mode: 'hash',
  routes: appRouter,
  scrollBehavior(to, form, savedPosition) {
    return {x: 0, y: 0}
  }
})
