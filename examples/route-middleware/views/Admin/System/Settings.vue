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
            label: 'view all, disabled not permission menu',
            value: 2,
          }
        ];
      },
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
