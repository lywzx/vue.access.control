<template>
  <a-row :gutter="16">
    <a-col :span="8" class="mb10">
      <a-card title="access-router-link" :bordered="false" >
        <div>
          <access-router-link :to="{name: 'admin_user_create'}">User Create</access-router-link>
        </div>
        <div>
          <access-router-link :to="{name: 'admin_user_list'}">User List</access-router-link>
        </div>
        <div>
          <access-router-link :to="{name: 'admin_role_list'}">Role List</access-router-link>
        </div>
        <div>
          <access-router-link :to="{name: 'school_teacher_manage'}">Teacher Manage</access-router-link>
        </div>
        <div>
          <access-router-link :to="{name: 'school_student_manage'}">Student Manage</access-router-link>
        </div>
        <div>
          <access-router-link :to="{name: 'school_class_manage'}">Class Manage</access-router-link>
        </div>
      </a-card>
    </a-col>
    <a-col :span="8" class="mb10">
      <a-card title="v-access-show with router-link" :bordered=false :key="$access.key">
        <div>
          <router-link :to="{name: 'admin_user_create'}" v-access-show>User Create</router-link>
        </div>
        <div>
          <router-link :to="{name: 'admin_user_list'}" v-access-show>User List</router-link>
        </div>
        <div>
          <router-link :to="{name: 'admin_role_list'}" v-access-show>Role List</router-link>
        </div>
        <div>
          <router-link :to="{name: 'school_teacher_manage'}" v-access-show>Teacher Manage</router-link>
        </div>
        <div>
          <router-link :to="{name: 'school_student_manage'}" v-access-show>Student Manage</router-link>
        </div>
        <div>
          <router-link :to="{name: 'school_class_manage'}" v-access-show>Class Manage</router-link>
        </div>
      </a-card>
    </a-col>
    <a-col :span="8" class="mb10">
      <a-card title="v-access-show:role" :bordered=false :key="$access.key" class="child-mt10">
        <a-button class="mb10" v-access-show:role="'administrator'" >Administrator</a-button>
        <a-button class="mb10" v-access-show:role="'common_administrator'" >common_administrator</a-button>
        <a-button class="mb10" v-access-show:role="'common_audit'" >common_audit</a-button>
        <a-button class="mb10" v-access-show:role="'school_administrator'" >school_administrator</a-button>
        <a-button class="mb10" v-access-show:role="'school_teacher'" >school_teacher</a-button>
        <a-button class="mb10" v-access-show:role="'school_student'">school_student</a-button>
        <a-button class="mb10" v-access-show:role="'administrator|common_administrator'">administrator Or CommonAdministrator</a-button>
        <a-button class="mb10" v-access-show:role="'school_administrator|school_teacher,true'" >school_administrator And school_teacher</a-button>
      </a-card>
    </a-col>
    <a-col :span="8" class="mb10">
      <a-card title="v-access-show:can" :bordered=false :key="$access.key" class="child-mt10">
        <a-button class="mb10" v-access-show:can="'administrator.edit_user'" >Administrator.edit_user</a-button>
        <a-button class="mb10" v-access-show:can="'common_administrator.edit_post'">CommonAdministrator.edit_post</a-button>
        <a-button class="mb10" v-access-show:can="'*.*_post'">*.*_post</a-button>
        <a-button class="mb10" v-access-show:can="'update_class'">update_class</a-button>
        <a-button class="mb10" v-access-show:can="'create_class'">create_class</a-button>
        <a-button class="mb10" v-access-show:can="'school_student.join_class'">SchoolStudent.join_class</a-button>
        <a-button class="mb10" v-access-show:can="'join_class'">join_class</a-button>
      </a-card>
    </a-col>
    <a-col :span="8" class="mb10">
      <a-card title="v-show with $access" :bordered=false class="child-mt10">
        <a-button class="mb10" v-show="$access.can('administrator.edit_user')" >Administrator.edit_user</a-button>
        <a-button class="mb10" v-show="$access.can('common_administrator.edit_post')">CommonAdministrator.edit_post</a-button>
        <a-button class="mb10" v-show="$access.can('*.*_post')">*.*_post</a-button>
        <a-button class="mb10" v-show="$access.can('update_class')">update_class</a-button>
        <a-button class="mb10" v-show="$access.can('create_class')">create_class</a-button>
        <a-button class="mb10" v-show="$access.can('school_student.join_class')">SchoolStudent.join_class</a-button>
        <a-button class="mb10" v-show="$access.can('join_class')">join_class</a-button>
      </a-card>
    </a-col>
    <a-col :span="8" class="mb10">
      <a-card title="v-access-show:login">
        <a-button class="mb10" v-access-show:login >Displays when the login status is unknown or login</a-button>
        <a-button class="mb10" v-access-show:login="true" >Displays when the login status is login</a-button>
      </a-card>
    </a-col>
    <a-col :span="8" class="mb10">
      <a-card title="v-access-show:login">
        <a-button class="mb10" v-show="$access.isLogin() === undefined || $access.isLogin() " >Displays when the login status is unknown or login</a-button>
        <a-button class="mb10" v-show="$access.isLogin()" >Displays when the login status is login</a-button>
      </a-card>
    </a-col>
  </a-row>
</template>
<script type="text/ecmascript-6">
  import {
    Card as ACard,
    Row as ARow,
    Col as ACol,
    Button as AButton
  } from 'ant-design-vue';

  export default {
    components: {
      AButton,
      ARow,
      ACol,
      ACard
    }
  }
</script>
