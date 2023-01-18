import {login, logout, getInfo, getUserRoles} from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    hasUserInfo: false,
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  // SET_TOKEN_EXPIRY_TIME: (state, tokenExpiryTime) => {
  //   state.tokenExpiryTime = tokenExpiryTime
  // },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },

}

const actions = {
  // user login
  login({ commit }, payload) {
    const { username, password } = payload.userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password , account: username}).then(response => {
        const { data } = response
        console.log(response)
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        router.push(router.currentRoute.query.to || '/');
        resolve()
      }).catch(error => {
        reject(error)
        payload.notify({
          time: 2500,
          title: 'error',
          text: error.message,
          iconPack: 'feather',
          position: 'top-center',
          icon: 'icon-alert-circle',
          color: 'danger',
        });
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          return reject('认证失败，请重新登录')
        }
        getUserRoles(state.token).then(response => {
         const roles = response.data
          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject('用户角色不得为空')
          }
          commit('SET_ROLES', roles)
        }).catch(error => {
          reject(error)
        })
        resolve(data.userId)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        //resetRouter()
        commit('RESET_STATE')
        location.reload()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
