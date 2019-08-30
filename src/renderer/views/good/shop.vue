<template>
  <div class="good">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="商铺 ID">
      </el-table-column>
      <el-table-column
        prop="shopName"
        label="商铺名称">
      </el-table-column>
      <el-table-column
        prop="address"
        label="商铺地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getShopList } from '@/api/shop'
export default {
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
      getShopList()
        .then(res => {
          const that = this
          res.data.data.forEach((value) => {
            that.tableData.push(value)
          })
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
</style>