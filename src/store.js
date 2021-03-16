import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex)
const module = {
    state: {
        loading: false, // 是否加载中
        imagesToUpload: [], // data2blob 图片数组
        filesToUpload: [], // data2blob 图片数组
        userId: null, // data2blob 图片数组
        iscustomerLogin: false, // 用户是否登录
        isOrganizationLogin: false, // 旅行社是否登录
        company: null,
        searchUrl: '',
        snackbarSetting: {
            color: null,
            text: null,
            snackbar: false
        }

    },

    mutations: {
      setCompanyData(state,data){
        state.company = data
      },
      setSearchUrl(state,data){
        state.searchUrl = data
      },
        loadingStateChange(state, boolean) {
            state.loading = boolean
        },
        snackbarStateChange(state, obj) {
            state.snackbarSetting = obj
        },
        setUserId(state, id) {
            state.userId = id
        },
        setFilesToUpload(state, obj) {
            state.filesToUpload.push(obj)
        },
      setSpliceFilesToUpload(state, i) {
            state.filesToUpload = state.filesToUpload.splice(0, i)
        },
        setImagesToUpload(state, obj) {
            state.imagesToUpload.push(obj)
        },
        setSpliceToUpload(state, i) {
            state.imagesToUpload = state.imagesToUpload.splice(0, i)
        },
        clearImagesToUpload(state) {
            state.imagesToUpload = []
        },
        clearFilesToUpload(state) {
            state.filesToUpload = []
        },
        iscustomerLoginChange(state, boolean) {
            state.iscustomerLogin = boolean
        },
        isOrganizationLoginChange(state, boolean) {
            state.isOrganizationLogin = boolean
        }
    }
}

const store = new Vuex.Store(module)
export default store
