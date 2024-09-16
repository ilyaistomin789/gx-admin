import { UploadOutlined } from '@ant-design/icons';
import { Create, useForm, useSelect } from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import { Button, Form, Input, Select, Switch, Upload } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload';
import { MEDIA_SERVICE_URL } from '../../../app/config';
import {
  GetManyRequestType,
  Image,
  Product,
  ProductCategory,
} from '../../../core';
import { CreateProductBody } from '../../../data';

type CreateProductForm = Omit<
  Product,
  'createdAt' | 'updatedAt' | 'id' | 'imageId'
> & { upload: UploadChangeParam<UploadFile<Image>> };

export const ProductCreate = () => {
  const { formProps, saveButtonProps } = useForm<
    Product,
    HttpError,
    CreateProductForm
  >({});

  const { selectProps: productCategorySelectProps } =
    useSelect<ProductCategory>({
      resource: 'product-categories',
      optionLabel: 'name',
      meta: {
        requestType: GetManyRequestType.GetAll,
      },
    });

  const handleFinish = (values: CreateProductForm) => {
    const { upload, ...fields } = values;
    const imageId = upload.fileList[0].response!.id!;

    const body: CreateProductBody = {
      ...fields,
      imageId,
    };

    formProps.onFinish?.(body as any);
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
    </Create>
  );
};
