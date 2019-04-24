<template>
  <div id="app" v-loading="loading.fullShow" element-loading-text="加载中...">
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState(['loading'])
  }
}
</script>

<style>
</style>
