<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="用户名" prop="userName">
        <el-input :disabled="true" v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="form.avatar" :src="form.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item> -->
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="生日" prop="birthday">
         <el-date-picker
          v-model="form.birthday"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { userDetail, currentUser } from '@/api/user'
import { mapGetters } from 'vuex'
export default {
  data() {
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else if (!/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(value)) {
        callback(new Error('只允许为数字'))
      } else {
        callback()
      }
    }
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if (!/\d{3}-\d{8}|\d{4}-\{7,8}/.test(value)) {
        callback(new Error('只允许为数字'))
      } else {
        callback()
      }
    }
    return {
      form: {
        userName: '',
        sex: 0,
        nickname: '',
        email: '',
        phone: '',
        birthday: '',
        avatar: ''
      },
      num: 1,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      rules: {
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        nickname: [{ message: '请输入昵称', trigger: 'blur' }],
        email: [{ validator: validateEmail, trigger: 'blur' }],
        phone: [{ validator: validatePhone, trigger: 'blur' }],
        birthday: [{ message: '请输入生日', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      currentUser({ username: this.name })
        .then(res => {
          this.form = {
            userName: res.data.data[0].userName,
            sex: res.data.data[0].sex,
            nickname: res.data.data[0].nickname,
            email: res.data.data[0].email,
            phone: res.data.data[0].phone,
            birthday: res.data.data[0].birthday,
            avatar: res.data.data[0].avatar
          }
        })
    },
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          userDetail(this.form)
            .then(res => {
              this.$message.success('个人信息修改成功')
            })
        }
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/* .avatar-uploader /deep/.el-upload {
  border: 1px dashed #cccccc;
  border-radius: 8px;
} */
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

