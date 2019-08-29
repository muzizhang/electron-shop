import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: ''
    // roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    }
    // SET_ROLES: (state, roles) => {
    //   state.roles = roles
    // }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const pwd = userInfo.password
      return new Promise((resolve, reject) => {
        login(username, pwd)
          .then(response => {
            const data = response.data
            setToken(data.data.token)
            commit('SET_TOKEN', data.data.token)
            commit('SET_NAME', username)
            resolve()
          }).catch(error => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.name).then(response => {
          const data = response.data
          if (data.data.avatar === null) {
            commit('SET_AVATAR', 'https://shopuploadimage.oss-cn-beijing.aliyuncs.com/timg99.jpg?x-oss-process=style/hexo-img&Expires=1567088943&OSSAccessKeyId=TMP.hWtnF56FfxS7GcJ2LMKUesfg1YJJkZyL78VBqr3e29J3QnGU8dPhCfdtRzCoCH1FijnfGdjdwt2qaBWYWMR1SASDiuvctzqhyGTYEs6muUByVkuDfnQxJDYKBYMZqe.tmp&Signature=EZYsccHXA3IBsH6HV2fLtsbPy0A%3D')
          } else {
            commit('SET_AVATAR', data.data.avatar)
          }
          // commit('SET_NAME', data.name)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.name).then(() => {
          commit('SET_TOKEN', '')
          // commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        removeToken()
        commit('SET_TOKEN', '')
        resolve()
      })
    }
  }
}

export default user
