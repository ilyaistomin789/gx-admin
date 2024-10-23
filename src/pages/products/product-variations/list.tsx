import { DateField, List, useTable } from '@refinedev/antd';
import { useMany, type BaseRecord } from '@refinedev/core';
import { Space, Spin, Switch, Table } from 'antd';
import {
  DeleteButton,
  EditButton,
  ProductItem,
  ProductVariation,
  ShowButton,
  SizeCategory,
} from '@core';

export const ProductVariationList = () => {
  const { tableProps } = useTable<ProductVariation>({
    syncWithLocation: true,
  });

  const { data: sizeOptionData, isLoading: sizeOptionIsLoading } =
    useMany<SizeCategory>({
      resource: 'size-options',
      ids:
        tableProps?.dataSource
          ?.map((item) => item?.sizeOptionId)
          .filter(Boolean) ?? [],
      queryOptions: {
        enabled: !!tableProps?.dataSource,
      },
    });
  const { data: productItemData, isLoading: productItemIsLoading } =
    useMany<ProductItem>({
      resource: 'product-items',
      ids:
        tableProps?.dataSource
          ?.map((item) => item?.productItemId)
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
            sizeOptionIsLoading ? (
              <Spin size="small" />
            ) : (
              sizeOptionData?.data?.find((item) => item.id === value)?.name
            )
          }
        />
        <Table.Column
          dataIndex={'productItemId'}
          title={'Product Item'}
          render={(value) =>
            productItemIsLoading ? (
              <Spin size="small" />
            ) : (
              productItemData?.data?.find((item) => item.id === value)?.name
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
