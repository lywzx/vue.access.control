<template>
  <a-card :title="$route.meta.title" :bordered="false" >
    <p>This is a template page</p>
  </a-card>
</template>
<script type="text/ecmascript-6">
  import {
    Card as ACard
  } from 'ant-design-vue';
  export default {
    components: {
      ACard
    }
  }
</script>
<style lang="less"></style>
