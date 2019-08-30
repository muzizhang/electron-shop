<template>
  <div class="good">
     <el-table
        :data="tableData"
        style="width: 100%"
      >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form
            label-position="left"
            inline
            class="demo-table-expand"
          >
            <el-form-item label="用户名称">
              <span>{{ props.row.userName }}</span>
            </el-form-item>
            <el-form-item label="昵称">
              <span>{{ props.row.nickname }}</span>
            </el-form-item>
            <el-form-item label="邮箱">
              <span>{{ props.row.email }}</span>
            </el-form-item>
            <el-form-item label="手机号">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{ props.row.sex }}</span>
            </el-form-item>
            <el-form-item label="生日">
              <span>{{ props.row.birth }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="用户 ID"
        prop="id">
      </el-table-column>
      <el-table-column
        label="用户名称"
        prop="userName">
      </el-table-column>
      <el-table-column
        label="昵称"
        prop="nickname">
      </el-table-column>
      <el-table-column
        label="手机号"
        prop="phone">
      </el-table-column>
      <el-table-column label="是否禁用" prop="status">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            @change="isShelves(scope.$index, scope.row)"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  getUserList,
  userDisable
} from '@/api/user'
export default {
  name: 'GoodIndex',
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      getUserList()
        .then(res => {
          const that = this
          res.data.data.forEach((value) => {
            value.status = !!value.status
            that.tableData.push(value)
          })
        })
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    isShelves(index, row) {
      const params = {
        userName: row.userName,
        status: row.status === false ? 0 : 1
      }
      userDisable(params)
        .then(res => {
          this.$message.success('是否禁用状态修改成功')
        })
    }
  }
}
</script>

<style scoped>
.good{
  padding: 20px;
  width: 97%;
  margin: 20px auto;
  height: 720px;
  max-height: 720px;
  box-shadow: #f0f9eb;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>