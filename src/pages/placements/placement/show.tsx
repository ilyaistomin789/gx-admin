import { Placement } from '@core';
import { DateField, Show, TextField } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { Typography } from 'antd';

const { Title } = Typography;

export const PlacementShow = () => {
  const { queryResult } = useShow<Placement>({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{'ID'}</Title>
      <TextField value={record?.id} />
      <Title level={5}>{'Name'}</Title>
      <TextField value={record?.name} />
      <Title level={5}>{'Address Code'}</Title>
      <TextField value={record?.addressCode} />
      <Title level={5}>{'Phones'}</Title>
      <TextField value={record?.phones?.join(', ')} />
      <Title level={5}>{'CreatedAt'}</Title>
      <DateField value={record?.createdAt} />
    </Show>
  );
};
