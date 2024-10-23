import { DateField, Show, TextField } from '@refinedev/antd';
import { useOne, useShow } from '@refinedev/core';
import { Spin, Switch, Typography } from 'antd';
import { ProductItem, ProductVariation, SizeOption } from '@core';

const { Title, Text } = Typography;

export const ProductVariationShow = () => {
  const { queryResult } = useShow<ProductVariation>({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: sizeOptionData, isLoading: sizeOptionIsLoading } =
    useOne<SizeOption>({
      resource: 'size-options',
      id: record?.sizeOptionId || '',
      queryOptions: {
        enabled: !!record,
      },
    });

  const { data: productItemData, isLoading: productItemIsLoading } =
    useOne<ProductItem>({
      resource: 'product-items',
      id: record?.productItemId || '',
      queryOptions: {
        enabled: !!record,
      },
    });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{'ID'}</Title>
      <TextField value={record?.id} />
      <Title level={5}>{'Size Option'}</Title>
      <Text>
        {sizeOptionIsLoading ? (
          <Spin size="small" />
        ) : (
          sizeOptionData?.data.name
        )}
      </Text>
      <Title level={5}>{'Product Item'}</Title>
      <Text>
        {productItemIsLoading ? (
          <Spin size="small" />
        ) : (
          productItemData?.data.name
        )}
      </Text>
      <Title level={5}>{'Status'}</Title>
      <Switch
        defaultChecked={record?.status}
        disabled
        size="small"
        style={{ marginBottom: 8 }}
      />
      <Title level={5}>{'CreatedAt'}</Title>
      <DateField value={record?.createdAt} />
    </Show>
  );
};
