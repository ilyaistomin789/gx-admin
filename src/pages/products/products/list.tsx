import { DateField, List, useTable } from '@refinedev/antd';
import { type BaseRecord } from '@refinedev/core';
import { Space, Table } from 'antd';
import { DeleteButton, EditButton, ShowButton } from '../../../core';

export const ProductList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={'ID'} />
        <Table.Column dataIndex="Product" title={'Promo Code'} />
        <Table.Column
          dataIndex="expiredAt"
          title={'Expired At'}
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column dataIndex="discount" title={'Discount'} />
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
