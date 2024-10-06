import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Edit, useForm, useSelect } from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import { Button, Form, Input, Select, Space, Switch, UploadFile } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import { useEffect, useState } from 'react';
import {
  GetManyRequestType,
  Image,
  ImageUpload,
  Nullable,
  Product,
  ProductCategory,
  ProductCharacteristic,
} from '../../../core';
import { EditProductBody, ProductBff } from '../../../data';

type EditProductForm = Omit<Product, 'createdAt' | 'updatedAt' | 'id'> & {
  characteristics?: ProductCharacteristic[];
};

export const ProductEdit = () => {
  const { formProps, saveButtonProps, formLoading, form, query } = useForm<
    ProductBff,
    HttpError,
    EditProductForm
  >({});
  const { selectProps: productCategorySelectProps } =
    useSelect<ProductCategory>({
      resource: 'product-categories',
      optionLabel: 'name',
      meta: {
        requestType: GetManyRequestType.GetAll,
      },
    });

  const [fileList, setFileList] = useState<UploadFile<Image>[]>([]);

  const imageId = Form.useWatch('imageId', { form, preserve: true });

  const handleChange = (
    info: Nullable<UploadChangeParam<UploadFile<Image>>>,
  ) => {
    switch (info?.file?.status) {
      case 'done':
        form.setFieldValue('imageId', info?.file?.response?.id || '');
        break;
      case 'removed':
        form.setFieldValue('imageId', '');
        break;
      default:
        break;
    }
  };

  const handleFinish = (values: EditProductForm) => {
    const body: EditProductBody = {
      ...values,
      imageId: imageId || null,
      careInstructions: values?.careInstructions
        ? values.careInstructions
        : null,
      about: values?.about ? values.about : null,
      description: values?.description ? values.description : null,
      characteristics: values.characteristics?.map((c) => ({
        title: c.title,
        value: c.value,
      })),
    };

    formProps.onFinish?.(body as any);
  };

  useEffect(() => {
    if (query?.status === 'success' && !imageId) {
      form.setFieldsValue({
        imageId: query?.data?.data?.id || '',
        productCategoryId: query.data.data.category.id,
      });

      if (query?.data?.data?.image) {
        setFileList([
          {
            uid: query?.data?.data?.image?.id,
            name: `${query?.data?.data?.image?.publicId}${query?.data?.data?.image?.extension}`,
            status: 'done',
            url: query?.data?.data?.image?.url,
          },
        ]);
      }
    }
  }, [query, form]);

  useEffect(() => {
    if (!imageId) setFileList([]);
  }, [imageId]);

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
        <Form.Item label="Upload" required>
          <ImageUpload
            name="imageId"
            onChange={handleChange}
            fileList={fileList}
            onSuccessUpload={(data: Nullable<Image>) =>
              form.setFieldValue('imageId', data?.id)
            }
            listType="picture"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </ImageUpload>
        </Form.Item>
        <Form.List
          name="characteristics"
          rules={[
            {
              validator: async (_, characteristics) => {
                if (!characteristics || characteristics.length < 1) {
                  return Promise.reject(
                    new Error('At least no characteristic'),
                  );
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: 'flex', marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, 'title']}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[{ required: true, message: 'Missing title' }]}
                  >
                    <Input placeholder="Title" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'value']}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[{ required: true, message: 'Missing value' }]}
                  >
                    <Input placeholder="Value" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add characteristic
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item name="status" label="Status">
          <Switch />
        </Form.Item>
      </Form>
    </Edit>
  );
};
