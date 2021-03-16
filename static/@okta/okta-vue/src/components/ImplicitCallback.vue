<template>
  <div class="text-xs-center my-5">
    <v-progress-circular indeterminate color="#2c7a90"></v-progress-circular>
  </div>
</template>

<script>

export default {
    name: 'ImplicitCallback',
    data() {
        return {
            user: null,
            enterprises: null,
            userProfiles: null
        }
    },
    async beforeMount() {
        const result = await this.$auth.handleAuthentication()
        if (await this.$auth.isAuthenticated()) {
            await this.$http
                //.get('https://account.connected.hk/auth/user/me')
                .get('https://id.yoov.com/oauth/me')
                .then(res => {
                    this.user = res.data;
                    sessionStorage.setItem('userId',this.user.id)
                })
            await this.$http
                .get(`public/user/${this.user.id}/enterprises`, {
                    params: { 'user.id': this.user.id }
                })
                .then(res => {
                    this.enterprises = res.data.content
                })
            await this.$http
                .get(`public/user/${this.user.id}/profiles`, {
                    params: { 'user.id': this.user.id }
                })
                .then(res => {
                    this.userProfiles = res.data.content
                })
            //判斷是否賬號是商會還是用角色如果賬號沒有user信息有enterprise信息
            if (this.enterprises.length > 0 && this.userProfiles.length === 0) {
                //商會賬戶
                sessionStorage.setItem('role', 'enterprise')
                await this.readOrganization()
            } else if (
                this.enterprises.length === 0 &&
                this.userProfiles.length > 0
            ) {
                //普通用戶
                sessionStorage.setItem('role', 'user')
                this.$router.go(-2)
            } else if (
                this.enterprises.length === 0 &&
                this.userProfiles.length === 0
            ) {
                //沒有任何角色通過回調進行判斷設定商會
                if (this.$auth.getFromUri() !== '/implicit/callback') {
                    //商會賬戶
                    // if (this.enterprises.length > 0) {
                        sessionStorage.setItem('role', 'enterprise')
                        await this.readOrganization()
                    // } else {
                    //     this.$router.push({
                    //         path: `/organizations/${this.user.id}/settled`
                    //     })
                    // }
                } else {
                    //普通用戶
                    sessionStorage.setItem('role', 'user')
                    if (this.userProfiles.length === 0) {
                        this.$router.push({
                            path: `/users/${this.user.id}/info`
                        })
                    }
                }
            }
        }

        // this.$router.replace({
        //   path: this.$auth.getFromUri()
        // })
    },
    methods: {
        readOrganization() {
            this.$http.get(`public/organizations/user`).then(res => {
                if (res.data.content.length > 0) {
                    if (
                        res.data.content.length === 1 &&
                        res.data.content[0].isApproved
                    ) {
                        this.$router.push({
                            path: `/organization/${
                                res.data.content[0].id
                            }/dashboard`
                        })
                    } else if (res.data.content.length >= 1) {
                        this.$router.push({
                            path: `/organizations/select`
                        })
                    }
                } else {
                    this.$router.push({ path: `/organizations/create` })
                }
            })
        }
    },
    render() {}
}
</script>
