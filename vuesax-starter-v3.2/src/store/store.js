

import Vue from 'vue'
import Vuex from 'vuex'

import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"
import moduleUser from "@/store/modules/user";
Vue.use(Vuex)


export default new Vuex.Store({
    getters,
    mutations,
    state,
    actions,
    modules: {
      user: moduleUser
    },
    strict: process.env.NODE_ENV !== 'production'
})
