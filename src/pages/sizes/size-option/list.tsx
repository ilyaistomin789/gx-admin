import { List, useTable } from "@refinedev/antd";
import { useMany, type BaseRecord } from "@refinedev/core";
import { Space, Spin, Table } from "antd";
import { DeleteButton, EditButton, ShowButton } from "../../../core";
import { SizeCategory, SizeOption } from "../../../core/types";

export const SizeOptionList = () => {
  const { tableProps } = useTable<SizeOption>({
    syncWithLocation: true,
  });

  const { data: categoryData, isLoading: categoryIsLoading } =
    useMany<SizeCategory>({
      resource: "size-categories",
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
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column dataIndex="name" title={"Name"} />
        <Table.Column dataIndex="sortOrder" title={"Sort Order"} />
        <Table.Column
          dataIndex={"sizeCategoryId"}
          title={"Category"}
          render={(value) =>
            categoryIsLoading ? (
              <Spin size="small" />
            ) : (
              categoryData?.data?.find((item) => item.id === value)?.name
            )
          }
        />
        <Table.Column
          title={"Actions"}
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
