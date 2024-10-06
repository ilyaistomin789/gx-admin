import { DateField, List, useTable } from '@refinedev/antd';
import { type BaseRecord } from '@refinedev/core';
import { Space, Switch, Table } from 'antd';
import { DeleteButton, EditButton, Product, ShowButton } from '../../../core';

export const ProductList = () => {
  const { tableProps } = useTable<Product>({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={'ID'} />
        <Table.Column dataIndex="name" title={'Name'} />
        <Table.Column
          dataIndex="status"
          title={'Status'}
          render={(data) => (
            <Switch defaultChecked={data} disabled size="small" />
          )}
        />
        <Table.Column
          dataIndex={['category', 'name']}
          title={'Product Category'}
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
