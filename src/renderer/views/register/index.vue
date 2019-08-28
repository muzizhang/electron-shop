<template>
  <div class="login-container">
    <el-form
      class="login-form"
      autoComplete="on"
      :model="registerForm"
      :rules="loginRules"
      ref="registerForm"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">注册</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          name="username"
          type="text"
          v-model="registerForm.username"
          autoComplete="on"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input
          name="password"
          type="password"
          v-model="registerForm.password"
          autoComplete="on"
          placeholder="请输入密码"
        />
      </el-form-item>
      <el-form-item prop="rePassword">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input
          name="rePassword"
          type="password"
          @keyup.enter.native="handleRegister"
          v-model="registerForm.rePassword"
          autoComplete="on"
          placeholder="请再次输入密码"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          style="width:100%;"
          :loading="loading"
          @click.native.prevent="handleRegister"
        >
          注册
        </el-button>
      </el-form-item>
      <div class="tips">
        <span style="margin-right:20px;" @click="tologin">去登录</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getSHA1 } from '@/utils/cryptoJs'
import { register } from '@/api/login'

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('用户名不能为空'))
      } else if (value.length < 2 || value.length > 12) {
        callback(new Error('用户名长度为2-12'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('密码不能为空'))
      }
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else if (this.registerForm.repassword) {
        callback(this.$refs.registerForm.validateField('repassword'))
      } else {
        callback()
      }
    }
    const repassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('确认密码不能为空'))
      }
      if (value !== this.registerForm.password) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: 'huahua',
        password: '123456',
        rePassword: '123456'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        rePassword: [{ required: true, trigger: 'blur', validator: repassword }]
      },
      loading: false
    }
  },
  methods: {
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true
          const arithmeticValue = getSHA1(this.registerForm.password)
          const params = {
            userName: this.registerForm.username,
            password: arithmeticValue
          }
          register(params)
            .then(res => {
              console.log(res)
              this.loading = false
              this.$router.push({ path: '/login' })
            })
            .catch((error) => {
              console.log('error========', error)
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    tologin() {
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#283443;
$light_gray:#eee;
$cursor: #ffffff;

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
    margin: 180px auto;
  }
  .tips {
    font-size: 14px;
    color: $bg;
    margin-bottom: 10px;
    float: right;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
      cursor: pointer;
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    // color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    position: relative;
    margin: 20px auto 70px auto;
    .title {
      font-size: 26px;
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
  // .title {
  //   font-size: 26px;
  //   font-weight: 400;
  //   color: $light_gray;
  //   margin: 0px auto 40px auto;
  //   text-align: center;
  //   font-weight: bold;
  // }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    // color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
