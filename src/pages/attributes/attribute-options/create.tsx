import { AttributeOption, AttributeType, GetManyRequestType } from '@core';
import { Create, useForm, useSelect } from '@refinedev/antd';
import { Form, Input, Select } from 'antd';

export const AttributeOptionCreate = () => {
  const { formProps, saveButtonProps } = useForm<AttributeOption>({});

  const { selectProps: attributeTypeSelectProps } = useSelect<AttributeType>({
    resource: 'attribute-types',
    optionLabel: 'name',
    meta: {
      requestType: GetManyRequestType.GetAll,
    },
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={'Name'}
          name={['optionName']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={'Slug'}
          name={['slug']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={'Attribute Type'}
          name={'attributeTypeId'}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...attributeTypeSelectProps} showSearch={false} />
        </Form.Item>
      </Form>
    </Create>
  );
};
