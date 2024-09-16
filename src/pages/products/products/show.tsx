import { DateField, Show, TextField } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { Typography } from 'antd';

const { Title } = Typography;

export const ProductShow = () => {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{'ID'}</Title>
      <TextField value={record?.id} />
      <Title level={5}>{'Name'}</Title>
      <TextField value={record?.name} />
      <Title level={5}>{'Value'}</Title>
      <TextField value={record?.value} />
      <Title level={5}>{'CreatedAt'}</Title>
      <DateField value={record?.createdAt} />
    </Show>
  );
};
