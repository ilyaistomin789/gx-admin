import { Color } from '@core';
import { Edit, useForm } from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import { ColorPicker, Form, Input } from 'antd';

type EditColorForm = Pick<Color, 'value' | 'name'>;

export const ColorEdit = () => {
  const { formProps, saveButtonProps, formLoading, form } = useForm<
    Color,
    HttpError,
    EditColorForm
  >({});

  const handleFinish = (values: EditColorForm) => {
    const value = form.getFieldValue('value');
    const modifiedValues: EditColorForm = {
      name: values.name,
      value,
    };

    formProps.onFinish?.(modifiedValues);
  };

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
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
    </Edit>
  );
};
