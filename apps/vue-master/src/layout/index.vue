<template>
  <div>
    这是框架
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>

</template>

<style lang="less" scoped></style>
