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
      <el-form-item label="商品价格" prop="price">
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
      <el-form-item label="商品图片">
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false">
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
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        category: '',
        price: '',
        inventory: 1,
        shopName: '',
        address: '',
        shelves: '',
        desc: ''
      },
      num: 1,
      // dialogImageUrl: '',
      // dialogVisible: false,
      disabled: false,
      rules: {
        name: { required: true, message: '请输入商品名称', trigger: 'blur' },
        category: { required: true, message: '请选择商品分类', trigger: 'blur' },
        price: { required: true, message: '请输入商品价格', trigger: 'blur' },
        shopName: { required: true, message: '请输入商铺名称', trigger: 'blur' },
        address: { message: '请输入商铺地址', trigger: 'blur' },
        desc: { message: '请输入描述商品', trigger: 'blur' }
      }
    }
  },
  mounted() {
    this.restaurants = this.loadAll()
  },
  methods: {
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 上传商品
        }
      })
    },
    onCancel() {
      this.$refs['form'].resetFields()
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    handleChange(value) {
      this.form.inventory = value
    },
    handleRemove(file) {
      console.log(file)
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    handleSelect(item) {
      console.log(item)
    },
    loadAll() {
      return [
        // { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
        // { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
        // { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
        // { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
        // { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
        // { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
        // { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
        // { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
        // { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
        // { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
        // { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
        // { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
        // { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
        // { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
        // { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
        // { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" }
      ]
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

