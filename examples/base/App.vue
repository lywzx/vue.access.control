<template>
  <section>
    <role-list class="mt20"></role-list>
    <action-list></action-list>
  </section>
</template>

<script>
import RoleList from './components/RoleList.vue';
import ActionList from './components/ActionList.vue';

export default {
  components: {
    RoleList,
    ActionList
  },
  data () {
    return {

    }
  }
}
</script>
<style lang="less">
  .mt20 {
    margin-top: 20px;
  }
</style>
