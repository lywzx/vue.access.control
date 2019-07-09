<template>
  <section>
    <cm-header></cm-header>
    <router-view></router-view>
  </section>
</template>
<script>
  import CmHeader from './views/Header/Index';

  export default {
    components: {
      CmHeader
    }
  }
</script>
<style lang="less">
  // flex相关
  .flex-auto {
    display: flex;

    > *:not(.flex-fixed) {
      flex: 1;
    }
  }
</style>
