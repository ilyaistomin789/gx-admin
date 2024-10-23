import { DeleteButton, EditButton, ShowButton } from '@core';
import { DateField, List, useTable } from '@refinedev/antd';
import { type BaseRecord } from '@refinedev/core';
import { Space, Table } from 'antd';

export const PlacementList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={'ID'} />
        <Table.Column dataIndex="name" title={'Name'} />
        <Table.Column dataIndex="addressCode" title={'Address Code'} />
        <Table.Column
          dataIndex="phones"
          title={'Phone'}
          render={(value: string[]) => {
            return value.join(', ');
          }}
        />
        <Table.Column
          dataIndex={['createdAt']}
          title={'Created at'}
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          title={'Actions'}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
