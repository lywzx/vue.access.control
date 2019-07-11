<template>
  <a-row :gutter="16">
    <a-col :span="12" class="mb10">
      <a-card title="Disabled Button" :bordered="false" >
        <div class="mb10">
          <a-button type="primary" :disabled="!$access.hasRole('administrator')">
            hasRole('administrator')
          </a-button>
        </div>
        <div class="mb10">
          <a-button type="primary" :disabled="!$access.hasRole('school_teacher')">
            hasRole('SchoolTeacher')
          </a-button>
        </div>
        <div class="mb10">
          <a-button type="primary" :disabled="!$access.can('edit_post')">
            can('edit_post')
          </a-button>
        </div>
      </a-card>
    </a-col>
    <a-col :span="12" class="mb10">
      <a-card title="Click With Dialog" :bordered="false" >
        <a @click="editPost({
          id: 1,
          user_id: 1
        })">Edit Post(use canAndOwns method)</a> <br/>
        <a @click="editPost({
          id: 1,
          user_id: 2
        })">Edit Post(use canAndOwns method)</a>
      </a-card>
    </a-col>
  </a-row>
</template>
<script type="text/ecmascript-6">
  import {
    Card as ACard,
    Button as AButton,
    Row as ARow,
    Col as ACol,
    Modal
  } from 'ant-design-vue';
  export default {
    components: {
      ACard,
      AButton,
      ARow,
      ACol
    },
    methods: {
      editPost(post) {
        if (!this.$access.canAndOwns(['edit_post'], post)) {
          Modal.error({
            title: 'Tip',
            content: 'The use has no edit_post permission or use not owns post',
            okText: 'Ok',
            cancelText: 'Cancel',
            onOk() {

            },
            onCancel() {

            },
          });
        } else {
          Modal.success({
            title: 'Tip',
            content: 'check permission ok',
          });
        }
      }
    }
  }
</script>
<style type="text/css">
</style>
