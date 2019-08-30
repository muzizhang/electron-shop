<template>
  <div class="login-container">

    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      status-icon
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container" style="position: relative">
        <h3 class="title">修改密码</h3>
        <router-link to="/" style="position: absolute;right: 0;color: #ff7b7b;">
          返回主页 >
        </router-link>
      </div>

      <!-- <el-form-item prop="oldPassword">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          v-model="loginForm.oldPassword"
          type="password"
          placeholder="旧密码"
          name="oldPassword"
          @blur="blurOldPwd"
        />
      </el-form-item> -->
      <el-form-item prop="newPassword">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          v-model="loginForm.newPassword"
          type="password"
          placeholder="新密码"
          name="newPassword"
          @blur="blurPassword"
        />
      </el-form-item>

      <el-form-item prop="repassword">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          v-model="loginForm.repassword"
          type="password"
          placeholder="确认密码"
          name="repassword"
          @keyup.enter.native="editPwd('loginForm')"
        />
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom: 30px;"
        @click.native.prevent="editPwd('loginForm')"
      >
        修改密码
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { getSHA1 } from '@/utils/cryptoJs'
import { mapGetters } from 'vuex'
import { editPassword } from '@/api/user'

export default {
  name: 'LoginClient',
  data() {
    // const validateOldPwd = (rule, value, callback) => {
    //   if (!value) {
    //     callback(new Error('密码不能为空'))
    //   }
    //   if (value && value.length < 6) {
    //     callback(new Error('密码不能少于6位'))
    //   } else if (this.loginForm.newPassword && this.loginForm.newPassword === value) {
    //     callback(new Error('新旧密码不能一致'))
    //   } else {
    //     callback()
    //   }
    // }
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('密码不能为空'))
      }
      if (value && value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else if (this.loginForm.repassword) {
        callback(this.$refs.loginForm.validateField('repassword'))
      } else {
        callback()
      }
    }
    const repassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('确认密码不能为空'))
      }
      if (this.loginForm.newPassword && value !== this.loginForm.newPassword) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        // oldPassword: '',
        newPassword: '',
        repassword: ''
      },
      loginRules: {
        // oldPassword: [{ required: true, trigger: 'blur', validator: validateOldPwd }],
        newPassword: [{ required: true, trigger: 'blur', validator: validatePassword }],
        repassword: [{ required: true, trigger: 'blur', validator: repassword }]
      },
      loading: false,
      showDialog: false,
      redirect: undefined
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    editPwd(loginForm) {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          const newPwd = getSHA1(this.loginForm.newPassword)
          // const oldPwd = getSHA1(this.loginForm.oldPassword)
          const params = {
            pwd: newPwd,
            username: this.name
          }
          editPassword(params)
            .then(res => {
              if (res.data.success) {
                this.$message.success('修改密码成功')
                this.$store.dispatch('LogOut').then(() => {
                  this.$router.push('/login')
                })
              }
            })
        } else {
          return false
        }
      })
    },
    blurOldPwd() {
      if (this.loginForm.newPassword) {
        this.$refs.loginForm.validateField('newPassword')
      }
    },
    blurPassword() {
      if (this.loginForm.oldPassword) {
        this.$refs.loginForm.validateField('oldPassword')
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
/** 修改背景图片 */
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#eee;
  $cursor: #fff;

  // @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  //   .login-container .el-input input{
  //     color: $cursor;
  //     &::first-line {
  //       color: $light_gray;
  //     }
  //   }
  // }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        height: 47px;
        caret-color: $cursor;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px #e5e5e5 inset !important;
          -webkit-text-fill-color: #333333 !important;
        }
        &::-webkit-input-placeholder {
          color: #aaaaaa;
        }
        &::-moz-input-placeholder {
          color: #aaaaaa;
        }
        &::-ms-input-placeholder {
          color: #aaaaaa;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      // color: #454545;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    background: #ffffff;
    border-radius: 8px;
    padding: 35px 35px 15px 35px;
    margin: 130px auto;
    .clientRegister {
      margin-top: 10px;
      float: right;
      color: #9b9ea0;
      font-size: 14px;
      margin-bottom: 30px;
      display: inline-block;
    }
  }
  // .tips {
  //   font-size: 14px;
  //   color: #fff;
  //   margin-bottom: 10px;
  //   span {
  //     &:first-of-type {
  //       margin-right: 16px;
  //     }
  //   }
  // }
  .svg-container {
    padding: 6px 5px 6px 15px;
    // color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    display: flex;
    align-items: flex-end;
    // align-content: center;
    justify-content: center;
    position: relative;
    margin: 20px auto 70px auto;
    .title {
      font-size: 26px;
      // color: $light_gray;
      text-align: center;
      font-weight: bold;
      margin: 0;
    }
    .system-type {
      margin-left: 20px;
      color: #333333;
      font-size: 14px;
      &:hover {
        color: #169bd5;
      }
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    // color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>
