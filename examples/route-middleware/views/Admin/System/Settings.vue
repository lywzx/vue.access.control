<template>
  <a-card title="System Config">
    <a-form
      :form="form"
      @submit="handleSubmit"
      autocomplete="off"
    >
      <a-form-item
        label="Slide Menu Mode"
        v-bind="formItemLayout"
      >
        <a-radio-group v-decorator="['slideView', {rules:  [{ required: true, message: 'Please select!' }], initialValue: formDefaultValue['slideView']}]" :options="slideOptions"></a-radio-group>
      </a-form-item>
      <a-form-item
        label="Login Check With Tip"
        v-bind="formItemLayout"
      >
        <a-radio-group v-decorator="['loginCheck', {rules:  [{ required: true, message: 'Please select!' }], initialValue: formDefaultValue['loginCheck']}]" :options="loginCheckOptions"></a-radio-group>
      </a-form-item>
      <a-form-item
        label="Set User Roles"
        v-bind="formItemLayout"
      >
        <a-checkbox-group v-decorator="['selectedRoles', {rules:  [{ required: true, message: 'Please select!' }], initialValue: formDefaultValue['selectedRoles']}]" :options="roleOptions"></a-checkbox-group>
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout">
        <a-button
          type="primary"
          html-type="submit"
        >
          Save
        </a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
  import {
    Card as ACard,
    Form as AForm,
    Row as ARow,
    Col as ACol,
    Checkbox as ACheckbox,
    Button as AButton,
    Input as AInput,
    AutoComplete as AAutoComplete,
    Select as ASelect,
    Tooltip as ATooltip,
    Icon as AIcon,
    Radio as ARadio,
  } from 'ant-design-vue';
  import {
    Settings
  } from '../../../service/Settings';
  const acl = require('../../../data/acl.json');

  const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
      children: [{
        value: 'xihu',
        label: 'West Lake',
      }],
    }],
  }, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
      value: 'nanjing',
      label: 'Nanjing',
      children: [{
        value: 'zhonghuamen',
        label: 'Zhong Hua Men',
      }],
    }],
  }];

  export default {
    components: {
      ACard,
      AForm,
      AFormItem: AForm.Item,
      ARow,
      ACol,
      ACheckbox,
      ACheckboxGroup: ACheckbox.Group,
      AButton,
      AInput,
      AAutoComplete,
      ASelect,
      ATooltip,
      ASelectOption: ASelect.Option,
      AIcon,
      ARadioGroup: ARadio.Group,
    },
    data () {
      return {
        formDefaultValue: Settings.getSettings(),
        confirmDirty: false,
        residences,
        autoCompleteResult: [],
        formItemLayout: {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
          },
        },
        tailFormItemLayout: {
          wrapperCol: {
            xs: {
              span: 24,
              offset: 0,
            },
            sm: {
              span: 16,
              offset: 8,
            },
          },
        },
      };
    },
    computed: {
      slideOptions() {
        return [
          {
            label: 'view on has permission',
            value: 1,
          },
          {
            label: 'view all',
            value: 2,
          }
        ];
      },
      loginCheckOptions() {
        return [
          {
            label: 'not login without tip',
            value: 1,
          },
          {
            label: 'not login with  tip',
            value: 2,
          }
        ]
      },
      roleOptions() {
        return acl.map((it) => ({
          label: it.text,
          value: it.role
        }));
      }
    },
    beforeCreate () {
      this.form = this.$form.createForm(this);
    },
    methods: {
      handleSubmit  (e) {
        e.preventDefault();
        this.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            Settings.setSetting(values);
            this.$access.$emit('update:system:config', values);
            console.log('Received values of form: ', values);
          }
        });
      }
    },
  };
</script>
