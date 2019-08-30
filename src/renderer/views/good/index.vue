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
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="商品价格">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="商品库存">
              <span>{{ props.row.inventory }}</span>
            </el-form-item>
            <el-form-item label="商铺名称">
              <span>{{ props.row.shopName }}</span>
            </el-form-item>
            <el-form-item label="商铺 ID">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="商品 ID"
        prop="id">
      </el-table-column>
      <el-table-column
        label="商品名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="描述"
        prop="desc">
      </el-table-column>
      <el-table-column
        label="商品分类"
        prop="category">
      </el-table-column>
      <el-table-column label="是否上架" prop="shelves">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.shelves"
            active-color="#13ce66"
            @change="isShelves(scope.$index, scope.row)"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  getGoodList,
  deleteGood,
  goodRacking
} from '@/api/good'
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
      getGoodList()
        .then(res => {
          const that = this
          res.data.data.forEach((value) => {
            value.shelves = !!value.shelves
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
    handleDelete(index, row) {
      deleteGood(row.id)
        .then(res => {
          this.tableData.splice(index, 1)
          this.$message.success('商品删除成功')
        })
    },
    isShelves(index, row) {
      const params = {
        id: row.id,
        shelves: row.shelves === true ? 1 : 0
      }
      goodRacking(params)
        .then(res => {
          this.$message.success('是否上架状态修改成功')
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