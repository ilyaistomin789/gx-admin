import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
  Color,
  GetManyRequestType,
  Image,
  ImageUpload,
  Product,
  ProductItem,
  ProductVariation,
  SizeOption,
  useForm,
} from '@core';
import { Create, useSelect } from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import { Button, Form, Input, InputNumber, Select, Space, Switch } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import { UploadFile } from 'antd/lib';

type CreateProductItemForm = Omit<
  ProductItem,
  'createdAt' | 'updatedAt' | 'id'
> & {
  imageIds: string[];
  variations: Pick<ProductVariation, 'sizeOptionId' | 'status'>[];
};

export const ProductItemCreate = () => {
  const { formProps, saveButtonProps, form } = useForm<
    ProductItem,
    HttpError,
    CreateProductItemForm
  >({
    defaultFormValues: {
      status: true,
    },
  });

  const { selectProps: colorSelectProps } = useSelect<Color>({
    resource: 'colors',
    optionLabel: 'name',
    meta: {
      requestType: GetManyRequestType.GetAll,
    },
  });

  const { selectProps: productSelectProps } = useSelect<Product>({
    resource: 'products',
    optionLabel: 'name',
    meta: {
      requestType: GetManyRequestType.GetAll,
    },
  });

  const { selectProps: sizeOptionProps } = useSelect<SizeOption>({
    resource: 'size-options',
    optionLabel: 'name',
    meta: {
      requestType: GetManyRequestType.GetAll,
    },
  });

  const handleFinish = (values: CreateProductItemForm) => {
    const imageIds = form.getFieldValue('imageIds');
    const modifiedValues: CreateProductItemForm = {
      ...values,
      sku: values?.sku ? values.sku : null,
      code: values.code.toString(),
      imageIds,
    };

    formProps.onFinish?.(modifiedValues);
  };

  const handleChange = (info: UploadChangeParam<UploadFile<Image>>) => {
    const currentImageIds = form.getFieldValue('imageIds') || [];

    console.log('onChange', currentImageIds, info);

    switch (info?.file?.status) {
      case 'done':
        form.setFieldValue('imageIds', [
          ...currentImageIds,
          info?.file?.response?.id,
        ]);
        break;
      case 'removed':
        form.setFieldValue(
          'imageIds',
          currentImageIds.filter((i: string) => i !== info?.file?.response?.id),
        );
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
          label={'Color'}
          name={'colorId'}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...colorSelectProps} showSearch={false} />
        </Form.Item>

        <Form.Item
          label={'Product'}
          name={'productId'}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...productSelectProps} showSearch={false} />
        </Form.Item>

        <Form.Item
          label={'Original Price'}
          name={'originalPrice'}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label={'Sale Price'}
          name={'salePrice'}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label={'Code'}
          name={'code'}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label={'Sku'}
          name={'sku'}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.List
          name="variations"
          rules={[
            {
              validator: async (_, variations) => {
                if (!variations || variations.length < 1) {
                  return Promise.reject(
                    new Error('At least no product variations'),
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
                  direction="horizontal"
                  key={key}
                  size={'large'}
                  style={{ display: 'flex', marginBottom: 8, width: '100%' }}
                  align="center"
                >
                  <Form.Item
                    {...restField}
                    name={[name, 'sizeOptionId']}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[{ required: true, message: 'Missing size option' }]}
                    label="Size option"
                  >
                    <Select
                      {...sizeOptionProps}
                      showSearch={false}
                      style={{ width: '300px' }}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'status']}
                    label="Status"
                  >
                    <Switch />
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
                  Add variation
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item label="Upload" required>
          <ImageUpload multiple maxCount={6} onChange={handleChange}>
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </ImageUpload>
        </Form.Item>

        <Form.Item name="status" label="Status">
          <Switch />
        </Form.Item>
        <Form.Item name="isCustomizable" label="Is Customizable">
          <Switch />
        </Form.Item>
      </Form>
    </Create>
  );
};
