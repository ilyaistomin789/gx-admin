import {
  DeleteButton,
  EditButton,
  Placement,
  PlacementWorkingTime,
  ShowButton,
} from '@core';
import { DateField, List, useTable } from '@refinedev/antd';
import { useMany, type BaseRecord } from '@refinedev/core';
import { Space, Spin, Table } from 'antd';

export const PlacementWorkingTimeList = () => {
  const { tableProps } = useTable<PlacementWorkingTime>({
    syncWithLocation: true,
  });

  const { data: placementData, isLoading: placementIsLoading } =
    useMany<Placement>({
      resource: 'placements',
      ids:
        tableProps?.dataSource
          ?.map((item) => item?.placementId)
          .filter(Boolean) ?? [],
      queryOptions: {
        enabled: !!tableProps?.dataSource,
      },
    });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={'ID'} />
        <Table.Column dataIndex="day" title={'Day'} />
        <Table.Column dataIndex="workingTimeFrom" title={'Working Time From'} />
        <Table.Column dataIndex="workingTimeTill" title={'Working Time Till'} />
        <Table.Column dataIndex="dayType" title={'Day Type'} />
        <Table.Column
          dataIndex={'placementId'}
          title={'Placement'}
          render={(value) =>
            placementIsLoading ? (
              <Spin size="small" />
            ) : (
              placementData?.data?.find((item) => item.id === value)?.name
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
