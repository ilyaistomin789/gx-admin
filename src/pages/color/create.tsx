import { Color } from '@core';
import { Create, useForm } from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import { ColorPicker, Form, Input } from 'antd';

type CreateColorForm = Pick<Color, 'value' | 'name'>;

export const ColorCreate = () => {
  const { formProps, saveButtonProps, form } = useForm<
    Color,
    HttpError,
    CreateColorForm
  >({});

  const handleFinish = (values: CreateColorForm) => {
    const value = form.getFieldValue('value');
    const modifiedValues: CreateColorForm = {
      name: values.name,
      value,
    };

    formProps.onFinish?.(modifiedValues);
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label={'Name'}
          name={['name']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={'Value'}
          name={['value']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <ColorPicker
            showText={(color) => (
              <span>Color ({color.toHexString().toUpperCase()})</span>
            )}
            onChange={(s) => form.setFieldValue('value', s.toHexString())}
          />
        </Form.Item>
      </Form>
    </Create>
  );
};
