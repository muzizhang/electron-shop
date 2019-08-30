<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="商品分类" prop="category">
        <el-autocomplete
          class="inline-input"
          v-model="form.category"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          :trigger-on-focus="false"
          @select="handleSelect"
        ></el-autocomplete>
        <!-- <el-select v-model="form.category" placeholder="请选择">
          <el-option label="Zone one" value="shanghai"></el-option>
        </el-select> -->
      </el-form-item>
      <el-form-item label="商品价格(元)" prop="price">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="商品库存" prop="inventory">
        <el-input-number
          v-model="form.inventory"
          @change="handleChange"
          :min="1"
          :max="9999"
          label="描述文字"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="商铺名称" prop="shopName">
        <el-input v-model="form.shopName"></el-input>
      </el-form-item>
      <el-form-item label="商铺地址" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="是否上架" prop="shelves">
        <el-switch v-model="form.shelves"></el-switch>
      </el-form-item>
      <el-form-item label="商品描述" prop="desc">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <!-- <el-form-item label="商品图片">
        <el-upload
          action="#"
          :file-list="picture"
          list-type="picture-card"
          :auto-upload="false"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url" alt=""
              >
              <span class="el-upload-list__item-actions">
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
        </el-upload>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  getCategoryList,
  createGood
} from '@/api/good'
import { createShop } from '@/api/shop'
export default {
  data() {
    return {
      form: {
        name: '',
        category: '',
        price: '',
        inventory: '',
        shopName: '',
        address: '',
        shelves: true,
        desc: ''
      },
      picture: [],
      num: 1,
      // dialogImageUrl: '',
      // dialogVisible: false,
      disabled: false,
      rules: {
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        category: [{ required: true, message: '请选择商品分类', trigger: 'blur' }],
        price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
        shopName: [{ required: true, message: '请输入商铺名称', trigger: 'blur' }],
        address: [{ message: '请输入商铺地址', trigger: 'blur' }],
        desc: [{ message: '请输入描述商品', trigger: 'blur' }]
      },
      restaurants: []
    }
  },
  mounted() {
    this.loadAll()
  },
  methods: {
    loadAll() {
      getCategoryList()
        .then(res => {
          const that = this
          const result = (res.data.success ? (res.data.data) : '')
          result.forEach((value) => {
            if (value !== '') {
              that.restaurants.push(value)
            }
          })
        })
    },
    handleSelect(item) {
      this.form.category = item
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.category.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 上传商品
          console.log('form   onSubmit', this.form)
          const params = {
            name: this.form.name,
            category: this.form.category,
            price: this.form.price,
            inventory: this.form.inventory,
            shopName: this.form.shopName,
            address: this.form.address,
            shelves: this.form.shelves === true ? 1 : 0,
            desc: this.form.desc,
            picture: this.picture
          }
          console.log(params)
          createGood(params)
            .then(res => {
              createShop({ shopName: this.form.shopName, address: this.form.address })
                .then(res => {
                  console.log(res)
                })
              this.$message.success('创建成功！')
              this.$refs['form'].resetFields()
            })
        }
      })
    },
    onCancel() {
      this.$refs['form'].resetFields()
      this.$message({
        message: '重置!',
        type: 'warning'
      })
    },
    handleChange(value) {
      this.form.inventory = value
    },
    handleRemove(file) {
      console.log(file)
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

