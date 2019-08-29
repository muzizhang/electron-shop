<template>
  <div class="dashboard-container">
    <img :src="avatar" alt="">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'avatar'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
img {
  width: 200px;
  height: 200px;
  border: 1px solid #cccccc;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 2px 2px 2px #000000;
}
</style>
