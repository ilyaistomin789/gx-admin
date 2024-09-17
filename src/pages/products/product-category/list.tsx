import { DateField, List, useTable } from '@refinedev/antd';
import { useMany, type BaseRecord } from '@refinedev/core';
import { Space, Spin, Switch, Table } from 'antd';
import {
  DeleteButton,
  EditButton,
  ProductCategory,
  ShowButton,
  SizeCategory,
} from '../../../core';

export const ProductCategoryList = () => {
  const { tableProps } = useTable<ProductCategory>({
    syncWithLocation: true,
  });

  const { data: sizeCategoryData, isLoading: sizeCategoryIsLoading } =
    useMany<SizeCategory>({
      resource: 'size-categories',
      ids:
        tableProps?.dataSource
          ?.map((item) => item?.sizeCategoryId)
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
        <Table.Column dataIndex="slug" title={'Slug'} />
        <Table.Column
          dataIndex="status"
          title={'Status'}
          render={(data) => (
            <Switch defaultChecked={data} disabled size="small" />
          )}
        />
        <Table.Column
          dataIndex={'sizeCategoryId'}
          title={'Size Category'}
          render={(value) =>
            sizeCategoryIsLoading ? (
              <Spin size="small" />
            ) : (
              sizeCategoryData?.data?.find((item) => item.id === value)?.name
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
