import { Edit, useForm, useSelect } from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import { Form, Input, Select, Switch } from 'antd';
import {
  GetManyRequestType,
  ProductCategory,
  ProductItem,
  SizeOption,
} from '@core';

export const ProductItemEdit = () => {
  const { formProps, saveButtonProps, formLoading } = useForm<
    ProductCategory,
    HttpError,
    ProductCategory
  >({});

  const { selectProps: sizeOptionSelectProps } = useSelect<SizeOption>({
    resource: 'size-options',
    optionLabel: 'name',
    meta: {
      requestType: GetManyRequestType.GetAll,
    },
  });
  const { selectProps: productItemSelectProps } = useSelect<ProductItem>({
    resource: 'product-items',
    optionLabel: 'name',
    meta: {
      requestType: GetManyRequestType.GetAll,
    },
  });

  const handleFinish = (values: ProductCategory) => {
    const modifiedValues: ProductCategory = {
      ...values,
      parentCategoryId: values?.parentCategoryId
        ? values.parentCategoryId
        : null,
      description: values?.description ? values.description : null,
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
          label={'Size Option'}
          name={'sizeOptionId'}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...sizeOptionSelectProps} showSearch={false} />
        </Form.Item>
        <Form.Item
          label={'Product Item'}
          name={'productItemId'}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...productItemSelectProps} showSearch={false} />
        </Form.Item>

        <Form.Item name="status" label="Status" initialValue={true}>
          <Switch />
        </Form.Item>
      </Form>
    </Edit>
  );
};
