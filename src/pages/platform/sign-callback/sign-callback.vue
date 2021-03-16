<template>
  <div class="text-xs-center">
    <v-parallax src="./../../../../static/img/sign.jpg"></v-parallax>
    <p class="my-5 display-1">歡迎使用您使用Connected.請您選擇用戶的角色</p>
    <v-btn @click="login('/implicit/callback')">{{$t('navbar.user_center')}}</v-btn>
    <v-btn color="#2c7a90" class="white--text" @click="login('/enterprise/callback')">{{$t('global.settled_coc')}}</v-btn>
  </div>
</template>
<script>
export default {
    methods: {
        login(callback) {
            this.$auth.loginRedirect(callback)
        }
    }
}
</script>
