import { GetManyRequestType, ProductCategory, SizeCategory } from '@core';
import { Create, useForm, useSelect } from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import { Form, Input, Select, Switch } from 'antd';

export const ProductCategoryCreate = () => {
  const { formProps, saveButtonProps } = useForm<
    ProductCategory,
    HttpError,
    ProductCategory
  >({});

  const { selectProps: sizeCategorySelectProps } = useSelect<SizeCategory>({
    resource: 'size-categories',
    optionLabel: 'name',
    meta: {
      requestType: GetManyRequestType.GetAll,
    },
  });
  const { selectProps: productCategorySelectProps } =
    useSelect<ProductCategory>({
      resource: 'product-categories',
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
          label={'Size Category'}
          name={'sizeCategoryId'}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...sizeCategorySelectProps} showSearch={false} />
        </Form.Item>
        <Form.Item
          label={'Parent product category'}
          name={'parentCategoryId'}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Select {...productCategorySelectProps} showSearch={false} />
        </Form.Item>

        <Form.Item name="status" label="Status" initialValue={true}>
          <Switch />
        </Form.Item>
      </Form>
    </Create>
  );
};
