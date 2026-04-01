<!--
  FileDesc  :  
  Author    :  gaoshuai
  Date      :  2026/03/31 22:04:47
  Version   :  
-->

<template>
  <div class="home">
    <div class="tiitle">这是home页面</div>
    <div class="btn" @click="showOther = true">点击加载Other组件</div>
    <Other v-if="showOther" />
  </div>
</template>

<script lang="tsx" setup>
import { ref, defineAsyncComponent } from 'vue'
const showOther = ref(false)
const Other = defineAsyncComponent(() => import('./other.vue'))
</script>

<style lang="less">
.home {
  height: 2000px;
  background-color: red;
}

.tiitle {
  font-size: 30px;
  height: 1500px;
}
</style>
