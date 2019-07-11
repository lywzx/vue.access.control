<template>
  <section>
    <router-view></router-view>
  </section>
</template>
<script>
  export default {
    components: {
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
  .mt10 {
    margin-top: 10px;
  }
  .mb10 {
    margin-bottom: 10px;
  }
</style>
