import { DateField, Show, TextField } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { Image, Switch, Typography } from 'antd';
import { ProductBff } from '../../../data';

const { Title, Text } = Typography;

export const ProductShow = () => {
  const { queryResult } = useShow<ProductBff>({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

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
      <TextField value={record?.category.name} />

      <Title level={5}>{'CreatedAt'}</Title>
      <DateField value={record?.createdAt} />
      {record?.image && (
        <>
          <Title level={5}>{'Image'}</Title>
          <Image src={record?.image?.url} width={500} />
        </>
      )}
    </Show>
  );
};
