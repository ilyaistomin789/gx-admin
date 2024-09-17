import { UploadOutlined } from '@ant-design/icons';
import { Edit, useForm, useSelect } from '@refinedev/antd';
import { Button, Form, Input, Select, Switch, Upload } from 'antd';
import { MEDIA_SERVICE_URL } from '../../../app/config';
import { GetManyRequestType, ProductCategory } from '../../../core';

export const ProductEdit = () => {
  const { formProps, saveButtonProps, formLoading } = useForm({});
  const { selectProps: productCategorySelectProps } =
    useSelect<ProductCategory>({
      resource: 'product-categories',
      optionLabel: 'name',
      meta: {
        requestType: GetManyRequestType.GetAll,
      },
    });

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form {...formProps} layout="vertical">
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
          label={'Product Category'}
          name={'productCategoryId'}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...productCategorySelectProps} showSearch={false} />
        </Form.Item>
        <Form.Item
          label={'Description'}
          name={['description']}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label={'Care Instructions'}
          name={['careInstructions']}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label={'About'}
          name={['about']}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="upload" label="Upload">
          <Upload name="logo" action={`${MEDIA_SERVICE_URL}/images/upload`}>
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="status" label="Status" initialValue={true}>
          <Switch />
        </Form.Item>
      </Form>
    </Edit>
  );
};
