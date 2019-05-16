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
<style>

</style>
