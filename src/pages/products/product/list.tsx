import { DateField, List, useTable } from '@refinedev/antd';
import { useMany, type BaseRecord } from '@refinedev/core';
import { Space, Spin, Switch, Table } from 'antd';
import {
  DeleteButton,
  EditButton,
  Product,
  ProductCategory,
  ShowButton,
} from '../../../core';

export const ProductList = () => {
  const { tableProps } = useTable<Product>({
    syncWithLocation: true,
  });

  const { data: productCategoryData, isLoading: productCategoryIsLoading } =
    useMany<ProductCategory>({
      resource: 'product-categories',
      ids:
        tableProps?.dataSource
          ?.map((item) => item?.productCategoryId)
          .filter(Boolean) ?? [],
      queryOptions: {
        enabled: !!tableProps?.dataSource,
      },
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
          dataIndex={'productCategoryId'}
          title={'Product Category'}
          render={(value) =>
            productCategoryIsLoading ? (
              <Spin size="small" />
            ) : (
              productCategoryData?.data?.find((item) => item.id === value)?.name
            )
          }
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
