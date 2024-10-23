import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
  GetManyRequestType,
  Image,
  ImageUpload,
  Product,
  ProductCategory,
} from '@core';
import { CreateProductBody } from '@data';
import { Create, useForm, useSelect } from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import { Button, Form, Input, Select, Space, Switch, UploadFile } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';

type CreateProductForm = Omit<Product, 'createdAt' | 'updatedAt' | 'id'>;

export const ProductCreate = () => {
  const { formProps, saveButtonProps, form } = useForm<
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
    const imageId = form.getFieldValue('imageId');
    const body: CreateProductBody = {
      ...values,
      imageId: imageId || null,
      careInstructions: values?.careInstructions
        ? values.careInstructions
        : null,
      about: values?.about ? values.about : null,
      description: values?.description ? values.description : null,
    };

    formProps.onFinish?.(body);
  };

  const handleChange = (info: UploadChangeParam<UploadFile<Image>>) => {
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
        <Form.Item label="Upload" required>
          <ImageUpload
            maxCount={1}
            name="imageId"
            onChange={handleChange}
            onSuccessUpload={(data) => {
              form.setFieldValue('imageId', data?.id || '');
            }}
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
        <Form.Item name="status" label="Status" initialValue={true}>
          <Switch />
        </Form.Item>
      </Form>
    </Create>
  );
};
