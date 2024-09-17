import { DateField, Show, TextField } from '@refinedev/antd';
import { useOne, useShow } from '@refinedev/core';
import { Image, Spin, Switch, Typography } from 'antd';
import { Image as ImageType, Product, ProductCategory } from '../../../core';

const { Title, Text } = Typography;

export const ProductShow = () => {
  const { queryResult } = useShow<Product>({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: productCategoryData, isLoading: productCategoryIsLoading } =
    useOne<ProductCategory>({
      resource: 'product-categories',
      id: record?.productCategoryId || '',
      queryOptions: {
        enabled: !!record,
      },
    });

  const { data: imageData, isLoading: imageIsLoading } = useOne<ImageType>({
    resource: 'images',
    dataProviderName: 'media',
    id: record?.imageId || '',
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{'ID'}</Title>
      <TextField value={record?.id} />
      <Title level={5}>{'Name'}</Title>
      <TextField value={record?.name} />
      <Title level={5}>{'Status'}</Title>
      <Switch
        defaultChecked={record?.status}
        disabled
        size="small"
        style={{ marginBottom: 8 }}
      />
      <Title level={5}>{'Product Category'}</Title>
      <Text>
        {productCategoryIsLoading ? (
          <Spin size="small" />
        ) : (
          productCategoryData?.data.name
        )}
      </Text>
      <Title level={5}>{'CreatedAt'}</Title>
      <DateField value={record?.createdAt} />
      <Title level={5}>{'Image'}</Title>
      {imageIsLoading ? (
        <Spin size="small" />
      ) : (
        <Image src={imageData?.data?.url} width={500} />
      )}
    </Show>
  );
};
