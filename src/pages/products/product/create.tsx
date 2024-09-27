import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Create, useForm, useSelect } from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import { Button, Form, Input, Select, Space, Switch, Upload } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload';
import { MEDIA_SERVICE_URL } from '../../../app/config';
import {
  GetManyRequestType,
  Image,
  Product,
  ProductCategory,
} from '../../../core';
import { CreateProductBody, DefaultResponse } from '../../../data';

type CreateProductForm = Omit<
  Product,
  'createdAt' | 'updatedAt' | 'id' | 'imageId'
> & { upload: UploadChangeParam<UploadFile<DefaultResponse<Image>>> };

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
    const fileList = upload.fileList;
    if (!fileList) return;

    const imageId = fileList[0].response!.data.id!;

    console.log(upload);

    const body: CreateProductBody = {
      ...fields,
      imageId,
      careInstructions: values?.careInstructions
        ? values.careInstructions
        : null,
      about: values?.about ? values.about : null,
      description: values?.description ? values.description : null,
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
        <Form.Item name="upload" label="Upload" required>
          <Upload name="logo" action={`${MEDIA_SERVICE_URL}/images/upload`}>
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.List
          name="characteristics"
          rules={[
            {
              validator: async (_, characteristics) => {
                console.log(_, characteristics);
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
